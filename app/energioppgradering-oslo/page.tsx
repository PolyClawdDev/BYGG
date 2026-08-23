import type { Metadata } from 'next'
import ServicePageShell from '../components/ServicePageShell'
import { SITE_URL } from '../lib/site'

export const metadata: Metadata = {
  title: 'Energioppgradering bolig Oslo – Enova støtte | Fint Hjem',
  description: 'Energioppgradering av bolig i Oslo. Fint Hjem leverer etterisolering, varmepumpe, nye vinduer og Enova-støtte. Lavere strømregning og høyere boligverdi. Book befaring.',
  keywords: ['energioppgradering Oslo', 'etterisolering Oslo', 'varmepumpe Oslo', 'Enova støtte', 'energieffektivisering bolig', 'Fint Hjem energi'],
  alternates: { canonical: `${SITE_URL}/energioppgradering-oslo` },
  openGraph: {
    title: 'Energioppgradering bolig Oslo – Enova støtte | Fint Hjem',
    description: 'Energioppgradering av bolig i Oslo. Lavere strømregning, Enova-støtte. Book befaring.',
    url: `${SITE_URL}/energioppgradering-oslo`,
  },
}

export default function EnergioppgraderingOslo() {
  return (
    <ServicePageShell
      tag="ENERGIOPPGRADERING"
      num="09"
      headline="ENERGIOPPGRADERING OSLO"
      subheadline="Lavere strøm­regning og høyere boligverdi"
      image="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1800&q=90"
      imageAlt="Moderne energieffektiv bolig i Oslo"
      ctaLabel="BOOK BEFARING"
      intro={[
        'Vi energioppgraderer boliger i Oslo — etterisolering, varmepumpe, nye vinduer og tetting. Lavere strømregning, bedre komfort og mulighet for Enova-støtte.',
        'Med de siste årenes strømprisøkninger har energieffektivisering av boligen aldri vært mer lønnsomt. En gjennomsnittlig norsk enebolig fra 1980-tallet kan spare 20 000–50 000 kr per år i strømkostnader etter en god energioppgradering.',
        'Hos Fint Hjem starter vi alltid med en energikartlegging av boligen. Vi identifiserer de tiltakene som gir best effekt per krone investert, og guider deg gjennom hvilke Enova-støtteordninger du kan søke.',
        'Vi håndterer alt fra søknadsprosessen til ferdig utført arbeid med dokumentasjon — slik at du kan søke Enova-støtten trygt og korrekt.',
      ]}
      features={[
        { title: 'Etterisolering vegger', desc: 'Innvendig eller utvendig etterisolering av yttervegger reduserer varmetapet og øker komforten markant.' },
        { title: 'Isolering av loft og kjeller', desc: 'Loft- og kjellerisolasjon er ofte de rimeligste og mest effektive tiltakene. Vi vurderer tilstand og anbefaler riktig løsning.' },
        { title: 'Varmepumpe', desc: 'Luft-til-luft og luft-til-vann varmepumper som kan halvere oppvarmingskostnadene. Vi hjelper med valg og installasjon.' },
        { title: 'Nye energieffektive vinduer', desc: 'Energivindu med 3-lags glass reduserer varmetapet gjennom vinduer med opp til 70 % sammenlignet med eldre glass.' },
        { title: 'Tetting og kuldebroer', desc: 'Tetting av luftlekkasjer rundt vinduer, dører og gjennomføringer gir umiddelbar forbedring i komfort og energibruk.' },
        { title: 'Enova-søknad og dokumentasjon', desc: 'Vi hjelper deg med å søke Enova-støtte for relevante tiltak og leverer all nødvendig dokumentasjon.' },
      ]}
      faqs={[
        { q: 'Hva er Enova-støtte og hvem kan søke?', a: 'Enova er et statlig foretak som gir støtte til energieffektivisering av boliger. Alle norske husholdninger kan søke. Støtten varierer fra 10 000 til over 100 000 kr avhengig av tiltak.' },
        { q: 'Hva koster en energioppgradering?', a: 'Det avhenger av omfang. Enkle tiltak som tetting og loftisolering koster fra 20 000–60 000 kr. En komplett energioppgradering med nye vinduer og varmepumpe koster fra 200 000–500 000 kr — men gir store besparelser over tid.' },
        { q: 'Lønner det seg å energioppgradere?', a: 'I de fleste tilfeller ja. Med dagens strømpris er tilbakebetalingstiden for mange tiltak 5–12 år. Etterpå sparer du penger hvert eneste år — og boligens verdi øker.' },
        { q: 'Trenger vi søknad for energioppgradering?', a: 'Noen tiltak krever søknad (f.eks. fasadeendringer), mens andre som loftisolering ikke krever det. Vi avklarer dette i sin helhet før oppstart.' },
      ]}
    />
  )
}
