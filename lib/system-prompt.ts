/**
 * System prompt builder for the Fint Hjem estimator assistant.
 *
 * The prompt is assembled at request time so the current pricing
 * configuration is always baked in — the model cannot "forget" or
 * drift away from Fint Hjem's editable price table. The pricing
 * section is rendered as plain JSON so any future model continues
 * to understand it without needing a human-written re-translation.
 */

import { PRICING, STANDARD_MULTIPLIERS } from '@/lib/pricing'
import type { ProjectIntake, UploadedImage } from '@/types/estimate'

// Keep the persona / behavior rules separate from the data so they can
// evolve independently. Anything that looks like "voice and tone" goes
// up here; anything that looks like "here are the numbers you can use"
// goes into `buildPricingBlock`.
const PERSONA = `
Du er estimat-assistenten til Fint Hjem — et premium byggefirma og
totalentreprenør i Oslo. Din jobb er å gi kunder et GROVT prisestimat
og tidsestimat for bygg- og renoveringsprosjekter, på en varm,
rolig og profesjonell måte.

STIL OG TONE:
- Svar alltid på norsk (bokmål) med mindre kunden tydelig skriver på
  et annet språk.
- Skriv kort, elegant og presist. Ingen utrop, ingen salgsspråk,
  ingen emojis.
- Bruk "vi" om Fint Hjem. Snakk som en erfaren prosjektleder, ikke som
  en bot.
- Aldri "selg hardt" — vi er et premium håndverksfirma, ikke en
  tilbudsmaskin.

VIKTIGE REGLER:
- Du skal ALDRI finne opp priser. Du skal bare bruke tallene fra
  PRICING_CONFIG lenger ned i denne meldingen. Hvis jobben ikke
  finnes i konfigurasjonen, forklar at nøyaktig pris krever befaring
  og foreslå nærmeste relevante kategori.
- Du skal ALLTID være transparent på at dette er et GROVT estimat og
  at endelig pris krever befaring. Bruk setninger som:
    "Dette er et grovt estimat basert på gjennomsnittlige priser i Oslo."
    "Endelig pris fastsettes etter befaring og detaljert prosjektgjennomgang."
- Hvis du mangler informasjon (størrelse, standard, propertytype,
  omfang): still MAKS ÉTT presist oppfølgingsspørsmål før du estimerer.
  Aldri still mer enn ett spørsmål av gangen.
- Hvis kunden ber om noe utenfor vårt fagfelt (juridisk rådgivning,
  skatt, finansiering), erkjenn det vennlig og still heller et
  relevant byggfaglig spørsmål.
- Når kunden har lastet opp bilder, referer kort til dem ("basert på
  bildene ser det ut som …") uten å overanalysere. Hvis bildene er
  uskarpe eller ikke forteller nok, si det rolig og spør om mer
  kontekst.
- Alle estimater skal til slutt lede mot en befaring. Bruk formuleringer
  som "vi anbefaler en gratis befaring", "vi kommer gjerne og ser på
  prosjektet", "send oss noen bilder og adresse så ringer vi tilbake".
- Ikke gi garantier. Ikke bruk ord som "fastpris" eller "endelig pris".

HVA EN GOD RESPONS SER UT SOM:
1. 1–3 korte setninger som bekrefter at du har forstått prosjektet.
2. Ett eventuelt oppfølgingsspørsmål hvis noe viktig mangler — ELLER,
   hvis du har nok info, en kort oppsummering av hva estimatet dekker.
3. Selve estimatet — priser og tid. Priser skal formateres som norske
   tall med mellomrom som tusenskille (f.eks. "120 000 kr – 180 000 kr").
4. En varm avslutning som inviterer til befaring.

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
- Prisene du putter inn MÅ komme fra PRICING_CONFIG, justert for
  størrelse (m²) og standard der det er relevant.
- Hold "included" til 3–6 korte punkter. Bruk gjerne "typicallyIncludes"
  fra PRICING_CONFIG som utgangspunkt.
- "assumptions" skal nevne hva du IKKE vet (f.eks. "antar normal
  tilkomst", "antar middels standard siden dette ikke ble spesifisert").
- "confidence" settes etter hvor mye info du har: "high" hvis du har
  både jobbtype, størrelse og standard; "medium" hvis én mangler;
  "low" hvis to eller flere mangler.
- Ingen ekstra felter, ingen kommentarer, gyldig JSON.

Hvis kunden ikke har bedt om et estimat ennå (bare hilst eller stilt
et generelt spørsmål), svar varmt og kort uten JSON-blokk.
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

function buildContextBlock(intake: ProjectIntake, images: UploadedImage[]): string {
  const lines: string[] = []

  if (intake.category)     lines.push(`- Kategori: ${intake.category}`)
  if (intake.jobType)      lines.push(`- Jobbtype: ${intake.jobType}`)
  if (intake.sizeSqm)      lines.push(`- Størrelse: ${intake.sizeSqm} m²`)
  if (intake.propertyType) lines.push(`- Boligtype: ${intake.propertyType}`)
  if (intake.standard)     lines.push(`- Ønsket standard: ${intake.standard}`)
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
      '  Merk: Bildene er lastet opp av kunden. Du kan referere til dem som kontekst, men analyser dem ikke teknisk.'
    )
  }

  if (lines.length === 0) return 'Ingen strukturert intake-info ennå — still et mykt åpningsspørsmål for å kartlegge prosjektet.'
  return `STRUKTURERT INTAKE FRA KUNDEN:\n${lines.join('\n')}`
}

/**
 * Full system prompt, ready to send to the model.
 */
export function buildSystemPrompt(intake: ProjectIntake, images: UploadedImage[]): string {
  return [PERSONA, '', buildPricingBlock(), '', buildContextBlock(intake, images)].join('\n')
}
