import type { Metadata } from 'next'
import ServicePageShell from '../components/ServicePageShell'
import { SITE_URL } from '../lib/site'

export const metadata: Metadata = {
  title: 'Renovering Oslo – Totalrenovering av bolig | Fint Hjem',
  description: 'Profesjonell renovering i Oslo. Fint Hjem leverer totalrenovering av bolig, kjøkken, bad, fasade og energioppgradering. Over 20 års erfaring. Book gratis befaring.',
  keywords: ['renovering Oslo', 'totalrenovering Oslo', 'renovere hus Oslo', 'oppussing Oslo', 'rehabilitering bolig Oslo', 'Fint Hjem renovering'],
  alternates: { canonical: `${SITE_URL}/renovering-oslo` },
  openGraph: {
    title: 'Renovering Oslo – Totalrenovering av bolig | Fint Hjem',
    description: 'Totalrenovering av bolig i Oslo – kjøkken, bad, fasade og mer. Book gratis befaring.',
    url: `${SITE_URL}/renovering-oslo`,
  },
}

export default function RenoveringOslo() {
  return (
    <ServicePageShell
      tag="RENOVASJON"
      num="02"
      headline="RENOVERING OSLO"
      subheadline="Totalrenovering av bolig"
      image="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1800&q=90"
      imageAlt="Nyrenovert moderne kjøkken i Oslo"
      ctaLabel="BOOK BEFARING"
      intro={[
        'Vi leverer totalrenovering i Oslo og Akershus — kjøkken, bad, fasade, tak og alt imellom. Gi hjemmet nytt liv med faglig håndverk og tydelig prosjektledelse.',
        'Renovering handler om mer enn å bytte fliser og male vegger. Det handler om å ta et hjem du elsker og gjøre det enda bedre — med respekt for det som allerede er bra, og motet til å skape noe ekstraordinært der det trengs.',
        'Hos Fint Hjem starter vi alltid med en grundig befaring og en ærlig samtale om hva du ønsker, hva som er teknisk nødvendig, og hva som gir deg mest verdi for pengene. Vi utarbeider en detaljert tidsplan og et fast prisoverslag — ingen overraskelser underveis.',
        'Vi samarbeider med godkjente fagfolk innen alle disipliner: snekker, flislegger, maler, rørlegger og elektriker. Alt koordineres av én prosjektleder som er ditt kontaktpunkt gjennom hele prosessen.',
      ]}
      features={[
        { title: 'Totalrenovering av bolig', desc: 'Komplett renovering av hele boligen — planlegging, riving, bygging og ferdigstillelse i ett samlet prosjekt.' },
        { title: 'Kjøkken og stue', desc: 'Nye kjøkkenløsninger, åpne planløsninger, gulv og overflater tilpasset din livsstil og ditt budsjett.' },
        { title: 'Bad og våtrom', desc: 'Komplette baderomsrenovasjoner etter NS 3420 — membran, sluk, flislegging og sanitær av godkjente fagfolk.' },
        { title: 'Fasade og tak', desc: 'Kledning, vinduer, dører, taktekking og energioppgradering som øker boligens verdi og reduserer varmetapet.' },
        { title: 'Elektrisk og VVS', desc: 'Oppgradering av eldre el-anlegg og røropplegget til moderne standard — trygt, effektivt og dokumentert.' },
        { title: 'Detaljert tidsplan', desc: 'Du vet alltid hva som skjer, når det skjer og hvem som er på jobb. Tydelig kommunikasjon gjennom hele prosjektet.' },
      ]}
      faqs={[
        { q: 'Hva koster en totalrenovering i Oslo?', a: 'Prisen varierer mye avhengig av omfang og standard. En typisk leilighetsrenovering i Oslo koster fra 400 000–1 200 000 kr. Vi gir deg et nøyaktig tilbud etter befaring.' },
        { q: 'Kan vi bo hjemme under renovering?', a: 'Det avhenger av omfanget. Ved totalrenovering anbefaler vi som regel at dere bor et annet sted i perioden. Vi kan hjelpe med å planlegge framdriften slik at ulempene minimeres.' },
        { q: 'Hvor lang tid tar en leilighetsrenovering?', a: 'En gjennomsnittlig leilighetsrenovering tar 6–14 uker avhengig av størrelse og omfang. Vi lager alltid en detaljert tidsplan før oppstart.' },
        { q: 'Ordner dere søknad om tillatelse?', a: 'Ja. Tiltak som krever søknad til kommunen (f.eks. endring av bærende vegger, fasadeendringer) håndteres av oss.' },
      ]}
    />
  )
}
