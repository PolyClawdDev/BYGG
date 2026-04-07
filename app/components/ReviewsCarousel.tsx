'use client'

interface Review {
  name: string
  location: string
  text: string
}

const REVIEWS: Review[] = [
  { name: 'Maria Andersen', location: 'Oslo', text: 'Fantastisk arbeid fra start til slutt! Vi er ekstremt fornøyde med vår nye bolig. Fint Hjem leverte over all forventning.' },
  { name: 'Lars Eriksen', location: 'Bergen', text: 'Presis, ryddig og profesjonell gjennom hele prosessen. Anbefales på det varmeste til alle som vil ha kvalitet.' },
  { name: 'Ingrid Larsen', location: 'Stavanger', text: 'Renoverte kjøkkenet og stuen vår — resultatet er rett og slett magisk. Tusen takk!' },
  { name: 'Tor Johansen', location: 'Trondheim', text: 'Utrolig dyktige håndverkere og veldig god kommunikasjon underveis. Vil absolutt bruke dem igjen.' },
  { name: 'Anne-Lise Berg', location: 'Drammen', text: 'Interiørdesign-tjenesten overgikk alle forventninger. Rommet er blitt et drømmested.' },
  { name: 'Kristian Solberg', location: 'Fredrikstad', text: 'Rask, effektiv og prisgunstig. Jobbet rent og ryddig, og resultatet var strålende.' },
  { name: 'Silje Moen', location: 'Tromsø', text: 'Vi fikk hjelp til å planlegge og bygge tilbygg — totalt fornøyde med prosess og resultat.' },
  { name: 'Petter Haugen', location: 'Kristiansand', text: 'Profesjonelt team som tok seg god tid til å forstå hva vi ønsket. Sluttresultatet ble perfekt.' },
  { name: 'Hanne Christensen', location: 'Ålesund', text: 'Alt fra tegning til nøkkelferdig bolig ble håndtert med høyeste standard. Imponerende.' },
  { name: 'Joakim Dahl', location: 'Bodø', text: 'Totalrenovering av bad og gang. Alt ble gjort riktig første gang — sjeldent bra.' },
  { name: 'Eva Strand', location: 'Sandnes', text: 'Interiørstylingen de anbefalte forvandlet hjemmet vårt fullstendig. Hjertelig anbefalt!' },
  { name: 'Morten Vik', location: 'Tønsberg', text: 'Svært dyktige og pålitelige. Holdt seg til avtalt pris og tidsskjema — veldig imponerende.' },
  { name: 'Camilla Nygaard', location: 'Moss', text: 'Nytt kjøkken og stue — vi bor i et helt nytt hjem nå. Latterlig bra håndverk!' },
  { name: 'Bjørn Haugen', location: 'Hamar', text: 'Jeg er arkitekt selv, og jeg kan bekrefte at kvaliteten på arbeidet er på absolutt toppnivå.' },
  { name: 'Turid Olsen', location: 'Lillehammer', text: 'Hjelpsomme, kreative og svært kompetente. Boligen vår har aldri sett bedre ut.' },
  { name: 'Fredrik Lie', location: 'Sarpsborg', text: 'Kjapp respons og alltid tilgjengelig for spørsmål. Anbefaler Fint Hjem til alle!' },
  { name: 'Karianne Bø', location: 'Skien', text: 'Totalentreprenøren som faktisk leverer. Fra konsept til ferdig resultat — upåklagelig.' },
  { name: 'Eirik Sørensen', location: 'Porsgrunn', text: 'Vi var spent på om de ville klare å holde tidsplanen. De leverte to uker FØR fristen!' },
  { name: 'Tone Martinsen', location: 'Arendal', text: 'Renoverte terrassen og fasaden — se ikke lenger. Dette er folkene du trenger.' },
  { name: 'Hans Petter Wold', location: 'Drammen', text: 'Utrolig bra service og håndverk. Totalentreprenør som tenker helhet — sjelden vare.' },
  { name: 'Liv Kristiansen', location: 'Gjøvik', text: 'Interiørdesign-avdelingen er gull verdt. Lytter godt og skaper noe virkelig unikt.' },
  { name: 'André Nordstrand', location: 'Halden', text: 'Bygget ny hytte for familien. Kvalitet fra kjeller til mønekam. Bra folk!' },
  { name: 'Marit Jacobsen', location: 'Kongsberg', text: 'Renoverte hele huset etter vannlekkasje — hjelpsomme i en virkelig stressende situasjon.' },
  { name: 'Ole Martin Aasen', location: 'Horten', text: 'Presis, dyktig og ryddig. Resultatet er nøyaktig som vi drømte om.' },
  { name: 'Gunnhild Espeland', location: 'Stavanger', text: 'Nytt bad på rekordtid uten kompromisser på kvalitet. Fantastisk team!' },
  { name: 'Rune Andersen', location: 'Bergen', text: 'Svært fleksibelt team — endringer underveis ble håndtert profesjonelt og uten mas.' },
  { name: 'Torill Helgesen', location: 'Tromsø', text: 'Fikk hjelp med hele prosessen fra søknad til innflytting. Anbefales på det varmeste!' },
  { name: 'Jan Erik Mikalsen', location: 'Narvik', text: 'Konstruksjonsarbeidet var solid og gjennomtenkt. Slutter aldri å imponere.' },
  { name: 'Lene Abrahamsen', location: 'Alta', text: 'Satt igjen med en følelse av at de brydde seg like mye om prosjektet som oss selv.' },
  { name: 'Vegard Thorsen', location: 'Molde', text: 'Boligen stod ferdig til avtalt tid og til avtalt pris. Mer kan man ikke be om.' },
  { name: 'Ida Hofseth', location: 'Ålesund', text: 'Styling-teamet forvandlet leiligheten vår på kort tid. Vi ble rørt til tårer!' },
  { name: 'Kent Andreassen', location: 'Sandefjord', text: 'Total ombygging av kjøkken, bad og entre. Svært fornøyd med alle detaljene.' },
  { name: 'Stine Rugland', location: 'Larvik', text: 'De tok våre ønsker på alvor og kom med kreative løsninger vi ikke hadde tenkt på.' },
  { name: 'Arild Skovdal', location: 'Kristiansund', text: 'Opplevde Fint Hjem som totalt pålitelig — akkurat det man trenger i en byggeprosess.' },
  { name: 'Nina Mathiesen', location: 'Fredrikstad', text: 'Nytt anneks til huset ble nydelig integrert — som om det alltid hadde vært der.' },
  { name: 'Gunnar Holmberg', location: 'Drammen', text: 'Solide håndverkere med øye for detaljer. Resultatet overgikk det vi håpet på.' },
  { name: 'Astrid Bakke', location: 'Lillehammer', text: 'Innredningen ble personlig og vakker. Tusen takk for en drømmeprosess!' },
  { name: 'Thomas Fossum', location: 'Hamar', text: 'Hyggelig å jobbe med, og arbeidet er av ypperste kvalitet. Topp alt rundt!' },
  { name: 'Berit Kleven', location: 'Oslo', text: 'Alt fra planlegging til ferdigstillelse var en svært positiv opplevelse.' },
  { name: 'Magnus Ruud', location: 'Bergen', text: 'Fikk drømmekjøkkenet — åpent, lyst og funksjonelt. Beste beslutningen vi tok.' },
  { name: 'Helene Viken', location: 'Stavanger', text: 'Ekstrem kompetanse og god kommunikasjon. Vi følte oss alltid ivaretatt.' },
  { name: 'Trond Fosshaug', location: 'Tønsberg', text: 'Fra første møte til innflytting — et team som vet hva de holder på med.' },
  { name: 'Sissel Aune', location: 'Bodø', text: 'Totalentreprenør som faktisk er total. Tok seg av alt — vi stresset ikke en eneste dag.' },
  { name: 'Øyvind Dalgaard', location: 'Kongsberg', text: 'Kvalitet i hver eneste detalj. Leiligheten vår er blitt et kunstverk å bo i.' },
  { name: 'Katrine Magnusson', location: 'Skien', text: 'Interiørtjenesten ga oss et hjem vi er stolte av å vise frem. Tusen takk!' },
]

function StarIcon() {
  return (
    <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  )
}

function ReviewCard({ name, location, text }: Review) {
  return (
    <div className="flex-shrink-0 w-80 bg-white rounded-2xl p-8 mx-3 shadow-sm border border-stone-100 flex flex-col">
      <div className="flex gap-1 mb-5">
        {[0,1,2,3,4].map((i) => <StarIcon key={i} />)}
      </div>
      <p className="font-playfair font-light text-gray-700 text-base leading-relaxed mb-6 italic flex-1">
        &ldquo;{text}&rdquo;
      </p>
      <div>
        <p className="font-montserrat font-bold text-xs tracking-[0.15em] text-gray-900 uppercase">{name}</p>
        <p className="font-montserrat text-xs tracking-wider text-brown/60 mt-0.5">{location}</p>
      </div>
    </div>
  )
}

export default function ReviewsCarousel() {
  const doubled = [...REVIEWS, ...REVIEWS]

  return (
    <section className="py-28 overflow-hidden" style={{ backgroundColor: '#f8f6f2' }}>
      {/* Header */}
      <div className="text-center mb-20 px-8">
        <p className="font-montserrat font-bold text-xs tracking-[0.4em] text-brown/50 mb-5">
          — KUNDEANMELDELSER
        </p>
        <h2
          className="font-montserrat font-black text-gray-900"
          style={{ fontSize: 'clamp(2.2rem, 5vw, 4.5rem)', lineHeight: 1 }}
        >
          HVA KUNDENE SIER
        </h2>
        <p className="font-playfair font-light text-brown/70 text-lg mt-6">
          Over 45 fornøyde kunder — og vi er stolte av hver eneste en.
        </p>
      </div>

      {/* Carousel track */}
      <div className="relative">
        {/* Fade masks */}
        <div
          className="absolute left-0 top-0 bottom-0 w-32 pointer-events-none z-10"
          style={{ background: 'linear-gradient(to right, #f8f6f2, transparent)' }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-32 pointer-events-none z-10"
          style={{ background: 'linear-gradient(to left, #f8f6f2, transparent)' }}
        />

        <div className="animate-marquee flex" style={{ width: 'max-content' }}>
          {doubled.map((review, i) => (
            <ReviewCard key={i} {...review} />
          ))}
        </div>
      </div>
    </section>
  )
}
