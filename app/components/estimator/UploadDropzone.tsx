'use client'

/**
 * UploadDropzone — minimal, premium image uploader.
 *
 * Design choices:
 *   • Borders, typography and spacing match the hero CTAs exactly
 *     (thin brown border, 11 px tracked caps label, no bright colors).
 *   • Images are read client-side as base64 data URLs so they can
 *     be forwarded to multi-modal models directly from the API route
 *     without needing an intermediate upload service. This keeps the
 *     feature self-contained — no S3/R2 integration required to ship.
 *   • Large images are downscaled to 1600 px on the longest side
 *     BEFORE being read as data URLs. Raw photos from iPhone are
 *     typically 3–5 MB at native resolution; this brings them well
 *     under 1 MB with no visible quality loss and keeps payloads
 *     inside the 8 MB API ceiling.
 *   • No external deps — we avoid shadcn/react-dropzone to keep the
 *     design perfectly on-brand and the bundle small.
 */

import React, { useCallback, useRef, useState } from 'react'
import type { UploadedImage } from '@/types/estimate'

interface Props {
  images: UploadedImage[]
  onChange: (images: UploadedImage[]) => void
  maxImages?: number
}

// iPhone / Android photos are massive — resize so upload payloads stay
// lean. 1600 px is enough detail for any vision model to read a room.
const MAX_DIMENSION = 1600
const JPEG_QUALITY = 0.82

async function fileToDownscaledDataUrl(file: File): Promise<{ dataUrl: string; mimeType: string; sizeBytes: number }> {
  // For anything that isn't a raster image (e.g. HEIC on Safari without
  // native support), just pass it through — the backend will handle it
  // as metadata only. We never throw on a single bad file; we want the
  // rest of the batch to go through.
  if (!file.type.startsWith('image/')) {
    // Read as data URL via FileReader — avoids Uint8Array spread (which
    // requires a newer compile target than the project's current es5)
    // and correctly handles binary payloads of any size.
    const reader = new FileReader()
    const dataUrl = await new Promise<string>((resolve, reject) => {
      reader.onload = () => resolve(String(reader.result))
      reader.onerror = () => reject(new Error('Kunne ikke lese filen.'))
      reader.readAsDataURL(file)
    })
    return {
      dataUrl,
      mimeType: file.type || 'application/octet-stream',
      sizeBytes: file.size,
    }
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onerror = () => reject(new Error('Kunne ikke lese bildet.'))
    reader.onload = () => {
      const img = new Image()
      img.onerror = () => reject(new Error('Kunne ikke dekode bildet.'))
      img.onload = () => {
        const { width, height } = img
        const longest = Math.max(width, height)
        const scale = longest > MAX_DIMENSION ? MAX_DIMENSION / longest : 1
        const targetW = Math.round(width * scale)
        const targetH = Math.round(height * scale)

        const canvas = document.createElement('canvas')
        canvas.width = targetW
        canvas.height = targetH
        const ctx = canvas.getContext('2d')
        if (!ctx) {
          resolve({ dataUrl: String(reader.result), mimeType: file.type, sizeBytes: file.size })
          return
        }
        ctx.drawImage(img, 0, 0, targetW, targetH)

        // Re-encode everything as JPEG for predictable size / compatibility
        // with vision models. PNGs of photos are 5–10× larger for no gain.
        const dataUrl = canvas.toDataURL('image/jpeg', JPEG_QUALITY)
        resolve({
          dataUrl,
          mimeType: 'image/jpeg',
          sizeBytes: Math.round(dataUrl.length * 0.75),
        })
      }
      img.src = String(reader.result)
    }
    reader.readAsDataURL(file)
  })
}

export default function UploadDropzone({ images, onChange, maxImages = 6 }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const addFiles = useCallback(
    async (files: FileList | File[]) => {
      setError(null)
      const arr = Array.from(files)
      if (arr.length === 0) return

      const slotsLeft = maxImages - images.length
      if (slotsLeft <= 0) {
        setError(`Maks ${maxImages} bilder.`)
        return
      }
      const batch = arr.slice(0, slotsLeft)

      setIsProcessing(true)
      try {
        const processed: UploadedImage[] = []
        for (const file of batch) {
          try {
            const { dataUrl, mimeType, sizeBytes } = await fileToDownscaledDataUrl(file)
            processed.push({
              id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
              name: file.name,
              mimeType,
              sizeBytes,
              dataUrl,
            })
          } catch {
            // Skip files we can't process, keep others — user-friendly.
          }
        }
        if (processed.length === 0) {
          setError('Kunne ikke behandle bildene. Prøv i et annet format (JPG eller PNG).')
        } else {
          onChange([...images, ...processed])
        }
      } finally {
        setIsProcessing(false)
      }
    },
    [images, maxImages, onChange]
  )

  const handleRemove = (id: string) => {
    onChange(images.filter((img) => img.id !== id))
  }

  return (
    <div className="w-full">
      <label
        onDragOver={(e) => {
          e.preventDefault()
          setIsDragging(true)
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault()
          setIsDragging(false)
          if (e.dataTransfer.files?.length) void addFiles(e.dataTransfer.files)
        }}
        className={[
          'group relative block w-full cursor-pointer rounded-lg border transition-colors duration-500',
          'px-4 py-3.5 select-none',
          isDragging
            ? 'border-brown/70 bg-brown/[0.04]'
            : 'border-brown/20 hover:border-brown/40 bg-transparent',
        ].join(' ')}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="sr-only"
          onChange={(e) => {
            if (e.target.files?.length) void addFiles(e.target.files)
            e.target.value = ''
          }}
        />
        <div className="flex items-center gap-3">
          <svg
            className="w-4 h-4 flex-shrink-0 text-brown/70 group-hover:text-brown transition-colors duration-500"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden
          >
            <path
              d="M12 15V5m0 0l-4 4m4-4l4 4M5 19h14"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div className="min-w-0 flex-1">
            <p className="font-montserrat font-bold text-[10px] tracking-[0.28em] text-gray-900 leading-tight">
              {isProcessing ? 'BEHANDLER…' : 'LAST OPP BILDER'}
            </p>
            <p className="font-playfair font-light text-brown/60 text-[11.5px] leading-snug mt-0.5">
              JPG/PNG · opptil {maxImages} stk
            </p>
          </div>
        </div>
      </label>

      {error && (
        <p className="font-playfair font-light text-brown/80 text-sm mt-3" role="alert">
          {error}
        </p>
      )}

      {images.length > 0 && (
        <div className="mt-3 grid grid-cols-4 gap-2">
          {images.map((img) => (
            <div key={img.id} className="relative group rounded-lg overflow-hidden border border-brown/15 aspect-square bg-[#f0ebe5]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img.dataUrl} alt={img.name} className="absolute inset-0 w-full h-full object-cover" />
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault()
                  handleRemove(img.id)
                }}
                className="absolute top-2 right-2 w-7 h-7 rounded-full bg-[#f8f6f2]/95 backdrop-blur-sm border border-brown/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                aria-label={`Fjern ${img.name}`}
              >
                <svg width="10" height="10" viewBox="0 0 10 10" className="text-gray-900" aria-hidden>
                  <path d="M1 1l8 8M9 1l-8 8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
