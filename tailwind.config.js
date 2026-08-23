/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'montserrat': ['Montserrat', 'sans-serif'],
        'playfair': ['Playfair Display', 'serif'],
      },
      colors: {
        'beige': '#f8f6f2',
        'brown': '#9c7a6d',
        /* Readable sibling of `brown`, for small text.
           `brown` on the beige background measures 3.6:1, and the faded
           variants the design leans on are far worse — text-brown/60 lands at
           2.0:1, which makes the 10–11px letterspaced labels genuinely hard to
           read on a bright screen.

           This shade clears the WCAG AA minimum of 4.5:1 against all three
           surfaces labels actually sit on: 5.2:1 on the page background
           (#f8f6f2), 5.3:1 on cards (#faf9f7) and 4.7:1 on the blog CTA panel
           (#f0ebe5). The panel is the binding constraint — a lighter brown
           passes the first two and quietly fails there, so check against
           #f0ebe5 before adjusting this value.

           Use it for labels, eyebrows and meta text. Body copy deliberately
           keeps `brown` and its opacity ladder — that gradient carries the
           visual hierarchy, and AA cannot preserve it: even this shade at 90%
           opacity falls back below 4.5:1, so compliance would mean flattening
           every level to one colour. Decorative giant numerals stay on
           text-brown/10–25; they are ornament, not content. */
        'brown-ink': '#82604f',
      },
    },
  },
  plugins: [],
}
