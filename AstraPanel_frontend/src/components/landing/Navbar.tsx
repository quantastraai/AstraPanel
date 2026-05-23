export function Navbar() {
  return (
    <header className="nav">
      <div className="landing__container nav__inner">
        <a href="#" className="nav__brand">
          <span className="nav__logo" aria-hidden="true">
            ✦
          </span>
          <span>
            AstraPanel
            <span className="nav__byline"> by QuantAstraAI</span>
          </span>
        </a>

        <ul className="nav__links">
          <li>
            <a href="#revenue-charts">Revenue</a>
          </li>
          <li>
            <a href="#transactions">Transactions</a>
          </li>
          <li>
            <a href="#expenses">Expenses</a>
          </li>
          <li>
            <a href="#markets">Markets</a>
          </li>
          <li>
            <a href="#reports">Reports</a>
          </li>
        </ul>

        <div className="nav__actions">
          <button type="button" className="btn btn--ghost">
            Sign in
          </button>
          <button type="button" className="btn btn--primary">
            Get started
          </button>
        </div>
      </div>
    </header>
  )
}
