'use client'

/**
 * FloatingCallCta
 * ─────────────────────────────────────────────────────────────────────────────
 * Always-visible circular "Ring oss" button anchored to the bottom-right on
 * mobile / small tablets. Fires `tel:` so tapping it opens the dialer with the
 * business number pre-filled.
 *
 * Hidden on desktop (≥ lg) because the header already exposes an envelope CTA
 * and full nav is in view — a floating button there would just be noise.
 *
 * Accessibility:
 *  • role="link" + aria-label keeps screen readers informative
 *  • `touch-target` is 56x56 px (above Apple HIG 44pt and Material 48dp)
 *  • Respects iOS safe-area-inset-bottom so it clears the Safari home-bar
 */

import Link from 'next/link'

const PHONE_DISPLAY = '+47 465 83 867'
const PHONE_TEL = '+4746583867'

export default function FloatingCallCta() {
  return (
    <Link
      href={`tel:${PHONE_TEL}`}
      aria-label={`Ring Fint Hjem på ${PHONE_DISPLAY}`}
      className="
        lg:hidden
        fixed z-[60]
        right-5
        bottom-5
        flex items-center gap-2.5
        rounded-full
        bg-[#1a1714] text-white
        pl-4 pr-5 py-3.5
        shadow-[0_10px_30px_-8px_rgba(0,0,0,0.5),_0_4px_12px_rgba(0,0,0,0.2)]
        active:scale-95 transition-all duration-200
        hover:bg-[#2a2320]
        font-montserrat font-bold text-[13px] tracking-[0.18em] uppercase
        animate-fadeIn
      "
      style={{
        bottom: 'max(1.25rem, env(safe-area-inset-bottom, 0px))',
      }}
    >
      {/* Pulse ring — subtle life signal so the user notices the button. */}
      <span
        aria-hidden
        className="
          absolute inset-0 rounded-full
          bg-[#1a1714]
          opacity-0
          animate-[fhPulse_2.4s_ease-out_infinite]
          pointer-events-none
        "
      />
      <span
        aria-hidden
        className="
          relative inline-flex items-center justify-center
          w-8 h-8 rounded-full
          bg-white/10
        "
      >
        <svg
          className="w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
        </svg>
      </span>
      <span className="relative">Ring oss</span>

      {/* Keyframes for pulse. Inlined via style-jsx-less approach using a
          Tailwind arbitrary keyframes name `fhPulse` mapped in globals.css. */}
    </Link>
  )
}
