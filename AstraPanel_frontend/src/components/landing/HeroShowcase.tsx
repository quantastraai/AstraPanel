type CardProps = {
  className?: string
}

function AIRobotIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 3v2M8 5h8M7 9h10a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3v-5a3 3 0 0 1 3-3z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="9.5" cy="14" r="1.25" fill="#34d399" />
      <circle cx="14.5" cy="14" r="1.25" fill="#34d399" />
      <path d="M10 17h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="12" cy="3" r="1" fill="#a78bfa" />
    </svg>
  )
}

function PersonIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M5 20c0-3.5 3.134-5 7-5s7 1.5 7 5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function AIInsightsCard({ className = '' }: CardProps) {
  return (
    <article className={`float-card ${className}`.trim()} aria-hidden="true">
      <div className="float-card__header float-card__header--lead">
        <AIRobotIcon className="float-card__ai-icon" />
        <span className="float-card__label">AI Insights</span>
      </div>
      <p className="float-card__insight">
        Spending is <strong>12% lower</strong> than your 90-day average.
      </p>
      <div className="float-card__chips">
        <span className="float-chip">Savings tip</span>
        <span className="float-chip float-chip--accent">On track</span>
      </div>
    </article>
  )
}

export function ProfileCard({ className = '' }: CardProps) {
  return (
    <article className={`float-card ${className}`.trim()} aria-hidden="true">
      <div className="float-card__profile">
        <span className="float-card__avatar float-card__avatar--icon" aria-hidden="true">
          <PersonIcon className="float-card__person-icon" />
        </span>
        <div>
          <p className="float-card__name">QuantAstraAI</p>
          <p className="float-card__role">Pro · Business</p>
        </div>
      </div>
      <span className="float-card__label">Wallet Balance</span>
      <p className="float-card__amount">$24,850.00</p>
      <div className="float-card__wallet-bar">
        <span className="float-card__wallet-fill" />
      </div>
    </article>
  )
}

export function HeroOrb() {
  return (
    <div className="hero-orb" aria-hidden="true">
      <div className="hero-orb__radar">
        <div className="hero-orb__radar-sweep" />
      </div>

      <div className="hero-orb__ring-track hero-orb__ring-track--1">
        <div className="hero-orb__ring hero-orb__ring--1" />
        <div className="hero-orb__ring-marker hero-orb__ring-marker--ai">
          <div className="hero-orb__ring-marker-pin">
            <AIRobotIcon className="hero-orb__ring-ai-icon" />
          </div>
        </div>
      </div>

      <div className="hero-orb__ring-track hero-orb__ring-track--2">
        <div className="hero-orb__ring hero-orb__ring--2" />
        <div className="hero-orb__ring-marker hero-orb__ring-marker--profile">
          <div className="hero-orb__ring-marker-pin">
            <span className="hero-orb__ring-person-badge">
              <PersonIcon className="hero-orb__ring-person-icon" />
            </span>
          </div>
        </div>
      </div>

      <div className="hero-orb__ring-track hero-orb__ring-track--3">
        <div className="hero-orb__ring hero-orb__ring--3" />
      </div>

      <div className="hero-orb__core">
        <img
          src="/astra-logo-icon-96.png"
          alt="AstraPanel"
          className="center-logo"
          width={52}
          height={52}
        />
      </div>
    </div>
  )
}
