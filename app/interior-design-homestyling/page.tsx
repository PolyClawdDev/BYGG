'use client'

import { useState } from 'react'
import Link from 'next/link'
import MenuSocialIcons from '../components/MenuSocialIcons'
import SiteFooter from '../components/SiteFooter'

const HOME_SECTION_LINKS = [
  { label: 'Ditt Nye Hjem', hash: 'ditt-nye-hjem' },
  { label: 'Renovering & Forandring', hash: 'renovering-forandring' },
  { label: 'Byggservice', hash: 'byggservice' },
  { label: 'Interiør & Styling', hash: 'interior-styling' },
] as const

export default function InteriorDesign() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <main className="min-h-[100dvh] bg-white relative overflow-x-hidden p-4 pb-8">
      <div className="w-full min-h-full animate-subtle-bg rounded-2xl flex flex-col">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="fixed top-8 left-8 z-50 p-2 hover:bg-white/10 rounded-lg transition-colors duration-200 animate-fadeIn"
          aria-label="Åpne meny"
        >
          <div className="w-6 h-5 relative flex flex-col justify-between">
            <span className={`w-full h-0.5 bg-gray-800 transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`w-full h-0.5 bg-gray-800 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`w-full h-0.5 bg-gray-800 transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </div>
        </button>

        <div className="flex-1 flex flex-col px-4 sm:px-6 md:px-8 pt-16 pb-10 overflow-y-auto">
          <div className="flex flex-col items-center">
            <div className="w-full max-w-4xl mx-auto relative z-[1]">
              <div className="text-center mb-8 md:mb-10 animate-fadeInUp">
                <h1 className="font-playfair font-light text-brown text-3xl md:text-4xl lg:text-5xl tracking-wider mb-4 leading-tight">
                  Interiørdesign / Homestyling
                </h1>
              </div>

              <div className="animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
                <div className="prose prose-lg max-w-none mx-auto">
                  <p className="font-playfair font-light text-brown text-lg md:text-xl leading-relaxed mb-8">
                    Et hjem er aldri bare vegger, gulv og tak. Det er stedet hvor livet skjer – hvor hverdagen får ta plass og hvor minner skapes. Derfor er interiørdesign for oss mer enn å bare velge farger eller møbler. Det handler om å skape en følelse. En følelse av harmoni, balanse og personlighet.
                  </p>

                  <p className="font-playfair font-light text-brown text-lg md:text-xl leading-relaxed mb-8">
                    Vi tilbyr helhetlige løsninger innen interiørdesign hvor vi alltid tar utgangspunkt i deg, dine behov og din livsstil. Sammen former vi omgivelser som ikke bare er vakre, men også praktiske og varige over tid. Alt fra materialvalg og fargesetting til møblering og detaljer planlegges med omhu – slik at hjemmet ditt blir akkurat slik du ønsker det, både i dag og i morgen.
                  </p>

                  <p className="font-playfair font-light text-brown text-lg md:text-xl leading-relaxed mb-8">
                    For deg som skal selge bolig har vi også mulighet til å hjelpe med møblering og homestyling. Vi vet hvor avgjørende det første inntrykket er, og hvor mye riktig følelse kan påvirke salgsprisen. Med nøye utvalgte møbler, riktig lys og balanserte fargevalg kan vi fremheve boligens beste sider og skape en atmosfære som appellerer til interessenter – samtidig som det føles naturlig og innbydende.
                  </p>

                  <p className="font-playfair font-light text-brown text-lg md:text-xl leading-relaxed mb-8">
                    Vår filosofi er enkel: hvert hjem har potensial. Vårt oppdrag er å hjelpe deg med å frigjøre det. Enten du ønsker å skape ditt drømmehjem å leve i, eller du vil maksimere verdien ved et salg, kan du stole på vår erfaring, vårt blikk for detaljer og vår forståelse for hva som gjør et hjem til noe mer enn bare en bolig.
                  </p>

                  <p className="font-playfair font-light text-brown text-lg md:text-xl leading-relaxed">
                    Vi er her for å gjøre din visjon til virkelighet – med trygghet, engasjement og en genuin sans for design.
                  </p>
                </div>
              </div>

              <div className="text-center mt-12 animate-fadeInUp" style={{ animationDelay: '1.2s' }}>
                <Link
                  href="/"
                  className="inline-block font-playfair font-light text-brown text-lg md:text-xl tracking-wider hover:text-gray-800 transition-all duration-500 cursor-pointer border-b border-brown/30 hover:border-brown"
                >
                  ← Tilbake til startsiden
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <SiteFooter />

      {isMenuOpen && (
        <div className="fixed inset-4 bg-amber-50 z-50 flex flex-col items-center justify-center animate-slideDown rounded-2xl overflow-y-auto">
          <div className="absolute top-8 left-1/2 -translate-x-1/2 text-center pointer-events-none">
            <span className="font-montserrat font-black text-brown text-3xl md:text-5xl lg:text-6xl tracking-tight leading-none">
              FINT HJEM
            </span>
          </div>

          <nav className="text-center px-6 pt-28 pb-8">
            <ul className="space-y-6">
              <li className="animate-fadeInUp" style={{ animationDelay: '1.1s' }}>
                <Link
                  href="/"
                  onClick={() => setTimeout(() => setIsMenuOpen(false), 100)}
                  className="font-playfair font-light text-brown text-lg md:text-xl lg:text-2xl tracking-wider hover:text-gray-800 transition-all duration-500 cursor-pointer block"
                >
                  HJEM
                </Link>
              </li>
              {HOME_SECTION_LINKS.map((item, i) => (
                <li key={item.hash} className="animate-fadeInUp" style={{ animationDelay: `${1.25 + i * 0.15}s` }}>
                  <Link
                    href={`/#${item.hash}`}
                    onClick={() => setTimeout(() => setIsMenuOpen(false), 100)}
                    className="font-playfair font-light text-brown text-lg md:text-xl lg:text-2xl tracking-wider hover:text-gray-800 transition-all duration-500 cursor-pointer block"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="animate-fadeInUp" style={{ animationDelay: '1.85s' }}>
                <span className="font-playfair font-normal text-brown text-lg md:text-xl lg:text-2xl tracking-wider border-b border-brown/25 pb-1 inline-block">
                  Interiørdesign / Homestyling
                </span>
              </li>
              <li className="animate-fadeInUp" style={{ animationDelay: '2.0s' }}>
                <Link
                  href="/kontakt"
                  onClick={() => setTimeout(() => setIsMenuOpen(false), 100)}
                  className="font-playfair font-light text-brown text-lg md:text-xl lg:text-2xl tracking-wider hover:text-gray-800 transition-all duration-500 cursor-pointer block"
                >
                  Kontakt
                </Link>
              </li>
            </ul>
          </nav>

          <MenuSocialIcons onActivate={() => setIsMenuOpen(false)} />
        </div>
      )}

      {isMenuOpen && (
        <button
          onClick={() => setIsMenuOpen(false)}
          className="fixed top-8 left-8 z-[60] p-2 hover:bg-white/10 rounded-lg transition-colors duration-200"
          aria-label="Lukk meny"
        >
          <div className="w-6 h-6 relative">
            <span className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-800 transform -translate-y-1/2 rotate-45 transition-all duration-300" />
            <span className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-800 transform -translate-y-1/2 -rotate-45 transition-all duration-300" />
          </div>
        </button>
      )}
    </main>
  )
}
