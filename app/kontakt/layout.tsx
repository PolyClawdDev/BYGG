import type { Metadata } from 'next'

const SITE_URL = 'https://finthjem.no'
const PAGE_URL = `${SITE_URL}/kontakt`
const OG_IMAGE = `${SITE_URL}/LOGO.png`

const TITLE = 'Kontakt Fint Hjem – Book gratis befaring i Oslo'
const DESCRIPTION =
  'Ta kontakt med Fint Hjem for nybygg, renovering, byggservice eller interiørdesign. Vi kommer gjerne på gratis befaring i Oslo og omegn. Ring +47 465 83 867 eller send e-post til info@finthjem.no.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    'Fint Hjem kontakt',
    'kontakt totalentreprenør Oslo',
    'gratis befaring Oslo',
    'byggmester Oslo kontakt',
    'tilbud renovering Oslo',
    'pristilbud bygg Oslo',
    'byggefirma Oslo telefon',
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
        alt: 'Kontakt Fint Hjem – Book gratis befaring',
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

/* ── JSON-LD for kontaktsiden: ContactPage + BreadcrumbList ─────────────── */
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ContactPage',
      '@id': `${PAGE_URL}#contactpage`,
      url: PAGE_URL,
      name: TITLE,
      description: DESCRIPTION,
      inLanguage: 'nb-NO',
      isPartOf: { '@id': `${SITE_URL}/#website` },
      about: { '@id': `${SITE_URL}/#organization` },
      mainEntity: {
        '@id': `${SITE_URL}/#organization`,
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
          name: 'Kontakt',
          item: PAGE_URL,
        },
      ],
    },
  ],
}

export default function KontaktLayout({
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
