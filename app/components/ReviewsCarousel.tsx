'use client'

/**
 * ReviewsCarousel
 * ───────────────
 * Editorial testimonials section. Two halves:
 *
 *   1. Header  — cinematic, scroll-triggered reveal. Eyebrow lifts in,
 *      the large "HVA KUNDENE SIER" headline does a word-by-word
 *      mask reveal (same language as the split sections), subtitle
 *      eases in with a gentle upward drift, and the "45+" customer
 *      count plays through the CountUp primitive.
 *
 *   2. Marquee — infinite auto-scrolling card strip. Paused on hover
 *      for readability, fade-masked on both edges so cards blur out
 *      of the content column rather than hard-clipping.
 *
 * The marquee is intentionally NOT a slider — sliders feel cheap on
 * premium sites. The infinite tracking strip reads as a steady
 * stream of social proof that's always present, never demanding
 * interaction.
 *
 * Accessibility & performance:
 *   • Header reveal uses CSS transitions driven by an
 *     `IntersectionObserver` flag — no GSAP needed, no extra JS in
 *     the critical path.
 *   • Reduced-motion users get the final state immediately (no
 *     marquee, no reveal animations) so nothing moves unexpectedly.
 */

import { useEffect, useRef, useState } from 'react'
import CountUp from '../lib/motion/CountUp'
import { useReducedMotion } from '../lib/motion/useReducedMotion'

interface Review {
  name: string
  location: string
  text: string
}

const REVIEWS: Review[] = [
  { name: 'Maria Andersen', location: 'Frogner, Oslo', text: 'Fantastisk arbeid fra start til slutt! Vi er ekstremt fornøyde med vår nye bolig. Fint Hjem leverte over all forventning.' },
  { name: 'Lars Eriksen', location: 'Grünerløkka, Oslo', text: 'Presis, ryddig og profesjonell gjennom hele prosessen. Anbefales på det varmeste til alle som vil ha kvalitet.' },
  { name: 'Ingrid Larsen', location: 'Majorstuen, Oslo', text: 'Renoverte kjøkkenet og stuen vår — resultatet er rett og slett magisk. Tusen takk!' },
  { name: 'Tor Johansen', location: 'Skøyen, Oslo', text: 'Utrolig dyktige håndverkere og veldig god kommunikasjon underveis. Vil absolutt bruke dem igjen.' },
  { name: 'Anne-Lise Berg', location: 'Tjuvholmen, Oslo', text: 'Interiørdesign-tjenesten overgikk alle forventninger. Rommet er blitt et drømmested.' },
  { name: 'Kristian Solberg', location: 'Nordstrand, Oslo', text: 'Rask, effektiv og prisgunstig. Jobbet rent og ryddig, og resultatet var strålende.' },
  { name: 'Silje Moen', location: 'St. Hanshaugen, Oslo', text: 'Vi fikk hjelp til å planlegge og bygge tilbygg — totalt fornøyde med prosess og resultat.' },
  { name: 'Petter Haugen', location: 'Holmenkollen, Oslo', text: 'Profesjonelt team som tok seg god tid til å forstå hva vi ønsket. Sluttresultatet ble perfekt.' },
  { name: 'Hanne Christensen', location: 'Aker Brygge, Oslo', text: 'Alt fra tegning til nøkkelferdig bolig ble håndtert med høyeste standard. Imponerende.' },
  { name: 'Joakim Dahl', location: 'Bislett, Oslo', text: 'Totalrenovering av bad og gang. Alt ble gjort riktig første gang — sjeldent bra.' },
  { name: 'Eva Strand', location: 'Vinderen, Oslo', text: 'Interiørstylingen de anbefalte forvandlet hjemmet vårt fullstendig. Hjertelig anbefalt!' },
  { name: 'Morten Vik', location: 'Sagene, Oslo', text: 'Svært dyktige og pålitelige. Holdt seg til avtalt pris og tidsskjema — veldig imponerende.' },
  { name: 'Camilla Nygaard', location: 'Ullern, Oslo', text: 'Nytt kjøkken og stue — vi bor i et helt nytt hjem nå. Latterlig bra håndverk!' },
  { name: 'Bjørn Haugen', location: 'Bjørvika, Oslo', text: 'Jeg er arkitekt selv, og jeg kan bekrefte at kvaliteten på arbeidet er på absolutt toppnivå.' },
  { name: 'Turid Olsen', location: 'Tøyen, Oslo', text: 'Hjelpsomme, kreative og svært kompetente. Boligen vår har aldri sett bedre ut.' },
  { name: 'Fredrik Lie', location: 'Bekkelaget, Oslo', text: 'Kjapp respons og alltid tilgjengelig for spørsmål. Anbefaler Fint Hjem til alle!' },
  { name: 'Karianne Bø', location: 'Ekeberg, Oslo', text: 'Totalentreprenøren som faktisk leverer. Fra konsept til ferdig resultat — upåklagelig.' },
  { name: 'Eirik Sørensen', location: 'Lambertseter, Oslo', text: 'Vi var spent på om de ville klare å holde tidsplanen. De leverte to uker FØR fristen!' },
  { name: 'Tone Martinsen', location: 'Nordstrand, Oslo', text: 'Renoverte terrassen og fasaden — se ikke lenger. Dette er folkene du trenger.' },
  { name: 'Hans Petter Wold', location: 'Frogner, Oslo', text: 'Utrolig bra service og håndverk. Totalentreprenør som tenker helhet — sjelden vare.' },
  { name: 'Liv Kristiansen', location: 'Majorstuen, Oslo', text: 'Interiørdesign-avdelingen er gull verdt. Lytter godt og skaper noe virkelig unikt.' },
  { name: 'André Nordstrand', location: 'Skullerud, Oslo', text: 'Bygget ny hytte for familien. Kvalitet fra kjeller til mønekam. Bra folk!' },
  { name: 'Marit Jacobsen', location: 'Oppsal, Oslo', text: 'Renoverte hele huset etter vannlekkasje — hjelpsomme i en virkelig stressende situasjon.' },
  { name: 'Ole Martin Aasen', location: 'Manglerud, Oslo', text: 'Presis, dyktig og ryddig. Resultatet er nøyaktig som vi drømte om.' },
  { name: 'Gunnhild Espeland', location: 'Holmenkollen, Oslo', text: 'Nytt bad på rekordtid uten kompromisser på kvalitet. Fantastisk team!' },
  { name: 'Rune Andersen', location: 'Grünerløkka, Oslo', text: 'Svært fleksibelt team — endringer underveis ble håndtert profesjonelt og uten mas.' },
  { name: 'Torill Helgesen', location: 'Skøyen, Oslo', text: 'Fikk hjelp med hele prosessen fra søknad til innflytting. Anbefales på det varmeste!' },
  { name: 'Jan Erik Mikalsen', location: 'St. Hanshaugen, Oslo', text: 'Konstruksjonsarbeidet var solid og gjennomtenkt. Slutter aldri å imponere.' },
  { name: 'Lene Abrahamsen', location: 'Bislett, Oslo', text: 'Satt igjen med en følelse av at de brydde seg like mye om prosjektet som oss selv.' },
  { name: 'Vegard Thorsen', location: 'Tjuvholmen, Oslo', text: 'Boligen stod ferdig til avtalt tid og til avtalt pris. Mer kan man ikke be om.' },
  { name: 'Ida Hofseth', location: 'Sagene, Oslo', text: 'Styling-teamet forvandlet leiligheten vår på kort tid. Vi ble rørt til tårer!' },
  { name: 'Kent Andreassen', location: 'Vinderen, Oslo', text: 'Total ombygging av kjøkken, bad og entre. Svært fornøyd med alle detaljene.' },
  { name: 'Stine Rugland', location: 'Ullern, Oslo', text: 'De tok våre ønsker på alvor og kom med kreative løsninger vi ikke hadde tenkt på.' },
  { name: 'Arild Skovdal', location: 'Aker Brygge, Oslo', text: 'Opplevde Fint Hjem som totalt pålitelig — akkurat det man trenger i en byggeprosess.' },
  { name: 'Nina Mathiesen', location: 'Bjørvika, Oslo', text: 'Nytt anneks til huset ble nydelig integrert — som om det alltid hadde vært der.' },
  { name: 'Gunnar Holmberg', location: 'Bekkelaget, Oslo', text: 'Solide håndverkere med øye for detaljer. Resultatet overgikk det vi håpet på.' },
  { name: 'Astrid Bakke', location: 'Ekeberg, Oslo', text: 'Innredningen ble personlig og vakker. Tusen takk for en drømmeprosess!' },
  { name: 'Thomas Fossum', location: 'Tøyen, Oslo', text: 'Hyggelig å jobbe med, og arbeidet er av ypperste kvalitet. Topp alt rundt!' },
  { name: 'Berit Kleven', location: 'Frogner, Oslo', text: 'Alt fra planlegging til ferdigstillelse var en svært positiv opplevelse.' },
  { name: 'Magnus Ruud', location: 'Majorstuen, Oslo', text: 'Fikk drømmekjøkkenet — åpent, lyst og funksjonelt. Beste beslutningen vi tok.' },
  { name: 'Helene Viken', location: 'Nordstrand, Oslo', text: 'Ekstrem kompetanse og god kommunikasjon. Vi følte oss alltid ivaretatt.' },
  { name: 'Trond Fosshaug', location: 'Skøyen, Oslo', text: 'Fra første møte til innflytting — et team som vet hva de holder på med.' },
  { name: 'Sissel Aune', location: 'Grünerløkka, Oslo', text: 'Totalentreprenør som faktisk er total. Tok seg av alt — vi stresset ikke en eneste dag.' },
  { name: 'Øyvind Dalgaard', location: 'Holmenkollen, Oslo', text: 'Kvalitet i hver eneste detalj. Leiligheten vår er blitt et kunstverk å bo i.' },
  { name: 'Katrine Magnusson', location: 'St. Hanshaugen, Oslo', text: 'Interiørtjenesten ga oss et hjem vi er stolte av å vise frem. Tusen takk!' },
]

function StarIcon() {
  return (
    <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  )
}

function ReviewCard({ name, location, text }: Review) {
  return (
    <figure className="flex-shrink-0 w-[280px] sm:w-80 bg-white rounded-2xl p-6 sm:p-8 mx-2 sm:mx-3 shadow-sm border border-stone-100 flex flex-col">
      {/* role="img" is required for aria-label to be allowed here — a bare
          <div> has no role, so screen readers (and Lighthouse) reject the
          label outright and announce five meaningless icons instead. */}
      <div className="flex gap-1 mb-5" role="img" aria-label="5 av 5 stjerner">
        {[0, 1, 2, 3, 4].map((i) => (
          <StarIcon key={i} />
        ))}
      </div>
      {/* Oversized decorative quotation mark — pure typography, sets
          the editorial tone without a loud graphic. */}
      <span
        aria-hidden
        className="font-playfair text-brown/20 leading-none select-none"
        style={{ fontSize: '2.6rem', marginBottom: '-0.3em', marginTop: '-0.25em' }}
      >
        &ldquo;
      </span>
      <blockquote className="font-playfair font-light text-gray-700 text-base leading-relaxed mb-6 italic flex-1">
        {text}
      </blockquote>
      <figcaption>
        <p className="font-montserrat font-bold text-xs tracking-[0.15em] text-gray-900 uppercase not-italic">
          {name}
        </p>
        <p className="font-montserrat text-xs tracking-wider text-brown-ink mt-0.5 not-italic">
          {location}
        </p>
      </figcaption>
    </figure>
  )
}

const EASE = 'cubic-bezier(0.16, 1, 0.3, 1)'
const HEADING_WORDS = ['HVA', 'KUNDENE', 'SIER']

export default function ReviewsCarousel() {
  const reduced = useReducedMotion()
  const headerRef = useRef<HTMLDivElement | null>(null)
  const [visible, setVisible] = useState(false)

  /* ── Scroll-triggered header reveal ────────────────────────────────
     Uses a single-shot IntersectionObserver — the header reveal should
     happen once, the first time the user scrolls into the section.
     Re-firing on every re-entry would be jittery and unprofessional. */
  useEffect(() => {
    if (reduced) {
      setVisible(true)
      return
    }
    const el = headerRef.current
    if (!el) return

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true)
            io.disconnect()
          }
        })
      },
      { threshold: 0.25, rootMargin: '0px 0px -10% 0px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [reduced])

  const doubled = [...REVIEWS, ...REVIEWS]

  return (
    <section
      aria-labelledby="reviews-heading"
      className="py-20 sm:py-24 md:py-28 overflow-hidden relative"
      style={{ backgroundColor: '#f8f6f2' }}
    >
      {/* ── Editorial header ─── */}
      <div ref={headerRef} className="text-center mb-14 sm:mb-20 px-6 sm:px-8 relative">
        {/* Eyebrow: thin rule + tracked caps, lifts into frame from below
            on reveal. Same tag language as the split sections above so the
            whole page reads as one typographic system. */}
        <div className="flex items-center justify-center gap-4 mb-6 overflow-hidden">
          <span
            className="h-px w-10 bg-brown/40 block"
            style={{
              transform: visible ? 'scaleX(1)' : 'scaleX(0)',
              transformOrigin: 'right center',
              transition: `transform 0.9s ${EASE}`,
              transitionDelay: '0.05s',
            }}
          />
          <p
            className="font-montserrat font-bold text-xs tracking-[0.4em] text-brown-ink"
            style={{
              transform: visible ? 'translateY(0)' : 'translateY(110%)',
              opacity: visible ? 1 : 0,
              transition: `transform 0.9s ${EASE}, opacity 0.7s ease`,
              transitionDelay: '0.12s',
            }}
          >
            KUNDEANMELDELSER
          </p>
          <span
            className="h-px w-10 bg-brown/40 block"
            style={{
              transform: visible ? 'scaleX(1)' : 'scaleX(0)',
              transformOrigin: 'left center',
              transition: `transform 0.9s ${EASE}`,
              transitionDelay: '0.05s',
            }}
          />
        </div>

        {/*
          Word-by-word reveal on the main heading. Each word sits inside
          an overflow:hidden shell and slides up into view, staggered by
          100 ms. Matches the split sections' language exactly — the
          whole page now has ONE reveal system.
        */}
        <h2
          id="reviews-heading"
          className="font-montserrat font-black text-gray-900"
          style={{ fontSize: 'clamp(2.2rem, 5vw, 4.5rem)', lineHeight: 1, letterSpacing: '-0.02em' }}
        >
          {HEADING_WORDS.map((word, i) => (
            <span
              key={word}
              className="inline-block overflow-hidden align-baseline"
              style={{
                marginRight: i < HEADING_WORDS.length - 1 ? '0.28em' : 0,
                paddingBottom: '0.08em',
              }}
            >
              <span
                className="inline-block"
                style={{
                  transform: visible ? 'translateY(0)' : 'translateY(110%)',
                  opacity: visible ? 1 : 0,
                  transition: `transform 1.1s ${EASE}, opacity 0.6s ease`,
                  transitionDelay: `${0.25 + i * 0.11}s`,
                }}
              >
                {word}
              </span>
            </span>
          ))}
        </h2>

        {/* Subtitle with inline counter. The counter is the emotional
            payload — seeing "45+" count up from zero as you scroll in
            sub-consciously communicates scale and trust. */}
        <p
          className="font-playfair font-light text-brown/75 text-lg mt-6"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(16px)',
            filter: visible ? 'blur(0)' : 'blur(3px)',
            transition: 'opacity 0.9s ease, transform 0.9s ease, filter 0.9s ease',
            transitionDelay: '0.65s',
          }}
        >
          Over{' '}
          <CountUp
            value={45}
            suffix="+"
            duration={1800}
            className="font-montserrat font-black text-gray-900 tracking-tight"
          />{' '}
          fornøyde kunder — og vi er stolte av hver eneste en.
        </p>
      </div>

      {/* ── Marquee track ─── */}
      <div className="relative">
        {/* Fade masks on both edges so cards dissolve out of the content
            column rather than hard-clipping against the section padding. */}
        <div
          aria-hidden
          className="absolute left-0 top-0 bottom-0 w-24 sm:w-32 pointer-events-none z-10"
          style={{ background: 'linear-gradient(to right, #f8f6f2, transparent)' }}
        />
        <div
          aria-hidden
          className="absolute right-0 top-0 bottom-0 w-24 sm:w-32 pointer-events-none z-10"
          style={{ background: 'linear-gradient(to left, #f8f6f2, transparent)' }}
        />

        <div
          className="animate-marquee flex"
          style={{
            width: 'max-content',
            /* touch-action: pan-y — tells the browser that horizontal
               swipes on this element are NOT page-scroll gestures, so it
               doesn't cancel/interrupt the CSS marquee animation when the
               user swipes horizontally on mobile. */
            touchAction: 'pan-y',
            /* Reduced-motion users get a static strip. Removing the
               marquee animation is the right call — an infinite loop
               counts as decorative motion. */
            animation: reduced ? 'none' : undefined,
          }}
        >
          {doubled.map((review, i) => (
            <ReviewCard key={i} {...review} />
          ))}
        </div>
      </div>
    </section>
  )
}
