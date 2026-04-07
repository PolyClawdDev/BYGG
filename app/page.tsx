'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useVideoMask } from './hooks/useVideoMask'

interface Section {
  id: string
  label: string
  num: string
  tag: string
  lines: string[]
  body: string
  link: string | null
}

const SECTIONS: Section[] = [
  {
    id: 'ditt-nye-hjem',
    label: 'Ditt Nye Hjem',
    num: '01',
    tag: 'NY KONSTRUKSJON',
    lines: ['VI BYGGER', 'DRØMMEHJEM'],
    body: 'Fra tomt til nøkkelferdig bolig. Vi håndterer hvert eneste steg med presisjon og omtanke.',
    link: null,
  },
  {
    id: 'renovering-forandring',
    label: 'Renovering & Forandring',
    num: '02',
    tag: 'RENOVASJON',
    lines: ['TRANSFORMER', 'DET EKSISTERENDE'],
    body: 'Gi hjemmet ditt nytt liv. Vi respekterer det eksisterende mens vi skaper noe ekstraordinært.',
    link: null,
  },
  {
    id: 'byggservice',
    label: 'Byggservice',
    num: '03',
    tag: 'FAGLIG HÅNDVERK',
    lines: ['FUNDAMENTET', 'FOR ALT ANNET'],
    body: 'Alt fra fundament til finish. Profesjonelle løsninger for private og kommersielle prosjekter.',
    link: null,
  },
  {
    id: 'interior-styling',
    label: 'Interiør & Styling',
    num: '04',
    tag: 'INTERIØRDESIGN',
    lines: ['ROMMET SOM', 'REFLEKTERER DEG'],
    body: 'Mer enn estetikk — vi skaper rom som virkelig føles riktige. Fra konsept til ferdig interiør.',
    link: '/interior-design-homestyling',
  },
]

const SECTION_BG = ['#f8f6f2', '#f0ebe5', '#f8f6f2', '#f0ebe5']

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isShaking, setIsShaking] = useState(false)
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())
  const maskStyle = useVideoMask()

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    const shakeInterval = setInterval(() => {
      setIsShaking(true)
      setTimeout(() => setIsShaking(false), 600)
    }, 5000)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.id]))
          }
        })
      },
      { threshold: 0.15 }
    )

    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id)
      if (el) observer.observe(el)
    })

    return () => {
      clearInterval(shakeInterval)
      observer.disconnect()
    }
  }, [])

  return (
    <main className="bg-white">

      {/* ─────────────────── HERO ─────────────────── */}
      <div className="h-screen p-4 relative">
        <div className="w-full h-full animate-subtle-bg rounded-2xl flex flex-col">

          {/* Hamburger */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="fixed top-8 left-8 z-50 p-2 hover:bg-white/10 rounded-lg transition-colors duration-200 animate-fadeIn"
            aria-label="Toggle menu"
          >
            <div className="w-6 h-5 relative flex flex-col justify-between">
              <span className={`w-full h-0.5 bg-gray-800 transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`w-full h-0.5 bg-gray-800 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`w-full h-0.5 bg-gray-800 transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>

          {/* Contact icon */}
          <Link
            href="/kontakt"
            className="fixed top-8 right-8 z-50 p-2 hover:bg-white/10 rounded-lg transition-colors duration-200 animate-fadeIn"
            aria-label="Contact"
          >
            <svg
              className={`w-8 h-8 text-gray-800 ${isShaking ? 'animate-shake' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </Link>

          {/* Logo + subtitle */}
          <div className="flex-1 flex flex-col px-4">
            <div className="flex-1 flex flex-col items-center justify-center">
              <div className="relative w-full max-w-7xl h-48 md:h-64 lg:h-80 px-4 animate-fadeInScale">
                <div className="relative w-full h-full">
                  <video
                    className="w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                    style={maskStyle}
                    onLoadedMetadata={(e) => {
                      e.currentTarget.currentTime = 0.1
                      e.currentTarget.playbackRate = 0.8
                    }}
                  >
                    <source src="/BYGGVIDEO.mp4..mov" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>

              <div className="text-center -mt-2 animate-fadeInUp" style={{ animationDelay: '1.2s' }}>
                <h2 className="font-playfair font-light text-brown text-lg md:text-xl lg:text-2xl tracking-wider">
                  DIN TOTALENTREPRENØR
                </h2>
              </div>
            </div>

            {/* Bottom nav */}
            <div className="mt-auto mb-6 md:mb-10 animate-fadeInUp" style={{ animationDelay: '1.8s' }}>
              <nav className="text-center">
                <ul className="font-playfair font-light text-brown tracking-wider space-y-3 md:space-y-0 md:space-x-8 md:flex md:items-center md:justify-center text-lg md:text-xl lg:text-2xl">
                  {SECTIONS.flatMap((s, i) => {
                    const items = [
                      <li
                        key={s.id}
                        className="relative group cursor-pointer hover:text-gray-800 transition-colors duration-300"
                        onClick={() => scrollToSection(s.id)}
                      >
                        {s.label}
                        <span
                          className="absolute -bottom-0.5 left-0 h-px bg-current"
                          style={{ width: 0, transition: 'width 0.35s ease' }}
                          onMouseEnter={(e) => { (e.currentTarget as HTMLSpanElement).style.width = '100%' }}
                        />
                        <style>{`li:hover span { width: 100% !important; }`}</style>
                      </li>,
                    ]
                    if (i < SECTIONS.length - 1) {
                      items.push(
                        <li key={`sep-${i}`} className="hidden md:block text-brown/40 select-none">
                          /
                        </li>
                      )
                    }
                    return items
                  })}
                </ul>
              </nav>

              {/* Scroll indicator */}
              <div className="flex justify-center mt-6 md:mt-8">
                <div className="flex flex-col items-center gap-1 animate-scrollPulse opacity-40">
                  <div className="w-px h-8 bg-brown" />
                  <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                    <path d="M1 1l4 4 4-4" stroke="#9c7a6d" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─────────────────── SECTIONS ─────────────────── */}
      {SECTIONS.map((section, idx) => {
        const visible = visibleSections.has(section.id)
        const ease = 'cubic-bezier(0.16, 1, 0.3, 1)'

        return (
          <section
            key={section.id}
            id={section.id}
            className="min-h-screen relative overflow-hidden flex items-center"
            style={{ backgroundColor: SECTION_BG[idx] }}
          >
            {/* Giant background number */}
            <span
              className="absolute font-montserrat font-black leading-none select-none pointer-events-none"
              style={{
                right: '-1rem',
                top: '50%',
                fontSize: 'clamp(10rem, 22vw, 28rem)',
                color: '#9c7a6d',
                opacity: visible ? 0.05 : 0,
                transform: visible
                  ? 'translateY(-50%) translateX(0)'
                  : 'translateY(-50%) translateX(3rem)',
                transition: `opacity 1.4s ease, transform 1.4s ${ease}`,
                transitionDelay: '0s',
              }}
            >
              {section.num}
            </span>

            <div className="max-w-7xl mx-auto w-full px-8 md:px-20 lg:px-32 py-32 relative z-10">

              {/* Tag */}
              <div className="overflow-hidden mb-8">
                <div
                  className="font-montserrat font-bold text-xs tracking-[0.4em] text-brown/50"
                  style={{
                    transform: visible ? 'translateY(0)' : 'translateY(110%)',
                    opacity: visible ? 1 : 0,
                    transition: `transform 0.9s ${ease}, opacity 0.7s ease`,
                    transitionDelay: '0.05s',
                  }}
                >
                  — {section.tag}
                </div>
              </div>

              {/* Headline lines — each sweeps up from overflow:hidden parent */}
              {section.lines.map((line, li) => (
                <div key={li} className="overflow-hidden">
                  <h2
                    className="font-montserrat font-black leading-[0.88] tracking-tight text-gray-900"
                    style={{
                      fontSize: 'clamp(2.8rem, 8.5vw, 9.5rem)',
                      transform: visible ? 'translateY(0)' : 'translateY(108%)',
                      opacity: visible ? 1 : 0,
                      transition: `transform 1.1s ${ease}, opacity 0.4s ease`,
                      transitionDelay: `${0.18 + li * 0.13}s`,
                      marginBottom: '0.04em',
                    }}
                  >
                    {line}
                  </h2>
                </div>
              ))}

              {/* Divider */}
              <div
                className="h-px bg-brown/15 mt-12 mb-10 origin-left"
                style={{
                  maxWidth: '520px',
                  transform: visible ? 'scaleX(1)' : 'scaleX(0)',
                  transition: `transform 1.3s ${ease}`,
                  transitionDelay: '0.45s',
                }}
              />

              {/* Body */}
              <p
                className="font-playfair font-light text-brown/75 text-lg md:text-xl leading-relaxed max-w-md"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateY(0)' : 'translateY(18px)',
                  filter: visible ? 'blur(0px)' : 'blur(3px)',
                  transition: 'opacity 0.9s ease, transform 0.9s ease, filter 0.9s ease',
                  transitionDelay: '0.62s',
                }}
              >
                {section.body}
              </p>

              {/* CTA (section 4 only) */}
              {section.link && (
                <Link
                  href={section.link}
                  className="inline-flex items-center gap-4 mt-14 group"
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? 'translateY(0)' : 'translateY(10px)',
                    transition: 'opacity 0.8s ease, transform 0.8s ease',
                    transitionDelay: '0.85s',
                  }}
                >
                  <span className="font-montserrat font-bold text-xs tracking-[0.35em] text-brown group-hover:text-gray-900 transition-colors duration-300">
                    UTFORSK MER
                  </span>
                  <span
                    className="h-px bg-brown group-hover:bg-gray-900 transition-all duration-500"
                    style={{ width: '2.5rem' }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLSpanElement).style.width = '5rem' }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLSpanElement).style.width = '2.5rem' }}
                  />
                </Link>
              )}
            </div>
          </section>
        )
      })}

      {/* ─────────────────── MENU OVERLAY ─────────────────── */}
      {isMenuOpen && (
        <div className="fixed inset-4 bg-amber-50 z-50 flex flex-col items-center justify-center animate-slideDown rounded-2xl">
          <div className="absolute top-8 left-1/2 transform -translate-x-1/2 text-center">
            <img src="/LOGO2.png" alt="FINTHEM Logo" className="h-4 md:h-6 lg:h-8 object-contain" />
          </div>

          <nav className="text-center">
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
              {SECTIONS.map((s, i) => (
                <li key={s.id} className="animate-fadeInUp" style={{ animationDelay: `${1.25 + i * 0.15}s` }}>
                  <button
                    onClick={() => {
                      setIsMenuOpen(false)
                      setTimeout(() => scrollToSection(s.id), 400)
                    }}
                    className="font-playfair font-light text-brown text-lg md:text-xl lg:text-2xl tracking-wider hover:text-gray-800 transition-all duration-500 cursor-pointer block bg-transparent border-0 p-0"
                  >
                    {s.label}
                  </button>
                </li>
              ))}
              <li className="animate-fadeInUp" style={{ animationDelay: '1.85s' }}>
                <Link
                  href="/interior-design-homestyling"
                  onClick={() => setTimeout(() => setIsMenuOpen(false), 100)}
                  className="font-playfair font-light text-brown text-lg md:text-xl lg:text-2xl tracking-wider hover:text-gray-800 transition-all duration-500 cursor-pointer block"
                >
                  Interiørdesign/Homestyling
                </Link>
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

          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-6">
            <a href="#" className="text-brown hover:text-gray-800 transition-colors duration-200">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            <a href="#" className="text-brown hover:text-gray-800 transition-colors duration-200">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
              </svg>
            </a>
            <a href="#" className="text-brown hover:text-gray-800 transition-colors duration-200">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            <a href="#" className="text-brown hover:text-gray-800 transition-colors duration-200">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>
        </div>
      )}

      {isMenuOpen && (
        <button
          onClick={() => setIsMenuOpen(false)}
          className="fixed top-8 left-8 z-[60] p-2 hover:bg-white/10 rounded-lg transition-colors duration-200"
          aria-label="Close menu"
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
