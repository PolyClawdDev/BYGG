import type { Metadata } from 'next'
import ServicePageShell from '../components/ServicePageShell'

export const metadata: Metadata = {
  title: 'Renovering Holmenkollen Oslo – Prestisjeoppdrag | Fint Hjem',
  description: 'Renovering på Holmenkollen og Vestre Aker. Fint Hjem leverer høystandard renovering og nybygg i Oslo vest. Diskret, presist og til avtalt pris. Book gratis befaring.',
  keywords: ['renovering Holmenkollen', 'håndverker Holmenkollen', 'totalrenovering Oslo vest', 'renovering Vinderen', 'renovering Ullern', 'Fint Hjem Holmenkollen'],
  alternates: { canonical: 'https://finthjem.no/renovering-holmenkollen' },
  openGraph: {
    title: 'Renovering Holmenkollen Oslo – Prestisjeoppdrag | Fint Hjem',
    description: 'Høystandard renovering på Holmenkollen og Oslo vest. Book gratis befaring.',
    url: 'https://finthjem.no/renovering-holmenkollen',
  },
}

export default function RenoveringHolmenkollen() {
  return (
    <ServicePageShell
      tag="HOLMENKOLLEN — OSLO"
      num="03"
      headline="RENOVERING HOLMENKOLLEN"
      subheadline="Høystandard håndverk i Oslo vest"
      image="https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1800&q=90"
      imageAlt="Eksklusiv villa ved Holmenkollen i Oslo"
      ctaLabel="BOOK BEFARING"
      intro={[
        'Vi leverer høystandard renovering og nybygg ved Holmenkollen og i Oslo vest — diskret, presist og med den kvaliteten som forventes av et prestisjeoppdrag.',
        'Holmenkollen-området representerer noe av det ypperste i norsk boligmasse — store villaer og eneboliger med historikk, sjel og utsikt. Å renovere her krever fagfolk som forstår at detaljene teller, at materialvalget kommuniserer klasse, og at prosessen er like viktig som resultatet.',
        'Vi arbeider stille og effektivt. Vi rydder etter oss. Vi kommuniserer tydelig. Og vi leverer arbeid du kan vise frem med stolthet — enten det gjelder et nytt bad av ypperste klasse, en totalrenovering av en hundre år gammel villa eller et skreddersydd tilbygg.',
        'Vi dekker Holmenkollen, Vinderen, Ullern, Røa, Heggedal, Slemdal og tilgrensende områder i Oslo vest.',
      ]}
      features={[
        { title: 'Høystandard totalrenovering', desc: 'Komplett oppgradering av villa og enebolig med premium materialer og gjennomtenkte løsninger.' },
        { title: 'Eksklusive bad', desc: 'Baderomsrenovering med naturstein, innfelte badekummer og skreddersydde løsninger — uten kompromisser.' },
        { title: 'Skreddersydd kjøkken', desc: 'Kjøkken designet og bygget for den spesifikke boligen — ikke standardhyller, men presise løsninger.' },
        { title: 'Tilbygg og anneks', desc: 'Utvidelser som sømløst integreres med den eksisterende arkitekturen — like eiendommens karakter tro.' },
        { title: 'Interiørdesign-koordinering', desc: 'Vi koordinerer med interiørarkitekt og leverandører slik at materialvalg, farger og finish henger sammen.' },
        { title: 'Diskresjon og pålitelighet', desc: 'Vi behandler din bolig og ditt privatliv med respekt. Ryddig rigg, avtalte arbeidstider og null overraskelser.' },
      ]}
      faqs={[
        { q: 'Tar dere oppdrag i hele Oslo vest?', a: 'Ja. Vi jobber i Holmenkollen, Vinderen, Ullern, Røa, Slemdal, Heggedal og tilgrensende områder i Oslo vest og Bærum.' },
        { q: 'Hva koster renovering av stor villa?', a: 'Store villaprosjekter prises alltid individuelt etter befaring og gjennomgang av omfang. Vi gir fast pris etter befaring.' },
        { q: 'Kan dere anbefale interiørarkitekt?', a: 'Ja. Vi samarbeider med dyktige interiørarkitekter og designere og kan koordinere dette som del av totalprosjektet.' },
        { q: 'Tar dere bare store prosjekter?', a: 'Nei. Vi tar prosjekter av alle størrelser — fra ett bad til total villarenovering. Kvaliteten er den samme uansett størrelse.' },
      ]}
    />
  )
}
