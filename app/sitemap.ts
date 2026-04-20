import type { MetadataRoute } from 'next'

const SITE_URL = 'https://finthjem.no'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  return [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
      alternates: {
        languages: {
          'nb-NO': SITE_URL,
          'x-default': SITE_URL,
        },
      },
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

    /* ── Anker-URL'er for seksjonene på forsiden ─ Gjør at Google kan
       vise "Gå til seksjon"-resultater i søk (Sitelinks / Jump-to). ── */
    {
      url: `${SITE_URL}/#ditt-nye-hjem`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/#renovering-forandring`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/#byggservice`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/#interior-styling`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ]
}
