'use client'

/**
 * CountUp
 * ───────
 * Elegant numeric counter used for editorial stats (e.g. "150+ HJEM
 * BYGGET"). Starts at 0 (or a caller-supplied `from`) and eases up to
 * `value` once the element enters the viewport.
 *
 * Design choices:
 *   • Uses `IntersectionObserver` (single-shot) so the counter fires
 *     exactly once per mount, the first time it's scrolled into view.
 *   • Easing curve is the same cubic-bezier used for every reveal on
 *     the site (0.16, 1, 0.3, 1) — keeps the motion language consistent.
 *   • Respects prefers-reduced-motion → snaps to the final value
 *     instantly instead of animating.
 *   • Renders nothing extra around the number: takes `suffix`
 *     (default "+") so the caller can drop it straight into their
 *     existing typography (same Montserrat Black class as before).
 *   • Uses requestAnimationFrame rather than setInterval so frame
 *     pacing stays smooth even on low-end devices.
 */

import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from './useReducedMotion'

interface Props {
  value: number
  /** Starting number. Defaults to 0. */
  from?: number
  /** Suffix shown after the number. Defaults to "+". Pass "" for none. */
  suffix?: string
  /** Animation length in milliseconds. Defaults to 2200ms. */
  duration?: number
  className?: string
  /** Optional cap for Intl.NumberFormat locale. Defaults to nb-NO. */
  locale?: string
}

const EASE_OUT_EXPO = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t))

export default function CountUp({
  value,
  from = 0,
  suffix = '+',
  duration = 2200,
  className,
  locale = 'nb-NO',
}: Props) {
  const reduced = useReducedMotion()
  const [display, setDisplay] = useState<number>(reduced ? value : from)
  const ref = useRef<HTMLSpanElement | null>(null)
  const firedRef = useRef(false)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    if (reduced) {
      setDisplay(value)
      return
    }

    const el = ref.current
    if (!el) return

    const run = () => {
      if (firedRef.current) return
      firedRef.current = true

      const start = performance.now()
      const delta = value - from

      const tick = (now: number) => {
        const elapsed = now - start
        const t = Math.min(1, elapsed / duration)
        const eased = EASE_OUT_EXPO(t)
        setDisplay(Math.round(from + delta * eased))
        if (t < 1) {
          rafRef.current = requestAnimationFrame(tick)
        } else {
          rafRef.current = null
        }
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            run()
            io.disconnect()
          }
        })
      },
      {
        // Fire slightly before the element is fully on screen so the
        // counter is visibly animating as it slides into view.
        rootMargin: '0px 0px -12% 0px',
        threshold: 0.1,
      }
    )

    io.observe(el)

    return () => {
      io.disconnect()
      if (rafRef.current != null) {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = null
      }
    }
  }, [value, from, duration, reduced])

  const formatted = new Intl.NumberFormat(locale).format(display)

  return (
    <span ref={ref} className={className}>
      {formatted}
      {suffix}
    </span>
  )
}
