/**
 * POST /api/estimate
 *
 * Server-side entry point for the Fint Hjem estimator chat. Receives:
 *   - The full chat transcript so far (roles + content)
 *   - Structured intake (service/job/size/standard/location/contact)
 *   - Uploaded images (as data URLs + metadata)
 *
 * Responsibilities:
 *   1. Validate + sanitize the payload (no surprises from client code).
 *   2. Build a fresh system prompt that bakes in Fint Hjem's editable
 *      pricing table and the current intake context.
 *   3. Decide whether the configured model supports vision — if so,
 *      forward image data URLs as multimodal content parts; otherwise
 *      degrade gracefully and pass only filenames + notes.
 *   4. Call OpenRouter, parse out the structured estimate block,
 *      return the user-facing reply and structured estimate to the UI.
 *
 * We never let the AI handle authentication, key storage or rate
 * limiting — the key lives in env vars and never touches the client.
 */

import { NextResponse } from 'next/server'
import {
  chatCompletion,
  getOpenRouterConfig,
  OpenRouterError,
  parseAssistantReply,
  type OpenRouterContentPart,
  type OpenRouterMessage,
} from '@/lib/openrouter'
import { buildSystemPrompt } from '@/lib/system-prompt'
import type {
  ChatMessage,
  EstimateRequestBody,
  EstimateResponseBody,
  ProjectIntake,
  UploadedImage,
} from '@/types/estimate'

// Force Node runtime so `process.env.OPENROUTER_API_KEY` is definitely
// available and we don't accidentally run on Edge (where outgoing
// requests to OpenRouter can be a little flakier under some hosts).
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// ─── Model capability hints ──────────────────────────────────────────────
//
// This is a simple allowlist — the moment Fint Hjem opts into a vision
// model we forward images automatically. Anything not on the list
// gracefully degrades to "image names only" mode.
const VISION_MODEL_PATTERNS = [
  /claude-3/, // Sonnet, Opus, Haiku (all multimodal)
  /gpt-4o/,
  /gpt-4-vision/,
  /gpt-4-turbo/,
  /gemini/,
  /llama-3\.2-.*vision/i,
  /pixtral/i,
]

function modelSupportsVision(model: string): boolean {
  return VISION_MODEL_PATTERNS.some((re) => re.test(model))
}

// ─── Safety limits ───────────────────────────────────────────────────────
const MAX_TRANSCRIPT_MESSAGES = 24
const MAX_IMAGES = 8
const MAX_MESSAGE_CHARS = 4_000
// Roughly 8 MB base64 per image is the practical ceiling for most vision
// models — anything bigger we refuse to forward (we still keep metadata).
const MAX_IMAGE_DATA_URL_BYTES = 8 * 1024 * 1024

// ─── Request validation ──────────────────────────────────────────────────

function isProjectIntake(v: unknown): v is ProjectIntake {
  if (!v || typeof v !== 'object') return false
  return true // All fields are optional strings/numbers; we trust + clamp below.
}

function sanitizeIntake(raw: unknown): ProjectIntake {
  const intake = isProjectIntake(raw) ? (raw as ProjectIntake) : {}
  const clean: ProjectIntake = {}
  if (typeof intake.category === 'string') clean.category = intake.category as ProjectIntake['category']
  if (typeof intake.jobType === 'string') clean.jobType = intake.jobType as ProjectIntake['jobType']
  if (typeof intake.sizeSqm === 'number' && intake.sizeSqm > 0 && intake.sizeSqm < 10_000) {
    clean.sizeSqm = Math.round(intake.sizeSqm)
  }
  if (typeof intake.propertyType === 'string') clean.propertyType = intake.propertyType as ProjectIntake['propertyType']
  if (typeof intake.standard === 'string') clean.standard = intake.standard as ProjectIntake['standard']
  if (typeof intake.location === 'string') clean.location = intake.location.slice(0, 120)
  if (typeof intake.phone === 'string') clean.phone = intake.phone.slice(0, 40)
  if (typeof intake.email === 'string') clean.email = intake.email.slice(0, 120)
  return clean
}

function sanitizeTranscript(raw: unknown): Array<Pick<ChatMessage, 'role' | 'content'>> {
  if (!Array.isArray(raw)) return []
  return raw
    .filter(
      (m): m is { role: 'user' | 'assistant'; content: string } =>
        !!m &&
        typeof m === 'object' &&
        (m.role === 'user' || m.role === 'assistant') &&
        typeof m.content === 'string'
    )
    .slice(-MAX_TRANSCRIPT_MESSAGES)
    .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_MESSAGE_CHARS) }))
}

function sanitizeImages(raw: unknown): UploadedImage[] {
  if (!Array.isArray(raw)) return []
  return raw
    .filter((img): img is UploadedImage => {
      if (!img || typeof img !== 'object') return false
      const i = img as Partial<UploadedImage>
      return typeof i.id === 'string' && typeof i.name === 'string' && typeof i.mimeType === 'string'
    })
    .slice(0, MAX_IMAGES)
    .map((img) => ({
      id: String(img.id).slice(0, 64),
      name: String(img.name).slice(0, 200),
      mimeType: String(img.mimeType).slice(0, 80),
      sizeBytes: typeof img.sizeBytes === 'number' ? img.sizeBytes : 0,
      dataUrl:
        typeof img.dataUrl === 'string' && img.dataUrl.length <= MAX_IMAGE_DATA_URL_BYTES
          ? img.dataUrl
          : '',
      note: typeof img.note === 'string' ? img.note.slice(0, 400) : undefined,
    }))
}

// ─── Message assembly ────────────────────────────────────────────────────
//
// When the latest user turn carries image attachments AND the active
// model supports vision, we promote that turn to multimodal content.
// Everything else stays as simple string `content` to keep things
// interop-friendly across providers.
function buildOpenRouterMessages(
  systemPrompt: string,
  transcript: Array<Pick<ChatMessage, 'role' | 'content'>>,
  images: UploadedImage[],
  supportsVision: boolean
): OpenRouterMessage[] {
  const messages: OpenRouterMessage[] = [{ role: 'system', content: systemPrompt }]

  transcript.forEach((m, idx) => {
    const isLastUserTurn = idx === transcript.length - 1 && m.role === 'user'
    if (isLastUserTurn && images.length > 0 && supportsVision) {
      const parts: OpenRouterContentPart[] = [{ type: 'text', text: m.content }]
      images.forEach((img) => {
        if (img.dataUrl) parts.push({ type: 'image_url', image_url: { url: img.dataUrl } })
      })
      messages.push({ role: 'user', content: parts })
    } else {
      messages.push({ role: m.role, content: m.content })
    }
  })

  return messages
}

// ─── Route handler ───────────────────────────────────────────────────────

export async function POST(req: Request) {
  let body: EstimateRequestBody
  try {
    body = (await req.json()) as EstimateRequestBody
  } catch {
    return NextResponse.json(
      { error: 'Ugyldig JSON i forespørselen.' },
      { status: 400 }
    )
  }

  const transcript = sanitizeTranscript(body.messages)
  if (transcript.length === 0) {
    return NextResponse.json(
      { error: 'Ingen melding å svare på.' },
      { status: 400 }
    )
  }

  const intake = sanitizeIntake(body.intake)
  const images = sanitizeImages(body.images)

  const { model } = getOpenRouterConfig()
  const supportsVision = modelSupportsVision(model)

  const systemPrompt = buildSystemPrompt(intake, images)
  const messages = buildOpenRouterMessages(systemPrompt, transcript, images, supportsVision)

  try {
    const { content } = await chatCompletion({ messages })
    const parsed = parseAssistantReply(content)

    // If images were uploaded but the current model can't see them,
    // surface that to the user so they know the team will review them
    // manually — this is a stated product requirement (graceful degrade).
    const degradedWarning =
      images.length > 0 && !supportsVision
        ? 'Bildene er mottatt — men nåværende modell analyserer ikke bilder automatisk. Teamet vårt ser gjennom dem manuelt.'
        : undefined

    const response: EstimateResponseBody = {
      reply: parsed.reply,
      estimate: parsed.estimate,
      warning: parsed.warning || degradedWarning,
    }

    return NextResponse.json(response, { status: 200 })
  } catch (err) {
    const status = err instanceof OpenRouterError ? err.status : 500
    const message =
      err instanceof Error
        ? err.message
        : 'Noe gikk galt mens vi hentet estimatet. Prøv igjen, eller kontakt oss direkte på +47 465 83 867.'
    // Never leak raw stack traces to the client — we return a clean
    // Norwegian error message the UI can surface verbatim.
    return NextResponse.json({ error: message }, { status })
  }
}
