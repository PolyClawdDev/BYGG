import type { Metadata } from 'next'

const SITE_URL = 'https://finthjem.no'
const PAGE_URL = `${SITE_URL}/interior-design-homestyling`
const OG_IMAGE = `${SITE_URL}/LOGO.png`

const TITLE = 'Interiørdesign & Homestyling i Oslo – Fint Hjem'
const DESCRIPTION =
  'Profesjonell interiørdesign og homestyling av Fint Hjem. Fra konsept og 3D-visualisering til ferdig innredet bolig – vi skaper rom som reflekterer deg. Gratis befaring i Oslo og omegn.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    'interiørdesign Oslo',
    'interiørarkitekt Oslo',
    'homestyling Oslo',
    'boligstyling Oslo',
    'interiørkonsulent Oslo',
    '3D interiør Oslo',
    'interiør Fint Hjem',
    'styling før salg Oslo',
    'fargepalett bolig',
    'materialvalg interiør',
  ],
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    type: 'website',
    url: PAGE_URL,
    siteName: 'Fint Hjem',
    locale: 'nb_NO',
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'Interiørdesign og homestyling av Fint Hjem',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
}

/* ── JSON-LD: Service + BreadcrumbList for interiørdesign-siden ─────────── */
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      '@id': `${PAGE_URL}#service`,
      name: 'Interiørdesign og homestyling',
      serviceType: 'Interior design',
      url: PAGE_URL,
      description: DESCRIPTION,
      inLanguage: 'nb-NO',
      provider: { '@id': `${SITE_URL}/#organization` },
      areaServed: [
        { '@type': 'AdministrativeArea', name: 'Oslo' },
        { '@type': 'AdministrativeArea', name: 'Viken' },
        { '@type': 'AdministrativeArea', name: 'Akershus' },
      ],
      audience: {
        '@type': 'Audience',
        audienceType: 'Privatkunder og eiendomsutviklere',
      },
      offers: {
        '@type': 'Offer',
        priceCurrency: 'NOK',
        availability: 'https://schema.org/InStock',
        url: `${SITE_URL}/kontakt`,
      },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Interiørtjenester',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Konseptutvikling og moodboard',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: '3D-visualisering av rommene',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Fargepalett, tekstiler og materialer',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Styling, møblering og dekor',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Homestyling før salg',
            },
          },
        ],
      },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${PAGE_URL}#breadcrumbs`,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Hjem',
          item: SITE_URL,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Interiørdesign & Homestyling',
          item: PAGE_URL,
        },
      ],
    },
  ],
}

export default function InteriorDesignLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  )
}
