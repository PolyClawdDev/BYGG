'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import './globals.css'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <html lang="no">
      <body className="antialiased min-h-screen flex flex-col items-center justify-center px-6 text-center bg-beige">
        <h1 className="font-playfair text-2xl md:text-3xl text-brown mb-4">Noe gikk galt</h1>
        <p className="font-playfair font-light text-brown/90 mb-8 max-w-md text-lg">
          En uventet feil oppstod. Prøv igjen, eller gå tilbake til forsiden.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <button
            type="button"
            onClick={() => reset()}
            className="font-playfair font-light text-brown border border-brown/40 px-6 py-2 rounded-lg hover:bg-brown/5 transition-colors"
          >
            Prøv igjen
          </button>
          <Link
            href="/"
            className="font-playfair font-light text-brown border border-brown/40 px-6 py-2 rounded-lg hover:bg-brown/5 transition-colors inline-block"
          >
            Til startsiden
          </Link>
        </div>
      </body>
    </html>
  )
}
