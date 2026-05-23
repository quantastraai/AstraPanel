import '../styles/landing.css'
import { Navbar } from '../components/landing/Navbar'
import { Hero } from '../components/landing/Hero'
import { Features } from '../components/landing/Features'
import { MetricsBand } from '../components/landing/MetricsBand'
import { HowItWorks } from '../components/landing/HowItWorks'
import { CTA } from '../components/landing/CTA'
import { Footer } from '../components/landing/Footer'

export function LandingPage() {
  return (
    <div className="landing">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <MetricsBand />
        <HowItWorks />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
