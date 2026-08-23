import type { Metadata } from 'next'
import ServicePageShell from '../components/ServicePageShell'
import { SITE_URL } from '../lib/site'

export const metadata: Metadata = {
  title: 'Baderom renovering Oslo – Bad & Flislegging',
  description: 'Profesjonell baderomsrenovering i Oslo. Fint Hjem leverer komplette baderom fra membran til ferdig flate. Godkjente fagfolk, fast pris og garanti. Book gratis befaring.',
  keywords: ['baderom renovering Oslo', 'bad renovering Oslo', 'flislegger Oslo', 'baderomsrenovering Oslo', 'nytt bad Oslo', 'Fint Hjem bad'],
  alternates: { canonical: `${SITE_URL}/bad-renovering-oslo` },
  openGraph: {
    title: 'Baderom renovering Oslo – Bad & Flislegging | Fint Hjem',
    description: 'Komplette baderomsrenovasjoner i Oslo. Fra membran til ferdig flate. Book gratis befaring.',
    url: `${SITE_URL}/bad-renovering-oslo`,
  },
}

export default function BadRenoveringOslo() {
  return (
    <ServicePageShell
      tag="BAD & FLISLEGGING"
      num="02"
      headline="BADEROM OSLO"
      subheadline="Fra membran til ferdig flate"
      image="https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1800&q=90"
      imageAlt="Nyrenovert moderne baderom i Oslo"
      ctaLabel="BOOK BEFARING"
      intro={[
        'Vi leverer komplette baderomsrenovasjoner i Oslo etter gjeldende våtromsnorm. Godkjente fagfolk, fast pris og dokumentert arbeid fra start til slutt.',
        'Et baderom er en av de viktigste rommene i boligen — både for daglig trivsel og for boligens verdi. Et dårlig utført bad kan gi lekkasjer, fuktskader og kostbare reparasjoner. Hos Fint Hjem gjør vi det riktig første gang.',
        'Vi følger NS 3420 og BBV (Byggebransjens våtromsnorm) til punkt og prikke — noe som er avgjørende for at forsikring og garanti skal gjelde. Alt fra membranlegging og slukplassering til flislegging og sanitærmontering utføres av fagarbeidere med nødvendige godkjenninger.',
        'Du velger fliser, armaturer og innredning — vi tar oss av resten. Og vi er alltid åpne om priser, tidsbruk og prosess.',
      ]}
      features={[
        { title: 'Membran og fuktsperre', desc: 'Korrekt membranlegging etter BBV-normen er fundamentet for et varig baderom. Vi dokumenterer alt med foto.' },
        { title: 'Flislegging gulv og vegger', desc: 'Presist flisarbeid med riktig fall mot sluk, jevne fuger og nøyaktig kapping. Vi jobber med alle flistyper.' },
        { title: 'Rørlegger og sanitær', desc: 'Godkjent rørlegger monterer sluk, toalett, dusj, badekar og servant etter gjeldende normer.' },
        { title: 'Elektriker og varmekabler', desc: 'Elektriker monterer varmekabler, vifte, belysning og stikkontakter etter gjeldende el-forskrifter.' },
        { title: 'Innredning og møblering', desc: 'Vi hjelper med valg av baderomsinnredning, speil, belysning og tilbehør som passer rommet.' },
        { title: 'Garanti og dokumentasjon', desc: 'Vi leverer komplett dokumentasjon av utført arbeid og gir garanti etter bustadoppføringslova.' },
      ]}
      faqs={[
        { q: 'Hva koster et nytt baderom i Oslo?', a: 'En gjennomsnittlig baderomsrenovering i Oslo koster mellom 200 000–600 000 kr avhengig av størrelse, valgte materialer og teknisk tilstand. Vi gir deg et fast prisestimat etter befaring.' },
        { q: 'Hvor lang tid tar en baderomsrenovering?', a: 'Et normalt bad tar 3–6 uker fra oppstart til ferdigstillelse. Vi lager en detaljert fremdriftsplan og holder deg oppdatert hele veien.' },
        { q: 'Trenger jeg å søke kommunen for å renovere bad?', a: 'Selve baderomsrenovasjonen krever vanligvis ikke søknad. Men dersom du flytter sluk eller gjør endringer på bærende konstruksjoner, kan søknad være nødvendig. Vi avklarer dette før oppstart.' },
        { q: 'Hva skjer hvis det oppdages fuktskader under rivingen?', a: 'Vi dokumenterer fuktskader og avviker umiddelbart og presenterer deg for alternativene. Ingen tilleggsarbeid utføres uten at du har godkjent det og fått pris.' },
      ]}
    />
  )
}
