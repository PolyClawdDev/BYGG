/**
 * Single source of truth for the site's canonical origin.
 *
 * This MUST match the host Vercel serves with a 200. Vercel has
 * www.finthjem.no set as the primary domain and 307-redirects the bare
 * finthjem.no to it, so every canonical, sitemap entry, hreflang, OG url
 * and JSON-LD @id has to use the www form. When the canonical disagrees
 * with the host that actually answers, Google splits ranking signals
 * between the two variants and reports them as "Page with redirect" /
 * "Alternate page with proper canonical tag".
 *
 * To move the site to the bare domain later: flip Vercel's primary domain
 * to finthjem.no, then change SITE_HOST below. Nothing else needs editing.
 */
export const SITE_HOST = 'www.finthjem.no'

export const SITE_URL = `https://${SITE_HOST}` as const

export const SITE_NAME = 'Fint Hjem'

/** Build an absolute URL from a root-relative path ('/kontakt' → full URL). */
export function absoluteUrl(path = ''): string {
  if (!path || path === '/') return SITE_URL
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
}
