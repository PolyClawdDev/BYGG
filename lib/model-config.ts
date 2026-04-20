/**
 * Central model configuration for the Fint Hjem estimator.
 *
 * Only this file knows the provider/model slugs. Swapping to a newer
 * model is a one-line change — the rest of the codebase (OpenRouter
 * client, /api/estimate route, prompt builder) stays untouched.
 *
 * IMPORTANT: There is intentionally NO fallback retry logic elsewhere
 * in the app. If a selected model fails, the route returns a clean
 * Norwegian error and we surface it to the user. Add fallback here
 * ONLY if product explicitly asks for it.
 */

export const MODEL_CONFIG = {
  /**
   * Default model for text-only estimator turns. Fast + cheap, strong
   * enough to follow the structured prompt and produce a compact,
   * premium Norwegian reply.
   */
  default: 'openai/gpt-5.4-mini',

  /**
   * Premium multimodal model. Routed to automatically when the user
   * attaches one or more photos — Claude-Sonnet's vision reasoning
   * is the highest-quality option we've tested for renovation photos.
   */
  premiumVision: 'anthropic/claude-sonnet-4.6',

  /**
   * Fast, cheaper multimodal alternative. Not wired into the routing
   * helper by default, but kept here so ops can flip the default with
   * a single line change if latency or cost becomes an issue.
   */
  fastVision: 'google/gemini-3-flash-preview',
} as const

export type ModelKey = keyof typeof MODEL_CONFIG
export type ModelSlug = (typeof MODEL_CONFIG)[ModelKey]

/**
 * Chooses which model to use for a given request.
 *
 *   • Images attached → premium multimodal model
 *   • Text-only       → default cost-efficient model
 *
 * Keep this function pure — no env-var reads, no side effects. That
 * way it's trivially unit-testable and the API route can call it
 * without worrying about ordering with respect to request parsing.
 */
export function selectModel({ hasImages }: { hasImages: boolean }): ModelSlug {
  return hasImages ? MODEL_CONFIG.premiumVision : MODEL_CONFIG.default
}

/**
 * Small allowlist of models we know accept `image_url` content parts
 * on OpenRouter's chat-completions surface. Anything not on this list
 * is treated as text-only by the route handler, and image data URLs
 * are dropped from the outgoing payload (metadata is kept so the
 * human team can still review the uploads).
 *
 * All three configured models are multimodal. If you add a text-only
 * model to MODEL_CONFIG, do NOT add it here.
 */
export const VISION_CAPABLE_MODELS: readonly string[] = [
  MODEL_CONFIG.premiumVision,
  MODEL_CONFIG.fastVision,
  MODEL_CONFIG.default,
]

export function modelSupportsVision(model: string): boolean {
  return VISION_CAPABLE_MODELS.includes(model)
}
