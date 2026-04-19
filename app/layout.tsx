import type { Metadata, Viewport } from 'next'
import './globals.css'
import FloatingCallCta from './components/FloatingCallCta'

/* ═══════════════════════════════════════════════════════════════════════════
   SEO — Fint Hjem
   ---------------------------------------------------------------------------
   Språk:     Norsk bokmål (nb-NO)
   Merke:     Fint Hjem  (ALDRI "Fint Hem")
   Domene:    https://finthjem.no
   Mål:       Toppresultat på Google for totalentreprenør, nybygg, renovering,
              byggservice og interiørdesign i Oslo / Norge og Sverige.
   ═══════════════════════════════════════════════════════════════════════════ */

const SITE_URL = 'https://finthjem.no'
const SITE_NAME = 'Fint Hjem'
const DEFAULT_TITLE =
  'Fint Hjem – Totalentreprenør i Oslo | Nybygg, Renovering & Interiør'
const DEFAULT_DESCRIPTION =
  'Fint Hjem er din totalentreprenør i Oslo og Stockholm med over 20 års erfaring. Vi leverer nøkkelferdige nybygg, renovering, byggservice og interiørdesign – fra søknad til innflytting. Book gratis befaring i dag.'
const OG_IMAGE = `${SITE_URL}/LOGO.png`

const KEYWORDS: string[] = [
  'Fint Hjem',
  'finthjem',
  'finthjem.no',
  'fint hjem oslo',
  'totalentreprenør Oslo',
  'totalentreprenør',
  'byggmester Oslo',
  'byggefirma Oslo',
  'entreprenør Oslo',
  'nybygg Oslo',
  'nøkkelferdig bolig',
  'bygge hus Oslo',
  'renovering Oslo',
  'renovasjon Oslo',
  'rehabilitering bolig',
  'totalrenovering Oslo',
  'baderomsrenovering Oslo',
  'kjøkkenrenovering Oslo',
  'byggservice Oslo',
  'snekker Oslo',
  'snekkerfirma Oslo',
  'tømrer Oslo',
  'flislegger Oslo',
  'maler Oslo',
  'VVS Oslo',
  'rørlegger Oslo',
  'tilbygg Oslo',
  'garasje Oslo',
  'anneks Oslo',
  'vinduer og dører Oslo',
  'interiørdesign Oslo',
  'interiørarkitekt Oslo',
  'homestyling Oslo',
  'boligstyling Oslo',
  'byggefirma Stockholm',
  'renovering Stockholm',
]

/* ── Root metadata — kilden til alt Google ser ───────────────────────────── */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: DEFAULT_TITLE,
    template: '%s | Fint Hjem',
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  generator: 'Next.js',
  keywords: KEYWORDS,
  authors: [{ name: 'Fint Hjem', url: SITE_URL }],
  creator: 'Fint Hjem',
  publisher: 'Fint Hjem',
  category: 'construction',
  classification: 'Byggefirma, Totalentreprenør, Interiørdesign',

  alternates: {
    canonical: SITE_URL,
    languages: {
      'nb-NO': SITE_URL,
      'sv-SE': SITE_URL,
      'x-default': SITE_URL,
    },
  },

  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    locale: 'nb_NO',
    alternateLocale: ['sv_SE', 'en_US'],
    url: SITE_URL,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'Fint Hjem – Totalentreprenør i Oslo',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [OG_IMAGE],
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/LOGOB.png', type: 'image/png' },
    ],
    apple: [{ url: '/LOGOB.png' }],
    shortcut: ['/favicon.ico'],
  },

  manifest: '/site.webmanifest',

  formatDetection: {
    email: true,
    telephone: true,
    address: true,
  },

  other: {
    'geo.region': 'NO-03',
    'geo.placename': 'Oslo',
    'geo.position': '59.9139;10.7522',
    ICBM: '59.9139, 10.7522',
  },

  // Når dere har verifisert domenet i Google/Bing Search Console:
  // legg inn koden under. Pass på at det er samme domene som i Search Console.
  verification: {
    // google: 'XXXXXXXXXXXXXXXXXXXXXX',
    // yandex: 'XXXXXXXXXXXXXXXXXXXX',
    // other: { 'msvalidate.01': 'XXXXXXXXXXXXXXXXXXXX' },
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f8f6f2' },
    { media: '(prefers-color-scheme: dark)', color: '#1a1714' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

/* ── JSON-LD: Organization, LocalBusiness (Oslo + Stockholm), WebSite ────── */
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['Organization', 'GeneralContractor'],
      '@id': `${SITE_URL}/#organization`,
      name: SITE_NAME,
      legalName: 'Fint Hjem AS',
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/LOGO.png`,
        width: 512,
        height: 512,
      },
      image: `${SITE_URL}/LOGO.png`,
      description: DEFAULT_DESCRIPTION,
      slogan: 'Vi bygger drømmehjem',
      email: 'info@finthjem.no',
      telephone: '+4746583867',
      areaServed: [
        { '@type': 'Country', name: 'Norge' },
        { '@type': 'Country', name: 'Sverige' },
      ],
      knowsAbout: [
        'Nybygg',
        'Totalentreprise',
        'Renovering',
        'Rehabilitering',
        'Baderomsrenovering',
        'Kjøkkenrenovering',
        'Snekkerarbeid',
        'Flislegging',
        'Maling',
        'VVS',
        'Rørleggerarbeid',
        'Tilbygg',
        'Vinduer og dører',
        'Interiørdesign',
        'Homestyling',
      ],
      sameAs: ['https://www.facebook.com/profile.php?id=100076333510353'],
      contactPoint: [
        {
          '@type': 'ContactPoint',
          contactType: 'customer service',
          telephone: '+4746583867',
          email: 'info@finthjem.no',
          availableLanguage: ['Norwegian', 'Swedish', 'English'],
          areaServed: ['NO', 'SE'],
        },
      ],
    },

    /* Lokalavdeling — Oslo */
    {
      '@type': 'LocalBusiness',
      '@id': `${SITE_URL}/#oslo`,
      name: 'Fint Hjem – Oslo',
      parentOrganization: { '@id': `${SITE_URL}/#organization` },
      url: SITE_URL,
      image: `${SITE_URL}/LOGO.png`,
      telephone: '+4746583867',
      email: 'info@finthjem.no',
      priceRange: '$$$',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Prinsensgate 5',
        addressLocality: 'Oslo',
        postalCode: '0152',
        addressRegion: 'Oslo',
        addressCountry: 'NO',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 59.9106,
        longitude: 10.7466,
      },
      areaServed: [
        { '@type': 'AdministrativeArea', name: 'Oslo' },
        { '@type': 'AdministrativeArea', name: 'Viken' },
        { '@type': 'AdministrativeArea', name: 'Akershus' },
      ],
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
          ],
          opens: '08:00',
          closes: '17:00',
        },
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: 'Saturday',
          opens: '09:00',
          closes: '15:00',
        },
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Byggtjenester',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Nybygg & Totalentreprise',
              description:
                'Nøkkelferdige boliger fra tomt til innflytting – søknad, tegning, bygging og overlevering.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Renovering & Rehabilitering',
              description:
                'Totalrenovering av bolig, kjøkken, bad, fasade, tak og energioppgradering.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Byggservice',
              description:
                'Snekkerarbeid, flislegging, maling, VVS, tilbygg, vinduer og dører – alt på ett sted.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Interiørdesign & Homestyling',
              description:
                'Konseptutvikling, 3D-visualisering, fargepalett, materialer og styling.',
            },
          },
        ],
      },
    },

    /* Lokalavdeling — Stockholm */
    {
      '@type': 'LocalBusiness',
      '@id': `${SITE_URL}/#stockholm`,
      name: 'Fint Hjem – Stockholm',
      parentOrganization: { '@id': `${SITE_URL}/#organization` },
      url: SITE_URL,
      image: `${SITE_URL}/LOGO.png`,
      telephone: '+4746583867',
      email: 'info@finthjem.no',
      priceRange: '$$$',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Storgatan 123',
        addressLocality: 'Stockholm',
        postalCode: '12345',
        addressCountry: 'SE',
      },
      areaServed: [{ '@type': 'AdministrativeArea', name: 'Stockholm' }],
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
          ],
          opens: '08:00',
          closes: '17:00',
        },
      ],
    },

    /* Nettside — gjør det klart at finthjem.no er sideenheten */
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: DEFAULT_DESCRIPTION,
      inLanguage: 'nb-NO',
      publisher: { '@id': `${SITE_URL}/#organization` },
      potentialAction: {
        '@type': 'SearchAction',
        target: `${SITE_URL}/?s={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="nb" dir="ltr">
      <head>
        {/* Resource hints — raskere første paint for bilder/fonter */}
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />

        {/* Strukturerte data — Google Rich Results */}
        <script
          type="application/ld+json"
          // Next render'er dette på server; ingen hydration-mismatch.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        {children}
        {/* Persistent mobile call-to-action — always one tap away while scrolling. */}
        <FloatingCallCta />
      </body>
    </html>
  )
}
