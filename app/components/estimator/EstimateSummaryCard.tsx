'use client'

/**
 * EstimateSummaryCard — the "money shot" of the experience.
 *
 * Rendered inline in the chat when the AI returns a structured estimate.
 * Visually echoes the badge/card language used elsewhere on the site
 * (thin border, Montserrat caps labels, generous whitespace, no gradients)
 * so it never feels like a chatbot widget bolted on top of the brand.
 *
 * Sizing note:
 *   This card is the primary content of the 360 px right rail on the
 *   dashboard. On a typical laptop viewport (≈ 820 px usable after the
 *   top bar + subtitle) the entire card — price, time, up to six
 *   inclusions, two assumptions, recommended next step and the
 *   "Bestill gratis befaring" button — now fits without the rail
 *   needing to scroll. The `overflow-y-auto` on the rail remains as a
 *   safety net for very short screens or unusually long AI outputs.
 */

import React from 'react'
import type { EstimateResult } from '@/types/estimate'
import { formatPriceRange } from './format'

interface Props {
  estimate: EstimateResult
  onBookBefaring: () => void
}

// Little circular dot that conveys confidence at a glance. No text needed
// next to it — the word "grovt estimat" already signals uncertainty.
function ConfidenceDot({ level }: { level: EstimateResult['confidence'] }) {
  const color =
    level === 'high' ? '#4b6e54' : level === 'medium' ? '#9c7a6d' : '#c6a98a'
  return (
    <span className="inline-flex items-center gap-2">
      <span
        aria-hidden
        style={{ backgroundColor: color }}
        className="w-1.5 h-1.5 rounded-full"
      />
      <span className="font-montserrat font-bold text-[9px] tracking-[0.3em] text-brown/60 uppercase">
        {level === 'high'
          ? 'Godt informert estimat'
          : level === 'medium'
          ? 'Grovt estimat'
          : 'Indikativt estimat'}
      </span>
    </span>
  )
}

export default function EstimateSummaryCard({ estimate, onBookBefaring }: Props) {
  return (
    <div className="w-full rounded-2xl border border-brown/20 bg-[#f8f6f2] p-5">
      <div className="flex items-center justify-between mb-4">
        <span className="font-montserrat font-bold text-[9px] tracking-[0.38em] text-brown/70 uppercase">
          Prosjekt-estimat
        </span>
        <ConfidenceDot level={estimate.confidence} />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-5">
        <div>
          <p className="font-montserrat font-bold text-[9px] tracking-[0.32em] text-brown/60 mb-1 uppercase">
            Prisestimat
          </p>
          <p className="font-playfair font-light text-gray-900 text-xl leading-tight tracking-tight">
            {formatPriceRange(estimate.priceMin, estimate.priceMax)}
          </p>
        </div>
        <div>
          <p className="font-montserrat font-bold text-[9px] tracking-[0.32em] text-brown/60 mb-1 uppercase">
            Tidsestimat
          </p>
          <p className="font-playfair font-light text-gray-900 text-xl leading-tight tracking-tight">
            {estimate.durationText}
          </p>
        </div>
      </div>

      {estimate.included.length > 0 && (
        <div className="mb-4">
          <p className="font-montserrat font-bold text-[9px] tracking-[0.32em] text-brown/60 mb-2 uppercase">
            Dette inkluderer typisk
          </p>
          <ul className="space-y-1">
            {estimate.included.map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-2 font-playfair font-light text-brown/85 text-[13px] leading-snug"
              >
                <svg
                  className="w-3 h-3 mt-[3px] text-brown flex-shrink-0"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden
                >
                  <path
                    d="M2 8.4l3.5 3.6L14 3"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {estimate.assumptions.length > 0 && (
        <div className="mb-4">
          <p className="font-montserrat font-bold text-[9px] tracking-[0.32em] text-brown/60 mb-1.5 uppercase">
            Antakelser
          </p>
          <ul className="space-y-0.5">
            {estimate.assumptions.map((item, i) => (
              <li
                key={i}
                className="font-playfair font-light text-brown/70 text-[12px] leading-snug"
              >
                — {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="pt-3 border-t border-brown/15">
        <p className="font-playfair font-light italic text-brown/65 text-[12px] leading-snug mb-3">
          {estimate.recommendedNextStep ||
            'Endelig pris fastsettes etter befaring og detaljert prosjektgjennomgang.'}
        </p>

        <button
          type="button"
          onClick={onBookBefaring}
          className="group relative inline-flex items-center gap-4 pb-1.5 border-b border-brown/30 hover:border-gray-900 transition-colors duration-500"
        >
          <span className="font-montserrat font-bold text-[10px] tracking-[0.32em] text-gray-900 uppercase">
            Bestill gratis befaring
          </span>
          <span className="relative flex items-center w-10 h-[1px] bg-brown/50 group-hover:bg-gray-900 group-hover:w-16 transition-all duration-500">
            <svg
              width="11"
              height="9"
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
        </button>
      </div>
    </div>
  )
}
