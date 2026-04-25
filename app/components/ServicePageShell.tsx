'use client'

/**
 * ServicePageShell
 * ────────────────
 * Shared layout for all dedicated service pages
 * (nybygg, renovering, bad, kjøkken, snekker, maling, vvs, tilbygg, vinduer).
 *
 * Keeps the nav/menu/footer consistent across all service pages while
 * letting each page supply its own SEO content via props.
 */

import { useState } from 'react'
import Link from 'next/link'
import SiteFooter from './SiteFooter'
import MenuSocialIcons from './MenuSocialIcons'

export interface ServiceFeature {
  title: string
  desc: string
}

export interface ServiceFaq {
  q: string
  a: string
}

export interface ServicePageProps {
  tag: string
  num: string
  headline: string
  subheadline: string
  intro: string[]
  features: ServiceFeature[]
  faqs: ServiceFaq[]
  ctaLabel: string
  image: string
  imageAlt: string
}

const EASE = 'cubic-bezier(0.16, 1, 0.3, 1)'

export default function ServicePageShell({
  tag,
  num,
  headline,
  subheadline,
  intro,
  features,
  faqs,
  ctaLabel,
  image,
  imageAlt,
}: ServicePageProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <main className="bg-white">

      {/* ── Nav buttons ── */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="fixed top-8 left-8 z-50 p-2 hover:bg-white/10 rounded-lg transition-colors duration-200"
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
        className="fixed top-8 right-8 z-50 p-2 hover:bg-white/10 rounded-lg transition-colors duration-200"
        aria-label="Kontakt oss"
      >
        <svg className="w-8 h-8 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      </Link>

      {/* ── Hero ── */}
      <section
        className="min-h-[70vh] flex flex-col lg:flex-row"
        style={{ backgroundColor: '#f8f6f2' }}
      >
        {/* Text side */}
        <div className="w-full lg:w-1/2 flex items-center px-8 md:px-14 lg:px-20 py-28 lg:py-0">
          <div className="max-w-xl w-full">
            {/* Eyebrow */}
            <div className="flex items-center gap-4 mb-10">
              <span className="h-px w-10 bg-brown/50 block" />
              <span className="font-montserrat font-bold text-[11px] tracking-[0.42em] text-brown/60">
                {tag}
              </span>
              <span className="font-montserrat font-bold text-[11px] tracking-[0.3em] text-brown/30 ml-auto hidden md:inline">
                / {num}
              </span>
            </div>

            {/* Headline */}
            <h1
              className="font-montserrat font-black text-gray-900 tracking-tight mb-4"
              style={{ fontSize: 'clamp(2.4rem, 6vw, 4.5rem)', lineHeight: 0.95, letterSpacing: '-0.02em' }}
            >
              {headline}
            </h1>
            <p
              className="font-montserrat font-bold text-brown/50 mb-10"
              style={{ fontSize: 'clamp(1rem, 2.5vw, 1.5rem)', letterSpacing: '-0.01em' }}
            >
              {subheadline}
            </p>

            <div className="h-px bg-brown/20 mb-8 origin-left" style={{ maxWidth: '320px' }} />

            <p className="font-playfair font-light text-brown/80 text-base md:text-lg leading-relaxed max-w-md mb-10">
              {intro[0]}
            </p>

            <Link
              href="/kontakt"
              className="group inline-flex items-center gap-5 pb-3 border-b border-brown/25 hover:border-gray-900 transition-colors duration-500"
            >
              <span className="font-montserrat font-bold text-[11px] tracking-[0.35em] text-gray-900">
                {ctaLabel}
              </span>
              <span className="relative flex items-center w-12 h-[1px] bg-brown/50 group-hover:bg-gray-900 group-hover:w-20 transition-all duration-500">
                <svg width="12" height="10" viewBox="0 0 12 10" className="absolute right-0 -translate-x-2 group-hover:translate-x-0 transition-transform duration-500 text-gray-900" aria-hidden>
                  <path d="M1 5h10M7 1l4 4-4 4" stroke="currentColor" strokeWidth="1.25" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </Link>
          </div>
        </div>

        {/* Image side */}
        <div className="w-full h-[60vw] lg:h-auto lg:w-1/2 relative overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image}
            alt={imageAlt}
            className="absolute inset-0 w-full h-full object-cover animate-kenburns"
            loading="eager"
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(to top, rgba(10,8,5,0.55) 0%, transparent 50%)' }}
          />
          {/* Corner brackets */}
          <div className="absolute top-6 left-6 w-10 h-10 pointer-events-none">
            <span className="absolute top-0 left-0 w-full h-px bg-white/70" />
            <span className="absolute top-0 left-0 w-px h-full bg-white/70" />
          </div>
          <div className="absolute bottom-6 right-6 w-10 h-10 pointer-events-none">
            <span className="absolute bottom-0 right-0 w-full h-px bg-white/70" />
            <span className="absolute bottom-0 right-0 w-px h-full bg-white/70" />
          </div>
        </div>
      </section>

      {/* ── Intro paragraphs ── */}
      {intro.length > 1 && (
        <section className="py-20 md:py-28 px-8 md:px-14 lg:px-20" style={{ backgroundColor: '#f0ebe5' }}>
          <div className="max-w-3xl mx-auto space-y-6">
            {intro.slice(1).map((p, i) => (
              <p key={i} className="font-playfair font-light text-brown/80 text-lg md:text-xl leading-relaxed">
                {p}
              </p>
            ))}
          </div>
        </section>
      )}

      {/* ── Features ── */}
      <section className="py-20 md:py-28 px-8 md:px-14 lg:px-20" style={{ backgroundColor: '#f8f6f2' }}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-14">
            <div className="flex items-center gap-4 mb-6">
              <span className="h-px w-10 bg-brown/40 block" />
              <span className="font-montserrat font-bold text-[11px] tracking-[0.42em] text-brown/50">
                HVA VI LEVERER
              </span>
            </div>
            <h2
              className="font-montserrat font-black text-gray-900 tracking-tight"
              style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', lineHeight: 1, letterSpacing: '-0.02em' }}
            >
              ALT INKLUDERT —<br />INGENTING OVERLATT TIL TILFELDIGHETENE
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feat, i) => (
              <div
                key={i}
                className="group border border-brown/10 hover:border-brown/35 rounded-2xl p-7 transition-all duration-500 hover:shadow-lg"
                style={{ backgroundColor: '#faf9f7' }}
              >
                <span className="font-montserrat font-black text-brown/15 text-5xl leading-none block mb-4 group-hover:text-brown/25 transition-colors duration-500">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="font-montserrat font-bold text-[13px] tracking-[0.2em] uppercase text-gray-900 mb-3">
                  {feat.title}
                </h3>
                <p className="font-playfair font-light text-brown/75 text-[15px] leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      {faqs.length > 0 && (
        <section className="py-20 md:py-28 px-8 md:px-14 lg:px-20" style={{ backgroundColor: '#f0ebe5' }}>
          <div className="max-w-3xl mx-auto">
            <div className="mb-14">
              <div className="flex items-center gap-4 mb-6">
                <span className="h-px w-10 bg-brown/40 block" />
                <span className="font-montserrat font-bold text-[11px] tracking-[0.42em] text-brown/50">
                  VANLIGE SPØRSMÅL
                </span>
              </div>
              <h2
                className="font-montserrat font-black text-gray-900"
                style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', lineHeight: 1, letterSpacing: '-0.02em' }}
              >
                SPØRSMÅL &<br />SVAR
              </h2>
            </div>

            <div className="space-y-8">
              {faqs.map((faq, i) => (
                <div key={i} className="border-b border-brown/15 pb-8">
                  <h3 className="font-montserrat font-bold text-gray-900 text-base mb-3">
                    {faq.q}
                  </h3>
                  <p className="font-playfair font-light text-brown/80 text-base leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Final CTA ── */}
      <section className="py-24 md:py-32 px-8 md:px-14 lg:px-20 text-center" style={{ backgroundColor: '#1a1614' }}>
        <div className="max-w-2xl mx-auto">
          <p className="font-montserrat font-bold text-[11px] tracking-[0.42em] text-white/40 mb-8">
            — FINT HJEM
          </p>
          <h2
            className="font-montserrat font-black text-white mb-8"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1, letterSpacing: '-0.02em' }}
          >
            LA OSS SNAKKE OM<br />DITT PROSJEKT
          </h2>
          <p className="font-playfair font-light text-white/60 text-lg mb-12 leading-relaxed">
            Vi tilbyr gratis befaring uten forpliktelser. Ring oss eller send en melding — så tar vi det derfra.
          </p>
          <Link
            href="/kontakt"
            className="group inline-flex items-center gap-5 px-10 py-5 border border-white/20 hover:border-white/60 rounded-full transition-all duration-500"
          >
            <span className="font-montserrat font-bold text-[11px] tracking-[0.35em] text-white">
              BOOK GRATIS BEFARING
            </span>
            <svg width="12" height="10" viewBox="0 0 12 10" className="text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all duration-500" aria-hidden>
              <path d="M1 5h10M7 1l4 4-4 4" stroke="currentColor" strokeWidth="1.25" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </section>

      <SiteFooter />

      {/* ── Menu overlay ── */}
      {isMenuOpen && (
        <div className="fixed inset-4 bg-amber-50 z-50 flex flex-col items-center justify-center animate-slideDown rounded-2xl">
          <div className="absolute top-8 left-1/2 -translate-x-1/2">
            <span className="font-montserrat font-black text-brown text-3xl md:text-5xl tracking-tight leading-none">FINT HJEM</span>
          </div>
          <nav className="text-center">
            <ul className="space-y-6">
              {[
                { label: 'HJEM', href: '/' },
                { label: 'Nybygg Oslo', href: '/nybygg-oslo' },
                { label: 'Renovering Oslo', href: '/renovering-oslo' },
                { label: 'Bad & Flislegging', href: '/bad-renovering-oslo' },
                { label: 'Interiørdesign', href: '/interior-design-homestyling' },
                { label: 'Kontakt', href: '/kontakt' },
              ].map((item, i) => (
                <li key={item.href} className="animate-fadeInUp" style={{ animationDelay: `${1.1 + i * 0.12}s` }}>
                  <Link
                    href={item.href}
                    onClick={() => setTimeout(() => setIsMenuOpen(false), 100)}
                    className="font-playfair font-light text-brown text-lg md:text-xl lg:text-2xl tracking-wider hover:text-gray-800 transition-all duration-500 block"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
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
            <span className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-800 -translate-y-1/2 rotate-45 transition-all duration-300" />
            <span className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-800 -translate-y-1/2 -rotate-45 transition-all duration-300" />
          </div>
        </button>
      )}
    </main>
  )
}
