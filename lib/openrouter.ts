/**
 * Tiny, dependency-free OpenRouter client.
 *
 * Deliberately provider-agnostic — all model selection lives in
 * `lib/model-config.ts`, and the caller must pass `model` explicitly
 * on every request. This file knows nothing about which models we use;
 * its only job is to speak HTTP to OpenRouter correctly.
 *
 * Required env:
 *   OPENROUTER_API_KEY      — account key from https://openrouter.ai/keys
 *
 * Optional env (sensible defaults in parentheses):
 *   OPENROUTER_SITE_URL     — forwarded as HTTP-Referer so we show up
 *                             on OpenRouter's rankings dashboard
 *                             (https://finthjem.no)
 *   OPENROUTER_APP_NAME     — forwarded as X-Title (Fint Hjem Estimator)
 */

const OPENROUTER_ENDPOINT = 'https://openrouter.ai/api/v1/chat/completions'

// ─── Message shapes ──────────────────────────────────────────────────────
//
// OpenAI-compatible multimodal content: either a plain string (simple
// text turn) or an array of typed parts (text + image blocks). This
// lines up with what OpenRouter accepts across every provider we use.
export type OpenRouterContentPart =
  | { type: 'text'; text: string }
  | { type: 'image_url'; image_url: { url: string } }

export interface OpenRouterMessage {
  role: 'system' | 'user' | 'assistant'
  content: string | OpenRouterContentPart[]
}

export interface OpenRouterRequest {
  /**
   * Required. The caller must decide which model to use — see
   * `lib/model-config.ts` for the routing helper.
   */
  model: string
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
  const siteUrl = process.env.OPENROUTER_SITE_URL || 'https://finthjem.no'
  const appName = process.env.OPENROUTER_APP_NAME || 'Fint Hjem Estimator'
  return { apiKey, siteUrl, appName }
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
 * Returns the raw assistant `content` string. The caller parses any
 * structured output (e.g. the <<<ESTIMATE_JSON>>> block).
 *
 * No fallback logic here — if the request fails, it throws. That's
 * intentional: product does not want silent model swapping.
 */
export async function chatCompletion(
  req: OpenRouterRequest,
  { signal }: { signal?: AbortSignal } = {}
): Promise<{ content: string; model: string }> {
  const { apiKey, siteUrl, appName } = getOpenRouterConfig()

  if (!apiKey) {
    throw new OpenRouterError(
      'OPENROUTER_API_KEY mangler i miljøvariabler. Legg den til i .env.local eller hostingplattformens env settings.',
      500
    )
  }

  if (!req.model) {
    // Defensive — should never happen since the route helper always
    // picks a model, but it's cheaper to check here than to debug a
    // 400 from OpenRouter later.
    throw new OpenRouterError('Internt: chatCompletion kalt uten modell.', 500)
  }

  const body: OpenRouterRequest = {
    model: req.model,
    messages: req.messages,
    temperature: req.temperature ?? 0.4,
    // Replies are intentionally compact — this is an estimator, not a
    // chatbot. 700 tokens ≈ ~2 short paragraphs + the structured JSON
    // block the UI depends on.
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

  return { content, model: body.model }
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
    // Defensive: only keep fields we know about. The AI is instructed
    // not to add extras, but we don't trust it blindly when parsing
    // potentially-malformed output.
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
