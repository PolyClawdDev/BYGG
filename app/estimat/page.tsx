import EstimatorDashboard from '@/app/components/estimator/EstimatorDashboard'

export default function EstimatPage() {
  // Thin server-component wrapper so Next.js can statically pre-render
  // the outer shell (fast first paint, SEO-friendly). The dashboard
  // itself is a client component because it owns chat state + uploads.
  return <EstimatorDashboard />
}
