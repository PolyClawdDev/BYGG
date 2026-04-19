'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import ReviewsCarousel from './components/ReviewsCarousel'
import SiteFooter from './components/SiteFooter'

/* ─── Data ─── */

interface SectionBadge {
  value: string
  label: string
}

interface Section {
  id: string
  label: string
  num: string
  tag: string
  lines: string[]
  body: string
  link: string | null
  ctaLabel: string
  imageSide: 'right' | 'left'
  image: string
  imageAlt: string
  features: string[]
  badge: SectionBadge
}

const SECTIONS: Section[] = [
  {
    id: 'ditt-nye-hjem',
    label: 'Ditt Nye Hjem',
    num: '01',
    tag: 'NY KONSTRUKSJON',
    lines: ['VI BYGGER', 'DRØMMEHJEM'],
    body: 'Fra tomt til nøkkelferdig bolig. Vi håndterer hvert eneste steg med presisjon og omtanke — fra søknad til innflytting.',
    link: '/kontakt',
    ctaLabel: 'START DITT PROSJEKT',
    imageSide: 'right',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=90',
    imageAlt: 'Moderne nybygget bolighus med hvit fasade',
    features: [
      'Totalentreprenør fra A til Å',
      'Søknadsbehandling og tegninger inkludert',
      'Egen arkitekt og prosjektleder',
      'Nøkkelferdig overlevering',
    ],
    badge: { value: '150+', label: 'HJEM BYGGET' },
  },
  {
    id: 'renovering-forandring',
    label: 'Renovering & Forandring',
    num: '02',
    tag: 'RENOVASJON',
    lines: ['TRANSFORMER', 'DET EKSISTERENDE'],
    body: 'Gi hjemmet ditt nytt liv. Vi respekterer det eksisterende mens vi skaper noe ekstraordinært — kjøkken, bad, fasade og alt imellom.',
    link: '/kontakt',
    ctaLabel: 'BOOK BEFARING',
    imageSide: 'left',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1800&q=90',
    imageAlt: 'Nyrenovert moderne kjøkken',
    features: [
      'Totalrenovering av bolig',
      'Kjøkken, bad og våtrom',
      'Fasade, tak og energioppgradering',
      'Detaljert tidsplan og budsjett',
    ],
    badge: { value: '20+', label: 'ÅRS ERFARING' },
  },
  {
    id: 'interior-styling',
    label: 'Interiør & Styling',
    num: '04',
    tag: 'INTERIØRDESIGN',
    lines: ['ROMMET SOM', 'REFLEKTERER DEG'],
    body: 'Mer enn estetikk — vi skaper rom som virkelig føles riktige. Fra konsept til ferdig interiør med hvert eneste detalj på plass.',
    link: '/interior-design-homestyling',
    ctaLabel: 'UTFORSK MER',
    imageSide: 'right',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1800&q=90',
    imageAlt: 'Luksuriøst skandinavisk interiør med minimalistisk design',
    features: [
      'Konseptutvikling og moodboard',
      '3D-visualisering av rommene',
      'Fargepalett, tekstiler og materialer',
      'Styling, møblering og dekor',
    ],
    badge: { value: '500+', label: 'ROM DESIGNET' },
  },
]

const SECTION_BG = ['#f8f6f2', '#f0ebe5', '#f8f6f2']

interface ByggServiceItem {
  num: string
  title: string
  desc: string
  image: string
  icon: string
}

const BYGGSERVICE_ITEMS: ByggServiceItem[] = [
  {
    num: '01',
    title: 'Snekkerarbeid',
    desc: 'Skreddersydde trevareløsninger, innredning og finish av høyeste håndverkskvalitet.',
    image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=1400&q=85',
    icon: 'M4 6h16M4 12h16M4 18h7M15 15l4 4-4 4M19 19h-4',
  },
  {
    num: '02',
    title: 'Bad & Flislegging',
    desc: 'Komplette baderomsrenovasjoner med presist håndverk fra membran til ferdig flate.',
    image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1400&q=85',
    icon: 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01',
  },
  {
    num: '03',
    title: 'Maling & Overflater',
    desc: 'Profesjonell maling innvendig og utvendig — inkludert tapetsering og sparkling.',
    image: 'https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?auto=format&fit=crop&w=1400&q=85',
    icon: 'M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z',
  },
  {
    num: '04',
    title: 'VVS / Rørlegger',
    desc: 'Rørleggerarbeid for bad, kjøkken og tekniske installasjoner. Godkjente fagfolk.',
    image: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=1400&q=85',
    icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065zM15 12a3 3 0 11-6 0 3 3 0 016 0z',
  },
  {
    num: '05',
    title: 'Tilbygg & Nybygg',
    desc: 'Tilbygg, garasjer, anneks og nøkkelferdige boliger. Vi håndterer alt fra søknad til nøkkel.',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1400&q=85',
    icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
  },
  {
    num: '06',
    title: 'Vinduer & Dører',
    desc: 'Montering og utskifting av vinduer og dører for bedre isolasjon, lys og estetikk.',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85',
    icon: 'M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18',
  },
]

/* ─── Page ─── */

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isShaking, setIsShaking] = useState(false)
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())
  const [byggVisible, setByggVisible] = useState(false)
  const [heroMaskReady, setHeroMaskReady] = useState(false)
  const [heroVideoReady, setHeroVideoReady] = useState(false)
  const sectionImageRefs = useRef<Array<HTMLDivElement | null>>([])

  /* ── Fonts + SVG-mask readiness ──────────────────────────────────────────
     Causes of the "glitching video box on hard refresh":
       1. Google Font not loaded yet → <text> inside the <mask> renders with a
          fallback (Arial Black / system-ui). Glyph outlines differ, so the
          mask shape is wrong for a frame and the video rectangle leaks.
       2. Some browsers paint <foreignObject> video BEFORE the mask="..."
          reference resolves on first paint → full video box flashes once.
     Fix: hold the whole hero SVG at opacity:0 until the Montserrat Black
     font is confirmed loaded, then fade in. */
  useEffect(() => {
    let cancelled = false
    const fontsApi = typeof document !== 'undefined' ? (document as Document & { fonts?: FontFaceSet }).fonts : undefined

    const markReady = () => {
      if (cancelled) return
      // One extra frame so the browser has committed the mask layout.
      requestAnimationFrame(() => {
        if (!cancelled) setHeroMaskReady(true)
      })
    }

    if (fontsApi && typeof fontsApi.load === 'function') {
      // Load at the actual mask size (200px, weight 900) — subsetting picks
      // the specific glyphs we need (FINT HJEM) in one shot.
      fontsApi
        .load('900 200px Montserrat', 'FINT HJEM')
        .then(markReady)
        .catch(markReady)
    } else {
      // Old browser fallback — just show after a tick.
      setTimeout(markReady, 300)
    }

    // Hard safety net: if nothing fired after 1.5s, reveal anyway so the hero
    // is never permanently hidden (slow networks / cached video / mobile Safari).
    const videoSafety = window.setTimeout(() => {
      if (!cancelled) setHeroVideoReady(true)
    }, 1500)

    return () => {
      cancelled = true
      window.clearTimeout(videoSafety)
    }
  }, [])

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

  /* ── Subtle scroll parallax on section images (y-axis only, throttled via rAF) ── */
  useEffect(() => {
    let raf: number | null = null
    const update = () => {
      const vh = window.innerHeight
      sectionImageRefs.current.forEach((el) => {
        if (!el) return
        const rect = el.getBoundingClientRect()
        const center = rect.top + rect.height / 2
        // Progress is -1 (section below viewport) to +1 (section above)
        const progress = Math.max(-1, Math.min(1, (vh / 2 - center) / (vh / 2 + rect.height / 2)))
        const translateY = progress * 55
        el.style.setProperty('--parallax-y', `${translateY}px`)
      })
      raf = null
    }
    const onScroll = () => {
      if (raf != null) return
      raf = requestAnimationFrame(update)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    update()
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf != null) cancelAnimationFrame(raf)
    }
  }, [])

  const ease = 'cubic-bezier(0.16, 1, 0.3, 1)'

  /* Headline font wrapper — no clip-path, no overflow */
  const headlineWrapStyle: React.CSSProperties = {
    fontSize: 'clamp(2.4rem, 7.5vw, 5rem)',
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

      {/* ═══════════ HERO ═══════════
          h-[100svh] uses the "small viewport height" — it resolves to the
          visible area WITHOUT Safari's dynamic toolbar, so nothing gets
          clipped or pushed below the fold on iOS. Desktop browsers treat
          100svh as equivalent to 100vh. Padding is tighter on phones.

          Layout behavior:
          • Mobile: justify-center packs logo + subtitle + nav tightly in
            the middle of the viewport — nothing drags to the bottom.
          • Desktop: default flow (logo centered via flex-1, nav at bottom). */}
      <div className="h-[100svh] p-3 md:p-4">
        <div
          /* SINGLE STATIC COLOR — no animation whatsoever.
             The subtle-color-shift animations (animate-subtle-bg +
             animate-subtle-color) were causing a visible rectangle
             around FINT HJEM because in practice the two animations —
             one on `background-color`, one on `color` — don't stay
             in perfect pixel-level sync across all browsers/GPUs.
             Even a 1-bit-off difference between the plate fill and
             the panel bg exposes the plate as a beige rectangle
             against a slightly-different beige. Solution: pin BOTH
             backgroundColor and color to the same literal #f8f6f2,
             static forever. Plate fill (also #f8f6f2, hardcoded
             inline on the rect) is guaranteed identical to the
             panel bg at every single frame. No drift possible. */
          style={{ backgroundColor: '#f8f6f2', color: '#f8f6f2' }}
          className="w-full h-full rounded-2xl flex flex-col justify-center md:justify-start"
        >

          {/* Top bar buttons */}
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

          {/* ── FINT HJEM: video is clipped to the shape of LOGOB.png letters (no box) ──
              flex-1 on every breakpoint so the wordmark takes the remaining height of
              the hero panel — this pushes the bottom nav (Ditt Nye Hjem …) down to the
              actual bottom of the viewport instead of stacking right under the
              subtitle with a big empty area beneath. */}
          <div className="flex-1 flex flex-col items-center justify-center px-4">
            <div
              /* animate-heroSlideUp = transform-only slide-up (no opacity).
                 Why not animate-fadeInUp: fadeInUp animates opacity 0→1 on
                 this wrapper, which puts the whole subtree in a GPU
                 compositor layer at < 1 alpha. Any partially-transparent
                 layer exposes its rectangular bounds while composited onto
                 the page, showing up as a faint rectangle around FINT HJEM.
                 A pure transform animation promotes to a compositor layer
                 too, but the layer stays fully opaque → when composited,
                 the layer's edge pixels blend with the page bg at full
                 alpha; since the plate color already matches the page bg
                 exactly (via currentColor inheriting animate-subtle-color),
                 there's no visible edge at all. */
              className="relative mx-auto w-full max-w-[1100px] animate-heroSlideUp"
              aria-label="Fint Hjem"
            >
              {/* Visuelt skjult H1 – synlig for Google, skjermlesere og Lighthouse SEO.
                  Wordmark'en over er et SVG (aria-hidden) så vi trenger dette for at
                  siden skal ha en semantisk h1 med riktig merke + keywords. */}
              <h1 className="sr-only">
                Fint Hjem – Totalentreprenør i Oslo: nybygg, renovering, byggservice og interiørdesign
              </h1>
              {/*
                The SVG below owns the hero wordmark. Inside it:
                  • <mask> holds the inverted LOGOB.png — feColorMatrix flips colors so the black
                    letter strokes become WHITE (visible in the mask) and the white background
                    becomes BLACK (hidden).
                  • <foreignObject> wraps the HTML <video> and has mask="url(#...)" applied, so the
                    video is painted only where the letter strokes are.
                Nothing renders outside the letters → no rectangular box, page background stays clean.
              */}
              {/*
                Clean filled-text mask:
                  • <mask> paints the FINT HJEM wordmark in white (visible) on a black (hidden) bg
                  • <foreignObject> wraps the HTML <video> and has the mask applied to it
                Result: video only paints inside the solid letter shapes; everything outside
                is transparent (page bg shows through). No rectangular box. No outlines.
              */}
              {/* ── Cutout-overlay wordmark ────────────────────────────────
                  iOS Safari has a long-standing bug with SVG <foreignObject>
                  containing a <video> + <mask>. This implementation uses ONLY
                  plain HTML + plain SVG <mask> applied to a <rect>, which
                  works on every browser back to iOS 12 / Safari 11:

                    Layer 1: <video> — ordinary HTML element, full bleed
                    Layer 2: <svg>   — beige plate with letter-shaped holes
                                       punched out by a mask. Letters are the
                                       ONLY places where the video shows.

                  Single-line FINT HJEM at every breakpoint — same as desktop. */}
              {(() => {
                const W = 1000
                const H = 240
                /* Plate/mask overdraw — in SVG user-space units. With a 1000×240
                   viewBox, 20 units ≈ 2 % of the container on each side, which
                   translates to ~2 screen px on mobile and ~20 px on 1100 px
                   desktop. Comfortably beyond any browser's sub-pixel rounding
                   error but still fully clipped by the parent <div>'s
                   overflow:hidden, so never visible. */
                const OVERDRAW = 20
                const MASK_ID = 'finthjem-cutout-mask'
                const fontFamily = "'Montserrat', 'Arial Black', system-ui, sans-serif"
                return (
                  <div
                    /* IMPORTANT — no animate-subtle-bg / animate-subtle-color
                       here. Those classes live exclusively on the OUTER hero
                       panel now. Keeping a duplicate animation on this inner
                       container would create a SECOND CSS animation timeline
                       that the GPU compositor (promoted by the parent's
                       animate-fadeInUp) can sample at a slightly different
                       moment than the outer panel's animation — causing the
                       plate color to drift from the page bg and show up as a
                       faint rectangle edge around FINT HJEM (most visible at
                       the top edge where letters don't break it up).
                       By inheriting `color` from the outer panel through the
                       DOM cascade, the plate's fill="currentColor" is always
                       the SAME VALUE as the panel's animated background-color,
                       pixel-for-pixel, frame-for-frame. No drift possible. */
                    className="relative w-full"
                    style={{
                      aspectRatio: `${W} / ${H}`,
                      overflow: 'hidden',
                    }}
                    aria-hidden
                  >
                    {/* Layer 1 — raw HTML video. Binary visibility gate, no
                        opacity transition. Why: any opacity 0 → 1 transition
                        on this full-bleed rectangle renders the whole video
                        rectangle at < 1 alpha for the duration of the
                        transition, which briefly exposes the video as a
                        faded rectangle under/around the letters — a visible
                        "box fading in." Using `visibility` instead flips it
                        from invisible (not rendered at all) to visible (fully
                        rendered) in a single frame, at the exact moment the
                        mask cutouts are also ready. Because the opaque plate
                        above already has the correct letter cutouts by then,
                        the viewer only ever sees the letters — never the
                        surrounding video rectangle. */}
                    <video
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      aria-hidden
                      onLoadedData={() => setHeroVideoReady(true)}
                      onCanPlay={() => setHeroVideoReady(true)}
                      {...({ 'webkit-playsinline': 'true' } as React.HTMLAttributes<HTMLVideoElement>)}
                      className="absolute inset-0 w-full h-full"
                      style={{
                        objectFit: 'cover',
                        display: 'block',
                        visibility: heroMaskReady && heroVideoReady ? 'visible' : 'hidden',
                      }}
                    >
                      <source src="/BYGG.mp4" type="video/mp4" />
                    </video>

                    {/* Layer 2 — beige plate with letter-shaped holes. Always at
                        opacity 1 — no fade-in, no transition. Its fill is
                        currentColor, which inherits from the outer hero panel's
                        animate-subtle-color and therefore matches the panel's
                        animated background-color pixel-for-pixel at every frame.
                        So even though the plate is always rendered, it is always
                        visually indistinguishable from the surrounding panel.
                        The "reveal" of the letters happens via the video below
                        fading in THROUGH the letter cutouts — not by fading the
                        plate itself. This is what kills the faint rectangle that
                        used to appear during the plate's fade-in window.
                        Relies on Montserrat's `font-display: block` (globals.css)
                        which keeps the mask text invisible — and therefore the
                        cutouts non-existent — until the real font has loaded, so
                        no fallback-font letter shapes ever leak video through. */}
                    <svg
                      viewBox={`0 0 ${W} ${H}`}
                      /* Bulletproof iOS Safari seam fix:
                         1. preserveAspectRatio="none" — stretches content to fill
                            the container exactly (container already locks aspect
                            ratio 1000:240 via CSS, so no visible distortion).
                         2. overflow: visible — lets the plate rect render past the
                            SVG viewport into the parent div.
                         3. Plate rect AND mask are expanded by OVERDRAW user-space
                            units beyond the viewBox on every side. The parent
                            <div style={{overflow:'hidden'}}> clips the overdraw
                            cleanly at the container edge. This guarantees that
                            even if iOS Safari rounds the SVG bounds to a
                            fractional pixel, there is always plate coverage over
                            the video at the edges — no seam possible. */
                      preserveAspectRatio="none"
                      className="absolute inset-0 block w-full h-full"
                      aria-hidden
                      style={{
                        overflow: 'visible',
                      }}
                    >
                      <defs>
                        <mask
                          id={MASK_ID}
                          maskUnits="userSpaceOnUse"
                          x={-OVERDRAW}
                          y={-OVERDRAW}
                          width={W + OVERDRAW * 2}
                          height={H + OVERDRAW * 2}
                        >
                          {/* Fully white over the entire overdrawn region →
                              plate is visible everywhere outside letters. */}
                          <rect
                            x={-OVERDRAW}
                            y={-OVERDRAW}
                            width={W + OVERDRAW * 2}
                            height={H + OVERDRAW * 2}
                            fill="white"
                          />
                          {/* Letters in BLACK → those areas of the plate are
                              removed → video underneath shows through. Letter
                              coordinates stay in original viewBox space so
                              centering is unchanged. */}
                          <text
                            x="500"
                            y="192"
                            textAnchor="middle"
                            textLength="940"
                            lengthAdjust="spacingAndGlyphs"
                            fill="black"
                            fontFamily={fontFamily}
                            fontWeight={900}
                            fontSize={200}
                          >
                            FINT HJEM
                          </text>
                        </mask>
                      </defs>
                      {/* Plate fill is HARDCODED to the exact same literal
                          #f8f6f2 that the outer panel uses for its inline
                          backgroundColor. No currentColor indirection, no CSS
                          inheritance chain, no animation timing to worry
                          about — the plate color and the panel bg are
                          guaranteed identical at every frame. That's what
                          kills the "box around the letters" for good.
                          Overdrawn by OVERDRAW on every side — parent div clips. */}
                      <rect
                        x={-OVERDRAW}
                        y={-OVERDRAW}
                        width={W + OVERDRAW * 2}
                        height={H + OVERDRAW * 2}
                        fill="#f8f6f2"
                        mask={`url(#${MASK_ID})`}
                      />
                    </svg>
                  </div>
                )
              })()}
            </div>

            <div className="text-center mt-3 md:mt-8 animate-fadeInUp" style={{ animationDelay: '1.2s' }}>
              <h2 className="font-playfair font-light text-brown text-sm md:text-xl lg:text-2xl tracking-[0.2em] md:tracking-wider">
                DIN TOTALENTREPRENØR
              </h2>
            </div>
          </div>

          {/* ── Bottom: nav + scroll arrow ──
              Mobile: compact vertical stack (space-y-1) with smaller text so
              all 4 section links fit within the hero viewport together with
              the wordmark and subtitle — no scrolling required to see them. */}
          <div className="pb-3 md:pb-10 animate-fadeInUp" style={{ animationDelay: '1.8s' }}>
            <nav className="text-center">
              <ul className="font-playfair font-light text-brown tracking-wider space-y-1 md:space-y-0 md:space-x-6 md:flex md:items-center md:justify-center text-sm md:text-xl lg:text-2xl">
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
            <div className="flex justify-center mt-2 md:mt-6">
              <div className="flex flex-col items-center gap-1 animate-scrollPulse opacity-40">
                <div className="w-px h-4 md:h-8 bg-brown" />
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                  <path d="M1 1l4 4 4-4" stroke="#9c7a6d" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
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
          <div className="w-full lg:w-1/2 flex items-center px-6 sm:px-8 md:px-14 lg:px-20 py-20 sm:py-24 lg:py-0 relative min-h-[60vw] lg:min-h-screen">
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

            <div className="relative z-10 w-full max-w-xl">
              {/* Eyebrow tag with rule */}
              <div className="overflow-hidden mb-10">
                <div
                  className="flex items-center gap-4"
                  style={tagStyle(visible)}
                >
                  <span className="h-px w-10 bg-brown/50 block" />
                  <span className="font-montserrat font-bold text-[11px] tracking-[0.42em] text-brown/60">
                    {section.tag}
                  </span>
                  <span className="font-montserrat font-bold text-[11px] tracking-[0.3em] text-brown/30 ml-auto hidden md:inline">
                    / {section.num}
                  </span>
                </div>
              </div>

              {/* Headline — word-by-word reveal */}
              <h2
                className="font-montserrat font-black text-gray-900 tracking-tight mb-10"
                style={{
                  fontSize: 'clamp(2.5rem, 8vw, 5.1rem)',
                  lineHeight: 0.95,
                  letterSpacing: '-0.02em',
                }}
              >
                {section.lines.map((line, li) => {
                  const words = line.split(' ')
                  return (
                    <span key={li} className="block">
                      {words.map((word, wi) => {
                        // Cumulative index across all words of the headline
                        const cumulativeIndex =
                          section.lines.slice(0, li).reduce((n, l) => n + l.split(' ').length, 0) + wi
                        return (
                          <span
                            key={wi}
                            className="inline-block overflow-hidden align-baseline"
                            style={{ marginRight: wi < words.length - 1 ? '0.28em' : 0, paddingBottom: '0.09em' }}
                          >
                            <span
                              className="inline-block"
                              style={{
                                transform: visible ? 'translateY(0)' : 'translateY(110%)',
                                opacity: visible ? 1 : 0,
                                transition: `transform 1.1s ${ease}, opacity 0.6s ease`,
                                transitionDelay: `${0.15 + cumulativeIndex * 0.1}s`,
                              }}
                            >
                              {word}
                            </span>
                          </span>
                        )
                      })}
                    </span>
                  )
                })}
              </h2>

              <div
                className="h-px bg-brown/20 origin-left mb-8"
                style={{
                  maxWidth: '320px',
                  transform: visible ? 'scaleX(1)' : 'scaleX(0)',
                  transition: `transform 1.3s ${ease}`,
                  transitionDelay: '0.65s',
                }}
              />

              <p
                className="font-playfair font-light text-brown/80 text-base md:text-lg leading-relaxed max-w-md mb-10"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateY(0)' : 'translateY(14px)',
                  filter: visible ? 'blur(0px)' : 'blur(3px)',
                  transition: 'opacity 0.9s ease, transform 0.9s ease, filter 0.9s ease',
                  transitionDelay: '0.78s',
                }}
              >
                {section.body}
              </p>

              {/* Feature checklist */}
              <ul className="space-y-3 mb-12">
                {section.features.map((feat, fi) => (
                  <li
                    key={fi}
                    className="flex items-start gap-3 font-playfair font-light text-brown/85 text-[15px] md:text-base"
                    style={{
                      opacity: visible ? 1 : 0,
                      transform: visible ? 'translateX(0)' : 'translateX(-14px)',
                      transition: `opacity 0.7s ease, transform 0.7s ${ease}`,
                      transitionDelay: `${0.95 + fi * 0.08}s`,
                    }}
                  >
                    <svg
                      className="w-4 h-4 mt-1 text-brown flex-shrink-0"
                      viewBox="0 0 16 16"
                      fill="none"
                      aria-hidden
                    >
                      <path
                        d="M2 8.4l3.5 3.6L14 3"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              {/* CTA — animated arrow */}
              <Link
                href={section.link || '/kontakt'}
                className="group relative inline-flex items-center gap-5 pb-3 border-b border-brown/25 hover:border-gray-900 transition-colors duration-500"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateY(0)' : 'translateY(10px)',
                  transition: 'opacity 0.8s ease, transform 0.8s ease',
                  transitionDelay: `${1.2 + section.features.length * 0.08}s`,
                }}
              >
                <span className="font-montserrat font-bold text-[11px] tracking-[0.35em] text-gray-900">
                  {section.ctaLabel}
                </span>
                <span className="relative flex items-center w-12 h-[1px] bg-brown/50 group-hover:bg-gray-900 group-hover:w-20 transition-all duration-500">
                  <svg
                    width="12"
                    height="10"
                    viewBox="0 0 12 10"
                    className="absolute right-0 -translate-x-2 group-hover:translate-x-0 transition-transform duration-500 text-gray-900"
                    aria-hidden
                  >
                    <path
                      d="M1 5h10M7 1l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.25"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </Link>
            </div>
          </div>
        )

        /* Image panel: cinematic clip-path wipe + scroll parallax + glass badge + corner brackets */
        const imageSide = (
          <div
            className="w-full h-[95vw] sm:h-[85vw] md:h-[58vw] lg:h-auto lg:w-1/2 flex-shrink-0 relative"
            style={imagePanelClip(visible, section.imageSide)}
          >
            <div className="absolute inset-0 overflow-hidden">
              {/* Parallax wrapper — translates on scroll via CSS var set by rAF handler */}
              <div
                ref={(el) => {
                  sectionImageRefs.current[idx] = el
                }}
                className="absolute"
                style={{
                  // Extend the image vertically so parallax translation never reveals blank edges
                  top: '-8%',
                  left: 0,
                  right: 0,
                  bottom: '-8%',
                  transform: 'translate3d(0, var(--parallax-y, 0), 0)',
                  willChange: 'transform',
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={section.image}
                  alt={section.imageAlt}
                  className="absolute inset-0 w-full h-full object-cover animate-kenburns"
                  loading="eager"
                />
              </div>

              {/* Soft edge blend + bottom vignette */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    section.imageSide === 'right'
                      ? 'linear-gradient(to right, rgba(248,246,242,0.25) 0%, transparent 18%), linear-gradient(to top, rgba(10,8,5,0.62) 0%, transparent 48%)'
                      : 'linear-gradient(to left, rgba(240,235,229,0.25) 0%, transparent 18%), linear-gradient(to top, rgba(10,8,5,0.62) 0%, transparent 48%)',
                }}
              />

              {/* Corner brackets — minimalist editorial frames */}
              <div
                className="absolute top-6 left-6 w-10 h-10 pointer-events-none"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'scale(1)' : 'scale(0.5)',
                  transition: `opacity 0.8s ease, transform 0.8s ${ease}`,
                  transitionDelay: '1s',
                }}
              >
                <span className="absolute top-0 left-0 w-full h-px bg-white/70" />
                <span className="absolute top-0 left-0 w-px h-full bg-white/70" />
              </div>
              <div
                className="absolute bottom-6 right-6 w-10 h-10 pointer-events-none"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'scale(1)' : 'scale(0.5)',
                  transition: `opacity 0.8s ease, transform 0.8s ${ease}`,
                  transitionDelay: '1.1s',
                }}
              >
                <span className="absolute bottom-0 right-0 w-full h-px bg-white/70" />
                <span className="absolute bottom-0 right-0 w-px h-full bg-white/70" />
              </div>

              {/* Glass-morphism feature badge */}
              <div
                className="absolute bottom-8 left-8 md:bottom-10 md:left-10 animate-float"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateY(0) scale(1)' : 'translateY(24px) scale(0.9)',
                  transition: `opacity 1s ease, transform 1s ${ease}`,
                  transitionDelay: '1.25s',
                }}
              >
                <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-lg px-5 py-4 md:px-6 md:py-5 shadow-xl">
                  <div className="font-montserrat font-black text-white text-3xl md:text-4xl leading-none tracking-tight">
                    {section.badge.value}
                  </div>
                  <div className="font-montserrat font-bold text-white/70 text-[10px] tracking-[0.3em] mt-2">
                    {section.badge.label}
                  </div>
                </div>
              </div>

              {/* Top-right rotating tag label */}
              <div
                className="absolute top-8 right-8 z-10 hidden md:flex items-center gap-3 pointer-events-none"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateX(0)' : 'translateX(16px)',
                  transition: `opacity 0.9s ease, transform 0.9s ${ease}`,
                  transitionDelay: '1s',
                }}
              >
                <span className="h-px w-10 bg-white/50" />
                <p className="font-montserrat font-bold text-[10px] tracking-[0.4em] text-white/80">
                  {section.tag}
                </p>
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
        className="py-20 sm:py-24 md:py-32 px-6 sm:px-8 md:px-14 lg:px-20 relative overflow-hidden"
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

          {/* Premium image-reveal service cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-6">
            {BYGGSERVICE_ITEMS.map((item, i) => (
              <Link
                key={item.title}
                href="/kontakt"
                className="group relative overflow-hidden rounded-2xl border border-brown/10 hover:border-brown/40 transition-all duration-700 aspect-[4/5] md:aspect-[3/4] lg:aspect-[4/5] block"
                style={{
                  opacity: byggVisible ? 1 : 0,
                  transform: byggVisible ? 'translateY(0)' : 'translateY(32px)',
                  transitionProperty: 'opacity, transform, border-color, box-shadow',
                  transitionDuration: '0.9s',
                  transitionTimingFunction: ease,
                  transitionDelay: `${0.55 + i * 0.09}s`,
                  backgroundColor: '#f8f6f2',
                }}
              >
                {/* Base beige (always visible) */}
                <div className="absolute inset-0 bg-[#f8f6f2]" />

                {/* Background image — zooms + fades in on hover */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image}
                  alt=""
                  aria-hidden
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover opacity-0 scale-110 group-hover:opacity-100 group-hover:scale-100 transition-[opacity,transform] duration-[1100ms]"
                  style={{ transitionTimingFunction: ease }}
                />

                {/* Dark vignette over image (only when hovered) */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                  style={{
                    background:
                      'linear-gradient(to top, rgba(10,8,5,0.85) 0%, rgba(10,8,5,0.35) 55%, rgba(10,8,5,0.12) 100%)',
                  }}
                />

                {/* Ghost number — top-right watermark */}
                <span
                  className="absolute top-4 right-6 font-montserrat font-black leading-none pointer-events-none select-none text-brown/10 group-hover:text-white/15 transition-colors duration-700"
                  style={{ fontSize: 'clamp(4rem, 7vw, 6rem)' }}
                >
                  {item.num}
                </span>

                {/* Thin top line that expands on hover */}
                <span className="absolute top-0 left-0 h-[2px] w-0 bg-brown/80 group-hover:w-full transition-[width] duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)]" />

                {/* Card content */}
                <div className="relative z-10 h-full flex flex-col p-7 md:p-8 lg:p-9">
                  <div className="w-11 h-11 text-brown/70 group-hover:text-white transition-colors duration-500">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.4}
                        d={item.icon}
                      />
                    </svg>
                  </div>

                  <div className="mt-auto">
                    <h3 className="font-montserrat font-black text-[13px] tracking-[0.22em] uppercase text-gray-900 group-hover:text-white transition-colors duration-500 mb-3">
                      {item.title}
                    </h3>
                    <p className="font-playfair font-light text-brown/75 group-hover:text-white/85 text-[15px] md:text-base leading-relaxed transition-colors duration-500">
                      {item.desc}
                    </p>

                    <div className="mt-7 flex items-center gap-3 text-brown/65 group-hover:text-white transition-colors duration-500">
                      <span className="font-montserrat font-bold text-[10px] tracking-[0.35em]">
                        LES MER
                      </span>
                      <span className="relative block h-px w-8 bg-current group-hover:w-14 transition-[width] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
                        <svg
                          width="10"
                          height="10"
                          viewBox="0 0 10 10"
                          className="absolute right-0 -top-[4px] -translate-x-2 group-hover:translate-x-0 transition-transform duration-500"
                          aria-hidden
                        >
                          <path
                            d="M1 5h8M5 1l4 4-4 4"
                            stroke="currentColor"
                            strokeWidth="1.3"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Bottom CTA row */}
          <div
            className="mt-16 flex flex-col md:flex-row md:items-end md:justify-between gap-8"
            style={{
              opacity: byggVisible ? 1 : 0,
              transform: byggVisible ? 'translateY(0)' : 'translateY(10px)',
              transition: 'opacity 0.8s ease, transform 0.8s ease',
              transitionDelay: '1.3s',
            }}
          >
            <p className="font-playfair font-light text-brown/75 text-base md:text-lg max-w-md leading-relaxed">
              Usikker på hvor du skal begynne? Vi kommer gjerne på befaring uten forpliktelser og gir deg en ærlig vurdering.
            </p>
            <Link
              href="/kontakt"
              className="group inline-flex items-center gap-5 pb-3 border-b border-brown/30 hover:border-gray-900 transition-colors duration-500 self-start md:self-end"
            >
              <span className="font-montserrat font-bold text-[11px] tracking-[0.35em] text-gray-900">
                BOOK GRATIS BEFARING
              </span>
              <span className="relative flex items-center w-12 h-[1px] bg-brown/50 group-hover:bg-gray-900 group-hover:w-20 transition-all duration-500">
                <svg
                  width="12"
                  height="10"
                  viewBox="0 0 12 10"
                  className="absolute right-0 -translate-x-2 group-hover:translate-x-0 transition-transform duration-500 text-gray-900"
                  aria-hidden
                >
                  <path
                    d="M1 5h10M7 1l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.25"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
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
            <span className="font-montserrat font-black text-brown text-3xl md:text-5xl lg:text-6xl tracking-tight leading-none">
              FINT HJEM
            </span>
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
