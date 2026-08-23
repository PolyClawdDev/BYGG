import type { MetadataRoute } from 'next'
import { SITE_URL } from './lib/site'

/**
 * robots.txt
 *
 * Deliberately a single wildcard group. Two things to know before editing:
 *
 * 1. Never disallow /_next/. Next.js serves every CSS and JS bundle from
 *    /_next/static/, and a crawler that cannot fetch those cannot render the
 *    page — this site's homepage is a client component, so without JS there is
 *    almost nothing to see. A previous version blocked it and Semrush reported
 *    59 blocked resources across the four main pages. Google's guidance is
 *    explicit that CSS and JS must stay crawlable.
 *
 * 2. Do not add per-crawler groups "to be extra permissive" to Googlebot.
 *    Under RFC 9309 a crawler obeys only the single most specific group that
 *    matches its user agent and ignores every other group. An earlier
 *    Googlebot/Bingbot group here therefore did the opposite of what it looked
 *    like: it exempted Google from the /api/ rule below, while leaving every
 *    other crawler — including Google-InspectionTool and GoogleOther — subject
 *    to the wildcard group's /_next/ block. One group keeps the file honest.
 *
 * /api/ stays disallowed: the only route is the POST-only lead endpoint, which
 * has nothing to index.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: '/api/',
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
