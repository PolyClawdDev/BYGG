'use client'

/**
 * useReducedMotion
 * ────────────────
 * Single source of truth for `prefers-reduced-motion`. Every motion
 * primitive on the site reads from this hook so we can flip the entire
 * motion system off (or to instant) with one switch if the user has
 * set the OS preference, or if we ever want to test reduced-motion
 * behaviour globally.
 *
 * Returns:
 *   `true`  — user prefers reduced motion (disable decorative motion,
 *             make reveals instant, skip parallax/scrub effects).
 *   `false` — full motion experience.
 *
 * SSR-safe: defaults to `false` on the server, re-reads in
 * `useEffect` so the first client render matches SSR output.
 */

import { useEffect, useState } from 'react'

const QUERY = '(prefers-reduced-motion: reduce)'

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return

    const mql = window.matchMedia(QUERY)
    setReduced(mql.matches)

    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches)

    // Safari < 14 used addListener/removeListener; modern browsers use
    // addEventListener/removeEventListener. Feature-detect to stay safe.
    if (typeof mql.addEventListener === 'function') {
      mql.addEventListener('change', onChange)
      return () => mql.removeEventListener('change', onChange)
    }
    mql.addListener(onChange)
    return () => mql.removeListener(onChange)
  }, [])

  return reduced
}
