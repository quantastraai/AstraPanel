import { Link } from 'react-router-dom'
import { DashboardPreview } from './DashboardPreview'

export function Hero() {
  return (
    <section className="hero">
      <div className="landing__container">
        <div className="hero__badge">
          <span className="hero__badge-dot" />
          Revenue · Transactions · Expenses · Markets · Reports
        </div>

        <h1 className="hero__title">
          Finance analytics, <span>one panel</span>
        </h1>

        <p className="hero__subtitle">
          AstraPanel helps you track revenue charts, manage transactions, control
          expenses, watch crypto and stocks, and generate reports — all from a single
          dashboard by QuantAstraAI.
        </p>

        <div className="hero__cta">
          <Link to="/dashboard" className="btn btn--primary btn--lg">
            Open dashboard
          </Link>
          <a href="#features" className="btn btn--ghost btn--lg">
            See all modules
          </a>
        </div>
        <p className="hero__note">Free trial · Revenue, expenses &amp; reports included</p>

        <DashboardPreview />
      </div>
    </section>
  )
}
