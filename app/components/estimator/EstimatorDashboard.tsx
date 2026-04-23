'use client'

/**
 * EstimatorDashboard — the full "Prosjektplanner" page experience.
 *
 * Replaces the old popup modal. This is a dedicated /estimat route that
 * feels like a premium ChatGPT-style planner where the customer can
 * plan their whole project from A to Ø:
 *
 *   Desktop layout (≥ lg):
 *     ┌───────────────────────────────────────────────────────────────┐
 *     │  ← Tilbake    FINT HJEM · PROSJEKTPLANNER                     │
 *     ├─────────────┬──────────────────────────────┬──────────────────┤
 *     │             │                              │                  │
 *     │  PLANNER    │     AI-ASSISTENT CHAT        │   DITT ESTIMAT   │
 *     │  — intake   │     — welcome / quick picks  │   — live card    │
 *     │  — uploads  │     — bubbles + typing       │   — befaring CTA │
 *     │  — summary  │     — compose box            │                  │
 *     │             │                              │                  │
 *     └─────────────┴──────────────────────────────┴──────────────────┘
 *
 *   Mobile / tablet:
 *     Top tab switcher [Planner | Samtale | Estimat] → each panel
 *     becomes full-width. Keeps the chat composer reachable without
 *     scrolling past sidebar content.
 *
 * State is all local to this component — conversation transcript,
 * intake fields, uploaded images, lead-form visibility. The lead form
 * is revealed inline in the right column when the user clicks
 * "Be om befaring", so it doesn't break the single-page dashboard feel.
 */

import React, { useMemo, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import type { ChatMessage, ProjectIntake, UploadedImage, EstimateResult } from '@/types/estimate'
import EstimateChat from './EstimateChat'
import ProjectIntakeForm from './ProjectIntakeForm'
import UploadDropzone from './UploadDropzone'
import EstimateSummaryCard from './EstimateSummaryCard'
import LeadForm from './LeadForm'
import { JOB_TYPES } from '@/lib/pricing'

type MobileTab = 'planner' | 'chat' | 'estimate'

const ease = [0.16, 1, 0.3, 1] as const

export default function EstimatorDashboard() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [intake, setIntake] = useState<ProjectIntake>({})
  const [images, setImages] = useState<UploadedImage[]>([])
  const [mobileTab, setMobileTab] = useState<MobileTab>('chat')
  const [leadOpen, setLeadOpen] = useState(false)

  // Find the most recent assistant message that carried a structured
  // estimate — this is what drives the "DITT ESTIMAT" right rail.
  const latestEstimate: EstimateResult | null = useMemo(() => {
    for (let i = messages.length - 1; i >= 0; i--) {
      const m = messages[i]
      if (m.role === 'assistant' && m.estimate) return m.estimate
    }
    return null
  }, [messages])

  const defaultLeadSummary = useMemo(() => {
    const parts: string[] = []
    if (intake.jobType) {
      const j = JOB_TYPES.find((x) => x.id === intake.jobType)?.label
      if (j) parts.push(j)
    }
    if (intake.sizeSqm) parts.push(`${intake.sizeSqm} m²`)
    const firstUserMsg = messages.find((m) => m.role === 'user')?.content
    if (parts.length && firstUserMsg) return `${parts.join(', ')}. ${firstUserMsg}`
    if (parts.length) return parts.join(', ')
    return firstUserMsg || ''
  }, [intake, messages])

  const goBefaring = () => {
    setLeadOpen(true)
    setMobileTab('estimate') // On mobile: jump to the estimate pane so the form is visible.
  }

  // ─── Sidebar left ──────────────────────────────────────────────────
  // Everything fits without scrolling at 1024px+ viewport height. The
  // duplicate live snapshot was removed — the form IS the snapshot.
  // Phone/email moved to the LeadForm on the right rail. Upload zone
  // is a compact single-line treatment. Overflow is 'auto' only as a
  // safety net for very short laptop screens (< 720 px content height).
  const leftPanel = (
    <div className="h-full flex flex-col min-h-0">
      <div className="px-5 md:px-6 pt-5 pb-3 border-b border-brown/10 flex-shrink-0">
        <p className="font-montserrat font-bold text-[10px] tracking-[0.42em] text-brown/60 uppercase mb-1.5">
          Din planner
        </p>
        <p className="font-playfair font-light text-gray-900 text-base leading-snug">
          Detaljene dine gjør estimatet mer presist.
        </p>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto px-5 md:px-6 py-4">
        <p className="font-montserrat font-bold text-[10px] tracking-[0.3em] text-brown/70 uppercase mb-3">
          Prosjektdetaljer
        </p>
        <ProjectIntakeForm intake={intake} onChange={setIntake} />

        <div className="mt-5">
          <p className="font-montserrat font-bold text-[10px] tracking-[0.3em] text-brown/70 uppercase mb-2">
            Bilder
          </p>
          <UploadDropzone images={images} onChange={setImages} />
        </div>
      </div>
    </div>
  )

  // ─── Center chat panel ─────────────────────────────────────────────
  const centerPanel = (
    <div className="h-full flex flex-col px-5 md:px-8 pt-5 md:pt-7">
      <div className="flex-1 min-h-0">
        <EstimateChat
          messages={messages}
          setMessages={setMessages}
          intake={intake}
          images={images}
          onRequestBefaring={goBefaring}
        />
      </div>
    </div>
  )

  // ─── Sidebar right — live estimate + lead form ─────────────────────
  //
  // Designed to fit in one viewport without scrolling at typical laptop
  // heights (≥ 820 px). Compact header, tightened body padding, and the
  // EstimateSummaryCard's own "Bestill gratis befaring" button doubles
  // as the right-rail CTA — so the duplicate "Be om befaring" row below
  // is only rendered before an estimate exists (i.e. with the dashed
  // empty-state card), never alongside a real estimate.
  const rightPanel = (
    <div className="h-full flex flex-col">
      <div className="px-5 md:px-6 pt-5 pb-3 border-b border-brown/10 flex-shrink-0">
        <p className="font-montserrat font-bold text-[10px] tracking-[0.42em] text-brown/60 uppercase mb-1.5">
          Ditt estimat
        </p>
        <p className="font-playfair font-light text-gray-900 text-sm md:text-[15px] leading-snug">
          {latestEstimate
            ? 'Grovt estimat basert på det du har delt.'
            : 'Her dukker estimatet opp når vi har nok informasjon.'}
        </p>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto px-5 md:px-6 py-4">
        {latestEstimate ? (
          <EstimateSummaryCard estimate={latestEstimate} onBookBefaring={goBefaring} />
        ) : (
          <div className="rounded-2xl border border-dashed border-brown/20 p-5">
            <svg className="w-6 h-6 text-brown/40 mb-3" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M4 7h16M4 12h10M4 17h7"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
              />
            </svg>
            <p className="font-playfair font-light text-brown/70 text-sm leading-relaxed">
              Beskriv prosjektet i samtalen — fyll gjerne ut kategori, jobbtype og størrelse i
              planneren for raskere resultat.
            </p>
          </div>
        )}

        {/* Inline lead form, revealed when the user asks for befaring. */}
        <AnimatePresence initial={false}>
          {leadOpen && (
            <motion.div
              key="lead"
              initial={{ opacity: 0, height: 0, y: 8 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: 8 }}
              transition={{ duration: 0.45, ease }}
              className="overflow-hidden mt-5"
            >
              <div className="rounded-2xl border border-brown/20 p-5 bg-[#f8f6f2]">
                <LeadForm
                  intake={intake}
                  defaultSummary={defaultLeadSummary}
                  images={images}
                  onSubmitted={() => {
                    setLeadOpen(false)
                  }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Fallback befaring CTA — only shown when there's no estimate yet
            (the EstimateSummaryCard already carries its own CTA). */}
        {!leadOpen && !latestEstimate && (
          <div className="mt-6 pt-5 border-t border-brown/10">
            <button
              type="button"
              onClick={goBefaring}
              className="group relative inline-flex items-center gap-5 pb-2 border-b border-brown/30 hover:border-gray-900 transition-colors duration-500"
            >
              <span className="font-montserrat font-bold text-[11px] tracking-[0.35em] text-gray-900 uppercase">
                Be om befaring
              </span>
              <span className="relative flex items-center w-12 h-[1px] bg-brown/50 group-hover:bg-gray-900 group-hover:w-20 transition-all duration-500">
                <svg
                  width="12"
                  height="10"
                  viewBox="0 0 12 10"
                  className="absolute right-0 -translate-x-2 group-hover:translate-x-0 transition-transform duration-500 text-gray-900"
                  aria-hidden
                >
                  <path
                    d="M1 5h10M7 1l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.25"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  )

  return (
    <main className="h-[100svh] w-full flex flex-col bg-[#f8f6f2] text-gray-900">
      {/* ── Top bar — minimal, editorial ───────────────────────────── */}
      <header className="flex-shrink-0 flex items-center justify-between px-5 md:px-8 h-14 md:h-16 border-b border-brown/10 bg-[#f8f6f2]/95 backdrop-blur-sm">
        <Link
          href="/"
          className="group inline-flex items-center gap-3 font-montserrat font-bold text-[10px] tracking-[0.35em] text-brown/70 hover:text-gray-900 transition-colors duration-300 uppercase"
          aria-label="Tilbake til finthjem.no"
        >
          <svg width="14" height="10" viewBox="0 0 14 10" className="transition-transform duration-300 group-hover:-translate-x-1" aria-hidden>
            <path d="M13 5H1M5 1L1 5l4 4" stroke="currentColor" strokeWidth="1.3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="hidden sm:inline">Tilbake</span>
        </Link>

        <div className="flex items-center gap-3">
          <span className="hidden md:inline h-[1px] w-8 bg-brown/30" aria-hidden />
          <span className="font-montserrat font-black text-gray-900 text-sm md:text-base tracking-tight leading-none">
            FINT HJEM
          </span>
          <span className="font-montserrat font-bold text-[9px] md:text-[10px] tracking-[0.35em] text-brown/60 uppercase">
            · Prosjektplanner
          </span>
        </div>

        <Link
          href="/kontakt"
          className="hidden md:inline-flex items-center gap-3 font-montserrat font-bold text-[10px] tracking-[0.35em] text-brown/70 hover:text-gray-900 transition-colors duration-300 uppercase"
        >
          Kontakt
        </Link>
        <span className="md:hidden w-[14px]" aria-hidden />
      </header>

      {/* ── Mobile / tablet tab switcher ────────────────────────────── */}
      <nav className="flex-shrink-0 lg:hidden flex items-stretch border-b border-brown/10 bg-[#f8f6f2]">
        {([
          { id: 'planner',  label: 'Planner' },
          { id: 'chat',     label: 'Samtale' },
          { id: 'estimate', label: 'Estimat' },
        ] as const).map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setMobileTab(t.id)}
            className="flex-1 relative py-3 font-montserrat font-bold text-[10px] tracking-[0.35em] uppercase transition-colors duration-300"
            style={{ color: mobileTab === t.id ? '#111827' : '#9c7a6d99' }}
          >
            {t.label}
            <span
              className="absolute left-3 right-3 bottom-0 h-[1px] bg-gray-900 origin-center transition-transform duration-500"
              style={{ transform: mobileTab === t.id ? 'scaleX(1)' : 'scaleX(0)' }}
            />
          </button>
        ))}
      </nav>

      {/* ── Body: 3-col on lg+, single pane on sm/md via tabs ─────── */}
      <div className="flex-1 min-h-0 overflow-hidden">
        {/* Desktop: always all three visible. */}
        <div className="hidden lg:grid h-full grid-cols-[340px_1fr_360px]">
          <aside className="border-r border-brown/10 bg-[#f6f3ee] min-h-0">{leftPanel}</aside>
          <section className="min-h-0">{centerPanel}</section>
          <aside className="border-l border-brown/10 bg-[#f6f3ee] min-h-0">{rightPanel}</aside>
        </div>

        {/* Mobile / tablet: single pane controlled by tab state. */}
        <div className="lg:hidden h-full">
          {mobileTab === 'planner' && <div className="h-full bg-[#f6f3ee]">{leftPanel}</div>}
          {mobileTab === 'chat' && <div className="h-full">{centerPanel}</div>}
          {mobileTab === 'estimate' && <div className="h-full bg-[#f6f3ee]">{rightPanel}</div>}
        </div>
      </div>
    </main>
  )
}
