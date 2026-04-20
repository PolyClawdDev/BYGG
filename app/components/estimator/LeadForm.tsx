'use client'

/**
 * LeadForm — the final "send it to Fint Hjem" capture.
 *
 * Fields are deliberately minimal (name + one reachable channel +
 * area + summary). Anything we already collected in the intake form
 * or chat gets pre-filled so the user never has to retype.
 */

import React, { useState } from 'react'
import type { ProjectIntake, UploadedImage, LeadSubmissionBody } from '@/types/estimate'

interface Props {
  intake: ProjectIntake
  defaultSummary: string
  images: UploadedImage[]
  onSubmitted: () => void
}

const field =
  'w-full bg-transparent border-b border-brown/25 focus:border-gray-900 outline-none ' +
  'font-playfair font-light text-brown text-[15px] pb-2 pt-1 transition-colors duration-300 ' +
  'placeholder:text-brown/40'

const label =
  'block font-montserrat font-bold text-[10px] tracking-[0.32em] text-brown/70 mb-2 uppercase'

export default function LeadForm({ intake, defaultSummary, images, onSubmitted }: Props) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState(intake.phone || '')
  const [email, setEmail] = useState(intake.email || '')
  const [location, setLocation] = useState(intake.location || '')
  const [summary, setSummary] = useState(defaultSummary)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    if (!name.trim()) {
      setError('Vennligst skriv inn navn.')
      return
    }
    if (!phone.trim() && !email.trim()) {
      setError('Vi trenger enten telefon eller e-post for å komme tilbake til deg.')
      return
    }

    setIsSubmitting(true)
    try {
      const payload: LeadSubmissionBody = {
        name,
        phone,
        email,
        location,
        summary,
        intake,
        imageNames: images.map((i) => i.name),
      }
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null
        throw new Error(data?.error || 'Kunne ikke sende forespørselen.')
      }
      setSubmitted(true)
      // Slight delay so the user sees the confirmation state before the
      // parent closes / transitions away.
      setTimeout(onSubmitted, 1800)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Noe gikk galt. Prøv igjen om litt.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-6">
        <div className="mx-auto w-12 h-12 rounded-full border border-brown/30 flex items-center justify-center mb-5">
          <svg className="w-6 h-6 text-brown" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <p className="font-playfair font-light text-gray-900 text-xl mb-2">
          Takk — vi tar kontakt snart.
        </p>
        <p className="font-playfair font-light text-brown/70 text-sm">
          En prosjektleder fra Fint Hjem vil ringe deg innen kort tid for å avtale befaring.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <p className="font-montserrat font-bold text-[11px] tracking-[0.42em] text-brown/70 uppercase mb-2">
          Be om befaring
        </p>
        <p className="font-playfair font-light text-brown/80 text-sm leading-relaxed">
          Vi kommer gjerne på gratis befaring og gir deg en eksakt pris. Legg igjen kontaktinformasjonen din, så ringer vi deg tilbake.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className={label} htmlFor="lead-name">Navn</label>
          <input id="lead-name" className={field} type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Fullt navn" />
        </div>
        <div>
          <label className={label} htmlFor="lead-location">Adresse / område</label>
          <input id="lead-location" className={field} type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="f.eks. Frogner, Oslo" />
        </div>
        <div>
          <label className={label} htmlFor="lead-phone">Telefon</label>
          <input id="lead-phone" className={field} type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+47…" />
        </div>
        <div>
          <label className={label} htmlFor="lead-email">E-post</label>
          <input id="lead-email" className={field} type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="navn@eksempel.no" />
        </div>
      </div>

      <div>
        <label className={label} htmlFor="lead-summary">Kort beskrivelse av prosjektet</label>
        <textarea
          id="lead-summary"
          className={[field, 'pt-2 resize-none'].join(' ')}
          rows={4}
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          placeholder="f.eks. Oppussing av bad, ca. 6 m², ønsker middels standard."
        />
      </div>

      {images.length > 0 && (
        <p className="font-playfair font-light italic text-brown/65 text-sm">
          {images.length} {images.length === 1 ? 'bilde' : 'bilder'} blir sendt med forespørselen.
        </p>
      )}

      {error && (
        <p className="font-playfair font-light text-[#a65d4d] text-sm" role="alert">{error}</p>
      )}

      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="group relative inline-flex items-center gap-5 pb-2 border-b border-brown/30 hover:border-gray-900 transition-colors duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="font-montserrat font-bold text-[11px] tracking-[0.35em] text-gray-900 uppercase">
            {isSubmitting ? 'Sender…' : 'Send forespørsel'}
          </span>
          <span className="relative flex items-center w-12 h-[1px] bg-brown/50 group-hover:bg-gray-900 group-hover:w-20 transition-all duration-500">
            <svg width="12" height="10" viewBox="0 0 12 10" className="absolute right-0 -translate-x-2 group-hover:translate-x-0 transition-transform duration-500 text-gray-900" aria-hidden>
              <path d="M1 5h10M7 1l4 4-4 4" stroke="currentColor" strokeWidth="1.25" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </button>
      </div>
    </form>
  )
}
