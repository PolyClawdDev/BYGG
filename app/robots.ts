import type { MetadataRoute } from 'next'

const SITE_URL = 'https://finthjem.no'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/private/'],
      },
      /* Gi gode crawlers eksplisitt tillatelse — tydelig signal til Google */
      {
        userAgent: ['Googlebot', 'Googlebot-Image', 'Bingbot'],
        allow: '/',
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
