import type { Metadata } from 'next'
import ServicePageShell from '../components/ServicePageShell'
import { SITE_URL } from '../lib/site'

export const metadata: Metadata = {
  title: 'Gulv Oslo – Parkett, fliser og gulvlegging',
  description: 'Profesjonell gulvlegging i Oslo. Fint Hjem leverer parkett, laminat, fliser og gulvslipeing. Faglig håndverk og fast pris. Book gratis befaring.',
  keywords: ['gulv Oslo', 'parkett Oslo', 'gulvlegging Oslo', 'parkettlegging Oslo', 'gulvslipeing Oslo', 'fliser gulv Oslo', 'Fint Hjem gulv'],
  alternates: { canonical: `${SITE_URL}/gulv-parkett-oslo` },
  openGraph: {
    title: 'Gulv Oslo – Parkett, fliser og gulvlegging | Fint Hjem',
    description: 'Profesjonell gulvlegging og parkett i Oslo. Fast pris og garanti. Book gratis befaring.',
    url: `${SITE_URL}/gulv-parkett-oslo`,
  },
}

export default function GulvParkett() {
  return (
    <ServicePageShell
      tag="GULV & PARKETT"
      num="08"
      headline="GULV OSLO"
      subheadline="Parkett, fliser og gulvlegging"
      image="https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=1800&q=90"
      imageAlt="Vakker parkettgulv i moderne bolig i Oslo"
      ctaLabel="BOOK BEFARING"
      intro={[
        'Vi legger gulv i Oslo — parkett, laminat, fliser og vinyl av høyeste kvalitet. Ryddig håndverk, presis montering og finish som varer.',
        'Gulvet er en av boligens viktigste overflater. Det setter tonen for hele rommet, tåler daglig slitasje og påvirker akustikk, varmekomfort og vedlikeholdsbehov i årevis fremover. Det lønner seg å velge riktig — og å la fagfolk legge det.',
        'Hos Fint Hjem hjelper vi deg med å velge riktig gulvtype for hvert rom basert på bruksområde, stil og budsjett. Vi legger grundig underlag og sørger for korrekt akklimatisering av materiale for et resultat som holder formen over tid.',
        'Vi utfører også gulvslipeing og overflatebehandling av eksisterende tregulv — et svært kostnadseffektivt alternativ til å legge nytt.',
      ]}
      features={[
        { title: 'Parkettlegging', desc: 'Massivparkett og stavparkett i eik, ask, valnøtt og andre tresorter — limt eller flytende etter underlaget.' },
        { title: 'Laminat og vinylgulv', desc: 'Slitesterkt laminat og LVP/vinyl for høy trafikk og fuktige rom — praktisk og vakkert.' },
        { title: 'Fliser på gulv', desc: 'Naturstein, keramikk og porselensfliser lagt med presise fuger og korrekt fall der det trengs.' },
        { title: 'Gulvslipeing', desc: 'Maskinslipeing og lakking/oljebehandling av eksisterende tregulv — nytt utseende til en brøkdel av prisen.' },
        { title: 'Undergulv og utjevning', desc: 'Korrekt undergulv er avgjørende for resultatet. Vi utjevner, tørker og forbereder underlaget profesjonelt.' },
        { title: 'Varmekabler under gulv', desc: 'Elektrisk gulvvarme under flis og laminat — vi koordinerer elektrikeren og sørger for riktig installasjon.' },
      ]}
      faqs={[
        { q: 'Hva koster ny parkett i Oslo?', a: 'Parkettlegging i Oslo koster typisk 350–700 kr/m² for arbeid, pluss materialkostnad på 300–900 kr/m². Vi gir fast pris etter befaring.' },
        { q: 'Hva er best — parkett, laminat eller vinyl?', a: 'Det avhenger av rommet. Massivparkett er tidløst og kan slipes på nytt. Laminat er billig og slitesterkt. Vinyl er best for kjøkken og bad. Vi hjelper deg velge riktig.' },
        { q: 'Kan dere slipe eksisterende gulv?', a: 'Ja. Vi slipper og behandler tregulv med maskinell sliper. Resultatet er som nytt — til en langt lavere pris enn å legge nytt gulv.' },
        { q: 'Hvor lang tid tar gulvlegging?', a: 'En gjennomsnittlig leilighet (60–90 m²) tar 3–6 dager. Vi tar hensyn til akklimatiseringstid for tremateri­aler.' },
      ]}
    />
  )
}
