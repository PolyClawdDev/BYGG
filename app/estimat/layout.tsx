import type { Metadata } from 'next'
import { SITE_URL } from '../lib/site'

const PAGE_URL = `${SITE_URL}/estimat`
const OG_IMAGE = `${SITE_URL}/FAVICON.png`

const TITLE = 'Be om gratis befaring – Fint Hjem'
const DESCRIPTION =
  'Book gratis og uforpliktende befaring hos Fint Hjem. Vi ser på prosjektet ditt i Oslo og omegn og gir deg en eksakt pris med tidsplan — for nybygg, renovering, bad, kjøkken og byggservice.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    'gratis befaring Oslo',
    'be om befaring',
    'pristilbud renovering Oslo',
    'tilbud totalentreprenør Oslo',
    'befaring renovering',
    'pris oppussing leilighet',
    'pris renovering bad',
    'pris renovering kjøkken',
    'Fint Hjem befaring',
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
        alt: 'Fint Hjem – be om gratis befaring',
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
    // Worth indexing — "gratis befaring Oslo" and "pristilbud renovering"
    // are high-intent queries and this is the page that converts them.
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
