import type { Metadata } from 'next'
import ServicePageShell from '../components/ServicePageShell'

export const metadata: Metadata = {
  title: 'Tilbygg Oslo – Anneks, garasje og utvidelse | Fint Hjem',
  description: 'Tilbygg og anneks i Oslo. Fint Hjem leverer tilbygg, garasjer, anneks og utvidelser av bolig – fra søknad til nøkkel. Totalentreprenør med fast pris. Book gratis befaring.',
  keywords: ['tilbygg Oslo', 'anneks Oslo', 'garasje Oslo', 'bygge tilbygg Oslo', 'utvidelse bolig Oslo', 'Fint Hjem tilbygg'],
  alternates: { canonical: 'https://finthjem.no/tilbygg-oslo' },
  openGraph: {
    title: 'Tilbygg Oslo – Anneks, garasje og utvidelse | Fint Hjem',
    description: 'Tilbygg, anneks og garasjer i Oslo. Fra søknad til nøkkel. Book gratis befaring.',
    url: 'https://finthjem.no/tilbygg-oslo',
  },
}

export default function TilbyggOslo() {
  return (
    <ServicePageShell
      tag="TILBYGG & NYBYGG"
      num="05"
      headline="TILBYGG OSLO"
      subheadline="Utvidelse fra søknad til nøkkel"
      image="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1800&q=90"
      imageAlt="Moderne tilbygg på enebolig i Oslo"
      ctaLabel="START DITT PROSJEKT"
      intro={[
        'Vi bygger tilbygg, anneks og garasjer i Oslo — fra søknadsbehandling og tegninger til nøkkelferdig overlevering. Alt håndtert av én totalentreprenør.',
        'Et tilbygg er en av de mest lønnsomme investeringene du kan gjøre i boligen din. Du får mer plass, økt boligverdi og et hjem som passer familien din bedre — uten å måtte flytte.',
        'Søknadsprosessen kan virke komplisert, men hos Fint Hjem tar vi oss av alt: nabovarsel, søknad til kommunen, reguleringsplaner og godkjenninger. Vi vet hva kommunen krever og sørger for at prosessen går smidig.',
        'Fra første møte til du mottar nøkkelen, har du én fast kontaktperson som holder deg orientert. Du vet alltid hva som skjer, hva det koster og når du kan ta rommet i bruk.',
      ]}
      features={[
        { title: 'Søknad og regulering', desc: 'Vi håndterer hele søknadsprosessen — nabovarsel, søknad til kommunen og eventuelle dispensasjonssøknader.' },
        { title: 'Tegninger og prosjektering', desc: 'Arkitekt utarbeider tegninger og tekniske beskrivelser som tilfredsstiller kommunens krav.' },
        { title: 'Garasje og carport', desc: 'Enkle og doble garasjer, frittstående eller integrert i boligen — i tre, stål eller betong.' },
        { title: 'Anneks og gjestehus', desc: 'Separate anneks for utleie, gjester eller hjemmekontor. Vi bygger nøkkelferdige enheter.' },
        { title: 'Påbygg og ekstra etasje', desc: 'Bygg på en etasje eller et loftsrom for å utnytte boligens potensial maksimalt.' },
        { title: 'Nøkkelferdig levering', desc: 'Du overtar tilbygget ferdig med alle installasjoner, overflater og dokumentasjon på plass.' },
      ]}
      faqs={[
        { q: 'Trenger jeg byggetillatelse for tilbygg i Oslo?', a: 'Ja, de fleste tilbygg i Oslo krever byggetillatelse. Unntak gjelder for svært små tilbygg (under 15 m² BRA) som oppfyller visse krav. Vi vurderer dette for deg etter befaring.' },
        { q: 'Hva koster et tilbygg i Oslo?', a: 'Et tilbygg koster typisk fra 30 000–50 000 kr per kvadratmeter avhengig av størrelse og standard. Et typisk tilbygg på 20 m² vil koste fra 600 000–1 000 000 kr totalt. Vi gir deg fast prisestimat.' },
        { q: 'Hvor lang tid tar det å bygge et tilbygg?', a: 'Inkludert søknadsprosess tar et tilbygg typisk 6–14 måneder fra oppstart til ferdigstillelse. Selve byggingen tar 2–4 måneder.' },
        { q: 'Øker tilbygget boligens verdi?', a: 'Ja, et godt utført tilbygg øker som regel boligens markedsverdi mer enn det koster å bygge det. En ekstra stue, soverom eller utleieenhet er blant de mest lønnsomme investeringene.' },
      ]}
    />
  )
}
