/**
 * Tiny, dependency-free OpenRouter client.
 *
 * We deliberately don't pull in an SDK — the OpenAI-compatible HTTP
 * surface that OpenRouter exposes is trivial to call with native fetch,
 * and this keeps the bundle lean. All configuration lives in environment
 * variables so swapping models or keys is a one-line deploy change.
 *
 * Required env:
 *   OPENROUTER_API_KEY      — account key from https://openrouter.ai/keys
 *
 * Optional env (sensible defaults in parentheses):
 *   OPENROUTER_MODEL        — the model slug to use
 *                             (anthropic/claude-3.5-sonnet)
 *   OPENROUTER_SITE_URL     — forwarded as HTTP-Referer (identifies the
 *                             calling app to OpenRouter's rankings)
 *                             (https://finthjem.no)
 *   OPENROUTER_APP_NAME     — forwarded as X-Title  (Fint Hjem Estimator)
 */

const OPENROUTER_ENDPOINT = 'https://openrouter.ai/api/v1/chat/completions'

// Multi-modal-capable, strong reasoning, good Norwegian. Easy to swap
// from `.env.local` without touching code. If you later turn on vision
// analysis, make sure the chosen model supports `input_image`.
const DEFAULT_MODEL = 'anthropic/claude-3.5-sonnet'

// ─── Message shapes ──────────────────────────────────────────────────────
//
// We support both plain text messages and the OpenAI-compatible
// multimodal format where `content` is an array of parts. Structuring
// it this way means we can light up image input as soon as Fint Hjem
// wants to enable a vision-capable model — no UI changes required.
export type OpenRouterContentPart =
  | { type: 'text'; text: string }
  | { type: 'image_url'; image_url: { url: string } }

export interface OpenRouterMessage {
  role: 'system' | 'user' | 'assistant'
  content: string | OpenRouterContentPart[]
}

export interface OpenRouterRequest {
  model?: string
  messages: OpenRouterMessage[]
  temperature?: number
  max_tokens?: number
}

interface OpenRouterChoice {
  message: { role: string; content: string }
  finish_reason?: string
}

interface OpenRouterResponse {
  id?: string
  choices: OpenRouterChoice[]
  usage?: { prompt_tokens?: number; completion_tokens?: number; total_tokens?: number }
  error?: { message?: string; code?: string | number }
}

// ─── Public API ──────────────────────────────────────────────────────────

export function getOpenRouterConfig() {
  const apiKey = process.env.OPENROUTER_API_KEY
  const model = process.env.OPENROUTER_MODEL || DEFAULT_MODEL
  const siteUrl = process.env.OPENROUTER_SITE_URL || 'https://finthjem.no'
  const appName = process.env.OPENROUTER_APP_NAME || 'Fint Hjem Estimator'
  return { apiKey, model, siteUrl, appName }
}

export class OpenRouterError extends Error {
  public readonly status: number
  constructor(message: string, status = 500) {
    super(message)
    this.name = 'OpenRouterError'
    this.status = status
  }
}

/**
 * Single-shot (non-streaming) chat completion.
 *
 * Returns the raw assistant `content` string. The caller is responsible
 * for parsing any structured output (e.g. the <<<ESTIMATE_JSON>>> block).
 */
export async function chatCompletion(
  req: OpenRouterRequest,
  { signal }: { signal?: AbortSignal } = {}
): Promise<{ content: string; model: string }> {
  const { apiKey, model, siteUrl, appName } = getOpenRouterConfig()

  if (!apiKey) {
    throw new OpenRouterError(
      'OPENROUTER_API_KEY mangler i miljøvariabler. Legg den til i .env.local eller hostingplattformens env settings.',
      500
    )
  }

  const body: OpenRouterRequest = {
    model: req.model || model,
    messages: req.messages,
    temperature: req.temperature ?? 0.4,
    // Keep replies compact — this is an estimator, not a chatbot for
    // open-ended conversation. 700 tokens ≈ ~2 short paragraphs + the
    // structured JSON block.
    max_tokens: req.max_tokens ?? 700,
  }

  const res = await fetch(OPENROUTER_ENDPOINT, {
    method: 'POST',
    signal,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
      'HTTP-Referer': siteUrl,
      'X-Title': appName,
    },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    // Try to read a useful error message from the body before giving up.
    let detail = ''
    try {
      const errBody = (await res.json()) as OpenRouterResponse
      detail = errBody.error?.message || ''
    } catch {
      /* body wasn't JSON; fall through */
    }
    throw new OpenRouterError(
      `OpenRouter svarte med ${res.status} ${res.statusText}${detail ? ` — ${detail}` : ''}`,
      res.status
    )
  }

  const data = (await res.json()) as OpenRouterResponse
  const content = data.choices?.[0]?.message?.content ?? ''
  if (!content) {
    throw new OpenRouterError('OpenRouter returnerte et tomt svar.', 502)
  }

  return { content, model: body.model || DEFAULT_MODEL }
}

// ─── ESTIMATE JSON parsing ───────────────────────────────────────────────
//
// The model is instructed to append `<<<ESTIMATE_JSON>>>{...}<<<ESTIMATE_JSON>>>`
// when it has enough info to estimate. We strip that out before showing
// the user the free-text reply, and we surface the parsed object as a
// separate structured field so the UI can render it as a premium card.

import type { EstimateResult } from '@/types/estimate'

const ESTIMATE_RE = /<<<ESTIMATE_JSON>>>([\s\S]*?)<<<ESTIMATE_JSON>>>/

export interface ParsedAssistantReply {
  reply: string
  estimate: EstimateResult | null
  warning?: string
}

export function parseAssistantReply(raw: string): ParsedAssistantReply {
  const match = raw.match(ESTIMATE_RE)
  if (!match) {
    return { reply: raw.trim(), estimate: null }
  }

  const textWithoutBlock = raw.replace(ESTIMATE_RE, '').trim()
  const jsonSlice = match[1].trim()

  try {
    const parsed = JSON.parse(jsonSlice) as EstimateResult
    // Extremely defensive: only keep fields we explicitly know about —
    // the AI is instructed not to add extras, but we don't trust it
    // blindly when parsing potentially-malformed output.
    const safe: EstimateResult = {
      priceMin: Number(parsed.priceMin) || 0,
      priceMax: Number(parsed.priceMax) || 0,
      durationText: String(parsed.durationText || '').slice(0, 80),
      included: Array.isArray(parsed.included)
        ? parsed.included.slice(0, 8).map((s) => String(s).slice(0, 160))
        : [],
      assumptions: Array.isArray(parsed.assumptions)
        ? parsed.assumptions.slice(0, 6).map((s) => String(s).slice(0, 160))
        : [],
      recommendedNextStep: String(parsed.recommendedNextStep || 'Bestill en gratis befaring for eksakt pris.').slice(0, 200),
      confidence:
        parsed.confidence === 'high' || parsed.confidence === 'low' ? parsed.confidence : 'medium',
    }

    const isValid =
      safe.priceMin > 0 &&
      safe.priceMax >= safe.priceMin &&
      safe.durationText.length > 0 &&
      safe.included.length > 0

    if (!isValid) {
      return {
        reply: textWithoutBlock,
        estimate: null,
        warning: 'Fint Hjem-assistenten returnerte et ufullstendig estimat — svaret er vist som tekst.',
      }
    }

    return { reply: textWithoutBlock, estimate: safe }
  } catch {
    return {
      reply: textWithoutBlock,
      estimate: null,
      warning: 'Kunne ikke tolke strukturert estimat fra modellen — svaret er vist som tekst.',
    }
  }
}
