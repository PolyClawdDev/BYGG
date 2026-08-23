import Link from 'next/link'
import { SOCIAL_LINKS } from '../lib/socialLinks'

export default function SiteFooter() {
  return (
    <footer style={{ backgroundColor: '#1a1714' }}>
      <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-20 pt-20 pb-10">

        {/* Top grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14 pb-16 border-b border-white/10">

          {/* Brand */}
          <div className="lg:col-span-1">
            <span className="block font-montserrat font-black text-white text-2xl md:text-3xl lg:text-4xl tracking-tight leading-none mb-6">
              FINT HJEM
            </span>
            <p className="font-playfair font-light text-white/50 text-sm leading-relaxed mb-6">
              Din totalentreprenør for nybygg, renovering, byggservice og interiørdesign. Vi bygger drømmehjem med presisjon og omtanke — i Oslo og resten av Norge.
            </p>

            {/* Registered company identity. Google cross-checks this against
                the Brønnøysund register and directory listings, so the legal
                name and org.nr must match them exactly. */}
            <p className="font-playfair font-light text-white/40 text-sm leading-relaxed mb-8">
              FINT HJEM AS
              <br />
              Org.nr.{' '}
              <span className="whitespace-nowrap">933 583 023</span>
              <span className="text-white/25"> MVA</span>
            </p>

            <div className="flex gap-4">
              {SOCIAL_LINKS.map((s) => {
                const isExternal = s.href.startsWith('http')
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    target={isExternal ? '_blank' : undefined}
                    rel={isExternal ? 'noopener noreferrer' : undefined}
                    className="text-white/40 hover:text-white transition-colors duration-300"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d={s.d} />
                    </svg>
                  </a>
                )
              })}
            </div>
          </div>

          {/* Navigation.
              These column titles are h3, not h4: the last heading above the
              footer is an h2, so h4 would skip a level and break the document
              outline for screen readers. Size comes from the classes, so the
              level carries no visual weight. */}
          <div>
            <h3 className="font-montserrat font-bold text-xs tracking-[0.35em] text-white/30 mb-7 uppercase">
              Navigasjon
            </h3>
            <ul className="space-y-4">
              {[
                { label: 'Hjem', href: '/' },
                { label: 'Kontakt', href: '/kontakt' },
                { label: 'Interiørdesign', href: '/interior-design-homestyling' },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="font-playfair font-light text-white/60 hover:text-white transition-colors duration-300 text-base"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-montserrat font-bold text-xs tracking-[0.35em] text-white/30 mb-7 uppercase">
              Tjenester
            </h3>
            <ul className="space-y-4">
              {[
                'Ditt Nye Hjem',
                'Renovering & Forandring',
                'Byggservice',
                'Interiør & Styling',
                'Gratis befaring',
              ].map((s) => (
                <li key={s}>
                  <span className="font-playfair font-light text-white/60 text-base">{s}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-montserrat font-bold text-xs tracking-[0.35em] text-white/30 mb-7 uppercase">
              Kontakt
            </h3>
            <ul className="space-y-5">
              <li>
                <p className="font-montserrat font-bold text-xs tracking-wider text-white/30 uppercase mb-1">Telefon</p>
                <a
                  href="tel:+4746583867"
                  className="font-playfair font-light text-white/70 hover:text-white transition-colors duration-300 text-base"
                >
                  +47 465 83 867
                </a>
              </li>
              <li>
                <p className="font-montserrat font-bold text-xs tracking-wider text-white/30 uppercase mb-1">E-post</p>
                <a
                  href="mailto:info@finthjem.no"
                  className="font-playfair font-light text-white/70 hover:text-white transition-colors duration-300 text-base"
                >
                  info@finthjem.no
                </a>
              </li>
              <li>
                <p className="font-montserrat font-bold text-xs tracking-wider text-white/30 uppercase mb-1">Adresse</p>
                <p className="font-playfair font-light text-white/60 text-sm leading-relaxed">
                  Ringsveien 14A<br />1368 Stabekk, Norge
                </p>
              </li>
              <li>
                <p className="font-montserrat font-bold text-xs tracking-wider text-white/30 uppercase mb-1">Åpningstider</p>
                <p className="font-playfair font-light text-white/60 text-sm leading-relaxed">
                  Man–Fre: 08:00–17:00<br />
                  Lørdag: 09:00–15:00<br />
                  Søndag: Stengt
                </p>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-montserrat text-xs tracking-[0.2em] text-white/25 uppercase">
            © {new Date().getFullYear()} Fint Hjem. Alle rettigheter forbeholdt.
          </p>
          <div className="flex gap-8">
            <Link
              href="/kontakt"
              className="font-montserrat text-xs tracking-[0.2em] text-white/25 hover:text-white/60 uppercase transition-colors duration-300"
            >
              Personvern
            </Link>
            <Link
              href="/kontakt"
              className="font-montserrat text-xs tracking-[0.2em] text-white/25 hover:text-white/60 uppercase transition-colors duration-300"
            >
              Kontakt
            </Link>
          </div>
        </div>

      </div>
    </footer>
  )
}
