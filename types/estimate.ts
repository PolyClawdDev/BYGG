/**
 * Shared types for the Fint Hjem "be om befaring" flow.
 *
 * The service taxonomy below mirrors the hero navigation on the homepage
 * so the request form offers the same vocabulary the rest of the site
 * uses. `lib/pricing.ts` derives its dropdown lists from these unions.
 */

// ─── Service taxonomy ──────────────────────────────────────────────────────
export type ServiceCategory =
  | 'ditt-nye-hjem'
  | 'renovering-forandring'
  | 'byggservice'
  | 'interior-styling'

// Specific job types offered in the befaring request form. Any job added
// here MUST also have a matching entry in `lib/pricing.ts`, which is what
// builds the grouped dropdown.
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
// The structured slice of a request. Everything is optional — the only
// hard requirement on a lead is a name plus one way to reach the person.
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

// ─── API contract: POST /api/lead ──────────────────────────────────────────
export interface LeadSubmissionBody {
  name: string
  phone: string
  email: string
  location: string
  summary: string
  intake: ProjectIntake
}
