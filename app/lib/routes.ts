/**
 * routes.ts
 * ─────────
 * Single source of truth for every indexable page on finthjem.no, grouped the
 * same way `app/sitemap.ts` groups them.
 *
 * Consumed by:
 *   • `components/SiteFooter.tsx`   (Tjenester / Områder / Ressurser columns)
 *   • `app/page.tsx`                (Byggservice cards + split-section CTAs)
 *   • `app/blogg/[slug]/page.tsx`   (contextual links out of each article)
 *
 * Every internal link outside a page's own body copy is built from here, so a
 * new service page becomes reachable from all 28 pages by appending one entry.
 * That is the point of the module: the site previously shipped 24 of its 28
 * pages with no inbound internal link at all, because each surface hard-coded
 * its own short list and nothing kept those lists honest.
 *
 * Two labels per route, because the two jobs pull in opposite directions:
 *   `label`  — short, for dense link lists where a long phrase would wrap and
 *              make the footer look like a wall.
 *   `anchor` — the keyword phrase, for prose and CTAs where Google reads the
 *              anchor text as a description of the destination.
 */

import { BLOG_POSTS } from './blog'

export type SiteRoute = {
  /** Path exactly as it appears in `app/sitemap.ts`. */
  path: string
  /** Short Norwegian label for compact link lists. */
  label: string
  /** Keyword-bearing phrase used as anchor text in prose and CTAs. */
  anchor: string
}

/* ── Core pages ───────────────────────────────────────────────────────────── */

export const HOME: SiteRoute = { path: '/', label: 'Hjem', anchor: 'Fint Hjem' }

export const CORE_ROUTES: SiteRoute[] = [
  HOME,
  { path: '/kontakt', label: 'Kontakt', anchor: 'kontakt oss' },
  { path: '/estimat', label: 'Gratis befaring', anchor: 'gratis befaring' },
  { path: '/interior-design-homestyling', label: 'Interiørdesign', anchor: 'interiørdesign og homestyling' },
  { path: '/blogg', label: 'Blogg', anchor: 'prisguider og fagartikler' },
]

/** The free-inspection booking form — the site's primary conversion step. */
export const ESTIMAT: SiteRoute = CORE_ROUTES[2]
export const BLOG_INDEX: SiteRoute = CORE_ROUTES[4]

/* ── Service pages ────────────────────────────────────────────────────────── */

export const SERVICE_ROUTES: SiteRoute[] = [
  { path: '/nybygg-oslo', label: 'Nybygg', anchor: 'nybygg i Oslo' },
  { path: '/renovering-oslo', label: 'Renovering', anchor: 'renovering i Oslo' },
  { path: '/bad-renovering-oslo', label: 'Baderomsrenovering', anchor: 'baderomsrenovering i Oslo' },
  { path: '/kjokken-renovering-oslo', label: 'Kjøkkenrenovering', anchor: 'kjøkkenrenovering i Oslo' },
  { path: '/tilbygg-oslo', label: 'Tilbygg', anchor: 'tilbygg i Oslo' },
  { path: '/snekker-oslo', label: 'Snekker', anchor: 'snekker i Oslo' },
  { path: '/maling-oslo', label: 'Maling', anchor: 'maling i Oslo' },
  { path: '/vvs-rorlegger-oslo', label: 'Rørlegger og VVS', anchor: 'rørlegger i Oslo' },
  { path: '/vinduer-dorer-oslo', label: 'Vinduer og dører', anchor: 'vinduer og dører i Oslo' },
  { path: '/fasade-renovering-oslo', label: 'Fasaderenovering', anchor: 'fasaderenovering i Oslo' },
  { path: '/gulv-parkett-oslo', label: 'Gulv og parkett', anchor: 'gulv og parkett i Oslo' },
  { path: '/energioppgradering-oslo', label: 'Energioppgradering', anchor: 'energioppgradering i Oslo' },
]

/* ── Neighbourhood / local pages ──────────────────────────────────────────────
   Labels here carry the service word rather than the bare place name: these
   pages compete for "<service> <place>" queries, and the footer link is the
   one anchor every page on the site gives them. Bærum leads the list because
   `totalentreprenør bærum` is the site's most winnable term. */

export const AREA_ROUTES: SiteRoute[] = [
  { path: '/renovering-baerum', label: 'Totalentreprenør Bærum', anchor: 'totalentreprenør i Bærum' },
  { path: '/renovering-asker', label: 'Renovering Asker', anchor: 'renovering i Asker' },
  { path: '/renovering-frogner', label: 'Renovering Frogner', anchor: 'renovering på Frogner' },
  { path: '/renovering-majorstuen', label: 'Renovering Majorstuen', anchor: 'renovering på Majorstuen' },
  { path: '/renovering-holmenkollen', label: 'Renovering Holmenkollen', anchor: 'renovering på Holmenkollen' },
  { path: '/renovering-nordstrand', label: 'Renovering Nordstrand', anchor: 'renovering på Nordstrand' },
]

/* ── Blog ─────────────────────────────────────────────────────────────────── */

/** Derived from `blog.ts` so a new post needs no edit here. */
export const BLOG_ROUTES: SiteRoute[] = BLOG_POSTS.map((post) => ({
  path: `/blogg/${post.slug}`,
  label: post.linkLabel,
  anchor: post.title,
}))

/* ── Lookup ───────────────────────────────────────────────────────────────── */

/** Every indexable path, for reachability checks. */
export const ALL_ROUTES: SiteRoute[] = [
  ...CORE_ROUTES,
  ...SERVICE_ROUTES,
  ...AREA_ROUTES,
  ...BLOG_ROUTES,
]

const BY_PATH = new Map<string, SiteRoute>(ALL_ROUTES.map((r) => [r.path, r]))

/**
 * Resolves a path to its registry entry. Throws rather than rendering a link
 * with an empty label, so a typo or a renamed route fails the build instead of
 * shipping a broken anchor to production.
 */
export function route(path: string): SiteRoute {
  const found = BY_PATH.get(path)
  if (!found) throw new Error(`routes.ts: unknown route "${path}"`)
  return found
}

export function routes(...paths: string[]): SiteRoute[] {
  return paths.map(route)
}
