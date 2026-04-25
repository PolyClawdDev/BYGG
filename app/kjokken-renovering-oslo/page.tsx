import type { Metadata } from 'next'
import ServicePageShell from '../components/ServicePageShell'

export const metadata: Metadata = {
  title: 'Kjøkken renovering Oslo – Nytt kjøkken | Fint Hjem',
  description: 'Kjøkkenrenovering i Oslo av fagfolk. Fint Hjem leverer nye kjøkken, åpne planløsninger og totalrenovering av kjøkkenrom. Fast pris og garanti. Book gratis befaring.',
  keywords: ['kjøkken renovering Oslo', 'nytt kjøkken Oslo', 'kjøkkeninnredning Oslo', 'kjøkkenrenovering pris', 'Fint Hjem kjøkken'],
  alternates: { canonical: 'https://finthjem.no/kjokken-renovering-oslo' },
  openGraph: {
    title: 'Kjøkken renovering Oslo – Nytt kjøkken | Fint Hjem',
    description: 'Profesjonell kjøkkenrenovering i Oslo. Fra gammel kjøkken til drømmekjøkken. Book gratis befaring.',
    url: 'https://finthjem.no/kjokken-renovering-oslo',
  },
}

export default function KjokkenRenoveringOslo() {
  return (
    <ServicePageShell
      tag="KJØKKEN"
      num="02"
      headline="KJØKKEN OSLO"
      subheadline="Fra gammelt til drømmekjøkken"
      image="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1800&q=90"
      imageAlt="Moderne nyrenovert kjøkken i Oslo"
      ctaLabel="BOOK BEFARING"
      intro={[
        'Vi renoverer kjøkken i Oslo — fra enkle oppgraderinger til komplette ombygginger med ny planløsning, nye overflater og moderne tekniske installasjoner.',
        'Kjøkkenet er hjertets rom. Det er her familien samles, venner tas imot og hverdagen skjer. Et godt kjøkken skal ikke bare se bra ut — det skal fungere optimalt for akkurat din livsstil.',
        'Hos Fint Hjem starter vi med å lytte til deg: hvordan bruker du kjøkkenet? Hva fungerer ikke? Hva drømmer du om? Deretter lager vi en plan som balanserer dine ønsker, rommets muligheter og budsjettet ditt.',
        'Vi samarbeider med de ledende kjøkkenleverandørene og sørger for at alle tekniske installasjoner — rørlegger, elektriker, ventilasjon — gjøres av godkjente fagfolk.',
      ]}
      features={[
        { title: 'Ny kjøkkeninnredning', desc: 'Vi leverer og monterer kjøkken fra anerkjente leverandører — tilpasset din smak, ditt rom og ditt budsjett.' },
        { title: 'Åpen planløsning', desc: 'Fjerne vegger og skape åpen kjøkken/stue-løsning? Vi håndterer alt — inkludert eventuelle søknader til kommunen.' },
        { title: 'Nye overflater', desc: 'Gulv, vegger og tak fornyes med materialer som tåler det aktive kjøkkenmiljøet og ser tidløst vakre ut.' },
        { title: 'VVS og rørlegger', desc: 'Godkjent rørlegger monterer oppvask, komfyr, kjøleskap med vannkobling og eventuelle nye rørføringer.' },
        { title: 'Elektriker og ventilasjon', desc: 'Nytt el-opplegg, stikkontakter, belysning og ventilasjon/avtrekk monteres av sertifisert elektriker.' },
        { title: 'Ferdig på tid og budsjett', desc: 'Vi leverer det vi lover, til avtalt pris. Ingen overraskelser på sluttfakturaen.' },
      ]}
      faqs={[
        { q: 'Hva koster en kjøkkenrenovering i Oslo?', a: 'En kjøkkenrenovering i Oslo koster fra 150 000–500 000 kr avhengig av størrelse, valg av innredning og omfanget av tekniske arbeider. Vi gir deg et fast prisoverslag etter befaring.' },
        { q: 'Kan dere hjelpe med design og planlegging?', a: 'Ja. Vi hjelper deg med planlegging, materialvalg og layoutoptimalisering — gjerne med 3D-visualisering slik at du ser resultatet før vi starter.' },
        { q: 'Trenger jeg å flytte ut under kjøkkenrenovering?', a: 'Det er mulig å bo hjemme under en kjøkkenrenovering, men du vil ikke ha brukbart kjøkken i perioden (typisk 2–5 uker). Vi koordinerer arbeidet for å minimere ulempen.' },
        { q: 'Håndterer dere også elektriker og rørlegger?', a: 'Ja. Vi koordinerer alle fag — snekker, elektriker, rørlegger og flislegger — slik at du kun forholder deg til én kontaktperson.' },
      ]}
    />
  )
}
