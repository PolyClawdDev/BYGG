'use client'

/**
 * FloatingCallCta
 * ─────────────────────────────────────────────────────────────────────────────
 * Compact icon-only phone button pinned to the bottom-right on mobile/tablet.
 * Tap opens the dialer with the business number pre-filled. Hidden on lg+
 * where the header's envelope CTA is already visible.
 *
 *  • 48 × 48 px touch target (≥ Apple HIG 44pt, ≥ Material 48dp)
 *  • Respects env(safe-area-inset-bottom) so it clears the iOS home-bar
 *  • Faint pulse ring invites attention without being loud
 */

import Link from 'next/link'

const PHONE_DISPLAY = '+47 465 83 867'
const PHONE_TEL = '+4746583867'

export default function FloatingCallCta() {
  return (
    <Link
      href={`tel:${PHONE_TEL}`}
      aria-label={`Ring Fint Hjem på ${PHONE_DISPLAY}`}
      title="Ring Fint Hjem"
      className="
        lg:hidden
        fixed z-[60]
        right-4
        flex items-center justify-center
        w-12 h-12
        rounded-full
        bg-[#1a1714] text-white
        shadow-[0_8px_20px_-6px_rgba(0,0,0,0.45),_0_2px_6px_rgba(0,0,0,0.2)]
        active:scale-90 transition-transform duration-150
        hover:bg-[#2a2320]
        animate-fadeIn
      "
      style={{
        bottom: 'max(1rem, env(safe-area-inset-bottom, 0px))',
      }}
    >
      {/* Soft outer pulse ring. Behind the filled button so it halos out. */}
      <span
        aria-hidden
        className="
          absolute inset-0 rounded-full bg-[#1a1714]
          opacity-0
          animate-[fhPulse_2.4s_ease-out_infinite]
          pointer-events-none
        "
      />
      <svg
        aria-hidden
        className="relative w-5 h-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
      </svg>
    </Link>
  )
}
