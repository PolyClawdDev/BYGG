/**
 * Shared types for the Fint Hjem estimator feature.
 *
 * Everything that crosses the client/server boundary (chat messages,
 * uploaded image metadata, structured AI estimate cards, lead submissions)
 * is declared once here so the UI, the `/api/estimate` route and future
 * lead-handling integrations all speak the same language.
 */

// ─── Service taxonomy ──────────────────────────────────────────────────────
//
// Top-level service categories shown on finthjem.no. These mirror the hero
// navigation (SECTIONS + Byggservice) so the estimator feels like a natural
// extension of the existing site, not a bolt-on widget.
export type ServiceCategory =
  | 'ditt-nye-hjem'
  | 'renovering-forandring'
  | 'byggservice'
  | 'interior-styling'

// Specific job types the pricing engine knows how to estimate. Any job
// added here MUST also have a matching entry in `lib/pricing.ts` — the
// AI is only allowed to quote numbers it finds in the pricing config.
export type JobType =
  | 'oppussing-leilighet'
  | 'oppussing-hus'
  | 'totalrenovering'
  | 'bad'
  | 'kjokken'
  | 'maling'
  | 'sparkling'
  | 'gulvlegging'
  | 'gips-vegg-tak'
  | 'listing'
  | 'innvendig-oppussing'
  | 'utvendig-arbeid'
  | 'fasade-maling'
  | 'montering'
  | 'styling-for-salg'
  | 'mindre-rehabilitering'
  | 'tilpasninger-spesialarbeid'

export type PropertyType = 'leilighet' | 'hus' | 'naering'
export type StandardLevel = 'enkel' | 'middels' | 'hoy' | 'eksklusiv'

// ─── Project intake ────────────────────────────────────────────────────────
//
// The structured slice of the conversation — values selected via form
// controls (dropdowns, size field, standard level). Everything here is
// optional so the user can describe the project freely without being
// locked into a form flow.
export interface ProjectIntake {
  category?: ServiceCategory
  jobType?: JobType
  sizeSqm?: number
  propertyType?: PropertyType
  standard?: StandardLevel
  location?: string
  phone?: string
  email?: string
}

// ─── Uploaded images ───────────────────────────────────────────────────────
//
// Images are serialized as base64 data URLs from the client. We keep the
// filename and mime type around so the AI can reference them ("bildet
// 'bad-1.jpg' viser …") and so future vision models can be plugged in
// without touching the UI. `dataUrl` may be stripped on the server side
// before logging / forwarding to keep payloads small.
export interface UploadedImage {
  id: string
  name: string
  mimeType: string
  sizeBytes: number
  dataUrl: string // data:image/jpeg;base64,... (client → server)
  note?: string
}

// ─── Chat messages ─────────────────────────────────────────────────────────
export type ChatRole = 'user' | 'assistant' | 'system'

export interface ChatMessage {
  id: string
  role: ChatRole
  content: string
  // Optional structured estimate payload attached to an assistant turn —
  // when present, the UI renders it as a premium estimate card instead of
  // (or in addition to) the raw `content` text.
  estimate?: EstimateResult | null
  // Images the user attached to this turn (thumbnails rendered in-chat).
  images?: UploadedImage[]
  createdAt: number
}

// ─── Estimate payload ──────────────────────────────────────────────────────
//
// The AI is prompted to return a JSON object in exactly this shape at the
// end of any turn where a rough estimate can be produced. The client
// parses it out of the model's message and renders a dedicated card.
// All monetary values are in NOK.
export interface EstimateResult {
  priceMin: number
  priceMax: number
  durationText: string // "1–2 uker", "3–5 dager" — AI picks natural phrasing
  included: string[] // 3–6 short bullet strings of typical included work
  assumptions: string[] // Transparency: what the AI assumed / doesn't know
  recommendedNextStep: string // One-line CTA copy (defaults to booking befaring)
  confidence: 'low' | 'medium' | 'high'
}

// ─── API contracts ─────────────────────────────────────────────────────────
//
// POST /api/estimate
export interface EstimateRequestBody {
  messages: Array<Pick<ChatMessage, 'role' | 'content'>>
  intake: ProjectIntake
  images: Array<Pick<UploadedImage, 'id' | 'name' | 'mimeType' | 'note' | 'dataUrl'>>
}

export interface EstimateResponseBody {
  reply: string // Free-text markdown-light assistant reply
  estimate: EstimateResult | null
  // Surfaced separately so the UI can show a friendly error card if the
  // model returned something unparseable — we never throw across the wire.
  warning?: string
}

// POST /api/lead
export interface LeadSubmissionBody {
  name: string
  phone: string
  email: string
  location: string
  summary: string
  intake: ProjectIntake
  imageNames: string[]
}
