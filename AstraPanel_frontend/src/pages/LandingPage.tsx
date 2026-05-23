import '../styles/landing.css'
import { Hero } from '../components/landing/Hero'
import { PageTransition } from '../components/layout/PageTransition'

export function LandingPage() {
  return (
    <PageTransition variant="landing">
      <Hero />
    </PageTransition>
  )
}
