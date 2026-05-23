const FEATURES = [
  {
    icon: '🤖',
    title: 'AI Analytics',
    text: 'Let AI surface trends, anomalies, and forecasts from your financial data — so you act on insight, not guesswork.',
  },
  {
    icon: '💰',
    title: 'Finance Tracking',
    text: 'Track revenue, expenses, and cash flow in one place with clear categories, budgets, and period comparisons.',
  },
  {
    icon: '⚡',
    title: 'Real Time Insights',
    text: 'See live balances, transactions, and market moves as they happen — with alerts when it matters most.',
  },
] as const

export function Features() {
  return (
    <section id="features" className="section">
      <div className="landing__container section--center">
        <p className="section__eyebrow">Features</p>
        <h2 className="section__title">Everything you need to run smarter finance</h2>
        <p className="section__desc">
          AI-powered analytics, unified tracking, and real-time insights — built for
          modern businesses on AstraPanel.
        </p>

        <div className="features-grid features-grid--3">
          {FEATURES.map((feature) => (
            <article key={feature.title} className="feature-card">
              <div className="feature-card__icon" aria-hidden="true">
                {feature.icon}
              </div>
              <h3 className="feature-card__title">{feature.title}</h3>
              <p className="feature-card__text">{feature.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
