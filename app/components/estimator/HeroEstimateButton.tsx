'use client'

/**
 * HeroEstimateButton — the premium CTA that sits directly under
 * "DIN TOTALENTREPRENØR" in the hero.
 *
 * Evolution:
 *   v1 was a ghost underline button + popup modal. The client asked for
 *   something that actually "shines" and opens a full planner page —
 *   not a modal. This is v2: a solid, dark pill with a slow warm-gold
 *   shimmer sweep that links to /estimat.
 *
 * Design notes:
 *   • Solid dark brown bg (#2b2320, exact match with the chat user
 *     bubbles for visual cohesion across the brand) with off-white
 *     (#f6f2ec) typography.
 *   • Shimmer is a single diagonal gold highlight that sweeps across
 *     every ~4.8s and pauses for the majority of the cycle. This reads
 *     as "premium" rather than "busy" — think watch brand, not SaaS.
 *   • Montserrat 11 px bold, 0.42em tracking — same letterforms as the
 *     other hero CTAs so it still feels native.
 *   • Keeps a small upload glyph and an expanding arrow as microcopy
 *     for what's behind the click.
 *   • Navigates to /estimat (full page dashboard), NOT a modal.
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
        className="group relative inline-flex items-center gap-4 md:gap-5
                   px-6 md:px-8 py-3 md:py-3.5
                   rounded-full
                   overflow-hidden
                   text-[#f6f2ec]
                   transition-all duration-500 ease-out
                   hover:-translate-y-0.5
                   shadow-[0_1px_0_0_rgba(43,35,32,0.08)]
                   hover:shadow-[0_10px_30px_-12px_rgba(43,35,32,0.35)]"
        style={{
          // Base fill — a near-black warm brown. Using an inline style
          // (vs Tailwind arbitrary value) so the base color renders
          // instantly, before Tailwind's JIT CSS is parsed on first paint.
          backgroundColor: '#2b2320',
        }}
      >
        {/* Subtle vertical depth — a slightly lighter top so the pill
            catches light without looking like a gradient button. */}
        <span
          aria-hidden
          className="absolute inset-0 pointer-events-none opacity-70"
          style={{
            background:
              'linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0) 55%)',
          }}
        />

        {/* THE SHIMMER — a warm gold diagonal highlight that sweeps
            across then pauses. The `heroBtnShimmer` keyframe lives in
            globals.css and runs 4.8s with an embedded pause (translate
            held at +120% for the back half of the cycle). */}
        <span
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(105deg, transparent 35%, rgba(214,178,135,0.28) 48%, rgba(240,215,180,0.42) 50%, rgba(214,178,135,0.28) 52%, transparent 65%)',
            transform: 'translateX(-120%)',
            animation: 'heroBtnShimmer 4.8s ease-in-out infinite',
          }}
        />

        {/* Upload glyph — hints that images are part of the experience. */}
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          className="relative z-10 text-[#f6f2ec] transition-transform duration-500 group-hover:-translate-y-0.5"
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

        <span className="relative z-10 font-montserrat font-bold text-[10px] md:text-[11px] tracking-[0.42em] uppercase">
          Få estimat
        </span>

        {/* Arrow — continues the architectural rule-line language
            used by every other CTA on the site. */}
        <span className="relative z-10 flex items-center w-10 md:w-12 h-[1px] bg-[#f6f2ec]/45 group-hover:bg-[#f6f2ec] group-hover:w-16 md:group-hover:w-20 transition-all duration-500">
          <svg
            width="12"
            height="10"
            viewBox="0 0 12 10"
            className="absolute right-0 -translate-x-2 group-hover:translate-x-0 transition-transform duration-500 text-[#f6f2ec]"
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
      </Link>
    </div>
  )
}
