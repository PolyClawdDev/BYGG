'use client'

/**
 * BefaringForm — the "Be om befaring" request on /estimat.
 *
 * Replaces the old AI chat estimator. We deliberately show no price:
 * every real number depends on size, technical condition, access and
 * material level, so Fint Hjem quotes after the inspection instead of
 * letting a machine guess. The form's only job is to collect enough to
 * call the customer back and book a visit.
 *
 * Submits to POST /api/lead (same endpoint the old estimator used).
 */

import React, { useState } from 'react'
import { JOB_TYPES, SERVICE_CATEGORIES } from '@/lib/pricing'
import type { JobType, LeadSubmissionBody } from '@/types/estimate'

const field =
  'w-full bg-transparent border-b border-brown/25 focus:border-gray-900 outline-none ' +
  'font-playfair font-light text-brown text-[15px] md:text-base pb-2.5 pt-1 ' +
  'transition-colors duration-300 placeholder:text-brown/35'

const label =
  'block font-montserrat font-bold text-[10px] tracking-[0.32em] text-brown-ink mb-2 uppercase'

export default function BefaringForm() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [location, setLocation] = useState('')
  const [jobType, setJobType] = useState<JobType | ''>('')
  const [summary, setSummary] = useState('')

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    if (!name.trim()) {
      setError('Vennligst skriv inn navnet ditt.')
      return
    }
    if (!phone.trim() && !email.trim()) {
      setError('Vi trenger enten telefon eller e-post for å kunne kontakte deg.')
      return
    }

    setIsSubmitting(true)
    try {
      // Fold the selected project type into the free-text summary so the
      // lead is readable on its own, without the reader having to look up
      // a job-type id.
      const jobLabel = JOB_TYPES.find((j) => j.id === jobType)?.label
      const composedSummary = [jobLabel, summary.trim()].filter(Boolean).join(' — ')

      const payload: LeadSubmissionBody = {
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim(),
        location: location.trim(),
        summary: composedSummary,
        intake: jobType ? { jobType } : {},
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
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Noe gikk galt. Prøv igjen om litt.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-14 md:py-20 animate-fadeInUp" role="status" aria-live="polite">
        <div className="mx-auto w-14 h-14 rounded-full border border-brown/30 flex items-center justify-center mb-7">
          <svg className="w-7 h-7 text-brown" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M5 13l4 4L19 7"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h2 className="font-playfair font-light text-gray-900 text-2xl md:text-3xl mb-4">
          Takk — vi tar kontakt snart.
        </h2>
        <p className="font-playfair font-light text-brown/75 text-base md:text-lg leading-relaxed max-w-md mx-auto">
          En prosjektleder fra Fint Hjem ringer deg for å avtale et tidspunkt for gratis befaring.
        </p>
        <a
          href="tel:+4746583867"
          className="inline-block mt-8 font-montserrat font-bold text-[11px] tracking-[0.32em] uppercase text-brown border-b border-brown/30 hover:border-brown hover:text-gray-900 pb-1 transition-colors duration-500"
        >
          Eller ring oss nå · +47 465 83 867
        </a>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 md:space-y-9" noValidate>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-7 md:gap-8">
        <div>
          <label className={label} htmlFor="bef-name">
            Navn <span aria-hidden className="text-brown/40">*</span>
          </label>
          <input
            id="bef-name"
            className={field}
            type="text"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Fullt navn"
          />
        </div>

        <div>
          <label className={label} htmlFor="bef-phone">
            Telefon
          </label>
          <input
            id="bef-phone"
            className={field}
            type="tel"
            autoComplete="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+47 …"
          />
        </div>

        <div>
          <label className={label} htmlFor="bef-email">
            E-post
          </label>
          <input
            id="bef-email"
            className={field}
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="navn@eksempel.no"
          />
        </div>

        <div>
          <label className={label} htmlFor="bef-location">
            Adresse / område
          </label>
          <input
            id="bef-location"
            className={field}
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="f.eks. Frogner, Oslo"
          />
        </div>
      </div>

      <div>
        <label className={label} htmlFor="bef-job">
          Hva gjelder det?
        </label>
        <select
          id="bef-job"
          className={`${field} cursor-pointer`}
          value={jobType}
          onChange={(e) => setJobType(e.target.value as JobType | '')}
        >
          <option value="">Velg type prosjekt (valgfritt)</option>
          {SERVICE_CATEGORIES.map((cat) => {
            const jobs = JOB_TYPES.filter((j) => j.category === cat.id)
            if (jobs.length === 0) return null
            return (
              <optgroup key={cat.id} label={cat.label}>
                {jobs.map((job) => (
                  <option key={job.id} value={job.id}>
                    {job.label}
                  </option>
                ))}
              </optgroup>
            )
          })}
        </select>
      </div>

      <div>
        <label className={label} htmlFor="bef-summary">
          Kort om prosjektet
        </label>
        <textarea
          id="bef-summary"
          className={`${field} pt-2 resize-none`}
          rows={4}
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          placeholder="f.eks. Bad på ca. 6 m² som skal totalrenoveres. Ønsker å komme i gang til høsten."
        />
      </div>

      {error && (
        <p className="font-playfair font-light text-[#a65d4d] text-sm" role="alert">
          {error}
        </p>
      )}

      <div className="pt-1 flex flex-col sm:flex-row sm:items-center gap-6">
        <button
          type="submit"
          disabled={isSubmitting}
          className="group relative inline-flex items-center justify-center gap-3
                     px-9 py-3.5 rounded-full overflow-hidden text-[#f6f2ec]
                     transition-all duration-500 ease-out hover:-translate-y-0.5
                     shadow-[0_2px_4px_-2px_rgba(110,84,72,0.30)]
                     hover:shadow-[0_12px_28px_-10px_rgba(110,84,72,0.45)]
                     disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0"
          style={{ backgroundColor: '#6e5448' }}
        >
          <span className="font-montserrat font-bold text-[11px] md:text-[12px] tracking-[0.32em] uppercase">
            {isSubmitting ? 'Sender…' : 'Send forespørsel'}
          </span>
          <svg
            width="13"
            height="10"
            viewBox="0 0 13 10"
            className="text-[#f6f2ec]/80 group-hover:text-[#f6f2ec] group-hover:translate-x-1 transition-all duration-500"
            aria-hidden
          >
            <path
              d="M1 5h10.5M7.5 1l4 4-4 4"
              stroke="currentColor"
              strokeWidth="1.4"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <p className="font-playfair font-light text-brown/60 text-sm">
          Eller ring{' '}
          <a
            href="tel:+4746583867"
            className="text-brown border-b border-brown/30 hover:border-brown hover:text-gray-900 transition-colors duration-300"
          >
            +47 465 83 867
          </a>
        </p>
      </div>
    </form>
  )
}
