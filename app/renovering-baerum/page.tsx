import type { Metadata } from 'next'
import ServicePageShell from '../components/ServicePageShell'
import { SITE_URL } from '../lib/site'

export const metadata: Metadata = {
  title: 'Renovering Bærum – Totalentreprenør',
  description: 'Renovering i Bærum. Fint Hjem leverer totalrenovering, nybygg, bad, kjøkken og tilbygg i Bærum kommune. Erfarne fagfolk med 20+ års erfaring. Book gratis befaring.',
  keywords: ['renovering Bærum', 'totalrenovering Bærum', 'håndverker Bærum', 'nybygg Bærum', 'totalentreprenør Bærum', 'snekker Bærum'],
  alternates: { canonical: `${SITE_URL}/renovering-baerum` },
  openGraph: {
    title: 'Renovering Bærum – Totalentreprenør | Fint Hjem',
    description: 'Totalrenovering og nybygg i Bærum. 20+ års erfaring. Book gratis befaring.',
    url: `${SITE_URL}/renovering-baerum`,
  },
}

export default function RenoveringBaerum() {
  return (
    <ServicePageShell
      tag="BÆRUM"
      num="02"
      headline="RENOVERING BÆRUM"
      subheadline="Totalentreprenør vest for Oslo"
      image="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=90"
      imageAlt="Moderne enebolig i Bærum"
      ctaLabel="BOOK BEFARING"
      intro={[
        'Vi leverer renovering og nybygg i Bærum — totalrenovering av enebolig, tilbygg, nybygg og byggservice av høyeste kvalitet i hele kommunen.',
        'Bærum er en av Norges mest velstående kommuner, med stor variasjon i bygningsmassen — fra 1950-tallsvillaer på Høvik til moderne boliger på Fornebu og tradisjonelle eneboliger i Sandvika, Bekkestua og Lysaker. Vi kjenner Bærum godt og har erfaring med alle typer prosjekter i kommunen.',
        'Enten du skal totalrenovere en gammel enebolig, bygge tilbygg for å gi familien mer plass, eller starte fra scratch med nybygg på en tomt — vi er din totalentreprenør som håndterer alt fra søknad til nøkkel.',
        'Vi er tilgjengelig for befaring i hele Bærum, inkludert Sandvika, Bekkestua, Lysaker, Høvik, Stabekk, Fornebu, Jar og Østerås.',
      ]}
      features={[
        { title: 'Totalrenovering enebolig', desc: 'Komplett renovering av enebolig — alle rom, alle overflater, alle tekniske installasjoner koordinert av én prosjektleder.' },
        { title: 'Tilbygg og utvidelse', desc: 'Tilbygg, anneks og garasjer i Bærum — vi håndterer søknad og byggetillatelse fra Bærum kommune.' },
        { title: 'Nybygg', desc: 'Nøkkelferdige boliger i Bærum fra tomt til innflytting — vi kjenner kommunens reguleringsplaner og byggeforskrifter.' },
        { title: 'Bad og kjøkken', desc: 'Komplette bad- og kjøkkenrenovasjoner — fra enkle oppgraderinger til totalombygging av planløsning.' },
        { title: 'Energioppgradering', desc: 'Etterisolering, varmepumpe og nye vinduer — spesielt relevant for Bærums mange eneboliger fra 1960–80-tallet.' },
        { title: 'Fasade og tak', desc: 'Ny kledning, taktekking og fasadrenovering som øker boligens verdi og reduserer vedlikeholdsbehovet.' },
      ]}
      faqs={[
        { q: 'Jobber dere i hele Bærum kommune?', a: 'Ja. Vi dekker alle områder i Bærum — Sandvika, Bekkestua, Lysaker, Fornebu, Høvik, Stabekk, Jar, Østerås, Kolsås og Rykkinn.' },
        { q: 'Hva koster totalrenovering av enebolig i Bærum?', a: 'En gjennomsnittlig eneboligrenovering i Bærum koster fra 800 000–2 500 000 kr avhengig av størrelse og standard. Vi gir fast pris etter befaring.' },
        { q: 'Har Bærum spesielle bygningsregler?', a: 'Bærum kommune har egne reguleringsplaner som varierer fra område til område. Vi er kjent med disse og håndterer søknadsprosessen.' },
        { q: 'Kan dere hjelpe med nybygg-tomt i Bærum?', a: 'Vi kan hjelpe med å vurdere tomtens byggemuligheter og reguleringsplaner. Ta kontakt for en uforpliktende samtale.' },
      ]}
    />
  )
}
