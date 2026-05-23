const MODULES = [
  {
    id: 'revenue-charts',
    icon: '📈',
    title: 'Revenue charts',
    text: 'Track income trends with daily, monthly, and yearly charts. Compare periods and spot growth at a glance.',
  },
  {
    id: 'transactions',
    icon: '💳',
    title: 'Transactions',
    text: 'View, filter, and search every payment — incoming and outgoing — with smart categorization and tags.',
  },
  {
    id: 'expenses',
    icon: '📉',
    title: 'Expenses',
    text: 'Monitor spending by category, vendor, and budget. Set limits and get alerts before you overspend.',
  },
  {
    id: 'markets',
    icon: '₿',
    title: 'Crypto & stock widgets',
    text: 'Live prices for BTC, ETH, NIFTY, and global equities. Pin favorites to your dashboard home screen.',
  },
  {
    id: 'reports',
    icon: '📄',
    title: 'Reports',
    text: 'Export P&L, cash flow, and tax-ready summaries as PDF or CSV — scheduled or on demand.',
  },
]

export function Features() {
  return (
    <section id="features" className="section">
      <div className="landing__container section--center">
        <p className="section__eyebrow">Modules</p>
        <h2 className="section__title">Built for real finance analytics</h2>
        <p className="section__desc">
          Revenue, transactions, expenses, markets, and reports — everything your
          team needs in one AstraPanel workspace.
        </p>

        <div className="features-grid">
          {MODULES.map((m) => (
            <article key={m.id} id={m.id} className="feature-card">
              <div className="feature-card__icon" aria-hidden="true">
                {m.icon}
              </div>
              <h3 className="feature-card__title">{m.title}</h3>
              <p className="feature-card__text">{m.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
