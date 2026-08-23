'use client'

/**
 * ScrollProgressRail
 * ──────────────────
 * An ultra-thin (1 px) warm-brown line pinned to the very top of the
 * viewport. Its width fills horizontally as the user progresses
 * through the page. Purely a navigation/rhythm cue — confidence that
 * the page has structure, and an invitation to keep scrolling.
 *
 * Editorial details:
 *   • `z-[70]` — above every normal page chrome, below the hamburger
 *     overlay (`z-[60]` with the menu z-[50] behind it) so opening
 *     the menu still hides it cleanly.
 *   • Uses the brand accent `#9c7a6d` at 50 % alpha so the rail reads
 *     as a soft sheen, not a loud progress bar.
 *   • Transform-only animation (`scaleX` on a `transform-origin: left`
 *     bar) — stays on the compositor, zero layout thrash, zero paint
 *     cost per scroll tick.
 *   • Hidden under `prefers-reduced-motion` — the bar only appears
 *     when its animation would communicate anything new.
 */

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { useReducedMotion } from '../lib/motion/useReducedMotion'

const HIDDEN_ROUTES: string[] = []

export default function ScrollProgressRail() {
  const pathname = usePathname()
  const reduced = useReducedMotion()
  const hidden =
    reduced || HIDDEN_ROUTES.some((r) => pathname === r || pathname?.startsWith(`${r}/`))
  const barRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (hidden) return

    let raf: number | null = null
    const el = barRef.current
    if (!el) return

    const update = () => {
      const doc = document.documentElement
      const scrollable = doc.scrollHeight - doc.clientHeight
      const pct = scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0
      // scaleX is a pure compositor operation — no layout, no paint.
      el.style.transform = `scaleX(${pct})`
      raf = null
    }

    const onScroll = () => {
      if (raf != null) return
      raf = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf != null) cancelAnimationFrame(raf)
    }
  }, [hidden])

  if (hidden) return null

  return (
    <div
      aria-hidden
      className="fixed top-0 left-0 right-0 h-[1px] pointer-events-none"
      style={{ zIndex: 70 }}
    >
      <div
        ref={barRef}
        className="h-full w-full origin-left"
        style={{
          backgroundColor: '#9c7a6d',
          opacity: 0.5,
          transform: 'scaleX(0)',
          willChange: 'transform',
        }}
      />
    </div>
  )
}
