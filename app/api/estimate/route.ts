/**
 * POST /api/estimate
 *
 * Server-side entry point for the Fint Hjem estimator chat. Receives:
 *   - The full chat transcript so far (roles + content)
 *   - Structured intake (service/job/size/standard/location/contact)
 *   - Uploaded images (as data URLs + metadata)
 *
 * Responsibilities:
 *   1. Validate + sanitize the payload.
 *   2. Choose a model using the central routing helper:
 *      images attached → premium multimodal, else → default.
 *   3. Build a fresh system prompt that bakes in Fint Hjem's editable
 *      pricing table and the current intake context.
 *   4. If the selected model supports vision, forward images as
 *      multimodal content parts; otherwise drop the binary data and
 *      tell the user the team will review them manually.
 *   5. Call OpenRouter, parse the structured estimate block, return
 *      the user-facing reply + structured estimate to the UI.
 *
 * NO fallback retry logic. If the chosen model fails, we return a
 * clean Norwegian error — never silently swap to another provider.
 */

import { NextResponse } from 'next/server'
import {
  chatCompletion,
  OpenRouterError,
  parseAssistantReply,
  type OpenRouterContentPart,
  type OpenRouterMessage,
} from '@/lib/openrouter'
import { modelSupportsVision, selectModel } from '@/lib/model-config'
import { buildSystemPrompt } from '@/lib/system-prompt'
import type {
  ChatMessage,
  EstimateRequestBody,
  EstimateResponseBody,
  ProjectIntake,
  UploadedImage,
} from '@/types/estimate'

// Force Node runtime so process.env is definitely available and we
// don't accidentally run on Edge (where outgoing requests to
// OpenRouter can be flakier under some hosts).
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// ─── Safety limits ───────────────────────────────────────────────────────
const MAX_TRANSCRIPT_MESSAGES = 24
const MAX_IMAGES = 8
const MAX_MESSAGE_CHARS = 4_000
// Roughly 8 MB base64 per image is the practical ceiling for most
// vision models — anything bigger we refuse to forward (metadata stays).
const MAX_IMAGE_DATA_URL_BYTES = 8 * 1024 * 1024

// ─── Request validation ──────────────────────────────────────────────────

function isProjectIntake(v: unknown): v is ProjectIntake {
  if (!v || typeof v !== 'object') return false
  return true // All fields are optional; we clamp individually below.
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
// Everything else stays as simple string `content` for interop.
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
    return NextResponse.json({ error: 'Ugyldig JSON i forespørselen.' }, { status: 400 })
  }

  const transcript = sanitizeTranscript(body.messages)
  if (transcript.length === 0) {
    return NextResponse.json({ error: 'Ingen melding å svare på.' }, { status: 400 })
  }

  const intake = sanitizeIntake(body.intake)
  const images = sanitizeImages(body.images)

  // Single, explicit model selection. NO fallback retry — if this
  // call fails, we surface the error. Product decision.
  const model = selectModel({ hasImages: images.length > 0 })
  const supportsVision = modelSupportsVision(model)

  const systemPrompt = buildSystemPrompt(intake, images)
  const messages = buildOpenRouterMessages(systemPrompt, transcript, images, supportsVision)

  try {
    const { content } = await chatCompletion({ model, messages })
    const parsed = parseAssistantReply(content)

    // Defensive: if for some reason the routed model doesn't support
    // vision (e.g. an ops change to MODEL_CONFIG removes it from the
    // allowlist), surface that so the user knows the team will review
    // images manually. In the current config all three models are
    // multimodal, so this branch is effectively dead code — kept as
    // a clean graceful-degrade path per the product spec.
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
