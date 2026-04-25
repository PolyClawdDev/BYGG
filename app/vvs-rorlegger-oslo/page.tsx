import type { Metadata } from 'next'
import ServicePageShell from '../components/ServicePageShell'

export const metadata: Metadata = {
  title: 'VVS Oslo – Rørlegger og vanninstallasjoner | Fint Hjem',
  description: 'Godkjent rørlegger i Oslo. Fint Hjem leverer VVS-arbeid for bad, kjøkken og tekniske installasjoner. Rask respons, fast pris og garanti. Book gratis befaring.',
  keywords: ['rørlegger Oslo', 'VVS Oslo', 'rørlegger pris Oslo', 'vannlekkasje Oslo', 'VVS firma Oslo', 'Fint Hjem VVS'],
  alternates: { canonical: 'https://finthjem.no/vvs-rorlegger-oslo' },
  openGraph: {
    title: 'VVS Oslo – Rørlegger og vanninstallasjoner | Fint Hjem',
    description: 'Godkjent rørlegger i Oslo for bad, kjøkken og tekniske installasjoner. Book gratis befaring.',
    url: 'https://finthjem.no/vvs-rorlegger-oslo',
  },
}

export default function VvsOslo() {
  return (
    <ServicePageShell
      tag="VVS / RØRLEGGER"
      num="04"
      headline="RØRLEGGER OSLO"
      subheadline="Godkjente fagfolk for VVS"
      image="https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=1800&q=90"
      imageAlt="Rørlegger utfører VVS-arbeid i Oslo"
      ctaLabel="BOOK BEFARING"
      intro={[
        'Vi leverer VVS-tjenester i Oslo gjennom godkjente rørleggere — bad, kjøkken, tekniske rom og vanninstallasjoner av alle slag.',
        'Rørleggerarbeid er et fagfelt der det ikke lønner seg å ta snarveier. Feil utført kan gi skjulte lekkasjer, fuktskader og store kostnader ned i tid. Hos Fint Hjem bruker vi kun godkjente mesterbrevholdere med nødvendige sertifiseringer.',
        'Vi dokumenterer alt arbeid og utsteder samsvarserklæring. Dette er viktig for forsikring, garantier og ved et eventuelt salg av boligen.',
        'Vi er tilgjengelige for både planlagte prosjekter og akutte behov. Rask respons og ærlige prisoverslag fra første kontakt.',
      ]}
      features={[
        { title: 'Baderomsinstallasjoner', desc: 'Sluk, toalett, dusj, badekar, servant og varmtvannsbereder — montert riktig etter gjeldende normer.' },
        { title: 'Kjøkken og hvitevarer', desc: 'Tilkobling av oppvaskmaskin, kjøleskap med vannkobling, komfyr og eventuelle nye rørføringer.' },
        { title: 'Varmeanlegg', desc: 'Varmekabler, gulvvarme, radiatorer og varmtvannsberedere — installasjon og service.' },
        { title: 'Rørskifte og oppgradering', desc: 'Utskifting av eldre kobber- og støpejernsrør til moderne plast- eller kobberrør med lang levetid.' },
        { title: 'Lekkasjesøk og utbedring', desc: 'Vi lokaliserer skjulte lekkasjer med moderne utstyr og utbedrer skaden raskt og skikkelig.' },
        { title: 'Samsvarserklæring', desc: 'Alt VVS-arbeid dokumenteres og vi utsteder samsvarserklæring — nødvendig for forsikring og garantier.' },
      ]}
      faqs={[
        { q: 'Hva koster en rørlegger i Oslo?', a: 'Timeprisen for en rørlegger i Oslo er typisk 950–1 350 kr/time inkl. moms. For planlagte prosjekter gir vi deg fast pris etter befaring.' },
        { q: 'Må rørleggerarbeid søkes til kommunen?', a: 'Enkle reparasjoner og utskiftninger krever ikke søknad. Men nye rørføringer eller endringer i sanitæranlegget krever i mange tilfeller søknad — vi avklarer dette for deg.' },
        { q: 'Hva er en samsvarserklæring?', a: 'En samsvarserklæring er en skriftlig bekreftelse på at arbeidet er utført etter gjeldende normer og forskrifter. Den er viktig for forsikring og dokumentasjon ved salg av boligen.' },
        { q: 'Kan dere hjelpe ved akutt vannlekkasje?', a: 'Ja. Ta kontakt og vi koordinerer raskest mulig utrykning. Vi anbefaler å stenge hovedkranen umiddelbart ved mistanke om lekkasje.' },
      ]}
    />
  )
}
