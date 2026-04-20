'use client'

/**
 * HeroEstimateButton — the premium CTA under "DIN TOTALENTREPRENØR".
 *
 * v3: radically cleaner.
 *   • Dropped the upload glyph (the page handles uploads — the button
 *     doesn't need to advertise that).
 *   • Dropped the rule-line-plus-arrow construction; replaced with a
 *     single subtle arrow so the typography can breathe.
 *   • Deeper near-black brown (#1a1614) gives the shimmer a much
 *     stronger contrast — now the shine is genuinely visible.
 *   • Shimmer rebuilt: a sharper, brighter gold-white streak that
 *     sweeps quickly (≈1s) then pauses for ~2.2s. That rhythm reads
 *     as "catches the light" rather than "is animated".
 *   • Subtle constant metallic top-highlight gives the pill a bit of
 *     physical depth without a gradient-button look.
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
                   shadow-[0_2px_4px_-2px_rgba(26,22,20,0.25)]
                   hover:shadow-[0_12px_28px_-10px_rgba(26,22,20,0.4)]"
        style={{
          // Near-black warm brown — deep enough that the shimmer pops.
          backgroundColor: '#1a1614',
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
