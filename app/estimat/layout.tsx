import type { Metadata } from 'next'

const SITE_URL = 'https://finthjem.no'
const PAGE_URL = `${SITE_URL}/estimat`
const OG_IMAGE = `${SITE_URL}/FAVICON.png`

const TITLE = 'Prosjektplanner & Estimat – Fint Hjem'
const DESCRIPTION =
  'Planlegg bygg- eller renoveringsprosjektet ditt steg for steg. Få et grovt prisestimat og tidsestimat fra Fint Hjems AI-assistent — last opp bilder, beskriv prosjektet og bestill gratis befaring i Oslo.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    'prosjektplanner bygg',
    'renovering estimat Oslo',
    'byggkalkulator',
    'pris oppussing leilighet',
    'pris renovering bad',
    'pris renovering kjøkken',
    'gratis befaring Oslo',
    'Fint Hjem estimat',
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
        width: 512,
        height: 512,
        alt: 'Fint Hjem prosjektplanner',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
  robots: {
    // Allow indexing — it's a useful landing page for keywords like
    // "prisestimat renovering Oslo". The chat itself runs client-side so
    // there's nothing user-specific in the SSR payload.
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function EstimatLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
