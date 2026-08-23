import type { Metadata } from 'next'
import ServicePageShell from '../components/ServicePageShell'
import { SITE_URL } from '../lib/site'

export const metadata: Metadata = {
  title: 'Renovering Majorstuen Oslo – Bad, kjøkken og leilighet | Fint Hjem',
  description: 'Renovering på Majorstuen i Oslo. Fint Hjem leverer bad, kjøkken og totalrenovering av leiligheter på Majorstuen og omegn. Fast pris og garanti. Book gratis befaring.',
  keywords: ['renovering Majorstuen', 'oppussing Majorstuen Oslo', 'bad renovering Majorstuen', 'kjøkken Majorstuen', 'håndverker Majorstuen Oslo'],
  alternates: { canonical: `${SITE_URL}/renovering-majorstuen` },
  openGraph: {
    title: 'Renovering Majorstuen Oslo – Bad, kjøkken og leilighet | Fint Hjem',
    description: 'Renovering på Majorstuen. Bad, kjøkken og totalrenovering. Book gratis befaring.',
    url: `${SITE_URL}/renovering-majorstuen`,
  },
}

export default function RenoveringMajorstuen() {
  return (
    <ServicePageShell
      tag="MAJORSTUEN — OSLO"
      num="04"
      headline="RENOVERING MAJORSTUEN"
      subheadline="Leilighetsrenovering i hjertet av Oslo"
      image="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1800&q=90"
      imageAlt="Renovert leilighet på Majorstuen i Oslo"
      ctaLabel="BOOK BEFARING"
      intro={[
        'Vi leverer renovering på Majorstuen og omegn — bad, kjøkken, totalrenovering av leiligheter og all type håndverksarbeid i sentrale Oslo.',
        'Majorstuen er et pulserende og populært boområde sentralt i Oslo, med en blanding av klassiske bygårder og nyere bygg. Her bor folk som stiller høye krav til håndverk, leveranse og kommunikasjon — og det liker vi.',
        'Vi har god erfaring med renovering i tett bebodde bygårder på Majorstuen og omegn: koordinering med styret, varsling av naboer, ryddig rigg og arbeidsmetoder som tar hensyn til at livet fortsetter rundt deg.',
        'Vi jobber i hele området rundt Majorstuen, inkludert Bislett, Homansbyen, Fagerborg, Uranienborg og Skillebekk.',
      ]}
      features={[
        { title: 'Baderomsrenovering', desc: 'Komplette bad — membran, sluk, fliser og sanitær utført etter gjeldende BBV-norm.' },
        { title: 'Kjøkkenrenovering', desc: 'Nytt kjøkken, åpen planløsning eller oppgradering — vi hjelper fra idé til ferdig resultat.' },
        { title: 'Totalrenovering leilighet', desc: 'Alle rom, alle overflater, alle tekniske installasjoner — koordinert og levert som ett prosjekt.' },
        { title: 'Gulv og parkett', desc: 'Ny parkett, gulvslipeing eller fliser — vi velger løsninger som passer leilighetens karakter.' },
        { title: 'Maling og overflater', desc: 'Sparkling, maling og tapetsering med grundig forbehandling for et varig resultat.' },
        { title: 'Ryddig i bygård', desc: 'Vi koordinerer med styret, varsler naboer og holder bygget ryddig og støyfritt.' },
      ]}
      faqs={[
        { q: 'Jobber dere i alle bygårder på Majorstuen?', a: 'Ja. Vi har erfaring med alle typer bygårder — borettslag, sameier og selveierleiligheter. Vi koordinerer nødvendige godkjenninger med styret.' },
        { q: 'Hvor lang tid tar en leilighetsrenovering på Majorstuen?', a: 'En typisk 3-roms leilighetsrenovering tar 8–14 uker. Vi lager en detaljert tidsplan ved oppstart.' },
        { q: 'Kan vi bo hjemme under renoveringen?', a: 'Det avhenger av omfanget. Ved totalrenovering anbefales det å bo et annet sted. Vi planlegger framdriften for å minimere ulempene.' },
        { q: 'Dekker dere også Bislett og Fagerborg?', a: 'Ja. Vi jobber i hele indre Oslo vest — Majorstuen, Bislett, Fagerborg, Homansbyen, Uranienborg og Skillebekk.' },
      ]}
    />
  )
}
