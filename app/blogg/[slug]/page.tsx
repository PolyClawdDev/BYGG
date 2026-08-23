import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { BLOG_POSTS } from '../../lib/blog'
import { SITE_URL } from '../../lib/site'
import SiteFooter from '../../components/SiteFooter'

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug)
  if (!post) return {}
  return {
    title: post.metaTitle,
    description: post.metaDescription,
    keywords: post.keywords,
    alternates: { canonical: `${SITE_URL}/blogg/${post.slug}` },
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      url: `${SITE_URL}/blogg/${post.slug}`,
      type: 'article',
      publishedTime: post.publishedAt,
    },
  }
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug)
  if (!post) notFound()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.metaDescription,
    datePublished: post.publishedAt,
    author: { '@type': 'Organization', name: 'Fint Hjem', url: SITE_URL },
    publisher: { '@type': 'Organization', name: 'Fint Hjem', url: SITE_URL },
    mainEntityOfPage: `${SITE_URL}/blogg/${post.slug}`,
  }

  return (
    <main className="bg-white min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Nav */}
      <div className="px-8 md:px-14 lg:px-20 pt-12 pb-6 flex items-center justify-between">
        <Link href="/" className="font-montserrat font-black text-brown text-xl md:text-2xl tracking-tight leading-none hover:opacity-70 transition-opacity duration-300">
          FINT HJEM
        </Link>
        <Link href="/blogg" className="font-montserrat font-bold text-[11px] tracking-[0.35em] text-brown/60 hover:text-gray-900 transition-colors duration-300 pb-1 border-b border-transparent hover:border-gray-900">
          ← ALLE ARTIKLER
        </Link>
      </div>

      {/* Article header */}
      <header className="px-8 md:px-14 lg:px-20 py-16 md:py-24" style={{ backgroundColor: '#f8f6f2' }}>
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-8">
            <span className="font-montserrat font-bold text-[10px] tracking-[0.3em] text-brown/50">
              {new Date(post.publishedAt).toLocaleDateString('nb-NO', { day: 'numeric', month: 'long', year: 'numeric' })}
            </span>
            <span className="text-brown/30">·</span>
            <span className="font-montserrat font-bold text-[10px] tracking-[0.2em] text-brown/50">
              {post.readingMinutes} min lesetid
            </span>
          </div>
          <h1
            className="font-montserrat font-black text-gray-900 tracking-tight mb-8"
            style={{ fontSize: 'clamp(1.8rem, 4.5vw, 3.5rem)', lineHeight: 1.05, letterSpacing: '-0.02em' }}
          >
            {post.title}
          </h1>
          <p className="font-playfair font-light text-brown/80 text-lg md:text-xl leading-relaxed border-l-2 border-brown/30 pl-6">
            {post.intro}
          </p>
        </div>
      </header>

      {/* Article body */}
      <article className="px-8 md:px-14 lg:px-20 py-16 md:py-20">
        <div className="max-w-3xl mx-auto space-y-14">
          {post.sections.map((section, i) => (
            <section key={i}>
              <h2
                className="font-montserrat font-black text-gray-900 mb-5"
                style={{ fontSize: 'clamp(1.1rem, 2vw, 1.4rem)', letterSpacing: '-0.01em' }}
              >
                {section.heading}
              </h2>
              <div className="font-playfair font-light text-brown/80 text-base md:text-[17px] leading-relaxed whitespace-pre-line">
                {section.body}
              </div>
            </section>
          ))}
        </div>
      </article>

      {/* CTA block */}
      <section className="mx-8 md:mx-14 lg:mx-20 mb-20 rounded-2xl px-8 md:px-14 py-14" style={{ backgroundColor: '#f0ebe5' }}>
        <div className="max-w-2xl">
          <p className="font-montserrat font-bold text-[11px] tracking-[0.42em] text-brown/50 mb-6">— FINT HJEM</p>
          <p className="font-playfair font-light text-brown/85 text-lg md:text-xl leading-relaxed mb-10">
            {post.ctaText}
          </p>
          <Link
            href="/kontakt"
            className="group inline-flex items-center gap-5 pb-3 border-b border-brown/30 hover:border-gray-900 transition-colors duration-500"
          >
            <span className="font-montserrat font-bold text-[11px] tracking-[0.35em] text-gray-900">
              BOOK GRATIS BEFARING
            </span>
            <svg width="12" height="10" viewBox="0 0 12 10" className="text-brown/60 group-hover:text-gray-900 group-hover:translate-x-1 transition-all duration-400" aria-hidden>
              <path d="M1 5h10M7 1l4 4-4 4" stroke="currentColor" strokeWidth="1.25" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </section>

      {/* More articles */}
      <section className="px-8 md:px-14 lg:px-20 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-10">
            <span className="h-px w-10 bg-brown/40 block" />
            <span className="font-montserrat font-bold text-[11px] tracking-[0.42em] text-brown/50">FLERE ARTIKLER</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 2).map((related) => (
              <Link
                key={related.slug}
                href={`/blogg/${related.slug}`}
                className="group border border-brown/10 hover:border-brown/35 rounded-2xl p-7 transition-all duration-500 hover:shadow-md"
                style={{ backgroundColor: '#faf9f7' }}
              >
                <p className="font-montserrat font-bold text-[10px] tracking-[0.3em] text-brown/45 mb-4">
                  {new Date(related.publishedAt).toLocaleDateString('nb-NO', { day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
                <h3 className="font-montserrat font-black text-gray-900 text-sm leading-tight tracking-tight group-hover:text-brown transition-colors duration-300" style={{ letterSpacing: '-0.01em' }}>
                  {related.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}
