'use client'

/**
 * ProjectIntakeForm — structured inputs for the planner sidebar.
 *
 * Packs the six most useful prompts (service, job, size, property
 * type, standard, location) into a single dense 1-column stack that
 * fits inside a 340 px sidebar without scrolling. Phone/email are
 * intentionally NOT here — they belong to the "Be om befaring" lead
 * form on the right rail so the customer only types them once, at
 * the point they're actually committing to be contacted.
 *
 * Every field is optional. The AI uses whatever's filled out to
 * tighten the estimate, and asks naturally for anything missing.
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

/* Dense input styles — thinner padding than the booking forms on
   /kontakt so six fields stack comfortably in 340 px without the
   sidebar turning into a scroll area. */
const field =
  'w-full bg-transparent border-b border-brown/25 focus:border-gray-900 outline-none ' +
  'font-playfair font-light text-brown text-[14px] pb-1.5 pt-0.5 transition-colors duration-300 ' +
  'placeholder:text-brown/40'

const label =
  'block font-montserrat font-bold text-[9.5px] tracking-[0.3em] text-brown/70 mb-1.5 uppercase'

export default function ProjectIntakeForm({ intake, onChange }: Props) {
  const jobOptions = intake.category
    ? JOB_TYPES.filter((j) => j.category === intake.category)
    : JOB_TYPES

  const set = <K extends keyof ProjectIntake>(key: K, value: ProjectIntake[K]) =>
    onChange({ ...intake, [key]: value })

  return (
    <div className="space-y-3.5">
      <div>
        <label className={label}>Tjeneste</label>
        <select
          className={field}
          value={intake.category || ''}
          onChange={(e) => {
            const val = (e.target.value || undefined) as ProjectIntake['category']
            // Reset job type when category changes so we don't leave an
            // incompatible selection hanging around.
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

      {/* Størrelse + boligtype share a row — both are short values so a
          two-column split keeps the sidebar dense without cramping. */}
      <div className="grid grid-cols-2 gap-4">
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
            <option value="">Velg…</option>
            {PROPERTY_TYPES.map((p) => (
              <option key={p.id} value={p.id}>
                {p.label}
              </option>
            ))}
          </select>
        </div>
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
  )
}
