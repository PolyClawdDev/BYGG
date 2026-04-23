'use client'

import { useState } from 'react'
import Link from 'next/link'
import MenuSocialIcons from '../components/MenuSocialIcons'

export default function InteriorDesign() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <main className="h-screen bg-white relative overflow-hidden p-4">
      <div className="w-full h-full animate-subtle-bg rounded-2xl flex flex-col">
        {/* Hamburger Menu */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="fixed top-8 left-8 z-50 p-2 hover:bg-white/10 rounded-lg transition-colors duration-200 animate-fadeIn"
          aria-label="Toggle menu"
        >
          <div className="w-6 h-5 relative flex flex-col justify-between">
            <span className={`w-full h-0.5 bg-gray-800 transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`w-full h-0.5 bg-gray-800 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-full h-0.5 bg-gray-800 transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </div>
        </button>

        {/* Main Content */}
        <div className="flex-1 flex flex-col px-4">
          {/* Logo at the top */}
          <div className="absolute top-8 left-1/2 transform -translate-x-1/2 text-center">
            <img 
              src="/LOGO2.png" 
              alt="Fint Hjem logo" 
              className="h-4 md:h-6 lg:h-8 object-contain"
            />
          </div>
          
          {/* Content Section - Centered */}
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="w-full max-w-4xl">
              {/* Header */}
              <div className="text-center mb-12 animate-fadeInUp">
                <h1 className="font-playfair font-light text-brown text-3xl md:text-4xl lg:text-5xl tracking-wider mb-4">
                  Interiørdesign/Homestyling
                </h1>
              </div>

              {/* Content */}
              <div className="animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
                <div className="prose prose-lg max-w-none">
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

              {/* Back to Home Button */}
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

      {/* Full-Screen Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-4 bg-amber-50 z-50 flex flex-col items-center justify-center animate-slideDown rounded-2xl">
          {/* Logo at the top */}
          <div className="absolute top-8 left-1/2 transform -translate-x-1/2 text-center">
            <img 
              src="/LOGO2.png" 
              alt="Fint Hjem logo" 
              className="h-4 md:h-6 lg:h-8 object-contain"
            />
          </div>
          
          {/* Menu Items */}
          <nav className="text-center">
            <ul className="space-y-6">
              <li className="animate-fadeInUp" style={{ animationDelay: '1.1s' }}>
                <Link 
                  href="/"
                  onClick={() => {
                    setTimeout(() => setIsMenuOpen(false), 100)
                  }}
                  className="font-playfair font-light text-brown text-lg md:text-xl lg:text-2xl tracking-wider hover:text-gray-800 transition-all duration-500 cursor-pointer block"
                >
                  HJEM
                </Link>
              </li>
              <li className="animate-fadeInUp" style={{ animationDelay: '1.25s' }}>
                <a href="#" className="font-playfair font-light text-brown text-lg md:text-xl lg:text-2xl tracking-wider hover:text-gray-800 transition-all duration-500 cursor-pointer block">
                  Tjenester
                </a>
              </li>
              <li className="animate-fadeInUp" style={{ animationDelay: '1.4s' }}>
                <a href="#" className="font-playfair font-light text-brown text-lg md:text-xl lg:text-2xl tracking-wider hover:text-gray-800 transition-all duration-500 cursor-pointer block">
                  Byggservice
                </a>
              </li>
              <li className="animate-fadeInUp" style={{ animationDelay: '1.55s' }}>
                <Link 
                  href="/interior-design-homestyling"
                  onClick={() => {
                    setTimeout(() => setIsMenuOpen(false), 100)
                  }}
                  className="font-playfair font-light text-brown text-lg md:text-xl lg:text-2xl tracking-wider hover:text-gray-800 transition-all duration-500 cursor-pointer block"
                >
                  Interiørdesign/Homestyling
                </Link>
              </li>
              <li className="animate-fadeInUp" style={{ animationDelay: '1.7s' }}>
                <a href="#" className="font-playfair font-light text-brown text-lg md:text-xl lg:text-2xl tracking-wider hover:text-gray-800 transition-all duration-500 cursor-pointer block">
                  Referanser
                </a>
              </li>
              <li className="animate-fadeInUp" style={{ animationDelay: '1.85s' }}>
                <a href="#" className="font-playfair font-light text-brown text-lg md:text-xl lg:text-2xl tracking-wider hover:text-gray-800 transition-all duration-500 cursor-pointer block">
                  Om Oss
                </a>
              </li>
              <li className="animate-fadeInUp" style={{ animationDelay: '2.0s' }}>
                <Link 
                  href="/kontakt"
                  onClick={() => {
                    setTimeout(() => setIsMenuOpen(false), 100)
                  }}
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

      {/* X Close Button - Same position as hamburger menu */}
      {isMenuOpen && (
        <button
          onClick={() => setIsMenuOpen(false)}
          className="fixed top-8 left-8 z-50 p-2 hover:bg-white/10 rounded-lg transition-colors duration-200"
          aria-label="Close menu"
        >
          <div className="w-6 h-6 relative">
            <span className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-800 transform -translate-y-1/2 rotate-45 transition-all duration-300"></span>
            <span className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-800 transform -translate-y-1/2 -rotate-45 transition-all duration-300"></span>
          </div>
        </button>
      )}
    </main>
  )
}
