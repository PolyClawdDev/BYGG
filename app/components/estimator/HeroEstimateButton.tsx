'use client'

/**
 * HeroEstimateButton — the premium CTA that sits directly under
 * "DIN TOTALENTREPRENØR" in the hero.
 *
 * Design constraints:
 *   • MUST match the existing hero rhythm (typography, color, spacing).
 *     We reuse the exact Montserrat 11 px + 0.35em tracking pattern from
 *     the rest of the site.
 *   • NO gradients, NO bright colors, NO cheap drop shadows. Borders are
 *     brown/25 at rest and darken to gray-900 on hover — the same
 *     pattern as every other CTA on the page.
 *   • On hover a tiny horizontal line extends out (identical treatment
 *     used on the "START DITT PROSJEKT" / "BOOK BEFARING" CTAs) — feels
 *     like a subtle architectural rule line, not a flashy button.
 *   • Includes a 14 × 14 upload glyph to hint at the image-upload
 *     behavior without making the label long or shouty.
 *
 * Sizing:
 *   • Sits in a generous wrapper so vertical rhythm in the hero is
 *     preserved. Compact enough on mobile that the bottom nav + scroll
 *     arrow still fit within 100svh.
 */

import React, { useState } from 'react'
import dynamic from 'next/dynamic'

// Lazy-load the modal — it's substantial code and most visitors will
// never open it. We defer until first interaction, keeping the hero
// LCP fast.
const EstimateModal = dynamic(() => import('./EstimateModal'), { ssr: false })

export default function HeroEstimateButton() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Wrapper matches the hero's center-aligned column. `animate-fadeInUp`
          with a stagger continues the existing cascade (title 0s, subtitle
          1.2s, nav 1.8s → button comes in between subtitle and nav). */}
      <div
        className="flex justify-center mt-4 md:mt-6 animate-fadeInUp"
        style={{ animationDelay: '1.5s' }}
      >
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Åpne estimat-verktøyet"
          className="group relative inline-flex items-center gap-4 md:gap-5 pb-2 border-b border-brown/30 hover:border-gray-900 transition-colors duration-500"
        >
          {/* Upload glyph — 14 px hint that images can be attached. */}
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            className="text-gray-900 transition-transform duration-500 group-hover:-translate-y-0.5"
            aria-hidden
          >
            <path
              d="M12 15V5m0 0l-4 4m4-4l4 4M5 19h14"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <span className="font-montserrat font-bold text-[10px] md:text-[11px] tracking-[0.42em] md:tracking-[0.42em] text-gray-900 uppercase">
            Få estimat
          </span>

          {/* Expanding rule line — identical pattern to the site's other
              CTAs so the button feels native, not bolted on. */}
          <span className="relative flex items-center w-10 md:w-12 h-[1px] bg-brown/50 group-hover:bg-gray-900 group-hover:w-16 md:group-hover:w-20 transition-all duration-500">
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

      <EstimateModal open={open} onClose={() => setOpen(false)} />
    </>
  )
}
