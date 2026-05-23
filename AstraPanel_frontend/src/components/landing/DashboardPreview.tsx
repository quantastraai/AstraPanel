const NAV = [
  { label: 'Revenue', active: true },
  { label: 'Transactions', active: false },
  { label: 'Expenses', active: false },
  { label: 'Markets', active: false },
  { label: 'Reports', active: false },
]

const MARKETS = [
  { symbol: 'BTC', name: 'Bitcoin', price: '$67,420', change: '+2.4%', up: true, type: 'crypto' },
  { symbol: 'ETH', name: 'Ethereum', price: '$3,512', change: '+1.8%', up: true, type: 'crypto' },
  { symbol: 'AAPL', name: 'Apple', price: '$198.42', change: '+1.2%', up: true, type: 'stock' },
  { symbol: 'RELIANCE', name: 'Reliance', price: '₹2,845', change: '+0.9%', up: true, type: 'stock' },
]

const REVENUE_BARS = [42, 58, 48, 72, 65, 88, 78]

export function DashboardPreview() {
  return (
    <div className="dashboard-preview" aria-hidden="true">
      <div className="dashboard-preview__chrome">
        <span className="dashboard-preview__dot dashboard-preview__dot--r" />
        <span className="dashboard-preview__dot dashboard-preview__dot--y" />
        <span className="dashboard-preview__dot dashboard-preview__dot--g" />
        <span className="dashboard-preview__url">app.astrapanel.io/analytics</span>
      </div>

      <div className="dashboard-preview__body">
        <aside className="dashboard-preview__sidebar">
          {NAV.map((item) => (
            <div
              key={item.label}
              className={
                item.active
                  ? 'dashboard-preview__nav-item dashboard-preview__nav-item--active'
                  : 'dashboard-preview__nav-item'
              }
            >
              {item.label}
            </div>
          ))}
        </aside>

        <main className="dashboard-preview__main">
          <div className="dashboard-preview__stats">
            <div className="stat-card">
              <div className="stat-card__label">Monthly revenue</div>
              <div className="stat-card__value">$284,500</div>
              <div className="stat-card__change stat-card__change--up">↑ 18.2% vs last month</div>
            </div>
            <div className="stat-card">
              <div className="stat-card__label">Total expenses</div>
              <div className="stat-card__value">$96,240</div>
              <div className="stat-card__change stat-card__change--down">↓ 4.1% under budget</div>
            </div>
            <div className="stat-card">
              <div className="stat-card__label">Transactions</div>
              <div className="stat-card__value">1,248</div>
              <div className="stat-card__change stat-card__change--up">142 today</div>
            </div>
          </div>

          <div className="dashboard-preview__chart-row">
            <div className="chart-panel">
              <div className="chart-panel__title">Revenue chart — last 7 months</div>
              <div className="revenue-bars">
                {REVENUE_BARS.map((h, i) => (
                  <div key={i} className="revenue-bars__col">
                    <div className="revenue-bars__bar" style={{ height: `${h}%` }} />
                    <span className="revenue-bars__label">
                      {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'][i]}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="chart-panel">
              <div className="chart-panel__title">Crypto &amp; stock widgets</div>
              <div className="market-widgets">
                {MARKETS.map((m) => (
                  <div key={m.symbol} className="market-widget">
                    <div className="market-widget__left">
                      <span className={`market-widget__badge market-widget__badge--${m.type}`}>
                        {m.type === 'crypto' ? '₿' : '📊'}
                      </span>
                      <span>
                        <span className="market-widget__symbol">{m.symbol}</span>
                        <span className="market-widget__name">{m.name}</span>
                      </span>
                    </div>
                    <span className="market-widget__right">
                      <span className="market-widget__price">{m.price}</span>
                      <span
                        className={
                          m.up ? 'market-widget__change--up' : 'market-widget__change--down'
                        }
                      >
                        {m.change}
                      </span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="dashboard-preview__bottom">
            <div className="mini-panel">
              <div className="mini-panel__title">Recent transactions</div>
              <div className="txn-list">
                <div className="txn-row">
                  <span className="txn-row__desc">Stripe payout</span>
                  <span className="txn-row__amt txn-row__amt--in">+$12,400</span>
                </div>
                <div className="txn-row">
                  <span className="txn-row__desc">AWS infrastructure</span>
                  <span className="txn-row__amt txn-row__amt--out">−$2,180</span>
                </div>
                <div className="txn-row">
                  <span className="txn-row__desc">Client invoice #1042</span>
                  <span className="txn-row__amt txn-row__amt--in">+$8,500</span>
                </div>
              </div>
            </div>
            <div className="mini-panel">
              <div className="mini-panel__title">Latest report</div>
              <div className="report-card">
                <span className="report-card__icon">📄</span>
                <div>
                  <div className="report-card__name">Q2 Cash Flow Summary</div>
                  <div className="report-card__meta">PDF · Generated today</div>
                </div>
                <button type="button" className="report-card__btn">
                  Export
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
