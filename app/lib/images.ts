/**
 * Responsive srcset helpers for the Unsplash-hosted photography.
 *
 * Every photo URL on the site is an Unsplash CDN URL carrying `auto=format`,
 * which already negotiates AVIF/WebP per browser — so format is handled and
 * the `q=` parameter barely moves the needle (365 KiB → 335 KiB from q=90 to
 * q=72 on a typical 1800px crop). Width is the only lever that matters.
 *
 * Without a srcset every device downloads the same 1800px crop, so a phone
 * rendering the image at ~390 CSS px pulls roughly 4× the bytes it can use.
 * These helpers emit one candidate per breakpoint and let the browser pick.
 */

/** Candidate widths, chosen to cover 1× and 2× DPR from phone to wide desktop. */
const WIDTHS = [640, 828, 1080, 1400, 1800] as const

/** Replace (or add) the `w=` parameter on an Unsplash URL. */
function withWidth(url: string, width: number): string {
  return /[?&]w=\d+/.test(url)
    ? url.replace(/([?&]w=)\d+/, `$1${width}`)
    : `${url}${url.includes('?') ? '&' : '?'}w=${width}`
}

/** Build a `srcSet` string covering all candidate widths for an Unsplash URL. */
export function unsplashSrcSet(url: string): string {
  return WIDTHS.map((w) => `${withWidth(url, w)} ${w}w`).join(', ')
}

/**
 * `sizes` values for the three photo slots on the site. These must describe
 * the image's *rendered* width at each breakpoint — get them wrong and the
 * browser picks the wrong candidate, which is worse than having no srcset.
 */
export const IMAGE_SIZES = {
  /** Split sections: full width on mobile, half the viewport from lg up. */
  splitSection: '(min-width: 1024px) 50vw, 100vw',
  /** Service-page hero: always full-bleed. */
  fullBleed: '100vw',
  /** Byggservice cards: 1 column, then 2 from md, then 3 from lg. */
  serviceCard: '(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw',
} as const
