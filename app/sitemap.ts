import type { MetadataRoute } from 'next'

const SITE_URL = 'https://finthjem.no'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  return [
    /* ── Core pages ─────────────────────────────────────────────── */
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
      alternates: { languages: { 'nb-NO': SITE_URL, 'x-default': SITE_URL } },
    },
    {
      url: `${SITE_URL}/kontakt`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/interior-design-homestyling`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/estimat`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.85,
    },

    /* ── Dedicated service pages (SEO) ──────────────────────────── */
    {
      url: `${SITE_URL}/nybygg-oslo`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.95,
    },
    {
      url: `${SITE_URL}/renovering-oslo`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.95,
    },
    {
      url: `${SITE_URL}/bad-renovering-oslo`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/kjokken-renovering-oslo`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/snekker-oslo`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/maling-oslo`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/vvs-rorlegger-oslo`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/tilbygg-oslo`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/vinduer-dorer-oslo`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
  ]
}
