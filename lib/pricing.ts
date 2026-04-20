/**
 * Fint Hjem — Pricing Configuration
 * ─────────────────────────────────
 *
 * This is the SINGLE SOURCE OF TRUTH for all rough renovation price
 * ranges shown by the estimator. The AI assistant is explicitly forbidden
 * (in its system prompt) from inventing numbers — it MUST only quote
 * values that come from this file.
 *
 * How to update prices (for Fint Hjem staff):
 *   1. Edit the relevant entry below (min, max — both in NOK).
 *   2. Optionally tweak the `notes` string to reflect what's included
 *      in the baseline. This copy is read by the AI and may surface
 *      in the user-facing estimate card under "Dette inkluderer typisk".
 *   3. Save and redeploy. No other code changes are required.
 *
 * Units:
 *   • `perSqm`    → price range PER square meter (NOK/m²)
 *   • `perProject`→ total project range regardless of size (NOK)
 *   • `perHour`   → hourly rate range for small jobs (NOK/h)
 *
 * All numbers are ROUGH Oslo-market ranges as of 2025. Final prices
 * always depend on inspection, scope, access, materials and technical
 * conditions. The user-facing UI and the AI both repeat this disclaimer.
 */

import type { JobType, ServiceCategory, StandardLevel } from '@/types/estimate'

// ─── Standard multipliers ─────────────────────────────────────────────────
//
// Applied on top of the base range for the chosen job. "enkel" = cheapest
// acceptable finish; "eksklusiv" = premium materials, custom details,
// architect-grade execution. Multipliers are conservative on purpose —
// we'd rather under-promise and over-deliver.
export const STANDARD_MULTIPLIERS: Record<StandardLevel, { min: number; max: number; label: string }> = {
  enkel:     { min: 0.85, max: 1.0,  label: 'Enkel standard' },
  middels:   { min: 1.0,  max: 1.25, label: 'Middels standard' },
  hoy:       { min: 1.25, max: 1.6,  label: 'Høy standard' },
  eksklusiv: { min: 1.6,  max: 2.2,  label: 'Eksklusiv / skreddersydd' },
}

// ─── Price range shape ────────────────────────────────────────────────────
export type PriceUnit = 'perSqm' | 'perProject' | 'perHour'

export interface PriceEntry {
  label: string // Norwegian, user-facing
  category: ServiceCategory
  unit: PriceUnit
  min: number // NOK
  max: number // NOK
  typicalDurationText: string // "1–2 uker", "3–5 dager"
  typicallyIncludes: string[] // Populates the "Dette inkluderer typisk" list
  notes?: string // AI-only context for assumptions
}

// ─── The pricing table ────────────────────────────────────────────────────
//
// Keyed by JobType → edit these numbers to retune estimates. Add new
// entries by extending the JobType union in `types/estimate.ts` first.
export const PRICING: Record<JobType, PriceEntry> = {
  // ── Renovering & Forandring ──────────────────────────────────────────
  'oppussing-leilighet': {
    label: 'Oppussing av leilighet',
    category: 'renovering-forandring',
    unit: 'perSqm',
    min: 6500,
    max: 14000,
    typicalDurationText: '4–10 uker',
    typicallyIncludes: [
      'Rivning og avfallshåndtering',
      'Gips, sparkling og maling av vegger og tak',
      'Gulvlegging (parkett eller tilsvarende)',
      'Nye lister og overflatearbeid',
      'Mindre elektriker- og rørleggerarbeid',
    ],
    notes: 'Gjelder delvis oppussing, ikke nødvendigvis våtrom eller kjøkken.',
  },
  'oppussing-hus': {
    label: 'Oppussing av hus',
    category: 'renovering-forandring',
    unit: 'perSqm',
    min: 7500,
    max: 18000,
    typicalDurationText: '8–16 uker',
    typicallyIncludes: [
      'Prosjektledelse og koordinering av fag',
      'Overflatearbeid innvendig',
      'Gulv, lister og dørarbeid',
      'Ventilasjon og mindre tekniske justeringer',
      'Rydding og sluttrengjøring',
    ],
    notes: 'Eksklusive større tilbygg, omfattende fasadearbeid eller full rehabilitering.',
  },
  'totalrenovering': {
    label: 'Totalrenovering',
    category: 'renovering-forandring',
    unit: 'perSqm',
    min: 14000,
    max: 28000,
    typicalDurationText: '12–24 uker',
    typicallyIncludes: [
      'Full rivning og gjenoppbygging innvendig',
      'Nytt bad og eventuelt nytt kjøkken',
      'Elektriker, rørlegger og ventilasjon',
      'Nye overflater på alle rom',
      'Søknad og tegninger ved behov',
    ],
    notes: 'Ekte totalrenovering fra råbygg. Gjelder i utgangspunktet leilighet/rekkehus.',
  },

  // ── Våtrom / kjøkken (faste totalpriser, ikke per m²) ────────────────
  'bad': {
    label: 'Baderomsrenovering',
    category: 'renovering-forandring',
    unit: 'perProject',
    min: 280000,
    max: 650000,
    typicalDurationText: '4–8 uker',
    typicallyIncludes: [
      'Rivning og avfall',
      'Membran og sluk etter våtromsnorm',
      'Flislegging av gulv og vegger',
      'Rørleggerarbeid og sanitær',
      'Elektriker, belysning og varmekabler',
    ],
    notes: 'Forutsetter et middels stort bad (4–7 m²). Større bad eller dobbeltbad gir høyere totalpris.',
  },
  'kjokken': {
    label: 'Kjøkkenrenovering',
    category: 'renovering-forandring',
    unit: 'perProject',
    min: 180000,
    max: 550000,
    typicalDurationText: '3–6 uker',
    typicallyIncludes: [
      'Demontering av eksisterende kjøkken',
      'Nye kjøkkeninnredninger (fra leverandør)',
      'Rørlegger for oppvask og kran',
      'Elektriker for plate, stekovn og ventilator',
      'Flis/benkeplate og avsluttende finish',
    ],
    notes: 'Bredt spenn — enkelt IKEA-oppsett i nedre sjikt, skreddersydd innredning i øvre sjikt.',
  },

  // ── Byggservice (overflate + håndverk per m² eller time) ─────────────
  'maling': {
    label: 'Maling innvendig',
    category: 'byggservice',
    unit: 'perSqm',
    min: 350,
    max: 750,
    typicalDurationText: '3–10 dager',
    typicallyIncludes: [
      'Lett forarbeid og sparkling',
      'To strøk maling på vegger',
      'Maling av tak ved behov',
      'Tildekking og rydding',
    ],
    notes: 'Per m² gulvflate for gjennomsnittlig rom. Høyde over 2,7 m eller vanskelig tilgjengelighet gir tillegg.',
  },
  'sparkling': {
    label: 'Sparkling',
    category: 'byggservice',
    unit: 'perSqm',
    min: 180,
    max: 420,
    typicalDurationText: '2–7 dager',
    typicallyIncludes: [
      'Grunnsparkling av vegger eller tak',
      'Sliping mellom strøk',
      'Finsparkling klar for maling',
    ],
  },
  'gulvlegging': {
    label: 'Gulvlegging / parkett',
    category: 'byggservice',
    unit: 'perSqm',
    min: 550,
    max: 1400,
    typicalDurationText: '2–6 dager',
    typicallyIncludes: [
      'Demontering av eksisterende gulv ved behov',
      'Underlagspapp/fuktsperre',
      'Legging av parkett eller laminat',
      'Avsluttende lister',
    ],
    notes: 'Materialer kommer i tillegg dersom kunden ikke leverer selv.',
  },
  'gips-vegg-tak': {
    label: 'Gips, vegg og tak',
    category: 'byggservice',
    unit: 'perSqm',
    min: 550,
    max: 1200,
    typicalDurationText: '3–10 dager',
    typicallyIncludes: [
      'Stendere og isolasjon ved nye vegger',
      'Gipsplater og festing',
      'Sparkling og sliping klar for maling',
    ],
  },
  'listing': {
    label: 'Listing',
    category: 'byggservice',
    unit: 'perSqm',
    min: 120,
    max: 260,
    typicalDurationText: '1–4 dager',
    typicallyIncludes: [
      'Gulvlister rundt hele rommet',
      'Taklister ved behov',
      'Fuging og maling av lister',
    ],
    notes: 'Prisen er per m² gulvflate — målt på omkrets.',
  },
  'innvendig-oppussing': {
    label: 'Innvendig oppussing',
    category: 'byggservice',
    unit: 'perSqm',
    min: 2500,
    max: 7500,
    typicalDurationText: '2–6 uker',
    typicallyIncludes: [
      'Overflatearbeid på utvalgte rom',
      'Gulv og lister',
      'Mindre snekkerarbeid',
      'Maling og finish',
    ],
  },

  // ── Utvendig arbeid ──────────────────────────────────────────────────
  'utvendig-arbeid': {
    label: 'Utvendig arbeid',
    category: 'byggservice',
    unit: 'perProject',
    min: 80000,
    max: 450000,
    typicalDurationText: '1–5 uker',
    typicallyIncludes: [
      'Terrasse, tak eller kledningsarbeid',
      'Utskifting av vinduer/dører etter behov',
      'Overflatebehandling utvendig',
    ],
    notes: 'Svært variabelt — avhenger sterkt av omfang og tilkomst.',
  },
  'fasade-maling': {
    label: 'Fasade / maling ute',
    category: 'byggservice',
    unit: 'perSqm',
    min: 450,
    max: 1100,
    typicalDurationText: '1–3 uker',
    typicallyIncludes: [
      'Vask og forarbeid av fasade',
      'Utbedring av mindre skader',
      'To strøk fasademaling',
      'Stillas eller lift inkludert',
    ],
    notes: 'Per m² fasadeareal (ikke grunnflate).',
  },

  // ── Montering / småarbeid (per time) ─────────────────────────────────
  'montering': {
    label: 'Montering',
    category: 'byggservice',
    unit: 'perHour',
    min: 750,
    max: 1250,
    typicalDurationText: 'Halv- eller heldags',
    typicallyIncludes: [
      'Oppheng og montering av inventar',
      'Mindre justering av hengsler / dører',
      'Hylle- og skapmontasje',
    ],
  },
  'mindre-rehabilitering': {
    label: 'Mindre rehabilitering',
    category: 'byggservice',
    unit: 'perProject',
    min: 35000,
    max: 180000,
    typicalDurationText: '1–3 uker',
    typicallyIncludes: [
      'Utbedring av skader eller slitasje',
      'Overflatebehandling og justering',
      'Mindre utskifting av fast inventar',
    ],
  },
  'tilpasninger-spesialarbeid': {
    label: 'Tilpasninger / spesialarbeid',
    category: 'byggservice',
    unit: 'perProject',
    min: 25000,
    max: 250000,
    typicalDurationText: 'Varierer',
    typicallyIncludes: [
      'Skreddersydde løsninger',
      'Spesialinnredning / garderobe',
      'Detaljarbeid etter tegning',
    ],
    notes: 'Svært prosjektavhengig — eksakt pris krever befaring.',
  },

  // ── Interiør & Styling ───────────────────────────────────────────────
  'styling-for-salg': {
    label: 'Styling før salg',
    category: 'interior-styling',
    unit: 'perProject',
    min: 18000,
    max: 60000,
    typicalDurationText: '1–2 uker',
    typicallyIncludes: [
      'Konsulentbefaring og styling-konsept',
      'Møbler, tekstiler og dekor på leie',
      'Profesjonell styling i boligen',
      'Henting etter salgsfotografering / visning',
    ],
    notes: 'Prisen skalerer med boligstørrelse og antall rom som skal styles.',
  },
}

// ─── Helper: compute a baseline range for the AI ──────────────────────────
//
// Given a job + size + standard, returns the exact NOK range the AI
// should quote. We expose this as a pure function so we can unit-test
// it later and so future upgrades (e.g. per-neighborhood multipliers)
// have one obvious place to live.
export function computeEstimateRange(
  jobType: JobType,
  opts: { sizeSqm?: number; standard?: StandardLevel } = {}
): { min: number; max: number; entry: PriceEntry } {
  const entry = PRICING[jobType]
  const stdMult = opts.standard ? STANDARD_MULTIPLIERS[opts.standard] : { min: 1, max: 1 }
  const size =
    entry.unit === 'perSqm' && opts.sizeSqm && opts.sizeSqm > 0 ? opts.sizeSqm :
    entry.unit === 'perHour' ? 8 : // default 1 workday
    1

  const rawMin = entry.min * size * stdMult.min
  const rawMax = entry.max * size * stdMult.max

  // Round to nearest 1 000 NOK for a clean editorial feel in the UI.
  const round = (n: number) => Math.round(n / 1000) * 1000

  return {
    min: round(rawMin),
    max: round(rawMax),
    entry,
  }
}

// ─── Human-readable service + job lists (used by dropdowns) ───────────────
export const SERVICE_CATEGORIES: Array<{ id: ServiceCategory; label: string }> = [
  { id: 'ditt-nye-hjem',          label: 'Ditt Nye Hjem' },
  { id: 'renovering-forandring',  label: 'Renovering & Forandring' },
  { id: 'byggservice',            label: 'Byggservice' },
  { id: 'interior-styling',       label: 'Interiør & Styling' },
]

// Ordered to match the categories above for the dropdown flow.
export const JOB_TYPES: Array<{ id: JobType; label: string; category: ServiceCategory }> = (
  Object.entries(PRICING) as Array<[JobType, PriceEntry]>
).map(([id, entry]) => ({ id, label: entry.label, category: entry.category }))

export const PROPERTY_TYPES: Array<{ id: 'leilighet' | 'hus' | 'naering'; label: string }> = [
  { id: 'leilighet', label: 'Leilighet' },
  { id: 'hus',       label: 'Hus / enebolig' },
  { id: 'naering',   label: 'Næringsbygg' },
]

export const STANDARD_LEVELS: Array<{ id: StandardLevel; label: string }> = (
  Object.entries(STANDARD_MULTIPLIERS) as Array<[StandardLevel, { label: string }]>
).map(([id, { label }]) => ({ id, label }))
