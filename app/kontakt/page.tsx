'use client'

import { useState } from 'react'
import Link from 'next/link'
import MenuSocialIcons from '../components/MenuSocialIcons'

export default function Kontakt() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [userMessage, setUserMessage] = useState('')
  const [userName, setUserName] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [userPhone, setUserPhone] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Booking submitted:', {
      date: selectedDate,
      time: selectedTime,
      name: userName,
      email: userEmail,
      phone: userPhone,
      message: userMessage
    })
    alert('Takk for din bestilling! Vi tar kontakt snart.')
  }

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

        {/* Main Content — one-viewport fit, no vertical overflow, no top logo. */}
        <div className="flex-1 flex flex-col justify-center px-4 md:px-8 py-4 md:py-6" key="contact-page-v3">
          <div className="w-full max-w-5xl mx-auto">
            {/* Header */}
            <div className="text-center mb-3 md:mb-4 animate-fadeInUp">
              <h1 className="font-playfair font-light text-brown text-2xl md:text-3xl lg:text-4xl tracking-wider">
                Kontakt
              </h1>
            </div>

            {/* Two-column: info + booking form. Aggressive spacing
                tightening so all content lives inside the fixed
                h-screen hero card without clipping. */}
            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
              {/* Contact Details */}
              <div className="animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
                <h2 className="font-playfair font-light text-brown text-xl md:text-2xl tracking-wider mb-3">
                  Kontaktinformasjon
                </h2>
                <div className="space-y-2 text-sm md:text-base">
                  <div>
                    <h3 className="font-playfair font-light text-brown font-medium">Kontaktperson</h3>
                    <p className="font-playfair font-light text-brown">Daniel Christinasson</p>
                  </div>
                  <div>
                    <h3 className="font-playfair font-light text-brown font-medium">Telefon</h3>
                    <p className="font-playfair font-light text-brown">+47 465 83 867</p>
                  </div>
                  <div>
                    <h3 className="font-playfair font-light text-brown font-medium">E-post</h3>
                    <p className="font-playfair font-light text-brown">info@finthjem.no</p>
                  </div>
                  <div>
                    <h3 className="font-playfair font-light text-brown font-medium">Adresse</h3>
                    <p className="font-playfair font-light text-brown">Prinsensgate 5, 0152 Oslo</p>
                  </div>
                  <div>
                    <h3 className="font-playfair font-light text-brown font-medium">Åpningstider</h3>
                    <p className="font-playfair font-light text-brown">Man–Fre 08–17 · Lør 09–15 · Søn stengt</p>
                  </div>
                </div>

                <div className="mt-4 md:mt-6 animate-fadeInUp" style={{ animationDelay: '1.2s' }}>
                  <Link
                    href="/"
                    className="inline-block font-playfair font-light text-brown text-sm md:text-base tracking-wider hover:text-gray-800 transition-all duration-500 cursor-pointer border-b border-brown/30 hover:border-brown"
                  >
                    ← Tilbake til startsiden
                  </Link>
                </div>
              </div>

              {/* Booking Form */}
              <div className="animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
                <h2 className="font-playfair font-light text-brown text-xl md:text-2xl tracking-wider mb-3">
                  Gratis befaring på stedet
                </h2>
                <form onSubmit={handleSubmit} className="space-y-2.5">
                  <div className="grid grid-cols-2 gap-2.5">
                    <input
                      type="text"
                      required
                      aria-label="Navn"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="w-full px-3 py-2 border border-brown/30 rounded-lg focus:outline-none focus:border-brown font-playfair font-light text-brown text-sm md:text-base bg-white/80"
                      placeholder="Navn *"
                    />
                    <input
                      type="email"
                      required
                      aria-label="E-post"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      className="w-full px-3 py-2 border border-brown/30 rounded-lg focus:outline-none focus:border-brown font-playfair font-light text-brown text-sm md:text-base bg-white/80"
                      placeholder="E-post *"
                    />
                  </div>
                  <input
                    type="tel"
                    aria-label="Telefon"
                    value={userPhone}
                    onChange={(e) => setUserPhone(e.target.value)}
                    className="w-full px-3 py-2 border border-brown/30 rounded-lg focus:outline-none focus:border-brown font-playfair font-light text-brown text-sm md:text-base bg-white/80"
                    placeholder="Telefon"
                  />
                  <div className="grid grid-cols-2 gap-2.5">
                    <input
                      type="date"
                      required
                      aria-label="Ønsket dato"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-3 py-2 border border-brown/30 rounded-lg focus:outline-none focus:border-brown font-playfair font-light text-brown text-sm md:text-base bg-white/80"
                    />
                    <input
                      type="text"
                      required
                      aria-label="Ønsket tidspunkt"
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                      className="w-full px-3 py-2 border border-brown/30 rounded-lg focus:outline-none focus:border-brown font-playfair font-light text-brown text-sm md:text-base bg-white/80"
                      placeholder="Tidspunkt *"
                    />
                  </div>
                  <textarea
                    required
                    aria-label="Beskrivelse"
                    value={userMessage}
                    onChange={(e) => setUserMessage(e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-brown/30 rounded-lg focus:outline-none focus:border-brown font-playfair font-light text-brown text-sm md:text-base bg-white/80 resize-none"
                    placeholder="Beskriv kort hva dere trenger hjelp med — f.eks. renovering av kjøkken, nytt bad, tilbygg *"
                  />
                  <button
                    type="submit"
                    className="w-full bg-brown text-white font-playfair font-light text-base py-2.5 px-6 rounded-lg hover:bg-brown/80 transition-colors duration-300"
                  >
                    Book gratis befaring
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full-Screen Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-4 bg-amber-50 z-50 flex flex-col items-center justify-center animate-slideDown rounded-2xl">
          <div className="absolute top-8 left-1/2 transform -translate-x-1/2 text-center">
            <span className="font-montserrat font-black text-brown text-3xl md:text-5xl lg:text-6xl tracking-tight leading-none">
              FINT HJEM
            </span>
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
