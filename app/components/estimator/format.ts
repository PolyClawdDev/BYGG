/**
 * Tiny formatting helpers shared across the estimator UI.
 * Kept in its own file so both server and client components can import
 * without pulling in React or any heavier deps.
 */

export function formatNOK(n: number): string {
  if (!Number.isFinite(n) || n <= 0) return '—'
  return new Intl.NumberFormat('nb-NO', { maximumFractionDigits: 0 }).format(n) + ' kr'
}

export function formatPriceRange(min: number, max: number): string {
  if (!Number.isFinite(min) || !Number.isFinite(max) || min <= 0 || max <= 0) return '—'
  if (min === max) return formatNOK(min)
  const fmt = (n: number) => new Intl.NumberFormat('nb-NO', { maximumFractionDigits: 0 }).format(n)
  return `${fmt(min)}–${fmt(max)} kr`
}

export function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n))
}
