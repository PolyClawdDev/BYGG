import type { Metadata } from 'next'
import ServicePageShell from '../components/ServicePageShell'

export const metadata: Metadata = {
  title: 'Renovering Asker – Totalentreprenør | Fint Hjem',
  description: 'Renovering i Asker. Fint Hjem leverer totalrenovering, nybygg, bad, kjøkken og tilbygg i Asker kommune. Erfarne håndverkere. Book gratis befaring.',
  keywords: ['renovering Asker', 'totalrenovering Asker', 'håndverker Asker', 'nybygg Asker', 'snekker Asker', 'totalentreprenør Asker'],
  alternates: { canonical: 'https://finthjem.no/renovering-asker' },
  openGraph: {
    title: 'Renovering Asker – Totalentreprenør | Fint Hjem',
    description: 'Renovering og nybygg i Asker. Erfarne fagfolk. Book gratis befaring.',
    url: 'https://finthjem.no/renovering-asker',
  },
}

export default function RenoveringAsker() {
  return (
    <ServicePageShell
      tag="ASKER"
      num="05"
      headline="RENOVERING ASKER"
      subheadline="Totalentreprenør i Asker kommune"
      image="https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1800&q=90"
      imageAlt="Renovert enebolig i Asker"
      ctaLabel="BOOK BEFARING"
      intro={[
        'Vi leverer renovering og nybygg i Asker — totalrenovering av enebolig, tilbygg, bad og kjøkken av høy kvalitet i hele Asker kommune.',
        'Asker er en vakker og voksende kommune sørvest for Oslo, med en bygningsmasse som spenner fra eldre villaer i Asker sentrum til nyere eneboliger i Heggedal, Tofte og Holmen. Vi kjenner kommunen godt og har gode erfaringer med byggesaksbehandlingen der.',
        'Mange Asker-boliger fra 60-, 70- og 80-tallet er modne for en solid oppgradering — både estetisk, teknisk og energimessig. Vi hjelper deg å prioritere tiltakene som gir mest verdi og best komfort for budsjettet ditt.',
        'Vi er tilgjengelig for befaring i hele Asker, inkludert Asker sentrum, Heggedal, Holmen, Slemmestad, Tofte, Vollen og Dikemark.',
      ]}
      features={[
        { title: 'Totalrenovering enebolig', desc: 'Komplett renovering av enebolig i Asker — alle faggrupper koordinert av én prosjektleder.' },
        { title: 'Bad og våtrom', desc: 'Komplette baderomsrenovasjoner etter gjeldende normer. Vi har fast samarbeid med godkjent rørlegger.' },
        { title: 'Tilbygg og anneks', desc: 'Tilbygg og anneks i Asker — vi håndterer søknad og byggetillatelse fra Asker kommune.' },
        { title: 'Energioppgradering', desc: 'Etterisolering, varmepumpe og nye vinduer — stor besparelse i Asker-eneboliger fra 1960–1990.' },
        { title: 'Fasade og tak', desc: 'Ny kledning og taktekking som øker boligens verdi og eliminerer fremtidig vedlikeholdsbehov.' },
        { title: 'Nybygg', desc: 'Nøkkelferdige boliger i Asker — vi kjenner kommunens reguleringsplaner og leverer fra søknad til nøkkel.' },
      ]}
      faqs={[
        { q: 'Jobber dere i hele Asker kommune?', a: 'Ja. Vi dekker hele Asker — Asker sentrum, Heggedal, Holmen, Slemmestad, Tofte, Vollen, Dikemark og alle øvrige områder i kommunen.' },
        { q: 'Hva koster renovering av enebolig i Asker?', a: 'En gjennomsnittlig eneboligrenovering koster fra 600 000–2 000 000 kr avhengig av størrelse og omfang. Vi gir fast pris etter befaring.' },
        { q: 'Kan dere hjelpe med Enova-søknad i Asker?', a: 'Ja. Vi hjelper med energikartering og søknad om Enova-støtte for alle aktuelle tiltak.' },
        { q: 'Trenger tilbygg særskilt godkjenning i Asker?', a: 'Ja, de fleste tilbygg krever byggetillatelse fra Asker kommune. Vi håndterer hele søknadsprosessen.' },
      ]}
    />
  )
}
