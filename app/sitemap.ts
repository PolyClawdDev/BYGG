import type { MetadataRoute } from 'next'
import { BLOG_POSTS } from './lib/blog'
import { SITE_URL } from './lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const blogEntries: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${SITE_URL}/blogg/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [
    /* ── Core pages ─────────────────────────────────────────────── */
    { url: SITE_URL, lastModified: now, changeFrequency: 'weekly', priority: 1.0, alternates: { languages: { 'nb-NO': SITE_URL, 'x-default': SITE_URL } } },
    { url: `${SITE_URL}/kontakt`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/interior-design-homestyling`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/estimat`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${SITE_URL}/blogg`, lastModified: now, changeFrequency: 'weekly', priority: 0.85 },

    /* ── Service pages ──────────────────────────────────────────── */
    { url: `${SITE_URL}/nybygg-oslo`, lastModified: now, changeFrequency: 'monthly', priority: 0.95 },
    { url: `${SITE_URL}/renovering-oslo`, lastModified: now, changeFrequency: 'monthly', priority: 0.95 },
    { url: `${SITE_URL}/bad-renovering-oslo`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/kjokken-renovering-oslo`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/snekker-oslo`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${SITE_URL}/maling-oslo`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${SITE_URL}/vvs-rorlegger-oslo`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${SITE_URL}/tilbygg-oslo`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/vinduer-dorer-oslo`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${SITE_URL}/fasade-renovering-oslo`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${SITE_URL}/gulv-parkett-oslo`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${SITE_URL}/energioppgradering-oslo`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },

    /* ── Neighborhood pages ─────────────────────────────────────── */
    { url: `${SITE_URL}/renovering-frogner`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/renovering-baerum`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/renovering-holmenkollen`, lastModified: now, changeFrequency: 'monthly', priority: 0.88 },
    { url: `${SITE_URL}/renovering-majorstuen`, lastModified: now, changeFrequency: 'monthly', priority: 0.88 },
    { url: `${SITE_URL}/renovering-asker`, lastModified: now, changeFrequency: 'monthly', priority: 0.88 },
    { url: `${SITE_URL}/renovering-nordstrand`, lastModified: now, changeFrequency: 'monthly', priority: 0.88 },

    /* ── Blog posts (auto-generated from data) ──────────────────── */
    ...blogEntries,
  ]
}
