import Link from 'next/link'
import BefaringForm from '@/app/components/befaring/BefaringForm'
import SiteFooter from '@/app/components/SiteFooter'

/* Server component: the copy and layout are static, so Next pre-renders
   the whole shell. Only the form itself is a client island. */

const STEPS = [
  {
    num: '01',
    title: 'Du sender inn',
    body: 'Fyll ut skjemaet under med litt om prosjektet. Det tar under ett minutt.',
  },
  {
    num: '02',
    title: 'Vi ringer deg',
    body: 'En prosjektleder tar kontakt for å høre mer og avtale et tidspunkt som passer.',
  },
  {
    num: '03',
    title: 'Gratis befaring',
    body: 'Vi kommer hjem til deg, ser på forholdene og svarer på det du lurer på.',
  },
  {
    num: '04',
    title: 'Eksakt pristilbud',
    body: 'Du får et skriftlig tilbud med tydelig pris, tidsplan og hva som er inkludert.',
  },
]

const ASSURANCES = [
  'Helt gratis og uforpliktende',
  'Svar innen én arbeidsdag',
  'Fast pris før vi starter',
]

export default function EstimatPage() {
  return (
    <main className="bg-white min-h-screen">
      <div className="animate-subtle-bg">
        {/* ── Header ─────────────────────────────────────────────────── */}
        <div className="max-w-6xl mx-auto px-6 md:px-10 pt-10 md:pt-12">
          <Link
            href="/"
            className="inline-flex items-center gap-3 font-montserrat font-bold text-[10px] tracking-[0.32em] uppercase text-brown-ink hover:text-gray-900 transition-colors duration-500"
          >
            <svg width="14" height="10" viewBox="0 0 14 10" aria-hidden>
              <path
                d="M13 5H1.5M5.5 1l-4 4 4 4"
                stroke="currentColor"
                strokeWidth="1.3"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Tilbake
          </Link>
        </div>

        {/* ── Hero ───────────────────────────────────────────────────── */}
        <section className="max-w-6xl mx-auto px-6 md:px-10 pt-12 md:pt-16 pb-4">
          <div className="flex items-center gap-4 mb-7 animate-fadeInUp">
            <span className="font-montserrat font-bold text-[11px] tracking-[0.42em] text-brown-ink uppercase">
              Gratis befaring
            </span>
            <span className="h-px w-10 bg-brown/30 block" aria-hidden />
          </div>

          <h1
            className="font-montserrat font-black text-gray-900 tracking-tight leading-[0.95] mb-8 animate-fadeInUp"
            style={{ fontSize: 'clamp(2.4rem, 6vw, 4.6rem)', animationDelay: '0.1s' }}
          >
            BE OM BEFARING
          </h1>

          <p
            className="font-playfair font-light text-brown/85 text-lg md:text-xl leading-relaxed max-w-2xl animate-fadeInUp"
            style={{ animationDelay: '0.2s' }}
          >
            Hver bolig er forskjellig, og en ærlig pris krever at vi ser prosjektet med egne øyne.
            Derfor gir vi deg ikke et tilfeldig anslag på nettet — vi kommer ut, ser på forholdene og
            gir deg en eksakt pris du kan stole på.
          </p>

          <ul
            className="flex flex-wrap gap-x-8 gap-y-3 mt-9 animate-fadeInUp"
            style={{ animationDelay: '0.3s' }}
          >
            {ASSURANCES.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2.5 font-playfair font-light text-brown/80 text-[15px]"
              >
                <svg width="15" height="11" viewBox="0 0 15 11" className="text-brown/55 shrink-0" aria-hidden>
                  <path
                    d="M1 5.5l4 4L14 1"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* ── How it works ───────────────────────────────────────────── */}
        <section className="max-w-6xl mx-auto px-6 md:px-10 pt-16 md:pt-20 pb-4">
          <h2 className="font-montserrat font-bold text-[11px] tracking-[0.42em] text-brown-ink uppercase mb-10">
            Slik fungerer det
          </h2>

          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-8">
            {STEPS.map((step) => (
              <li key={step.num} className="border-t border-brown/15 pt-5">
                <span className="font-montserrat font-black text-brown/25 text-2xl tracking-tight block mb-3">
                  {step.num}
                </span>
                <h3 className="font-playfair font-normal text-gray-900 text-lg mb-2">{step.title}</h3>
                <p className="font-playfair font-light text-brown/75 text-[15px] leading-relaxed">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </section>

        {/* ── Form ───────────────────────────────────────────────────── */}
        <section
          className="max-w-3xl mx-auto px-6 md:px-10 pt-16 md:pt-24 pb-20 md:pb-28"
          aria-labelledby="befaring-form-heading"
        >
          <h2
            id="befaring-form-heading"
            className="font-playfair font-light text-gray-900 text-2xl md:text-3xl mb-3"
          >
            Fortell oss om prosjektet
          </h2>
          <p className="font-playfair font-light text-brown/70 text-base mb-11">
            Vi trenger bare navn og én måte å nå deg på. Resten hjelper oss å forberede befaringen.
          </p>

          <BefaringForm />
        </section>
      </div>

      <SiteFooter />
    </main>
  )
}
