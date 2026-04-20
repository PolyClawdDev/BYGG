/**
 * POST /api/lead
 *
 * Receives the final "Be om befaring" submission from the estimator's
 * lead form. For now we just validate + log — Fint Hjem staff can wire
 * this up to SendGrid / Resend / HubSpot / a webhook by editing ONLY
 * this file, without touching the UI.
 *
 * Response shape stays stable: `{ ok: true }` on success, `{ error }`
 * on failure. The UI reads the HTTP status and doesn't care how the
 * lead was actually persisted.
 */

import { NextResponse } from 'next/server'
import type { LeadSubmissionBody } from '@/types/estimate'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

function isSubmission(v: unknown): v is LeadSubmissionBody {
  if (!v || typeof v !== 'object') return false
  const s = v as Partial<LeadSubmissionBody>
  return (
    typeof s.name === 'string' &&
    typeof s.phone === 'string' &&
    typeof s.email === 'string' &&
    typeof s.location === 'string' &&
    typeof s.summary === 'string'
  )
}

export async function POST(req: Request) {
  let body: LeadSubmissionBody
  try {
    const raw = await req.json()
    if (!isSubmission(raw)) {
      return NextResponse.json({ error: 'Ugyldig forespørsel.' }, { status: 400 })
    }
    body = raw
  } catch {
    return NextResponse.json({ error: 'Kunne ikke lese forespørselen.' }, { status: 400 })
  }

  const name = body.name.trim().slice(0, 120)
  const phone = body.phone.trim().slice(0, 40)
  const email = body.email.trim().slice(0, 120)
  const location = body.location.trim().slice(0, 200)
  const summary = body.summary.trim().slice(0, 2000)

  if (!name || (!phone && !email)) {
    return NextResponse.json(
      { error: 'Vi trenger navn og enten telefon eller e-post for å kontakte deg.' },
      { status: 400 }
    )
  }

  // ── Delivery hook ───────────────────────────────────────────────────
  //
  // Add your preferred lead sink here. Examples:
  //   • Send an email via Resend / SendGrid
  //   • Forward to a Slack / Teams webhook
  //   • Push to HubSpot / Pipedrive
  //   • Store in a Postgres / Supabase table
  //
  // For now we log to the server so Fint Hjem can read it from
  // Vercel / the host's logs until a proper CRM hook is wired up.
  console.info('[fint-hjem:lead]', {
    receivedAt: new Date().toISOString(),
    name,
    phone,
    email,
    location,
    summary,
    intake: body.intake,
    imageNames: Array.isArray(body.imageNames) ? body.imageNames.slice(0, 20) : [],
  })

  return NextResponse.json({ ok: true }, { status: 200 })
}
