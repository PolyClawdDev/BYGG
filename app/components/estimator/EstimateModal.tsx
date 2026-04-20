'use client'

/**
 * EstimateModal — the premium container that wraps the whole estimator
 * experience.
 *
 * Behavior:
 *   • Desktop (≥ md): centered modal ~1040 px wide, backdrop blur,
 *     rounded-2xl panel, no drop shadow (matches the site's flat
 *     editorial feel).
 *   • Mobile (< md): full-screen sheet sliding up from the bottom,
 *     rounded top edges — feels native on iPhone.
 *
 * Navigation:
 *   • Two tabs at the top: "Prosjekt" (chat + intake + uploads) and
 *     "Be om befaring" (lead capture). We surface the lead form as a
 *     deliberate step, not something hidden at the bottom of the chat.
 *   • ESC closes on desktop. Body scroll is locked while open.
 *
 * State management:
 *   • Conversation state, intake state and uploaded images all live here
 *     so they persist as the user toggles between tabs. Closing and
 *     reopening the modal preserves everything — the user never has to
 *     retype.
 */

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { ChatMessage, ProjectIntake, UploadedImage } from '@/types/estimate'
import EstimateChat from './EstimateChat'
import ProjectIntakeForm from './ProjectIntakeForm'
import UploadDropzone from './UploadDropzone'
import LeadForm from './LeadForm'
import { JOB_TYPES, PROPERTY_TYPES, STANDARD_LEVELS } from '@/lib/pricing'

type Tab = 'project' | 'lead'

interface Props {
  open: boolean
  onClose: () => void
}

const ease = [0.16, 1, 0.3, 1] as const

export default function EstimateModal({ open, onClose }: Props) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [intake, setIntake] = useState<ProjectIntake>({})
  const [images, setImages] = useState<UploadedImage[]>([])
  const [tab, setTab] = useState<Tab>('project')
  // A compact toggle on mobile for the intake panel (saves vertical
  // real-estate so the chat remains primary). Auto-expanded on desktop.
  const [intakeExpanded, setIntakeExpanded] = useState(false)

  const panelRef = useRef<HTMLDivElement | null>(null)

  // ── ESC to close + body scroll lock while open ───────────────────────
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [open, onClose])

  const goToLead = useCallback(() => {
    setTab('lead')
    // Scroll the modal to the top when switching to the lead form so the
    // confirmation copy is immediately visible.
    panelRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  // Pre-fill the lead form's "summary" field from the conversation so
  // the user rarely has to type anything.
  const defaultSummary = useMemo(() => {
    const parts: string[] = []
    if (intake.jobType) {
      const job = JOB_TYPES.find((j) => j.id === intake.jobType)?.label
      if (job) parts.push(job)
    }
    if (intake.sizeSqm) parts.push(`${intake.sizeSqm} m²`)
    if (intake.propertyType) {
      const pt = PROPERTY_TYPES.find((p) => p.id === intake.propertyType)?.label
      if (pt) parts.push(pt.toLowerCase())
    }
    if (intake.standard) {
      const st = STANDARD_LEVELS.find((s) => s.id === intake.standard)?.label
      if (st) parts.push(st.toLowerCase())
    }
    const firstUserMsg = messages.find((m) => m.role === 'user')?.content
    if (parts.length > 0 && firstUserMsg) return `${parts.join(', ')}. ${firstUserMsg}`
    if (parts.length > 0) return parts.join(', ')
    return firstUserMsg || ''
  }, [intake, messages])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="estimate-modal"
          className="fixed inset-0 z-[100] flex items-stretch md:items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-[#1a1714]/45 backdrop-blur-md"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease }}
            aria-hidden
          />

          {/* Panel */}
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="estimator-title"
            className={[
              'relative z-10 flex flex-col w-full md:w-[min(1040px,92vw)]',
              'h-[100svh] md:h-auto md:max-h-[88vh]',
              'bg-[#f8f6f2] md:rounded-2xl rounded-t-2xl md:rounded-t-2xl',
              'border-0 md:border md:border-brown/15 overflow-hidden',
            ].join(' ')}
            initial={{ y: '6%', opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: '4%', opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.5, ease }}
          >
            {/* ── Header ─────────────────────────────────────────── */}
            <div className="flex items-center justify-between px-5 md:px-8 pt-5 md:pt-7 pb-4 border-b border-brown/10">
              <div>
                <p className="font-montserrat font-bold text-[10px] tracking-[0.42em] text-brown/60 uppercase">
                  Fint Hjem — Estimat
                </p>
                <h2 id="estimator-title" className="font-playfair font-light text-gray-900 text-xl md:text-2xl tracking-tight mt-1">
                  Få et grovt estimat på prosjektet ditt
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Lukk"
                className="flex-shrink-0 w-10 h-10 rounded-full border border-brown/20 hover:border-gray-900 flex items-center justify-center transition-colors duration-300"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" className="text-gray-900" aria-hidden>
                  <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* ── Tabs ───────────────────────────────────────────── */}
            <div className="flex gap-8 px-5 md:px-8 border-b border-brown/10">
              {[
                { id: 'project' as const, label: 'Prosjekt' },
                { id: 'lead' as const,    label: 'Be om befaring' },
              ].map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTab(t.id)}
                  className="relative py-3.5 font-montserrat font-bold text-[10px] tracking-[0.35em] uppercase transition-colors duration-300"
                  style={{ color: tab === t.id ? '#111827' : '#9c7a6d99' }}
                >
                  {t.label}
                  <span
                    className="absolute left-0 right-0 bottom-0 h-[1px] bg-gray-900 origin-left transition-transform duration-500"
                    style={{ transform: tab === t.id ? 'scaleX(1)' : 'scaleX(0)' }}
                  />
                </button>
              ))}
            </div>

            {/* ── Body ────────────────────────────────────────────
                Two-column on desktop: chat on the left, intake + upload
                on the right. Single column + collapsible intake on mobile. */}
            <div className="flex-1 min-h-0 overflow-hidden">
              {tab === 'project' ? (
                <div className="h-full grid grid-cols-1 md:grid-cols-[1.25fr_1fr]">
                  {/* Chat column */}
                  <div className="h-full min-h-0 flex flex-col px-5 md:px-8 pt-4 md:pt-6 border-r-0 md:border-r md:border-brown/10">
                    <EstimateChat
                      messages={messages}
                      setMessages={setMessages}
                      intake={intake}
                      images={images}
                      onRequestBefaring={goToLead}
                    />
                  </div>

                  {/* Intake + upload column (scrollable) */}
                  <div className="h-full min-h-0 overflow-y-auto px-5 md:px-8 py-5 md:py-7 border-t md:border-t-0 border-brown/10 bg-[#f6f3ee]">
                    {/* Mobile collapse header */}
                    <button
                      type="button"
                      onClick={() => setIntakeExpanded((v) => !v)}
                      className="md:hidden flex items-center justify-between w-full mb-4"
                      aria-expanded={intakeExpanded}
                    >
                      <span className="font-montserrat font-bold text-[10px] tracking-[0.35em] text-brown/70 uppercase">
                        Prosjektdetaljer
                      </span>
                      <svg width="12" height="8" viewBox="0 0 12 8" className={`text-brown transition-transform duration-300 ${intakeExpanded ? 'rotate-180' : ''}`} aria-hidden>
                        <path d="M1 1l5 5 5-5" stroke="currentColor" strokeWidth="1.3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>

                    <div className={`${intakeExpanded ? 'block' : 'hidden'} md:block`}>
                      <p className="hidden md:block font-montserrat font-bold text-[10px] tracking-[0.35em] text-brown/70 uppercase mb-5">
                        Prosjektdetaljer
                      </p>

                      <ProjectIntakeForm intake={intake} onChange={setIntake} />

                      <div className="mt-8">
                        <p className="font-montserrat font-bold text-[10px] tracking-[0.35em] text-brown/70 uppercase mb-3">
                          Bilder av prosjektet
                        </p>
                        <UploadDropzone images={images} onChange={setImages} />
                      </div>

                      <p className="font-playfair font-light italic text-brown/60 text-[13px] mt-6 leading-relaxed">
                        Merk: Dette er et grovt estimat basert på gjennomsnittlige priser i Oslo.
                        Endelig pris fastsettes etter befaring.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-full overflow-y-auto px-5 md:px-12 py-6 md:py-10">
                  <div className="max-w-2xl mx-auto">
                    <LeadForm
                      intake={intake}
                      defaultSummary={defaultSummary}
                      images={images}
                      onSubmitted={onClose}
                    />
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
