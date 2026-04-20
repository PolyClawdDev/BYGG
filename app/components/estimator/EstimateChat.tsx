'use client'

/**
 * EstimateChat — the core conversational surface of the estimator.
 *
 * Responsibilities:
 *   • Manage chat state (messages, pending request, typing indicator).
 *   • Render the welcome message + suggested quick prompts on first open.
 *   • Render user bubbles on the right, assistant bubbles (and the
 *     premium EstimateSummaryCard) on the left.
 *   • Keep the draft input persistent while the modal is open — closing
 *     and re-opening the modal preserves the conversation (controlled
 *     from the parent via lifted state).
 *
 * Visual language intentionally avoids chatbubble-style UIs you'd see
 * in a generic SaaS chatbot. Instead it uses flat panels, thin dividers
 * and editorial typography — the exact same toolkit used elsewhere
 * on finthjem.no.
 */

import React, { useEffect, useRef, useState } from 'react'
import type {
  ChatMessage,
  EstimateRequestBody,
  EstimateResponseBody,
  ProjectIntake,
  UploadedImage,
} from '@/types/estimate'
import EstimateSummaryCard from './EstimateSummaryCard'

interface Props {
  messages: ChatMessage[]
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>
  intake: ProjectIntake
  images: UploadedImage[]
  onRequestBefaring: () => void
}

const QUICK_PROMPTS: string[] = [
  'Jeg vil pusse opp bad',
  'Jeg vil male leiligheten',
  'Jeg vil legge nytt gulv',
  'Jeg vil totalrenovere',
  'Jeg vil få hjelp med styling før salg',
]

function makeId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

export default function EstimateChat({
  messages,
  setMessages,
  intake,
  images,
  onRequestBefaring,
}: Props) {
  const [draft, setDraft] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const scrollRef = useRef<HTMLDivElement | null>(null)

  /* Keep the newest turn in view without yanking the page itself. We
     scroll inside the internal container so the modal never jumps. */
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' })
  }, [messages, isSending])

  async function send(text: string) {
    const trimmed = text.trim()
    if (!trimmed || isSending) return

    setError(null)

    const userMsg: ChatMessage = {
      id: makeId(),
      role: 'user',
      content: trimmed,
      images: images.length > 0 ? images : undefined,
      createdAt: Date.now(),
    }
    const nextMessages = [...messages, userMsg]
    setMessages(nextMessages)
    setDraft('')
    setIsSending(true)

    try {
      const body: EstimateRequestBody = {
        messages: nextMessages.map((m) => ({ role: m.role, content: m.content })),
        intake,
        images: images.map((i) => ({
          id: i.id,
          name: i.name,
          mimeType: i.mimeType,
          note: i.note,
          dataUrl: i.dataUrl,
        })),
      }
      const res = await fetch('/api/estimate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      const data = (await res.json()) as EstimateResponseBody & { error?: string }
      if (!res.ok) {
        throw new Error(data.error || 'Noe gikk galt. Prøv igjen.')
      }

      const assistantMsg: ChatMessage = {
        id: makeId(),
        role: 'assistant',
        content: data.reply,
        estimate: data.estimate,
        createdAt: Date.now(),
      }
      setMessages((prev) => [...prev, assistantMsg])

      if (data.warning) {
        setError(data.warning)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Noe gikk galt. Prøv igjen om litt.')
    } finally {
      setIsSending(false)
    }
  }

  const showWelcome = messages.length === 0

  return (
    <div className="flex flex-col h-full min-h-0">
      {/* ── Scrollable conversation region ────────────────────────── */}
      <div
        ref={scrollRef}
        className="flex-1 min-h-0 overflow-y-auto px-1 md:px-2 pb-4"
        style={{ scrollbarGutter: 'stable' }}
      >
        {showWelcome && (
          <div className="py-4 md:py-6">
            <div className="max-w-2xl">
              <p className="font-montserrat font-bold text-[10px] tracking-[0.42em] text-brown/70 mb-4 uppercase">
                — Velkommen
              </p>
              <p className="font-playfair font-light text-gray-900 text-xl md:text-2xl leading-snug tracking-tight mb-3">
                Fortell oss kort om prosjektet ditt.
              </p>
              <p className="font-playfair font-light text-brown/75 text-base leading-relaxed">
                Vi lager et grovt prisestimat basert på typiske priser i Oslo.
                For eksakt pris anbefaler vi alltid en gratis befaring.
              </p>
            </div>

            <div className="mt-8">
              <p className="font-montserrat font-bold text-[10px] tracking-[0.32em] text-brown/60 mb-3 uppercase">
                Velg raskt
              </p>
              <div className="flex flex-wrap gap-2">
                {QUICK_PROMPTS.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => void send(prompt)}
                    className="px-4 py-2 rounded-full border border-brown/25 hover:border-gray-900 hover:bg-brown/5 font-playfair font-light text-brown text-sm transition-colors duration-300"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {messages.map((m) => (
          <MessageBubble key={m.id} message={m} onRequestBefaring={onRequestBefaring} />
        ))}

        {isSending && <TypingIndicator />}
      </div>

      {/* ── Composer ──────────────────────────────────────────────── */}
      <div className="border-t border-brown/15 pt-4 pb-1">
        {error && (
          <p className="font-playfair font-light italic text-brown/75 text-sm mb-3" role="status">
            {error}
          </p>
        )}
        <form
          onSubmit={(e) => {
            e.preventDefault()
            void send(draft)
          }}
          className="flex items-end gap-3"
        >
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                void send(draft)
              }
            }}
            rows={1}
            placeholder="Skriv en melding…"
            disabled={isSending}
            className="flex-1 bg-transparent border border-brown/20 rounded-xl px-4 py-3 font-playfair font-light text-brown text-[15px] outline-none focus:border-brown/50 transition-colors duration-300 resize-none placeholder:text-brown/40 max-h-40"
          />
          <button
            type="submit"
            disabled={isSending || !draft.trim()}
            aria-label="Send melding"
            className="group w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-full border border-brown/25 hover:border-gray-900 transition-colors duration-500 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-brown/25"
          >
            <svg width="14" height="12" viewBox="0 0 14 12" className="text-gray-900 group-hover:translate-x-0.5 transition-transform duration-300" aria-hidden>
              <path d="M1 6h12M8 1l5 5-5 5" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  )
}

/* ─── Message bubble (user right, assistant left, estimate card below) ─── */

function MessageBubble({
  message,
  onRequestBefaring,
}: {
  message: ChatMessage
  onRequestBefaring: () => void
}) {
  const isUser = message.role === 'user'

  if (isUser) {
    return (
      <div className="flex justify-end py-3">
        <div className="max-w-[85%] md:max-w-[72%]">
          {message.images && message.images.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-2 justify-end">
              {message.images.slice(0, 6).map((img) => (
                <div key={img.id} className="relative w-16 h-16 rounded-lg overflow-hidden border border-brown/20">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img.dataUrl} alt={img.name} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          )}
          <div className="bg-[#2b2320] text-[#f6f2ec] rounded-2xl rounded-tr-md px-4 py-3 font-playfair font-light text-[15px] leading-relaxed whitespace-pre-wrap">
            {message.content}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex justify-start py-3">
      <div className="max-w-[92%] md:max-w-[88%] w-full">
        {message.content && (
          <div className="mb-4">
            <p className="font-montserrat font-bold text-[10px] tracking-[0.3em] text-brown/55 mb-2 uppercase">
              — Fint Hjem
            </p>
            <div className="font-playfair font-light text-gray-900 text-[15px] leading-relaxed whitespace-pre-wrap">
              {message.content}
            </div>
          </div>
        )}
        {message.estimate && (
          <EstimateSummaryCard estimate={message.estimate} onBookBefaring={onRequestBefaring} />
        )}
      </div>
    </div>
  )
}

/* ─── Typing indicator ────────────────────────────────────────────────── */

function TypingIndicator() {
  return (
    <div className="flex justify-start py-3" aria-live="polite" aria-label="Fint Hjem skriver…">
      <div className="flex items-center gap-2 px-1">
        <span className="font-montserrat font-bold text-[10px] tracking-[0.3em] text-brown/55 uppercase">
          — Fint Hjem
        </span>
        <span className="inline-flex items-center gap-1 ml-2">
          <span className="w-1.5 h-1.5 rounded-full bg-brown/50 animate-typing-dot" style={{ animationDelay: '0s' }} />
          <span className="w-1.5 h-1.5 rounded-full bg-brown/50 animate-typing-dot" style={{ animationDelay: '0.15s' }} />
          <span className="w-1.5 h-1.5 rounded-full bg-brown/50 animate-typing-dot" style={{ animationDelay: '0.3s' }} />
        </span>
      </div>
    </div>
  )
}
