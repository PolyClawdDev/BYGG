import type { Metadata } from 'next'
import ServicePageShell from '../components/ServicePageShell'

export const metadata: Metadata = {
  title: 'Maling Oslo – Maler og overflatebehandling | Fint Hjem',
  description: 'Profesjonell maler i Oslo. Fint Hjem leverer innvendig og utvendig maling, tapetsering og sparkling. Ryddig, presis og til avtalt pris. Book gratis befaring.',
  keywords: ['maler Oslo', 'malerfirma Oslo', 'maling innvendig Oslo', 'maling utvendig Oslo', 'tapetsering Oslo', 'sparkling Oslo', 'Fint Hjem maling'],
  alternates: { canonical: 'https://finthjem.no/maling-oslo' },
  openGraph: {
    title: 'Maling Oslo – Maler og overflatebehandling | Fint Hjem',
    description: 'Profesjonell maling innvendig og utvendig i Oslo. Book gratis befaring.',
    url: 'https://finthjem.no/maling-oslo',
  },
}

export default function MalingOslo() {
  return (
    <ServicePageShell
      tag="MALING & OVERFLATER"
      num="03"
      headline="MALER OSLO"
      subheadline="Profesjonell overflatebehandling"
      image="https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?auto=format&fit=crop&w=1800&q=90"
      imageAlt="Profesjonell maler utfører innvendig maling i Oslo"
      ctaLabel="BOOK BEFARING"
      intro={[
        'Vi leverer profesjonell maling innvendig og utvendig i Oslo — inkludert sparkling, tapetsering og overflatebehandling av høyeste kvalitet.',
        'En god malersjobb handler om forberedelse. 80 % av resultatet bestemmes av sparlklingen, slipingen og grunderingen — selve malingen er den siste 20 %. Dessverre er det nettopp forberedelsene mange hopper over.',
        'Hos Fint Hjem gjør vi det riktig fra start. Vi sparker, slipper og grunder grundig, og leverer en overflate du vil se resultater av i mange år. Vi er ryddige, punktlige og kommuniserer tydelig underveis.',
        'Vi bruker kvalitetsprodukter fra Jotun, Beckers og andre anerkjente leverandører — og hjelper deg med fargevalg om ønskelig.',
      ]}
      features={[
        { title: 'Innvendig maling', desc: 'Vegger, tak og listverk males med presisjon. Vi sparker og slipper grundig for et perfekt sluttresultat.' },
        { title: 'Utvendig maling', desc: 'Fasade, kledning og detaljer males for å beskytte og forskjønne. Vi vurderer tilstand og anbefaler riktig behandling.' },
        { title: 'Sparkling og pussing', desc: 'Hulmål, sprekker og ujevnheter sparkes og slipper til en jevn, fin flate — grunnlaget for et godt malingsresultat.' },
        { title: 'Tapetsering', desc: 'Montering av alle tapettyper — papir, vinyl, stoff og strukturtapet — med nøyaktige skjøter og rent utseende.' },
        { title: 'Fargerådgivning', desc: 'Usikker på fargene? Vi hjelper deg med å finne en palett som kler boligen din og skaper det uttrykket du ønsker.' },
        { title: 'Ryddig og punktlig', desc: 'Vi beskytter gulv og møbler, rydder etter oss og leverer til avtalt tid. Ingen overraskelser.' },
      ]}
      faqs={[
        { q: 'Hva koster det å male en leilighet i Oslo?', a: 'Å male en gjennomsnittlig 3-roms leilighet koster fra 30 000–80 000 kr avhengig av standard og tilstand. Vi gir deg et fast prisestimat etter befaring.' },
        { q: 'Hvor lang tid tar malerarbeidet?', a: 'En 3-roms leilighet tar typisk 5–10 arbeidsdager inkludert sparkling og tørketid. Vi lager en tidsplan tilpasset din situasjon.' },
        { q: 'Kan dere hjelpe med fargevalg?', a: 'Ja. Vi kan anbefale fargesettere og hjelpe deg å finne farger som passer boligen din, lyset i rommene og din personlige stil.' },
        { q: 'Bruker dere miljøvennlig maling?', a: 'Ja. Vi bruker lavemisjonsmaling innvendig som standard — det er bedre for inneklimaet og for miljøet.' },
      ]}
    />
  )
}
