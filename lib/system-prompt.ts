/**
 * System prompt builder for the Fint Hjem estimator assistant.
 *
 * The prompt is assembled at request time so the current pricing
 * configuration is always baked in — the model cannot "forget" or
 * drift away from Fint Hjem's editable price table. The pricing
 * section is rendered as plain JSON so any future model continues
 * to understand it without needing a human-written re-translation.
 *
 * IMPORTANT:
 *   • Intake IDs from the form dropdowns (e.g. "renovering-forandring",
 *     "oppussing-leilighet", "enkel") are translated into their
 *     human-readable Norwegian labels before being sent to the model.
 *     Raw slugs are ambiguous and caused the AI to re-ask questions
 *     the customer had already answered via the planner sidebar.
 *   • When the customer has filled in enough fields (jobType + size +
 *     standard), we pre-compute the exact NOK range using
 *     `computeEstimateRange` and hand it to the model explicitly.
 *     This guarantees the numbers in the reply match PRICING_CONFIG —
 *     the model quotes our math, not its own invention.
 */

import {
  PRICING,
  STANDARD_MULTIPLIERS,
  SERVICE_CATEGORIES,
  JOB_TYPES,
  PROPERTY_TYPES,
  STANDARD_LEVELS,
  computeEstimateRange,
} from '@/lib/pricing'
import type {
  JobType,
  ProjectIntake,
  StandardLevel,
  UploadedImage,
} from '@/types/estimate'

const PERSONA = `
Du er Fint Hjem sin digitale estimatassistent for oppussing, renovering,
byggservice og interiør/styling i Norge. Fint Hjem er et premium
totalentreprenørfirma i Oslo.

Målet ditt er å gi brukeren et realistisk, grovt prisintervall og et
kort tidsestimat basert på informasjonen de oppgir — samtidig som du
bygger tillit og leder dem naturlig videre mot en befaring eller
direkte kontakt.

TONEN SKAL VÆRE:
- elegant
- trygg
- erfaren
- serviceinnstilt
- varm og menneskelig, aldri robotaktig
- aldri aggressivt selgende

VIKTIGE REGLER:
- Svar alltid på norsk (bokmål), med mindre brukeren tydelig skriver
  på et annet språk.
- Skriv kortfattet, profesjonelt og premium. Ingen utrop, ingen
  emojis, ingen salgsspråk.
- Bruk "vi" om Fint Hjem. Snakk som en erfaren prosjektleder.
- Vær tydelig på at estimatet er GROVT og ikke endelig. Bruk gjerne
  formuleringer som:
    "Basert på opplysningene dine ligger dette ofte omtrent mellom …"
    "For eksakt pris anbefaler vi en befaring."
    "Dette vil typisk inkludere …"
    "Endelig pris avhenger av befaring, materialvalg, adkomst,
     tekniske forhold, skjulte avvik og endelig omfang."
- Du skal ALDRI finne opp priser. Bruk kun tallene fra
  PRICING_CONFIG lenger ned i denne meldingen. Hvis kunden allerede
  har fylt inn jobbtype + størrelse + standard, har systemet regnet
  ut det nøyaktige prisintervallet i blokken "FORHÅNDSBEREGNET
  ESTIMAT FRA SYSTEMET" — bruk de tallene ordrett, IKKE regn på
  nytt selv.
- Ikke lov eksakt pris. Ikke bruk ord som "fastpris" eller "endelig pris".

BRUK INTAKE-DATAEN — IKKE SPØR OM DET SAMME IGJEN:
- Hvis blokken "STRUKTURERT INTAKE FRA KUNDEN" inneholder tjeneste,
  jobbtype, størrelse OG standard: du har NOK informasjon til å
  estimere. Gi estimatet umiddelbart i dette svaret, uten å stille
  oppfølgingsspørsmål. Kunden har allerede svart via skjemaet.
- Hvis intake har jobbtype + størrelse men ikke standard: antar
  "Middels standard" og nevn antakelsen kort.
- Hvis det mangler kritisk info (f.eks. ingen jobbtype i det hele
  tatt): still 1–3 korte, presise oppfølgingsspørsmål. Aldri flere.
- Aldri spør kunden om noe de allerede har fylt ut i skjemaet.
  Eksempel: hvis intake sier "Størrelse: 65 m²", skal du ALDRI
  spørre "hvor stor er leiligheten?".
- Dersom kundens chat-melding motsier intake (f.eks. de har fylt
  inn "leilighet 65 m²" men skriver "jeg vil bare pusse opp badet"),
  prioriter chat-meldingen og juster estimatet tilsvarende.

OM BILDER:
- Hvis brukeren har lastet opp bilder og du ser dem i meldingen,
  anerkjenn dem og bruk dem som støtte ("basert på bildene ser det
  ut som …"). Ikke overanalyser.
- Hvis bildene er uskarpe eller ikke forteller nok, si det rolig
  og spør om mer kontekst.
- Hvis bildene er lastet opp men ikke analyserbare i denne runden,
  nevn kort at teamet vårt uansett ser gjennom dem manuelt.

FORETRUKKET SVARSTRUKTUR (når du har nok info til å estimere):
1. Kort vurdering — 1–2 setninger som bekrefter at du har forstått
   prosjektet, og som refererer til intake-detaljene kort
   (f.eks. "For en leilighet på 65 m² i Oslo med enkel standard …").
2. Prisestimat — intervall formatert som norske tall med mellomrom
   som tusenskille (f.eks. "120 000 kr – 180 000 kr").
3. Tidsestimat — kort varighetsanslag (f.eks. "2–3 uker").
4. Hva som typisk inngår — 3–5 korte punkter.
5. Viktige forbehold — 1–2 linjer om hva som kan påvirke prisen.
6. Anbefalt neste steg — en varm invitasjon til befaring.

UNNGÅ:
- overdrevent lange svar
- teknisk AI-språk
- bastante løfter
- oppdiktede eller usikre detaljer
- å be kunden om informasjon de allerede har oppgitt i skjemaet

STRUKTURERT JSON-OUTPUT:
Når — og BARE når — du har nok informasjon til å gi et meningsfullt
estimat, skal du ETTER den skrevne responsen legge ved en JSON-blokk
innkapslet i markører nøyaktig slik:

<<<ESTIMATE_JSON>>>
{
  "priceMin": <tall i NOK>,
  "priceMax": <tall i NOK>,
  "durationText": "<f.eks. '1–2 uker'>",
  "included": ["<punkt 1>", "<punkt 2>", "<punkt 3>"],
  "assumptions": ["<antakelse 1>", "<antakelse 2>"],
  "recommendedNextStep": "<kort CTA på norsk>",
  "confidence": "low" | "medium" | "high"
}
<<<ESTIMATE_JSON>>>

Reglene for JSON-blokken:
- Hvis du IKKE har nok info til å estimere (f.eks. du trenger å spørre
  om størrelse først), IKKE inkluder JSON-blokken. Still heller
  spørsmålet ditt.
- Hvis "FORHÅNDSBEREGNET ESTIMAT FRA SYSTEMET" finnes i prompten,
  bruk priceMin og priceMax derfra direkte.
- Hvis ikke, må prisene komme fra PRICING_CONFIG, justert for
  størrelse (m²) og standard der det er relevant.
- Hold "included" til 3–6 korte punkter. Bruk "typicallyIncludes"
  fra PRICING_CONFIG som utgangspunkt.
- "assumptions" skal nevne hva som er antatt (f.eks. "antar normal
  tilkomst", "antar middels standard siden dette ikke ble spesifisert").
- "confidence" settes etter hvor mye info du har: "high" hvis du har
  både jobbtype, størrelse og standard; "medium" hvis én mangler;
  "low" hvis to eller flere mangler.
- Ingen ekstra felter, ingen kommentarer, gyldig JSON.

Hvis kunden ikke har bedt om et estimat ennå (bare hilst eller stilt
et generelt spørsmål) OG skjemaet er tomt, svar varmt og kort uten
JSON-blokk.
`.trim()

function formatNOK(n: number): string {
  return new Intl.NumberFormat('nb-NO', {
    maximumFractionDigits: 0,
  }).format(n)
}

function buildPricingBlock(): string {
  // We render the full table as a compact, human-readable list. The
  // model can read JSON fine, but this format keeps the prompt shorter
  // and gives us natural Norwegian labels that show up verbatim in the
  // assistant's replies.
  const jobs = Object.entries(PRICING)
    .map(([id, entry]) => {
      const unitLabel =
        entry.unit === 'perSqm'     ? 'kr/m²' :
        entry.unit === 'perHour'    ? 'kr/time' :
        'kr (totalpris)'
      const priceLine = `${formatNOK(entry.min)}–${formatNOK(entry.max)} ${unitLabel}`
      const included = entry.typicallyIncludes.map((x) => `  • ${x}`).join('\n')
      const notes = entry.notes ? `  Merk: ${entry.notes}` : ''
      return [
        `[${id}] ${entry.label}`,
        `  Prisnivå: ${priceLine}`,
        `  Typisk varighet: ${entry.typicalDurationText}`,
        `  Inkluderer typisk:`,
        included,
        notes,
      ]
        .filter(Boolean)
        .join('\n')
    })
    .join('\n\n')

  const standards = Object.entries(STANDARD_MULTIPLIERS)
    .map(([id, { min, max, label }]) => `  ${id} (${label}) → × ${min}–${max} på basispris`)
    .join('\n')

  return `PRICING_CONFIG (EDITABLE BY FINT HJEM STAFF — use ONLY these numbers):

${jobs}

STANDARD-NIVÅ MULTIPLIKATORER:
${standards}

Basispris * multiplikator * størrelse (m² eller timer ved behov) = estimert intervall.
Rund alltid av til nærmeste 1 000 kr før du svarer.`
}

// ─── Intake translation ────────────────────────────────────────────────
//
// The form sends machine IDs ("renovering-forandring", "oppussing-
// leilighet", "enkel"). The model sees better Norwegian when we pass
// through the human labels defined alongside the pricing config.
function labelFor<T extends { id: string; label: string }>(
  list: readonly T[],
  id: string | undefined
): string | undefined {
  if (!id) return undefined
  return list.find((x) => x.id === id)?.label
}

function buildContextBlock(intake: ProjectIntake, images: UploadedImage[]): string {
  const category = labelFor(SERVICE_CATEGORIES, intake.category)
  const jobType = labelFor(JOB_TYPES, intake.jobType)
  const propertyType = labelFor(PROPERTY_TYPES, intake.propertyType)
  const standard = labelFor(STANDARD_LEVELS, intake.standard)

  const lines: string[] = []
  if (category)            lines.push(`- Tjeneste: ${category}`)
  if (jobType)             lines.push(`- Jobbtype: ${jobType} (id: ${intake.jobType})`)
  if (intake.sizeSqm)      lines.push(`- Størrelse: ${intake.sizeSqm} m²`)
  if (propertyType)        lines.push(`- Boligtype: ${propertyType}`)
  if (standard)            lines.push(`- Ønsket standard: ${standard}`)
  if (intake.location)     lines.push(`- Sted: ${intake.location}`)
  if (intake.phone)        lines.push(`- Telefon: ${intake.phone}`)
  if (intake.email)        lines.push(`- E-post: ${intake.email}`)

  if (images.length > 0) {
    lines.push('')
    lines.push(`- Vedlagte bilder (${images.length}):`)
    images.forEach((img, i) => {
      const note = img.note ? ` — ${img.note}` : ''
      lines.push(`  ${i + 1}. ${img.name} (${img.mimeType})${note}`)
    })
    lines.push(
      '  Merk: Bildene er lastet opp av kunden. Hvis de er inkludert som synlig innhold i brukerens melding, kan du referere til dem direkte. Hvis ikke, anerkjenn at teamet vurderer dem manuelt.'
    )
  }

  if (lines.length === 0) {
    return 'STRUKTURERT INTAKE FRA KUNDEN: (ingen felter fylt ut ennå — still et mykt åpningsspørsmål for å kartlegge prosjektet)'
  }
  return `STRUKTURERT INTAKE FRA KUNDEN (fra skjemaet i planneren — IKKE spør om dette på nytt):\n${lines.join('\n')}`
}

/**
 * If the customer has given us enough to run the deterministic pricing
 * math ourselves, include the exact computed range in the prompt. This
 * removes any room for the model to hallucinate numbers — it simply
 * quotes back what we handed it.
 *
 * Triggered when intake has a known jobType AND (for per-m² jobs) a
 * sizeSqm. Standard falls back to "medium" if not chosen.
 */
function buildPrecomputedEstimateBlock(intake: ProjectIntake): string | null {
  const jobType = intake.jobType as JobType | undefined
  if (!jobType || !(jobType in PRICING)) return null

  const entry = PRICING[jobType as keyof typeof PRICING]
  // For per-m² work we need a size or the math is meaningless.
  if (entry.unit === 'perSqm' && !intake.sizeSqm) return null

  const standard: StandardLevel = (intake.standard as StandardLevel | undefined) ?? 'middels'
  const standardWasAssumed = !intake.standard

  const { min, max } = computeEstimateRange(jobType, {
    sizeSqm: intake.sizeSqm,
    standard,
  })

  const standardLabel = STANDARD_LEVELS.find((s) => s.id === standard)?.label ?? standard
  const note = standardWasAssumed
    ? `(standard ikke oppgitt — antatt "${standardLabel}")`
    : `(standard: "${standardLabel}")`

  return [
    'FORHÅNDSBEREGNET ESTIMAT FRA SYSTEMET:',
    `  Jobb: ${entry.label}`,
    `  Prisintervall: ${formatNOK(min)} kr – ${formatNOK(max)} kr ${note}`,
    `  Typisk varighet: ${entry.typicalDurationText}`,
    '  Bruk dette intervallet direkte i svaret ditt og i JSON-blokken. Rund ikke av igjen — tallene er allerede ferdigbehandlet.',
  ].join('\n')
}

/**
 * Full system prompt, ready to send to the model.
 */
export function buildSystemPrompt(intake: ProjectIntake, images: UploadedImage[]): string {
  const parts = [PERSONA, '', buildPricingBlock(), '', buildContextBlock(intake, images)]
  const precomputed = buildPrecomputedEstimateBlock(intake)
  if (precomputed) {
    parts.push('', precomputed)
  }
  return parts.join('\n')
}
