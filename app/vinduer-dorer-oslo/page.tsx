import type { Metadata } from 'next'
import ServicePageShell from '../components/ServicePageShell'
import { SITE_URL } from '../lib/site'

export const metadata: Metadata = {
  title: 'Vinduer og dører Oslo – Montering og utskifting',
  description: 'Montering og utskifting av vinduer og dører i Oslo. Fint Hjem leverer bedre isolasjon, lys og estetikk. Godkjente fagfolk og fast pris. Book gratis befaring.',
  keywords: ['vinduer Oslo', 'dører Oslo', 'skifte vinduer Oslo', 'nye vinduer Oslo', 'vindusmontering Oslo', 'Fint Hjem vinduer'],
  alternates: { canonical: `${SITE_URL}/vinduer-dorer-oslo` },
  openGraph: {
    title: 'Vinduer og dører Oslo – Montering og utskifting | Fint Hjem',
    description: 'Skifte vinduer og dører i Oslo. Bedre isolasjon, lys og estetikk. Book gratis befaring.',
    url: `${SITE_URL}/vinduer-dorer-oslo`,
  },
}

export default function VinduerDorerOslo() {
  return (
    <ServicePageShell
      tag="VINDUER & DØRER"
      num="06"
      headline="VINDUER & DØRER OSLO"
      subheadline="Bedre isolasjon, lys og estetikk"
      image="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=90"
      imageAlt="Moderne vinduer og dører i en bolig i Oslo"
      ctaLabel="BOOK BEFARING"
      intro={[
        'Vi monterer og skifter vinduer og dører i Oslo — bedre energieffektivitet, mer lys og et moderne utseende som løfter hele boligen.',
        'Eldre vinduer og dører er en av de største kildene til varmetap i norske boliger. Å skifte til moderne energieffektive vinduer kan redusere oppvarmingskostnadene betydelig — og gjøre hjemmet langt mer komfortabelt.',
        'Hos Fint Hjem hjelper vi deg med å velge riktige produkter for din bolig, ditt klima og din stil. Vi samarbeider med de ledende produsentene og sørger for presis montering som sikrer korrekt tetting og isolasjon.',
        'Alt arbeid utføres av godkjente fagfolk og dokumenteres. Vi sørger for at monteringen er korrekt utført og at du får den isolasjonseffekten du betaler for.',
      ]}
      features={[
        { title: 'Utskifting av vinduer', desc: 'Montering av nye energieffektive vinduer — 2-lags, 3-lags eller spesialglass etter dine behov og budsjett.' },
        { title: 'Nye ytterdører', desc: 'Sikre og isolerende ytterdører i tre, aluminium eller stål — med moderne design og gode lås.' },
        { title: 'Balkong og terrassedører', desc: 'Skyvedører, franske dører og terrassedører som slipper inn lyset og kobler inne og ute.' },
        { title: 'Innerdører', desc: 'Nye innerdører med karm og listverk — standard eller skreddersydd til din bolig.' },
        { title: 'Tetting og isolasjon', desc: 'Korrekt tetting rundt vinduer og dører er like viktig som selve produktet. Vi gjør dette riktig.' },
        { title: 'Fasadetilpasning', desc: 'Vi sørger for at utvendig kledning og belistning ser ryddig og helhetlig ut etter montering.' },
      ]}
      faqs={[
        { q: 'Hva koster det å skifte vinduer i Oslo?', a: 'Prisen varierer etter størrelse og antall vinduer. Et normalt vindu koster fra 8 000–25 000 kr inkludert montering. For en komplett bolig gir vi deg samlet tilbud etter befaring.' },
        { q: 'Lønner det seg å skifte vinduer?', a: 'Ja, i de fleste tilfeller. Moderne 3-lags vinduer kan halvere varmetapet gjennom vinduer sammenlignet med eldre glass. Du sparer på oppvarming og øker boligens verdi.' },
        { q: 'Trenger det søknad for å skifte vinduer?', a: 'Utskifting av eksisterende vinduer i samme størrelse krever normalt ikke søknad. Endring av størrelse eller form kan kreve søknad — vi avklarer dette for deg.' },
        { q: 'Kan dere hjelpe med å velge riktige vinduer?', a: 'Ja. Vi vurderer din bolig og anbefaler de produktene som gir best verdi for pengene — med tanke på isolasjonsevne, estetikk og holdbarhet.' },
      ]}
    />
  )
}
