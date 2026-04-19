import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center bg-beige">
      <h1 className="font-playfair text-3xl md:text-4xl text-brown mb-2">404</h1>
      <p className="font-playfair font-light text-brown/90 mb-8 text-lg">Siden finnes ikke.</p>
      <Link
        href="/"
        className="font-playfair font-light text-brown border border-brown/40 px-6 py-2 rounded-lg hover:bg-brown/5 transition-colors"
      >
        Til startsiden
      </Link>
    </div>
  )
}
