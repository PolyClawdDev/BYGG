import type { Metadata } from 'next'
import ServicePageShell from '../components/ServicePageShell'
import { SITE_URL } from '../lib/site'

export const metadata: Metadata = {
  title: 'Renovering Frogner Oslo – Totalentreprenør',
  description: 'Renovering på Frogner i Oslo. Fint Hjem leverer totalrenovering, bad, kjøkken og fasade i Frogner-området. Erfarne håndverkere med respekt for klassisk arkitektur. Book befaring.',
  keywords: ['renovering Frogner', 'totalrenovering Frogner Oslo', 'håndverker Frogner', 'oppussing Frogner', 'snekker Frogner Oslo'],
  alternates: { canonical: `${SITE_URL}/renovering-frogner` },
  openGraph: {
    title: 'Renovering Frogner Oslo – Totalentreprenør | Fint Hjem',
    description: 'Renovering på Frogner. Erfarne fagfolk med respekt for klassisk arkitektur. Book befaring.',
    url: `${SITE_URL}/renovering-frogner`,
  },
}

export default function RenoveringFrogner() {
  return (
    <ServicePageShell
      tag="FROGNER — OSLO"
      num="01"
      headline="RENOVERING FROGNER"
      subheadline="Håndverk med respekt for historien"
      image="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1800&q=90"
      imageAlt="Klassisk leilighetsbygg på Frogner i Oslo"
      ctaLabel="BOOK BEFARING"
      intro={[
        'Vi leverer renovering på Frogner i Oslo — med respekt for den klassiske arkitekturen og med høy standard på alt fra bad og kjøkken til fasade og interiør.',
        'Frogner er et av Oslos mest eksklusive og historiske områder, med mange fredede og verneverdige bygårder fra tidlig 1900-tall. Renovering her krever mer enn faglig kompetanse — det krever forståelse for bygningsstilen, godkjenningsprosesser og materialvalg som passer med karakteren til bygget.',
        'Vi har bred erfaring med renovering i gamle Frogner-leiligheter: bevaring av stukkatur og rosetter, tilbakeføring av originale parkettyper, baderomsrenovering med moderne funksjon i klassisk innpakning. Vi vet hva som fungerer og hva Plan- og bygningsetaten godkjenner.',
        'Fra enkle oppgraderinger til totalrenovering av hele leiligheten — vi leverer resultater du er stolt av å invitere inn til.',
      ]}
      features={[
        { title: 'Klassisk interiørrenovering', desc: 'Bevaring og restaurering av originale detaljer — stukkatur, rosetter, listverk og parkettgulv.' },
        { title: 'Baderomsrenovering', desc: 'Moderne bad med klassisk estetikk — fliser, armaturer og løsninger som passer leilighetens stil.' },
        { title: 'Kjøkkenrenovering', desc: 'Nye kjøkkenløsninger tilpasset Frogner-leilighetenes planløsning og stil.' },
        { title: 'Fasade og bygård', desc: 'Fasadearbeid i samarbeid med styret — med kunnskap om antikvariske krav og kommunale godkjenninger.' },
        { title: 'Totalrenovering', desc: 'Komplett oppgradering av leilighet — alle rom, alle overflater, alle tekniske installasjoner.' },
        { title: 'Søknadshåndtering', desc: 'Vi håndterer søknader til Plan- og bygningsetaten for tiltak som krever tillatelse.' },
      ]}
      faqs={[
        { q: 'Er det spesielle regler for renovering på Frogner?', a: 'Frogner har mange bygninger i regulerte og vernede strøk. Endringer av fasade, vinduer og fellesarealer kan kreve godkjenning fra Plan- og bygningsetaten og sameiets styre. Vi kjenner reglene og håndterer søknadene.' },
        { q: 'Kan dere bevare originale detaljer i leiligheten?', a: 'Ja. Vi har erfaring med restaurering av stukkatur, rosetter, originalt listverk og parkettgulv fra tidlig 1900-tall. Det gir leiligheten karakter og øker verdien.' },
        { q: 'Hva koster totalrenovering av Frogner-leilighet?', a: 'En gjennomsnittlig 3-4 roms leilighet på Frogner koster fra 600 000–1 500 000 kr for totalrenovering, avhengig av størrelse og standard. Vi gir fast pris etter befaring.' },
        { q: 'Jobber dere i bebodde bygårder?', a: 'Ja. Vi tar hensyn til naboer og beboere, følger byggets HMS-regler og sørger for ryddig rigg og minimalt støy.' },
      ]}
    />
  )
}
