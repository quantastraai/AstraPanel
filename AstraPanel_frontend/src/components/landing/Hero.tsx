import { Navbar } from './Navbar'
import { AIInsightsCard, HeroOrb, ProfileCard } from './HeroShowcase'

export function Hero() {
  return (
    <section className="landing-hero">
      <div className="landing-hero__glow landing-hero__glow--left" aria-hidden="true" />
      <div className="landing-hero__glow landing-hero__glow--right" aria-hidden="true" />
      <div className="landing-hero__grid" aria-hidden="true" />

      <Navbar className="landing-hero__nav" />

      <div className="hero-content">
        <h1 className="hero-title">
          Powering the Future
          <br />
          <span className="hero-title__line">
            of{' '}
            <span className="hero-title__finance">
              <span className="hero-title__finance-corner" aria-hidden="true" />
              <span className="hero-title__finance-corner" aria-hidden="true" />
              <span className="hero-title__finance-corner" aria-hidden="true" />
              <span className="hero-title__finance-corner" aria-hidden="true" />
              Finance
            </span>
          </span>
        </h1>
        <p className="hero-subtitle">
          <span className="hero-subtitle__line">AI-powered finance for modern teams.</span>
          <span className="hero-subtitle__line">Spending and insights in one dashboard.</span>
        </p>
      </div>

      <div id="demo" className="orbit-container">
        <HeroOrb />
      </div>

      <AIInsightsCard className="float-card left-card-bottom" />
      <ProfileCard className="float-card right-card-bottom" />
    </section>
  )
}
