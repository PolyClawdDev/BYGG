import type { Metadata } from 'next'
import ServicePageShell from '../components/ServicePageShell'

export const metadata: Metadata = {
  title: 'Renovering Nordstrand Oslo – Enebolig og leilighet | Fint Hjem',
  description: 'Renovering på Nordstrand og Søndre Nordstrand i Oslo. Fint Hjem leverer totalrenovering, bad, kjøkken og tilbygg i hele Nordstrand-området. Book gratis befaring.',
  keywords: ['renovering Nordstrand', 'håndverker Nordstrand Oslo', 'totalrenovering Nordstrand', 'bad Nordstrand', 'snekker Nordstrand Oslo'],
  alternates: { canonical: 'https://finthjem.no/renovering-nordstrand' },
  openGraph: {
    title: 'Renovering Nordstrand Oslo – Enebolig og leilighet | Fint Hjem',
    description: 'Totalrenovering på Nordstrand i Oslo. Book gratis befaring.',
    url: 'https://finthjem.no/renovering-nordstrand',
  },
}

export default function RenoveringNordstrand() {
  return (
    <ServicePageShell
      tag="NORDSTRAND — OSLO"
      num="06"
      headline="RENOVERING NORDSTRAND"
      subheadline="Totalentreprenør i sørlige Oslo"
      image="https://images.unsplash.com/photo-1599427303058-f04cbcf4756f?auto=format&fit=crop&w=1800&q=90"
      imageAlt="Enebolig på Nordstrand i Oslo"
      ctaLabel="BOOK BEFARING"
      intro={[
        'Vi leverer renovering på Nordstrand og i sørlige Oslo — totalrenovering av enebolig, leilighet, bad, kjøkken og tilbygg av høy håndverkskvalitet.',
        'Nordstrand er et populært og rolig boområde i Oslo sør, med en fin blanding av eneboliger, rekkehus og leiligheter. Her finner du mye av bygningsmassen fra 1960–1990-tallet som er klar for en skikkelig oppgradering.',
        'Vi er kjent i området og har utført en rekke prosjekter på Nordstrand, Ljan, Lambertseter, Ekeberg og Mortensrud. Mange av kundene våre har kommet via anbefalinger fra naboer — det er vi stolte av.',
        'Vi dekker Nordstrand, Ljan, Ekeberg, Lambertseter, Mortensrud, Søndre Nordstrand og tilgrensende områder.',
      ]}
      features={[
        { title: 'Totalrenovering enebolig', desc: 'Komplett renovering av Nordstrand-enebolig — fra kjeller til loft, koordinert av én prosjektleder.' },
        { title: 'Baderomsrenovering', desc: 'Nye bad etter BBV-norm — rørlegger, flislegger og elektriker koordinert av oss.' },
        { title: 'Kjøkkenrenovering', desc: 'Nytt kjøkken eller oppgradering — vi hjelper fra planlegging til montering.' },
        { title: 'Tilbygg', desc: 'Utvidelse av boligen for mer plass — vi håndterer søknad og bygging fra A til Å.' },
        { title: 'Energioppgradering', desc: 'Etterisolering, varmepumpe og vinduer — stort potensial i Nordstrand-eneboligene.' },
        { title: 'Maling og overflater', desc: 'Innvendig og utvendig maling med grundig forbehandling og finish som varer.' },
      ]}
      faqs={[
        { q: 'Jobber dere i hele Nordstrand-bydelen?', a: 'Ja. Vi jobber på Nordstrand, Ljan, Ekeberg, Lambertseter, Mortensrud og Søndre Nordstrand.' },
        { q: 'Hva koster bad-renovering på Nordstrand?', a: 'Et gjennomsnittlig bad på 4–6 m² koster fra 200 000–400 000 kr. Vi gir fast pris etter befaring.' },
        { q: 'Kan dere starte raskt?', a: 'Vi har normalt kapasitet til å starte innen 4–8 uker etter at kontrakt er signert. Ta kontakt for å sjekke ledig kapasitet.' },
        { q: 'Gir dere referanser fra Nordstrand?', a: 'Ja. Vi kan gi referanser fra utførte prosjekter i nærområdet. Ta kontakt så setter vi deg i kontakt med tidligere kunder.' },
      ]}
    />
  )
}
