/**
 * blog.ts
 * ───────
 * Single source of truth for all blog post content.
 * Used by /blogg (index) and /blogg/[slug] (article page).
 */

export interface BlogPost {
  slug: string
  title: string
  /** Short title for link lists, where the full headline would wrap badly. */
  linkLabel: string
  metaTitle: string
  metaDescription: string
  keywords: string[]
  publishedAt: string
  readingMinutes: number
  intro: string
  sections: { heading: string; body: string }[]
  ctaText: string
  /**
   * Service pages this article should hand the reader off to, most relevant
   * first. Paths are resolved through `lib/routes.ts`, which supplies the
   * anchor text — `section.body` is plain text rendered with `whitespace-pre-line`,
   * so links cannot live inside the prose itself.
   */
  relatedServices: string[]
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'hva-koster-baderomsrenovering-oslo-2026',
    title: 'Hva koster baderomsrenovering i Oslo 2026?',
    linkLabel: 'Prisguide: baderomsrenovering',
    metaTitle: 'Hva koster baderomsrenovering i Oslo 2026? Komplett prisguide',
    metaDescription: 'Komplett prisguide for baderomsrenovering i Oslo 2026. Hva koster et nytt bad, hva påvirker prisen og hvordan unngår du dyre overraskelser? Les alt her.',
    keywords: ['hva koster baderomsrenovering', 'pris bad renovering Oslo', 'baderomsrenovering kostnad', 'nytt bad pris 2026'],
    publishedAt: '2026-04-01',
    readingMinutes: 6,
    intro: 'Planlegger du ny baderomsrenovering og lurer på hva det faktisk koster? Her gir vi deg en ærlig og oppdatert prisguide for Oslo i 2026 — basert på virkelige prosjekter vi har gjennomført.',
    sections: [
      {
        heading: 'Gjennomsnittspriser for bad i Oslo 2026',
        body: 'En typisk baderomsrenovering i Oslo koster mellom 200 000 og 600 000 kr avhengig av størrelse, materialer og teknisk tilstand. Her er en grov inndeling:\n\n• Lite bad (4–6 m²): 200 000–350 000 kr\n• Mellomstort bad (6–10 m²): 300 000–500 000 kr\n• Stort bad (10 m² +): 450 000–700 000 kr\n\nDisse prisene inkluderer membran og sluk, flislegging gulv og vegger, rørlegger, elektriker med varmekabler og ferdig sanitær. De inkluderer IKKE ekstremt kostbare materialvalg som marmor eller naturstein i store format.',
      },
      {
        heading: 'Hva er inkludert i en baderomsrenovering?',
        body: 'En komplett baderomsrenovering inkluderer:\n\n• Riving og fjerning av gammelt bad\n• Fuktsperre og membran etter BBV-normen\n• Slukplassering og rørleggerarbeid\n• Flislegging gulv og vegger\n• Montering av sanitær (toalett, servant, dusj/badekar)\n• Elektriker: varmekabler, vifte, belysning, stikkontakter\n• Baderomsinnredning og speil\n\nMerk at prisen varierer kraftig med materialvalget. En flise til 200 kr/m² gir et annet budsjett enn en norsk natursteinsflis til 2 000 kr/m².',
      },
      {
        heading: 'Hva driver prisen opp?',
        body: 'De vanligste faktorene som gjør en baderomsrenovering dyrere enn antatt:\n\n1. Fuktskader oppdages under riving — dette må utbedres før nytt bad kan legges\n2. Gammelt rørleggeropplegg som må skiftes ut\n3. Utfordrede adkomst (smal trapp, liten dør) — materialtransport tar lengre tid\n4. Dyre flisvalg — store formater og naturstein koster vesentlig mer i materialer OG arbeid\n5. Endring av planløsning — nye rørføringer og veggarbeid\n\nBeste råd: Be om en detaljert befaring FØR du godtar et tilbud. En seriøs entreprenør avdekker risikoer i forkant.',
      },
      {
        heading: 'Slik får du riktig pris — og unngår overraskelser',
        body: 'Her er de viktigste rådene for å unngå at badprosjektet sprekker budsjett:\n\n• Få minst tre tilbud — og sammenlign hva som er inkludert, ikke bare totalbeløpet\n• Krev fast pris, ikke timepris — fast pris betyr at risikoen for kostnadsoverskridelse ligger hos entreprenøren\n• Sjekk at tilbudet inkluderer alle faggrupper (rørlegger, elektriker, flislegger)\n• Be om samsvarserklæring — dokumenterer at arbeidet er utført etter gjeldende normer\n• Sett av 10–15 % reserve for uforutsette funn',
      },
    ],
    ctaText: 'Vil du ha et nøyaktig pristilbud for ditt bad? Book gratis befaring — vi kommer til deg, vurderer rommet og gir deg et fast tilbud uten overraskelser.',
    relatedServices: ['/bad-renovering-oslo', '/renovering-oslo', '/vvs-rorlegger-oslo'],
  },
  {
    slug: 'hva-koster-nybygg-oslo-2026',
    title: 'Hva koster det å bygge ny bolig i Oslo 2026?',
    linkLabel: 'Prisguide: nybygg i Oslo',
    metaTitle: 'Hva koster nybygg i Oslo 2026? Alt du trenger å vite',
    metaDescription: 'Komplett prisguide for nybygg i Oslo 2026. Byggekostnader per m², hva påvirker prisen og hva du bør vite før du starter. Basert på virkelige prosjekter.',
    keywords: ['hva koster nybygg Oslo', 'pris nybygg Oslo 2026', 'bygge hus kostnad', 'nybygg per kvadratmeter'],
    publishedAt: '2026-04-05',
    readingMinutes: 7,
    intro: 'Å bygge ny bolig er den største investeringen de fleste gjør i livet. Prisen varierer enormt — men her er en ærlig gjennomgang av hva nybygg faktisk koster i Oslo-regionen i 2026.',
    sections: [
      {
        heading: 'Priser per kvadratmeter i Oslo 2026',
        body: 'Gjennomsnittlige byggekostnader for nybygg i Oslo-regionen i 2026:\n\n• Enkel standard: 35 000–45 000 kr/m² BTA\n• Middels standard: 45 000–60 000 kr/m² BTA\n• Høy standard: 60 000–85 000 kr+ /m² BTA\n\nEn 150 m² enebolig i middels standard koster altså ca. 6,75–9 millioner kr for selve byggingen. I tillegg kommer tomt, prosjektering, søknadskostnader og finansiering.',
      },
      {
        heading: 'Hva er inkludert i byggekostnadene?',
        body: 'I en totalentreprise inkluderer byggekostnadene typisk:\n\n• Grunnarbeid og fundamentering\n• Råbygg — vegger, etasjeskiller, tak\n• Vinduer, ytterdører og taktekking\n• Innvendig tømrerarbeid\n• VVS-anlegg (rørlegger)\n• Elektrisk anlegg\n• Ventilasjon og varmeanlegg\n• Overflater innvendig (gulv, fliser, maling)\n• Kjøkken og bad\n\nI tillegg kommer det som kalles "tomt og tomteutvikling": kjøp av tomt, eventuelle geotekn. undersøkelser, sprengning og tilkobling til VA og strøm.',
      },
      {
        heading: 'De store kostnadsdriverne du bør kjenne til',
        body: '1. Tomten — en tomt i Oslo koster fra 2–15 millioner kr avhengig av beliggenhet og størrelse\n2. Grunnforhold — fjell krever sprengning, leire krever peling. Kan koste 300 000–1 000 000 kr ekstra\n3. Hustype — enebolig vs. tomannsbolig vs. leilighetsbygg har ulik kostnadsstruktur\n4. Standard og materialer — avstand mellom billigste og dyreste utførelse er enorm\n5. Størrelse — større hus = lavere kostnad per m² (faste kostnader fordeles på mer areal)',
      },
      {
        heading: 'Totalentreprise vs. delt entreprise — hva er billigst?',
        body: 'Mange tror de sparer penger ved å koordinere fagfolkene selv (delt entreprise) i stedet for å bruke en totalentreprenør. I praksis er det sjelden tilfelle:\n\n• En totalentreprenør har faste samarbeidspartnere og koordinerer effektivt — dette reduserer sløsing\n• Risikoen for feil og forsinkelser er mye lavere\n• En seriøs totalentreprenør gir fast pris — du vet hva du betaler\n• Du slipper å koordinere 8–12 ulike faggrupper selv\n\nFor de aller fleste er en totalentreprise både billigere og langt mindre stressfullt.',
      },
    ],
    ctaText: 'Vil du vite hva ditt drømmehus koster? Vi gir deg en gratis og uforpliktende gjennomgang av tomten, planene dine og et realistisk budsjettestimat.',
    relatedServices: ['/nybygg-oslo', '/tilbygg-oslo', '/renovering-baerum'],
  },
  {
    slug: 'hva-koster-renovering-leilighet-oslo',
    title: 'Hva koster renovering av leilighet i Oslo 2026?',
    linkLabel: 'Prisguide: renovering av leilighet',
    metaTitle: 'Hva koster renovering av leilighet i Oslo 2026? Komplett prisguide',
    metaDescription: 'Hva koster oppussing av leilighet i Oslo? Komplett prisguide for 2026 — bad, kjøkken, totalrenovering og overflater. Basert på ekte prosjekter i Oslo.',
    keywords: ['hva koster renovering leilighet Oslo', 'pris oppussing leilighet', 'renovering leilighet kostnad 2026', 'totalrenovering leilighet pris'],
    publishedAt: '2026-04-10',
    readingMinutes: 6,
    intro: 'Hva koster det egentlig å pusse opp leiligheten i Oslo? Svaret avhenger av hva du gjør — men her er en konkret og ærlig prisguide basert på prosjekter vi har gjennomført i Oslo.',
    sections: [
      {
        heading: 'Priser for leilighetsrenovering i Oslo 2026',
        body: 'Her er typiske priser for ulike nivåer av leilighetsrenovering:\n\n• Overflatepuss (maling, gulv): 80 000–200 000 kr\n• Delvis renovering (bad + kjøkken): 350 000–700 000 kr\n• Totalrenovering 2-roms: 500 000–900 000 kr\n• Totalrenovering 3-roms: 700 000–1 300 000 kr\n• Totalrenovering 4-roms: 900 000–1 800 000 kr\n\nPrisene inkluderer materialer og arbeid, men ikke møbler og inventar.',
      },
      {
        heading: 'Hva er inkludert i en totalrenovering?',
        body: 'En fullstendig leilighetsrenovering inkluderer typisk:\n\n• Riving av eksisterende overflater\n• Baderomsrenovering (membran, fliser, sanitær, elektriker)\n• Kjøkkenrenovering (nytt kjøkken, elektriker, rørlegger)\n• Nytt gulv i alle rom\n• Maling av alle vegger og tak\n• Nye innerdører og listverk\n• El-opplegg og belysning\n\nI eldre leiligheter (pre-1980) kan det i tillegg være nødvendig å skifte røropplegget og deler av el-anlegget — dette kan legge til 150 000–400 000 kr.',
      },
      {
        heading: 'Hva er billigst og hva er dyrest å gjøre?',
        body: 'Billigst:\n• Maling — stor visuell effekt til relativt lav kostnad\n• Gulvslipeing — billigere enn nytt gulv, men krever eksisterende tregulv\n• Bytte kjøkkenfronter — mye billigere enn nytt kjøkken\n\nDyrest:\n• Baderomsrenovering — teknisk krevende, mange faggrupper\n• Endre planløsning (flytte vegger) — søknadspliktig og dyrt\n• Naturstein og premium materialer — enorm prisvariasjon\n\nBeste råd: Start med bad og kjøkken — det gir mest verdi ved et eventuelt salg.',
      },
      {
        heading: 'Slik unngår du at renoveringsprosjektet sprekker',
        body: 'De vanligste grunnene til at renoveringsprosjekter koster mer enn planlagt:\n\n1. Fuktskader og skjulte tekniske problemer oppdages under riving\n2. Dårlige originalpriser — tilbud som mangler poster\n3. Materialvalg endres underveis uten å justere budsjettet\n4. Delt entreprise uten tydelig koordinering\n\nDen beste forsikringen er en erfaren totalentreprenør med fast pris og tydelig kontrakt.',
      },
    ],
    ctaText: 'Vil du vite hva akkurat din leilighet koster å renovere? Book gratis befaring — vi kommer hjem til deg og gir deg et nøyaktig tilbud.',
    relatedServices: ['/renovering-oslo', '/kjokken-renovering-oslo', '/bad-renovering-oslo', '/gulv-parkett-oslo'],
  },
  {
    slug: 'tilbygg-eller-flytte',
    title: 'Tilbygg eller flytte? Slik tar du riktig beslutning',
    linkLabel: 'Tilbygg eller flytte?',
    metaTitle: 'Tilbygg eller flytte? Slik tar du riktig beslutning for familien din',
    metaDescription: 'Trenger familien mer plass? Les vår guide til å velge mellom tilbygg og å flytte — kostnader, fordeler, ulemper og hva som lønner seg i Oslo i 2026.',
    keywords: ['tilbygg eller flytte', 'bygge til eller flytte', 'plass i hjemmet', 'tilbygg kostnad vs flytte', 'tilbygg lønnsomhet'],
    publishedAt: '2026-04-15',
    readingMinutes: 5,
    intro: 'Familien vokser, men leiligheten eller huset er for lite. Skal dere flytte — eller bygge til? Det er et spørsmål mange stiller seg, og svaret er ikke alltid åpenbart. Her gir vi deg et ærlig bilde av begge alternativene.',
    sections: [
      {
        heading: 'Kostnadssammenligning: tilbygg vs. flytte',
        body: 'La oss si familien bor i en 3-roms leilighet og trenger ett ekstra rom.\n\nFlyttealternativet:\n• Eiendomsmegler: 70 000–120 000 kr\n• Dokumentavgift ny bolig (2,5 % av kjøpesum): 200 000–400 000 kr på en 10 mill. bolig\n• Eventuell gevinst/tap på eksisterende bolig\n• Flyttekostnader og tid: 30 000–60 000 kr\n\nTilbyggsalternativet:\n• Typisk tilbygg på 15–25 m²: 600 000–1 200 000 kr\n• Ingen eiendomsmegler, ingen dokumentavgift\n• Du beholder nabolaget, skolen, tilhørigheten\n\nFramdriften: tilbygg tar 6–12 måneder inkludert søknad.',
      },
      {
        heading: 'Når lønner tilbygg seg?',
        body: 'Et tilbygg lønner seg typisk når:\n\n• Dere er glade i nabolaget og vil bli boende\n• Boligen har lave tekniske mangler og er ellers god\n• Tomten tillater utvidelse (sjekk reguleringsplanen)\n• Boligprisene i området tilsier at investeringen gir økt verdi\n• Alternativet er å kjøpe seg opp i et dyrere marked\n\nEt velutført tilbygg øker som regel boligens verdi mer enn byggekostnaden — særlig i Oslo og Bærum-markedet.',
      },
      {
        heading: 'Når er det bedre å flytte?',
        body: 'Det er bedre å flytte når:\n\n• Boligen har store tekniske mangler som krever store investeringer uansett\n• Tomten ikke tillater tilbygg (reguleringsplan, nabogrenser)\n• Dere ønsker å skifte nabolag, skolekrets eller bydel\n• En ny bolig i riktig størrelse koster lite mer enn eksisterende + tilbygg\n• Behovet for plass er vesentlig større enn ett rom',
      },
      {
        heading: 'Slik avklarer du hva som er mulig',
        body: 'Første steg er å sjekke reguleringsplanen for din eiendom. Den bestemmer:\n• Maks tillatt utnyttelse (BYA eller BRA)\n• Tillatt gesims- og mønehøyde\n• Avstand til nabogrense\n\nDu finner dette på kommunens kartportal. Usikker? Vi kommer på befaring, vurderer tomtens byggemuligheter og gir deg et realistisk bilde — gratis og uforpliktende.',
      },
    ],
    ctaText: 'Usikker på hva som er riktig for deg? Vi kommer på gratis befaring, vurderer muligheten for tilbygg og gir deg et nøyaktig kostnadsestimat — ingen forpliktelser.',
    relatedServices: ['/tilbygg-oslo', '/nybygg-oslo', '/renovering-baerum'],
  },
  {
    slug: 'velge-totalentreprenor-oslo',
    title: 'Slik velger du riktig totalentreprenør i Oslo – 7 ting du MÅ sjekke',
    linkLabel: 'Velge totalentreprenør',
    metaTitle: 'Slik velger du totalentreprenør i Oslo – 7 ting du MÅ sjekke',
    metaDescription: 'Skal du ansette totalentreprenør i Oslo? Les vår guide til hva du bør sjekke, hvilke spørsmål du bør stille og røde flagg du bør unngå. Spar tid og penger.',
    keywords: ['velge totalentreprenør Oslo', 'totalentreprenør tips', 'finne byggefirma Oslo', 'hvem skal bygge huset mitt', 'sjekkliste totalentreprenør'],
    publishedAt: '2026-04-20',
    readingMinutes: 6,
    intro: 'Valget av totalentreprenør er den viktigste beslutningen i hele bygge- eller renoveringsprosjektet. Feil valg kan koste deg hundretusener og måneder med frustrasjon. Her er sju ting du alltid bør sjekke.',
    sections: [
      {
        heading: '1. Sjekk referanser — og ring dem faktisk',
        body: 'Alle seriøse totalentreprenører kan gi referanser fra sammenlignbare prosjekter. Ikke bare ta imot listen — ring referansene og spør:\n\n• Ble prosjektet levert til avtalt tid og pris?\n• Hvordan var kommunikasjonen underveis?\n• Hva var utfordringene, og hvordan ble de løst?\n• Ville du brukt dem igjen?\n\nEn god entreprenør hjelper deg gjerne med å komme i kontakt med fornøyde kunder.',
      },
      {
        heading: '2. Krev fast pris — ikke timepris',
        body: 'Timepriskontrakter legger all risiko på deg. Hvis noe tar lengre tid enn antatt (og det gjør det alltid), betaler du.\n\nEn seriøs totalentreprenør gir fast pris etter en grundig befaring. Fast pris betyr at entreprenøren bærer risikoen for timeoverskridelser — ikke du.\n\nUnntaket er uforutsette funn (f.eks. fuktskader bak vegger). Da bør kontrakten spesifisere tydelig hva som skjer: avvik beskrives, prises og godkjennes av deg FØR arbeidet starter.',
      },
      {
        heading: '3. Sjekk at alle faggrupper er inkludert',
        body: 'Et komplett bygge- eller renoveringsprosjekt involverer mange faggrupper: snekker, murer, flislegger, maler, rørlegger, elektriker, ventilasjon.\n\nSjekk at tilbudet inkluderer ALLE faggrupper — eller at det er tydelig spesifisert hvem som er ansvarlig for hva. Manglende faggrupper i tilbudet er en vanlig årsak til at "billige" tilbud blir dyrere enn "dyre" tilbud.',
      },
      {
        heading: '4. Krev samsvarserklæring og dokumentasjon',
        body: 'For VVS-arbeid og elektrisk arbeid er samsvarserklæring et lovpålagt krav. Den bekrefter at arbeidet er utført etter gjeldende normer.\n\nDen er viktig for forsikring, garantier og ved et salg av boligen. En totalentreprenør som ikke nevner dette er et rødt flagg.',
      },
      {
        heading: '5. Sjekk org.nr. og foretaksregisteret',
        body: 'Søk opp organisasjonsnummeret på Proff.no eller Brønnøysundregistrene. Sjekk:\n\n• Er selskapet aktivt og registrert korrekt?\n• Hva er egenkapitalen?\n• Er det betalingsanmerkninger?\n\nEn seriøs aktør har ingenting å skjule her.',
      },
      {
        heading: '6. Unngå de to røde flaggene',
        body: 'Rødt flagg 1: Tilbudet er vesentlig billigere enn alle andre. I byggbransjen er billigst nesten aldri best. Det billigste tilbudet mangler som regel poster, bruker billige materialer eller har urealistisk tidsplan.\n\nRødt flagg 2: Presser på for kontantbetaling eller stor forskuddsbetaling. En seriøs aktør fakturerer etappevis etter fremdrift — ikke krever store beløp i forkant.',
      },
      {
        heading: '7. Møt prosjektlederen — ikke bare selgeren',
        body: 'Salgspersonen du møter i tilbudsfasen er ikke nødvendigvis den som leder prosjektet ditt. Be om å møte prosjektlederen og spør:\n\n• Hvor mange prosjekter har du på gang samtidig?\n• Hvem er min kontaktperson under byggingen?\n• Hvordan kommuniserer dere fremdrift og avvik?\n\nSvaret forteller deg mer om kvaliteten på leveransen enn brosjyrer og fine bilder.',
      },
    ],
    ctaText: 'Fint Hjem oppfyller alle punktene over — og vi beviser det gjerne. Book en gratis befaring og møt teamet som faktisk skal jobbe på prosjektet ditt.',
    relatedServices: ['/renovering-baerum', '/renovering-oslo', '/nybygg-oslo'],
  },
]
