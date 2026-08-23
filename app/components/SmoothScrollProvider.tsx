'use client'

/**
 * SmoothScrollProvider
 * ────────────────────
 * Wraps the app in Lenis smooth scrolling. Premium scroll feel comes
 * from three things working together:
 *
 *   1. Lenis provides a velocity-based scroll with subtle easing —
 *      feels like expensive websites (read: Apple, Linear, Stripe).
 *   2. GSAP's ScrollTrigger is pinned to the SAME RAF loop as Lenis so
 *      every scroll-driven animation stays in lockstep with the smooth
 *      scroll position (no jitter, no double-scheduling).
 *   3. The loop short-circuits entirely when the user has
 *      `prefers-reduced-motion: reduce` set — we fall back to the
 *      browser's native scroll. No Lenis instance is created, no
 *      RAF, no GSAP ticker cost.
 *
 *
 * We also expose a small `scrollTo(target)` helper via a ref-style
 * global so nav links (`scrollToSection` on the home page) can
 * animate through Lenis instead of the browser's native smoothness —
 * keeps the motion consistent regardless of trigger.
 */

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useReducedMotion } from '../lib/motion/useReducedMotion'

// A narrow type declaration for the optional window helper. Anything
// on the site that wants to navigate via Lenis can call
// `window.__lenis?.scrollTo(…)` without pulling in the full Lenis type.
declare global {
  interface Window {
    __lenis?: {
      scrollTo: (
        target: number | string | HTMLElement,
        opts?: { offset?: number; duration?: number; immediate?: boolean }
      ) => void
    }
  }
}

// Routes where Lenis should NOT run — for pages that own their own
// scroll containers, where wiring Lenis in breaks nested overflow
// panels. Empty for now; every route is a normal scrolling document.
const SKIP_ROUTES: string[] = []

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const reduced = useReducedMotion()
  const skip =
    reduced || SKIP_ROUTES.some((r) => pathname === r || pathname?.startsWith(`${r}/`))

  useEffect(() => {
    if (skip) return

    let cleanup: (() => void) | undefined

    // Dynamic import keeps Lenis + GSAP out of the hero's critical
    // path and ensures they only ship on routes that actually need
    // smooth scrolling.
    ;(async () => {
      const [{ default: Lenis }, { gsap }, { ScrollTrigger }] = await Promise.all([
        import('lenis'),
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ])

      gsap.registerPlugin(ScrollTrigger)

      const lenis = new Lenis({
        // Gentle wheel-to-scroll ratio — fast enough that the page
        // feels responsive, slow enough that the smoothness reads
        // as "premium" rather than "laggy".
        duration: 1.15,
        // Subtle exponential ease-out. This specific curve is what
        // makes well-crafted sites feel "heavy" and confident.
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        // Touch devices keep their native momentum — overriding it
        // on iOS generally feels worse than the browser's own
        // rubber-band physics.
        syncTouch: false,
        wheelMultiplier: 1,
        touchMultiplier: 1.25,
      })

      // Expose a tiny scroll helper for site-wide nav links.
      window.__lenis = {
        scrollTo: (target, opts) => lenis.scrollTo(target, opts),
      }

      // Bridge Lenis → GSAP ScrollTrigger: every Lenis scroll event
      // pokes ScrollTrigger to re-evaluate. Without this, pinned and
      // scrubbed animations fall behind by a frame under smooth
      // scrolling because GSAP reads from `window.scrollY` which
      // isn't what Lenis is updating visually.
      lenis.on('scroll', ScrollTrigger.update)

      // Drive Lenis from GSAP's ticker so we only have ONE RAF loop
      // on the page instead of Lenis running its own RAF and GSAP
      // running another. Multiplier converts GSAP's seconds to
      // Lenis's milliseconds.
      const tick = (time: number) => lenis.raf(time * 1000)
      gsap.ticker.add(tick)
      gsap.ticker.lagSmoothing(0)

      cleanup = () => {
        gsap.ticker.remove(tick)
        lenis.destroy()
        delete window.__lenis
        ScrollTrigger.getAll().forEach((t) => t.kill())
      }
    })()

    return () => {
      cleanup?.()
    }
  }, [skip])

  return <>{children}</>
}
