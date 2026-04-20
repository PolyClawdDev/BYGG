'use client'

/**
 * ProjectIntakeForm — structured inputs that sit next to the chat.
 *
 * The chat by itself is flexible but slow; the intake form lets the
 * user tighten up the estimate in seconds by selecting service,
 * job type, size, property type and standard level. Every field is
 * optional — the AI will either use the value if present or ask
 * naturally for it in the next turn.
 */

import React from 'react'
import {
  JOB_TYPES,
  PROPERTY_TYPES,
  SERVICE_CATEGORIES,
  STANDARD_LEVELS,
} from '@/lib/pricing'
import type { ProjectIntake } from '@/types/estimate'

interface Props {
  intake: ProjectIntake
  onChange: (intake: ProjectIntake) => void
}

/* Shared styles — a thin, editorial input/select that matches the hero
   CTA language (brown borders, playfair text, no rounded-pill UI). */
const field =
  'w-full bg-transparent border-b border-brown/25 focus:border-gray-900 outline-none ' +
  'font-playfair font-light text-brown text-[15px] pb-2 pt-1 transition-colors duration-300 ' +
  'placeholder:text-brown/40'

const label =
  'block font-montserrat font-bold text-[10px] tracking-[0.32em] text-brown/70 mb-2 uppercase'

export default function ProjectIntakeForm({ intake, onChange }: Props) {
  // Filter job types by category so the second dropdown only shows
  // relevant options — keeps the UI minimal.
  const jobOptions = intake.category
    ? JOB_TYPES.filter((j) => j.category === intake.category)
    : JOB_TYPES

  const set = <K extends keyof ProjectIntake>(key: K, value: ProjectIntake[K]) =>
    onChange({ ...intake, [key]: value })

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
        <div>
          <label className={label}>Tjeneste</label>
          <select
            className={field}
            value={intake.category || ''}
            onChange={(e) => {
              const val = (e.target.value || undefined) as ProjectIntake['category']
              // Reset job type when category changes so we don't leave
              // an incompatible selection hanging around.
              onChange({ ...intake, category: val, jobType: undefined })
            }}
          >
            <option value="">Velg kategori…</option>
            {SERVICE_CATEGORIES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={label}>Type jobb</label>
          <select
            className={field}
            value={intake.jobType || ''}
            onChange={(e) => set('jobType', (e.target.value || undefined) as ProjectIntake['jobType'])}
          >
            <option value="">Velg jobbtype…</option>
            {jobOptions.map((j) => (
              <option key={j.id} value={j.id}>
                {j.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={label}>Størrelse (m²)</label>
          <input
            className={field}
            type="number"
            min={1}
            max={2000}
            inputMode="numeric"
            placeholder="f.eks. 65"
            value={intake.sizeSqm ?? ''}
            onChange={(e) => {
              const v = e.target.value
              set('sizeSqm', v === '' ? undefined : Math.max(1, Number(v)))
            }}
          />
        </div>

        <div>
          <label className={label}>Boligtype</label>
          <select
            className={field}
            value={intake.propertyType || ''}
            onChange={(e) =>
              set('propertyType', (e.target.value || undefined) as ProjectIntake['propertyType'])
            }
          >
            <option value="">Velg boligtype…</option>
            {PROPERTY_TYPES.map((p) => (
              <option key={p.id} value={p.id}>
                {p.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={label}>Ønsket standard</label>
          <select
            className={field}
            value={intake.standard || ''}
            onChange={(e) => set('standard', (e.target.value || undefined) as ProjectIntake['standard'])}
          >
            <option value="">Velg standard…</option>
            {STANDARD_LEVELS.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={label}>Sted / område</label>
          <input
            className={field}
            type="text"
            placeholder="f.eks. Frogner, Oslo"
            value={intake.location || ''}
            onChange={(e) => set('location', e.target.value || undefined)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
        <div>
          <label className={label}>Telefon (valgfritt)</label>
          <input
            className={field}
            type="tel"
            placeholder="+47…"
            value={intake.phone || ''}
            onChange={(e) => set('phone', e.target.value || undefined)}
          />
        </div>
        <div>
          <label className={label}>E-post (valgfritt)</label>
          <input
            className={field}
            type="email"
            placeholder="navn@eksempel.no"
            value={intake.email || ''}
            onChange={(e) => set('email', e.target.value || undefined)}
          />
        </div>
      </div>
    </div>
  )
}
