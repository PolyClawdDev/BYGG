/**
 * MenuSocialIcons
 *
 * Bottom-of-overlay social icon row used by every full-screen hamburger
 * menu on the site (home, kontakt, interior-design-homestyling). Pulls its
 * data from the shared `SOCIAL_LINKS` registry so the profile URLs stay in
 * sync with the footer and the JSON-LD `sameAs` automatically.
 *
 * Every entry in that registry is a real external profile — the registry
 * filters out anything that is not an http(s) URL — so all links open in a
 * new tab with rel=noopener.
 */

import { SOCIAL_LINKS } from '../lib/socialLinks'

type Props = {
  /**
   * Optional click handler — each page's menu overlay uses this to
   * close the overlay after the link is activated (external links
   * open in a new tab so the overlay close is still desirable).
   */
  onActivate?: () => void
}

export default function MenuSocialIcons({ onActivate }: Props) {
  return (
    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-6">
      {SOCIAL_LINKS.map((s) => (
        <a
          key={s.label}
          href={s.href}
          aria-label={s.label}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onActivate}
          className="text-brown hover:text-gray-800 transition-colors duration-200"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d={s.d} />
          </svg>
        </a>
      ))}
    </div>
  )
}
