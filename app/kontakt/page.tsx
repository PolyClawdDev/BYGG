'use client'

import { useState } from 'react'
import Link from 'next/link'

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
          
          {/* Social Media Icons - Bottom of Dropdown Menu */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-6">
            <a href="#" className="text-brown hover:text-gray-800 transition-colors duration-200">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a href="#" className="text-brown hover:text-gray-800 transition-colors duration-200">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
              </svg>
            </a>
            <a href="#" className="text-brown hover:text-gray-800 transition-colors duration-200">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a href="#" className="text-brown hover:text-gray-800 transition-colors duration-200">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>
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
