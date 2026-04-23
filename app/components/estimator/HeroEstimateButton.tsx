'use client'

/**
 * HeroEstimateButton — the premium CTA under "DIN TOTALENTREPRENØR".
 *
 * v4: colour-matched to the site palette.
 *   • The original near-black pill (#1a1614) felt imported from a
 *     different design system — jarring against the warm beige/brown
 *     world the rest of the page lives in. Swapped it for a deeper
 *     shade of the brand brown (#9c7a6d) so the button now reads as
 *     part of the Fint Hjem palette instead of a hard cutout.
 *   • Background      #6e5448   (rich tobacco brown — the brand
 *                                 accent, deepened for text contrast)
 *   • Glyph           #f6f2ec   (soft cream, unchanged)
 *   • Shadows         rgba(110,84,72, …)   warm brown, not generic
 *                                          black, so it sits on the
 *                                          beige backdrop cleanly.
 *   • Shimmer + top-highlight preserved — still reads as "catches the
 *     light" with the same cadence.
 *   • Links to /estimat.
 */

import React from 'react'
import Link from 'next/link'

export default function HeroEstimateButton() {
  return (
    <div
      className="flex justify-center mt-4 md:mt-6 animate-fadeInUp"
      style={{ animationDelay: '1.5s' }}
    >
      <Link
        href="/estimat"
        aria-label="Åpne prosjektplanner og få estimat"
        className="group relative inline-flex items-center gap-3
                   px-8 md:px-9 py-3 md:py-3.5
                   rounded-full
                   overflow-hidden
                   text-[#f6f2ec]
                   transition-all duration-500 ease-out
                   hover:-translate-y-0.5
                   shadow-[0_2px_4px_-2px_rgba(110,84,72,0.30)]
                   hover:shadow-[0_12px_28px_-10px_rgba(110,84,72,0.45)]"
        style={{
          // Deep tobacco brown — the brand accent (#9c7a6d) darkened
          // so cream text still has WCAG-level contrast. Keeps the
          // shimmer visible without going near-black.
          backgroundColor: '#6e5448',
        }}
      >
        {/* Constant top-half highlight — a faint sheen that gives the
            pill a subtle physical roundness. Not animated. */}
        <span
          aria-hidden
          className="absolute inset-x-0 top-0 h-1/2 pointer-events-none"
          style={{
            background: 'linear-gradient(180deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0) 100%)',
          }}
        />

        {/* THE SHIMMER — a sharp, bright gold-white streak. Narrower
            band + higher peak opacity = reads as a genuine light catch.
            Cycle is 3.2s with the sweep taking ~30% (1s) and the rest
            (2.2s) held off-screen as a pause. See heroBtnShimmer in
            globals.css. */}
        <span
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(110deg, transparent 42%, rgba(255,235,205,0.35) 47%, rgba(255,248,230,0.95) 50%, rgba(255,235,205,0.35) 53%, transparent 58%)',
            transform: 'translateX(-140%)',
            animation: 'heroBtnShimmer 3.2s cubic-bezier(0.4, 0, 0.2, 1) infinite',
          }}
        />

        <span className="relative z-10 font-montserrat font-bold text-[11px] md:text-[12px] tracking-[0.42em] uppercase">
          Få estimat
        </span>

        {/* Single discrete arrow — nudges on hover. No rule line, no
            extra glyphs. */}
        <svg
          width="13"
          height="10"
          viewBox="0 0 13 10"
          className="relative z-10 text-[#f6f2ec]/80 group-hover:text-[#f6f2ec] group-hover:translate-x-1 transition-all duration-500"
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
      </Link>
    </div>
  )
}
