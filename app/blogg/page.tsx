import type { Metadata } from 'next'
import Link from 'next/link'
import { BLOG_POSTS } from '../lib/blog'
import { SITE_URL } from '../lib/site'
import SiteFooter from '../components/SiteFooter'

export const metadata: Metadata = {
  title: 'Blogg – Tips og prisguider for renovering og nybygg | Fint Hjem',
  description: 'Les våre artikler om renovering, nybygg og interiørdesign i Oslo. Prisguider, tips og råd fra erfarne fagfolk hos Fint Hjem.',
  alternates: { canonical: `${SITE_URL}/blogg` },
}

export default function BlogIndex() {
  return (
    <main className="bg-white min-h-screen">
      {/* Nav */}
      <div className="px-8 md:px-14 lg:px-20 pt-12 pb-6 flex items-center justify-between">
        <Link href="/" className="font-montserrat font-black text-brown text-xl md:text-2xl tracking-tight leading-none hover:opacity-70 transition-opacity duration-300">
          FINT HJEM
        </Link>
        <Link href="/kontakt" className="font-montserrat font-bold text-[11px] tracking-[0.35em] text-gray-900 border-b border-brown/30 hover:border-gray-900 transition-colors duration-300 pb-1">
          KONTAKT OSS
        </Link>
      </div>

      {/* Header */}
      <section className="px-8 md:px-14 lg:px-20 py-16 md:py-24" style={{ backgroundColor: '#f8f6f2' }}>
        <div className="max-w-4xl">
          <div className="flex items-center gap-4 mb-8">
            <span className="h-px w-10 bg-brown/50 block" />
            <span className="font-montserrat font-bold text-[11px] tracking-[0.42em] text-brown/60">FAGLIG INNHOLD</span>
          </div>
          <h1
            className="font-montserrat font-black text-gray-900 tracking-tight mb-6"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', lineHeight: 0.95, letterSpacing: '-0.02em' }}
          >
            TIPS OG<br />PRISGUIDER
          </h1>
          <p className="font-playfair font-light text-brown/75 text-lg md:text-xl leading-relaxed max-w-xl">
            Ærlige råd og oppdaterte prisguider fra erfarne fagfolk. Alt du trenger å vite om renovering, nybygg og interiørdesign i Oslo.
          </p>
        </div>
      </section>

      {/* Article grid */}
      <section className="px-8 md:px-14 lg:px-20 py-16 md:py-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post) => (
            <Link
              key={post.slug}
              href={`/blogg/${post.slug}`}
              className="group flex flex-col border border-brown/10 hover:border-brown/35 rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-lg"
            >
              <div className="p-7 flex flex-col flex-1" style={{ backgroundColor: '#faf9f7' }}>
                <div className="flex items-center gap-3 mb-5">
                  <span className="font-montserrat font-bold text-[10px] tracking-[0.3em] text-brown/50 uppercase">
                    {new Date(post.publishedAt).toLocaleDateString('nb-NO', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </span>
                  <span className="text-brown/30">·</span>
                  <span className="font-montserrat font-bold text-[10px] tracking-[0.2em] text-brown/50">
                    {post.readingMinutes} min
                  </span>
                </div>
                <h2 className="font-montserrat font-black text-gray-900 text-base leading-tight tracking-tight mb-4 group-hover:text-brown transition-colors duration-300" style={{ letterSpacing: '-0.01em' }}>
                  {post.title}
                </h2>
                <p className="font-playfair font-light text-brown/70 text-[15px] leading-relaxed flex-1">
                  {post.intro.slice(0, 120)}…
                </p>
                <div className="mt-6 flex items-center gap-3 text-brown/60 group-hover:text-gray-900 transition-colors duration-300">
                  <span className="font-montserrat font-bold text-[10px] tracking-[0.3em]">LES ARTIKKELEN</span>
                  <svg width="10" height="8" viewBox="0 0 10 8" aria-hidden className="group-hover:translate-x-1 transition-transform duration-300">
                    <path d="M1 4h8M5 1l4 3-4 3" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}
