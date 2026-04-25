import type { Metadata } from 'next'
import ServicePageShell from '../components/ServicePageShell'

export const metadata: Metadata = {
  title: 'Nybygg Oslo – Totalentreprenør | Fint Hjem',
  description: 'Fint Hjem bygger nøkkelferdige boliger i Oslo fra tomt til innflytting. Totalentreprenør med over 20 års erfaring – søknad, tegninger, bygging og overlevering. Book gratis befaring.',
  keywords: ['nybygg Oslo', 'totalentreprenør Oslo', 'bygge hus Oslo', 'nøkkelferdig bolig Oslo', 'byggmester Oslo', 'Fint Hjem nybygg'],
  alternates: { canonical: 'https://finthjem.no/nybygg-oslo' },
  openGraph: {
    title: 'Nybygg Oslo – Totalentreprenør | Fint Hjem',
    description: 'Nøkkelferdige boliger i Oslo – fra tomt til innflytting. Book gratis befaring i dag.',
    url: 'https://finthjem.no/nybygg-oslo',
  },
}

export default function NybyggOslo() {
  return (
    <ServicePageShell
      tag="NY KONSTRUKSJON"
      num="01"
      headline="NYBYGG OSLO"
      subheadline="Totalentreprenør fra A til Å"
      image="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=90"
      imageAlt="Moderne nybygget bolighus med hvit fasade i Oslo"
      ctaLabel="START DITT PROSJEKT"
      intro={[
        'Vi er din totalentreprenør i Oslo og håndterer alt fra søknad og tegninger til nøkkelferdig overlevering. Med over 20 års erfaring bygger vi boliger som holder i generasjoner.',
        'Å bygge ny bolig er en av de største investeringene du gjør i livet. Hos Fint Hjem sørger vi for at prosessen er trygg, forutsigbar og full av gode øyeblikk — ikke stress. Vi tar oss av alle søknader, prosjektering, håndverkere og koordinering, slik at du kan fokusere på det morsomme: drømme om hvordan livet ditt skal se ut i det nye hjemmet.',
        'Vi samarbeider med godkjente arkitekter, ingeniører og fagarbeidere og holder oss strengt til avtalte tidsfrister og budsjetter. Ingenting overlates til tilfeldighetene — hvert eneste trinn dokumenteres og kommuniseres tydelig til deg underveis.',
        'Enten du skal bygge enebolig, rekkehus, leilighet eller fritidsbolig — vi har kompetansen og kapasiteten til å levere nøyaktig det du ser for deg.',
      ]}
      features={[
        { title: 'Søknad og regulering', desc: 'Vi håndterer all søknadsbehandling hos kommunen, nabovarsel og reguleringsplaner. Du slipper byråkratiet.' },
        { title: 'Arkitekt og tegninger', desc: 'Egen arkitekt utarbeider tegninger og plantegninger tilpasset dine ønsker, tomt og lokale krav.' },
        { title: 'Prosjektledelse', desc: 'En dedikert prosjektleder koordinerer alle faggrupper og holder deg oppdatert gjennom hele byggeprosessen.' },
        { title: 'Grunnarbeid og konstruksjon', desc: 'Fra sprengning og grunnmur til takstol og vindtett kledning — vi utfører alt med godkjente fagfolk.' },
        { title: 'Tekniske installasjoner', desc: 'VVS, elektriker, ventilasjon og varmesystem installeres av sertifiserte fagfolk etter gjeldende normer.' },
        { title: 'Nøkkelferdig overlevering', desc: 'Du mottar boligen ferdig — med FDV-dokumentasjon, garantier og en grundig gjennomgang av alt som er utført.' },
      ]}
      faqs={[
        { q: 'Hva koster det å bygge ny bolig i Oslo?', a: 'Prisen på nybygg varierer mye avhengig av størrelse, standard og tomt. En typisk enebolig i Oslo koster fra 4–8 millioner kroner for selve byggingen. Vi gir deg et nøyaktig prisestimat etter en gratis befaring og gjennomgang av dine planer.' },
        { q: 'Hvor lang tid tar det å bygge ny bolig?', a: 'En normal enebolig tar 12–18 måneder fra søknad er godkjent til nøkkeloverlevering. Tidsplanen avhenger av størrelse, valgte løsninger og kommunal saksbehandlingstid.' },
        { q: 'Trenger vi tomt for å ta kontakt?', a: 'Nei. Vi kan hjelpe deg med å vurdere tomter, reguleringsplaner og byggemuligheter allerede før du har kjøpt. Mange starter med en prat med oss for å forstå hva som er mulig.' },
        { q: 'Inkluderer dere energimerking og dokumentasjon?', a: 'Ja. Vi leverer komplett FDV-dokumentasjon (forvaltning, drift og vedlikehold), energiattest og alle garantier for utført arbeid.' },
      ]}
    />
  )
}
