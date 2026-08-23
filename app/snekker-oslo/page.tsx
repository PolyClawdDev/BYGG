import type { Metadata } from 'next'
import ServicePageShell from '../components/ServicePageShell'
import { SITE_URL } from '../lib/site'

export const metadata: Metadata = {
  title: 'Snekker Oslo – Snekkerarbeid og trevare',
  description: 'Dyktig snekker i Oslo. Fint Hjem leverer skreddersydde trevareløsninger, innredning, trapper, dører og finish av høyeste håndverkskvalitet. Book gratis befaring.',
  keywords: ['snekker Oslo', 'snekkerfirma Oslo', 'tømrer Oslo', 'snekkerarbeid Oslo', 'innredningssnekker Oslo', 'Fint Hjem snekker'],
  alternates: { canonical: `${SITE_URL}/snekker-oslo` },
  openGraph: {
    title: 'Snekker Oslo – Snekkerarbeid og trevare | Fint Hjem',
    description: 'Skreddersydde trevareløsninger og snekkerarbeid i Oslo. Book gratis befaring.',
    url: `${SITE_URL}/snekker-oslo`,
  },
}

export default function SnekkerOslo() {
  return (
    <ServicePageShell
      tag="SNEKKERARBEID"
      num="03"
      headline="SNEKKER OSLO"
      subheadline="Skreddersydde trevareløsninger"
      image="https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=1800&q=90"
      imageAlt="Håndverker utfører presist snekkerarbeid i Oslo"
      ctaLabel="BOOK BEFARING"
      intro={[
        'Vi leverer snekkerarbeid og trevareløsninger i Oslo av høyeste håndverkskvalitet — skreddersydd til ditt hjem, din smak og dine behov.',
        'God snekring er kunsten å kombinere funksjon og estetikk med presisjon. Det er forskjellen mellom et hjem som bare er funksjonelt og ett som føles virkelig gjennomtenkt og personlig.',
        'Hos Fint Hjem har vi snekkere med lang erfaring fra alle typer trearbeid — fra store konstruksjoner til de minste detaljene. Vi behandler hvert prosjekt med samme omhu uansett størrelse.',
        'Vi bruker kvalitetsmaterialer og holder oss til avtalte priser og tidsfrister. Arbeidet dokumenteres og garanteres.',
      ]}
      features={[
        { title: 'Skreddersydd innredning', desc: 'Garderobeløsninger, bokhyller, TV-vegger og skap bygget nøyaktig etter mål — ingen standardhyller.' },
        { title: 'Trapper og rekkverk', desc: 'Nye trapper, oppgradering av eksisterende trapper og rekkverk i tre, stål eller kombinasjoner.' },
        { title: 'Dører og listverk', desc: 'Montering av innerdører, karmer og listverk med den presisjon og finishen som skiller godt håndverk fra ordinært.' },
        { title: 'Panel og kledning', desc: 'Innvendig panel, trepanel på vegger og tak gir rommet karakter og varme — perfekt utført av våre fagfolk.' },
        { title: 'Terrasse og utvendig tre', desc: 'Terrasser, verandaer og utvendig kledning i trykkimpregnert tre, hardtre eller compositt.' },
        { title: 'Finish og detaljer', desc: 'Det er detaljene som avgjør. Vi tar oss tid til å levere en overflate og finish du er stolt av å vise frem.' },
      ]}
      faqs={[
        { q: 'Hva koster en skreddersydd garderobe i Oslo?', a: 'En skreddersydd garderobe koster typisk fra 25 000–80 000 kr avhengig av størrelse og materialvalg. Vi gir deg et fast tilbud etter befaring.' },
        { q: 'Kan dere ta både store og små snekkeroppdrag?', a: 'Ja. Vi tar oppdrag av alle størrelser — fra montering av enkle lister til fullstendige innredningsprosjekter.' },
        { q: 'Hvilke materialer bruker dere?', a: 'Vi bruker kvalitetsmaterialer fra anerkjente leverandører — furu, eik, MDF, lakkert MDF og komposittmaterialer avhengig av bruksområde og kundens ønsker.' },
        { q: 'Er snekkeren godkjent?', a: 'Ja. Våre snekkere er fagutdannede tømmermestre og håndverkere med mesterbrev eller tilsvarende fagkompetanse.' },
      ]}
    />
  )
}
