'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useVideoMask } from './hooks/useVideoMask'
import ReviewsCarousel from './components/ReviewsCarousel'
import SiteFooter from './components/SiteFooter'

/* ─── Data ─── */

interface Section {
  id: string
  label: string
  num: string
  tag: string
  lines: string[]
  body: string
  link: string | null
  imageSide: 'right' | 'left'
  image: string
  imageAlt: string
}

const SECTIONS: Section[] = [
  {
    id: 'ditt-nye-hjem',
    label: 'Ditt Nye Hjem',
    num: '01',
    tag: 'NY KONSTRUKSJON',
    lines: ['VI BYGGER', 'DRØMMEHJEM'],
    body: 'Fra tomt til nøkkelferdig bolig. Vi håndterer hvert eneste steg med presisjon og omtanke — fra søknad til innflytting.',
    link: null,
    imageSide: 'right',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85',
    imageAlt: 'Moderne nybygget bolighus med hvit fasade',
  },
  {
    id: 'renovering-forandring',
    label: 'Renovering & Forandring',
    num: '02',
    tag: 'RENOVASJON',
    lines: ['TRANSFORMER', 'DET EKSISTERENDE'],
    body: 'Gi hjemmet ditt nytt liv. Vi respekterer det eksisterende mens vi skaper noe ekstraordinært — kjøkken, bad, fasade og alt imellom.',
    link: null,
    imageSide: 'left',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1400&q=85',
    imageAlt: 'Nyrenovert moderne kjøkken',
  },
  {
    id: 'interior-styling',
    label: 'Interiør & Styling',
    num: '04',
    tag: 'INTERIØRDESIGN',
    lines: ['ROMMET SOM', 'REFLEKTERER DEG'],
    body: 'Mer enn estetikk — vi skaper rom som virkelig føles riktige. Fra konsept til ferdig interiør med hvert eneste detalj på plass.',
    link: '/interior-design-homestyling',
    imageSide: 'right',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1400&q=85',
    imageAlt: 'Luksuriøst skandinavisk interiør med minimalistisk design',
  },
]

const SECTION_BG = ['#f8f6f2', '#f0ebe5', '#f8f6f2']

const BYGGSERVICE_ITEMS = [
  { title: 'Snekkerarbeid', desc: 'Skreddersydde trevareløsninger, innredning og finish av høyeste håndverkskvalitet.', icon: 'M4 6h16M4 12h16M4 18h7M15 15l4 4-4 4M19 19h-4' },
  { title: 'Bad & Flislegging', desc: 'Komplette baderomsrenovasjoner med presist håndverk fra membran til ferdig flate.', icon: 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01' },
  { title: 'Maling & Overflater', desc: 'Profesjonell maling innvendig og utvendig — inkludert tapetsering og sparkling.', icon: 'M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z' },
  { title: 'VVS / Rørlegger', desc: 'Rørleggerarbeid for bad, kjøkken og tekniske installasjoner. Godkjente fagfolk.', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065zM15 12a3 3 0 11-6 0 3 3 0 016 0z' },
  { title: 'Tilbygg & Nybygg', desc: 'Tilbygg, garasjer, anneks og nøkkelferdige boliger. Vi håndterer alt fra søknad til nøkkel.', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
  { title: 'Vinduer & Dører', desc: 'Montering og utskifting av vinduer og dører for bedre isolasjon, lys og estetikk.', icon: 'M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18' },
]

/* ─── Page ─── */

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isShaking, setIsShaking] = useState(false)
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())
  const [byggVisible, setByggVisible] = useState(false)
  const maskStyle = useVideoMask()

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    const shakeInterval = setInterval(() => {
      setIsShaking(true)
      setTimeout(() => setIsShaking(false), 600)
    }, 5000)

    const allIds = [...SECTIONS.map((s) => s.id), 'byggservice']
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target.id === 'byggservice') {
              setByggVisible(true)
            } else {
              setVisibleSections((prev) => {
                const next = new Set(prev)
                next.add(entry.target.id)
                return next
              })
            }
          }
        })
      },
      { threshold: 0, rootMargin: '0px 0px 100px 0px' }
    )

    allIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => {
      clearInterval(shakeInterval)
      observer.disconnect()
    }
  }, [])

  const ease = 'cubic-bezier(0.16, 1, 0.3, 1)'

  /* Headline font wrapper — no clip-path, no overflow */
  const headlineWrapStyle: React.CSSProperties = {
    fontSize: 'clamp(2rem, 3.8vw, 5rem)',
    lineHeight: 0.9,
    letterSpacing: '-0.02em',
    marginBottom: '0.06em',
    overflow: 'hidden',   // clips the inner span vertically only — text never overflows horizontally
    display: 'block',
  }

  /* Inner span animates up into view */
  const headlineStyle = (visible: boolean, delay: number): React.CSSProperties => ({
    display: 'block',
    paddingBottom: '0.12em', // prevents descender clipping
    transform: visible ? 'translateY(0)' : 'translateY(108%)',
    opacity: visible ? 1 : 0,
    transition: `transform 1.1s ${ease}, opacity 0.5s ease`,
    transitionDelay: `${delay}s`,
  })

  const tagStyle = (visible: boolean): React.CSSProperties => ({
    transform: visible ? 'translateY(0)' : 'translateY(110%)',
    opacity: visible ? 1 : 0,
    transition: `transform 0.9s ${ease}, opacity 0.7s ease`,
    transitionDelay: '0.05s',
  })

  /* Cinematic clip-path wipe: right-side image enters from right, left from left */
  const imagePanelClip = (visible: boolean, side: 'right' | 'left'): React.CSSProperties => ({
    clipPath: visible
      ? 'inset(0 0 0 0)'
      : side === 'right' ? 'inset(0 0 0 100%)' : 'inset(0 100% 0 0)',
    transition: `clip-path 1.5s ${ease}`,
    transitionDelay: '0.15s',
  })

  return (
    <main className="bg-white">

      {/* ═══════════ HERO ═══════════ */}
      <div className="h-screen p-4 relative">
        <div className="w-full h-full animate-subtle-bg rounded-2xl flex flex-col">

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

          <Link
            href="/kontakt"
            className="fixed top-8 right-8 z-50 p-2 hover:bg-white/10 rounded-lg transition-colors duration-200 animate-fadeIn"
            aria-label="Contact"
          >
            <svg className={`w-8 h-8 text-gray-800 ${isShaking ? 'animate-shake' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </Link>

          <div className="flex-1 flex flex-col px-4">
            <div className="flex-1 flex flex-col items-center justify-center">
              <div className="relative w-full max-w-7xl h-48 md:h-64 lg:h-80 px-4 animate-fadeInScale">
                <div className="relative w-full h-full">
                  <video
                    className="w-full h-full object-cover"
                    autoPlay muted loop playsInline
                    style={maskStyle}
                    onLoadedMetadata={(e) => {
                      e.currentTarget.currentTime = 0.1
                      e.currentTarget.playbackRate = 0.8
                    }}
                  >
                    <source src="/BYGGVIDEO.mp4..mov" type="video/mp4" />
                  </video>
                </div>
              </div>
              <div className="text-center -mt-2 animate-fadeInUp" style={{ animationDelay: '1.2s' }}>
                <h2 className="font-playfair font-light text-brown text-lg md:text-xl lg:text-2xl tracking-wider">
                  DIN TOTALENTREPRENØR
                </h2>
              </div>
            </div>

            <div className="mt-auto mb-6 md:mb-10 animate-fadeInUp" style={{ animationDelay: '1.8s' }}>
              <nav className="text-center">
                <ul className="font-playfair font-light text-brown tracking-wider space-y-3 md:space-y-0 md:space-x-6 md:flex md:items-center md:justify-center text-lg md:text-xl lg:text-2xl">
                  {[
                    { label: 'Ditt Nye Hjem', id: 'ditt-nye-hjem' },
                    { label: 'Renovering & Forandring', id: 'renovering-forandring' },
                    { label: 'Byggservice', id: 'byggservice' },
                    { label: 'Interiør & Styling', id: 'interior-styling' },
                  ].flatMap((item, i, arr) => {
                    const node = (
                      <li key={item.id} className="relative cursor-pointer group hover:text-gray-800 transition-colors duration-300" onClick={() => scrollToSection(item.id)}>
                        <span className="relative">
                          {item.label}
                          <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-current transition-all duration-300 group-hover:w-full block" />
                        </span>
                      </li>
                    )
                    const sep = i < arr.length - 1 ? <li key={`sep-${i}`} className="hidden md:block text-brown/40 select-none">/</li> : null
                    return sep ? [node, sep] : [node]
                  })}
                </ul>
              </nav>
              <div className="flex justify-center mt-6">
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

      {/* ═══════════ SPLIT SECTIONS (01, 02, 04) ═══════════ */}
      {SECTIONS.map((section, idx) => {
        const visible = visibleSections.has(section.id)
        const bg = SECTION_BG[idx]

        const textSide = (
          <div className="w-full lg:w-1/2 flex items-center px-8 md:px-14 lg:px-16 py-20 lg:py-0 relative min-h-[70vw] lg:min-h-screen">
            {/* Ghost number — desktop only */}
            <span
              className="absolute font-montserrat font-black leading-none select-none pointer-events-none hidden lg:block"
              style={{
                right: section.imageSide === 'right' ? '-0.5rem' : 'auto',
                left: section.imageSide === 'left' ? '-0.5rem' : 'auto',
                top: '50%',
                fontSize: 'clamp(8rem, 14vw, 18rem)',
                color: '#9c7a6d',
                opacity: visible ? 0.06 : 0,
                transform: visible ? 'translateY(-50%)' : 'translateY(-50%) translateX(2rem)',
                transition: `opacity 1.4s ease, transform 1.4s ${ease}`,
              }}
            >
              {section.num}
            </span>

            <div className="relative z-10 w-full">
              <div className="overflow-hidden mb-8">
                <div className="font-montserrat font-bold text-xs tracking-[0.42em] text-brown/50" style={tagStyle(visible)}>
                  — {section.tag}
                </div>
              </div>

              {section.lines.map((line, li) => (
                <span key={li} className="font-montserrat font-black text-gray-900 block" style={headlineWrapStyle}>
                  <span style={headlineStyle(visible, 0.18 + li * 0.13)}>{line}</span>
                </span>
              ))}

              <div
                className="h-px bg-brown/15 mt-10 mb-9 origin-left"
                style={{
                  maxWidth: '440px',
                  transform: visible ? 'scaleX(1)' : 'scaleX(0)',
                  transition: `transform 1.3s ${ease}`,
                  transitionDelay: '0.45s',
                }}
              />

              <p
                className="font-playfair font-light text-brown/80 text-base md:text-lg leading-relaxed max-w-sm"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateY(0)' : 'translateY(14px)',
                  filter: visible ? 'blur(0px)' : 'blur(3px)',
                  transition: 'opacity 0.9s ease, transform 0.9s ease, filter 0.9s ease',
                  transitionDelay: '0.6s',
                }}
              >
                {section.body}
              </p>

              {section.link && (
                <Link
                  href={section.link}
                  className="inline-flex items-center gap-4 mt-12 group"
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? 'translateY(0)' : 'translateY(10px)',
                    transition: 'opacity 0.8s ease, transform 0.8s ease',
                    transitionDelay: '0.82s',
                  }}
                >
                  <span className="font-montserrat font-bold text-xs tracking-[0.35em] text-brown group-hover:text-gray-900 transition-colors duration-300">UTFORSK MER</span>
                  <span className="h-px w-10 bg-brown group-hover:w-20 group-hover:bg-gray-900 transition-all duration-500" />
                </Link>
              )}
            </div>
          </div>
        )

        /* Image panel: Ken Burns zoom + cinematic clip-path wipe reveal */
        const imageSide = (
          <div
            className="w-full h-[70vw] md:h-[55vw] lg:h-auto lg:w-1/2 flex-shrink-0 relative"
            style={imagePanelClip(visible, section.imageSide)}
          >
            <div className="absolute inset-0 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={section.image}
                alt={section.imageAlt}
                className="absolute inset-0 w-full h-full object-cover animate-kenburns"
                loading="eager"
              />

              {/* Soft edge blend + bottom vignette */}
              <div
                className="absolute inset-0"
                style={{
                  background: section.imageSide === 'right'
                    ? 'linear-gradient(to right, rgba(248,246,242,0.25) 0%, transparent 18%), linear-gradient(to top, rgba(10,8,5,0.6) 0%, transparent 42%)'
                    : 'linear-gradient(to left, rgba(240,235,229,0.25) 0%, transparent 18%), linear-gradient(to top, rgba(10,8,5,0.6) 0%, transparent 42%)',
                }}
              />

              {/* Bottom tag label */}
              <div className="absolute bottom-8 left-8 right-8 z-10">
                <p className="font-montserrat font-bold text-xs tracking-[0.4em] text-white/60 mb-2">— {section.tag}</p>
                <div className="h-px bg-white/20" />
              </div>
            </div>
          </div>
        )

        return (
          <section
            key={section.id}
            id={section.id}
            className={`flex flex-col ${section.imageSide === 'left' ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}
            style={{ backgroundColor: bg }}
          >
            {textSide}
            {imageSide}
          </section>
        )
      })}

      {/* ═══════════ BYGGSERVICE ═══════════ */}
      <section
        id="byggservice"
        className="py-24 md:py-32 px-8 md:px-14 lg:px-20 relative overflow-hidden"
        style={{ backgroundColor: '#f0ebe5' }}
      >
        <span
          className="absolute font-montserrat font-black leading-none select-none pointer-events-none hidden lg:block"
          style={{
            right: '-1rem',
            top: '6rem',
            fontSize: 'clamp(10rem, 18vw, 24rem)',
            color: '#9c7a6d',
            opacity: byggVisible ? 0.05 : 0,
            transform: byggVisible ? 'translateX(0)' : 'translateX(3rem)',
            transition: `opacity 1.4s ease, transform 1.4s ${ease}`,
          }}
        >
          03
        </span>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="mb-16">
            <div className="overflow-hidden mb-8">
              <div className="font-montserrat font-bold text-xs tracking-[0.42em] text-brown/50" style={tagStyle(byggVisible)}>
                — FAGLIG HÅNDVERK
              </div>
            </div>
            {['FUNDAMENTET', 'FOR ALT ANNET'].map((line, li) => (
              <span key={li} className="font-montserrat font-black text-gray-900 block" style={headlineWrapStyle}>
                <span style={headlineStyle(byggVisible, 0.18 + li * 0.13)}>{line}</span>
              </span>
            ))}
            <div
              className="h-px bg-brown/15 mt-10 origin-left"
              style={{
                maxWidth: '440px',
                transform: byggVisible ? 'scaleX(1)' : 'scaleX(0)',
                transition: `transform 1.3s ${ease}`,
                transitionDelay: '0.45s',
              }}
            />
          </div>

          {/* Clean service cards — no image areas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {BYGGSERVICE_ITEMS.map((item, i) => (
              <div
                key={item.title}
                className="group p-8 rounded-2xl border border-brown/10 hover:border-brown/30 hover:shadow-lg transition-all duration-500"
                style={{
                  backgroundColor: '#f8f6f2',
                  opacity: byggVisible ? 1 : 0,
                  transform: byggVisible ? 'translateY(0)' : 'translateY(28px)',
                  transition: 'opacity 0.8s ease, transform 0.8s ease, border-color 0.4s, box-shadow 0.4s',
                  transitionDelay: `${0.55 + i * 0.1}s`,
                }}
              >
                <div className="w-10 h-10 mb-6 text-brown/60 group-hover:text-brown transition-colors duration-300">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                  </svg>
                </div>
                <h3 className="font-montserrat font-black text-xs tracking-[0.2em] text-gray-900 mb-3 uppercase">
                  {item.title}
                </h3>
                <p className="font-playfair font-light text-brown/70 text-base leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          <div
            className="mt-14"
            style={{
              opacity: byggVisible ? 1 : 0,
              transform: byggVisible ? 'translateY(0)' : 'translateY(10px)',
              transition: 'opacity 0.8s ease, transform 0.8s ease',
              transitionDelay: '1.2s',
            }}
          >
            <Link href="/kontakt" className="inline-flex items-center gap-4 group">
              <span className="font-montserrat font-bold text-xs tracking-[0.35em] text-brown group-hover:text-gray-900 transition-colors duration-300">
                BOOK GRATIS BEFARING
              </span>
              <span className="h-px w-10 bg-brown group-hover:w-20 group-hover:bg-gray-900 transition-all duration-500" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════ REVIEWS ═══════════ */}
      <ReviewsCarousel />

      {/* ═══════════ FOOTER ═══════════ */}
      <SiteFooter />

      {/* ═══════════ MENU OVERLAY ═══════════ */}
      {isMenuOpen && (
        <div className="fixed inset-4 bg-amber-50 z-50 flex flex-col items-center justify-center animate-slideDown rounded-2xl">
          <div className="absolute top-8 left-1/2 transform -translate-x-1/2">
            <img src="/LOGO2.png" alt="Fint Hjem" className="h-4 md:h-6 lg:h-8 object-contain" />
          </div>
          <nav className="text-center">
            <ul className="space-y-6">
              <li className="animate-fadeInUp" style={{ animationDelay: '1.1s' }}>
                <Link href="/" onClick={() => setTimeout(() => setIsMenuOpen(false), 100)} className="font-playfair font-light text-brown text-lg md:text-xl lg:text-2xl tracking-wider hover:text-gray-800 transition-all duration-500 block">HJEM</Link>
              </li>
              {[
                { label: 'Ditt Nye Hjem', id: 'ditt-nye-hjem' },
                { label: 'Renovering & Forandring', id: 'renovering-forandring' },
                { label: 'Byggservice', id: 'byggservice' },
                { label: 'Interiør & Styling', id: 'interior-styling' },
              ].map((item, i) => (
                <li key={item.id} className="animate-fadeInUp" style={{ animationDelay: `${1.25 + i * 0.15}s` }}>
                  <button
                    onClick={() => { setIsMenuOpen(false); setTimeout(() => scrollToSection(item.id), 400) }}
                    className="font-playfair font-light text-brown text-lg md:text-xl lg:text-2xl tracking-wider hover:text-gray-800 transition-all duration-500 block bg-transparent border-0 p-0"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
              <li className="animate-fadeInUp" style={{ animationDelay: '1.85s' }}>
                <Link href="/interior-design-homestyling" onClick={() => setTimeout(() => setIsMenuOpen(false), 100)} className="font-playfair font-light text-brown text-lg md:text-xl lg:text-2xl tracking-wider hover:text-gray-800 transition-all duration-500 block">
                  Interiørdesign / Homestyling
                </Link>
              </li>
              <li className="animate-fadeInUp" style={{ animationDelay: '2.0s' }}>
                <Link href="/kontakt" onClick={() => setTimeout(() => setIsMenuOpen(false), 100)} className="font-playfair font-light text-brown text-lg md:text-xl lg:text-2xl tracking-wider hover:text-gray-800 transition-all duration-500 block">
                  Kontakt
                </Link>
              </li>
            </ul>
          </nav>
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-6">
            {[
              'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z',
              'M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z',
              'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
              'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
            ].map((d, i) => (
              <a key={i} href="#" className="text-brown hover:text-gray-800 transition-colors duration-200">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d={d} /></svg>
              </a>
            ))}
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
