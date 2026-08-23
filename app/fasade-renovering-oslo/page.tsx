import type { Metadata } from 'next'
import ServicePageShell from '../components/ServicePageShell'
import { SITE_URL } from '../lib/site'

export const metadata: Metadata = {
  title: 'Fasade renovering Oslo – Kledning og tak | Fint Hjem',
  description: 'Profesjonell fasadrenovering i Oslo. Fint Hjem leverer kledning, takrenove­ring, isolasjon og energioppgradering av fasade. Godkjente fagfolk. Book gratis befaring.',
  keywords: ['fasade renovering Oslo', 'fasaderehabilitering Oslo', 'ny kledning Oslo', 'tak renovering Oslo', 'isolere hus Oslo', 'Fint Hjem fasade'],
  alternates: { canonical: `${SITE_URL}/fasade-renovering-oslo` },
  openGraph: {
    title: 'Fasade renovering Oslo – Kledning og tak | Fint Hjem',
    description: 'Fasadrenovering og kledning i Oslo. Bedre isolasjon og nytt utseende. Book gratis befaring.',
    url: `${SITE_URL}/fasade-renovering-oslo`,
  },
}

export default function FasadeRenoveringOslo() {
  return (
    <ServicePageShell
      tag="FASADE & TAK"
      num="07"
      headline="FASADE OSLO"
      subheadline="Kledning, tak og energioppgradering"
      image="https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1800&q=90"
      imageAlt="Renovert fasade på enebolig i Oslo"
      ctaLabel="BOOK BEFARING"
      intro={[
        'Vi leverer fasadrenovering i Oslo — ny kledning, taktekking, isolasjonsoppgradering og overflatebehandling som gir boligen nytt liv og lavere energikostnader.',
        'Fasaden er boligens første inntrykk — og det første som utsettes for vind, regn og frost. En slitt fasade gir ikke bare dårlig estetikk, den kan også skjule fuktskader og kuldebroer som koster deg dyrt i oppvarming.',
        'Hos Fint Hjem gjennomfører vi alltid en grundig tilstandsvurdering av fasaden og taket før vi anbefaler tiltak. Vi er ærlige om hva som er nødvendig og hva som er valgfritt — ingen unødvendige kostnader.',
        'Vi bruker kvalitetsmaterialer fra norske og skandinaviske leverandører og sørger for at alt arbeid utføres etter gjeldende byggeforskrifter.',
      ]}
      features={[
        { title: 'Ny kledning', desc: 'Utvendig kledning i stående eller liggende panel — trykkimpregnert furu, osp, hardtre eller fiber­sementplater.' },
        { title: 'Taktekking', desc: 'Utskifting og rehabilitering av tak — takstein, ståltak, shingel og papp. Vi vurderer tilstand og anbefaler riktig løsning.' },
        { title: 'Isolasjonsoppgradering', desc: 'Etterisolering av vegger og tak reduserer varmetapet markant og kan gi Enova-støtte.' },
        { title: 'Malingsbehandling utvendig', desc: 'Overflatebehandling og maling av utvendig kledning for optimal beskyttelse og estetikk.' },
        { title: 'Vinduer og dørskifte', desc: 'Koordinert utskifting av vinduer og dører som del av en helhetlig fasadeoppgradering.' },
        { title: 'Pipearbeid og detaljer', desc: 'Rehabilitering av piper, beslag, takrenner og nedløp — detaljene som avgjør om fasaden holder i 30 år.' },
      ]}
      faqs={[
        { q: 'Hva koster en fasadrenovering i Oslo?', a: 'Prisen varierer etter størrelse og omfang. En gjennomsnittlig enebolig koster fra 200 000–600 000 kr for komplett fasadrenovering inkludert kledning og maling. Vi gir fast pris etter befaring.' },
        { q: 'Trenger fasadrenovering søknad til kommunen?', a: 'Endring av fasadfarge eller materiale kan kreve søknad, særlig i regulerte strøk og vernede områder. Vi sjekker dette for deg.' },
        { q: 'Kan vi få Enova-støtte for isolering?', a: 'Ja. Etterisolering av vegger og loft kan gi støtte fra Enova. Vi hjelper deg med å finne aktuelle støtteordninger.' },
        { q: 'Hvor lenge holder ny fasadekledning?', a: 'Kvalitetskledning korrekt montert og behandlet holder 25–40 år med jevnlig vedlikehold. Vi gir deg et vedlikeholdsråd ved overlevering.' },
      ]}
    />
  )
}
