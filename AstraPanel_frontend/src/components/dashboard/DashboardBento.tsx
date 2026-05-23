import { Check, Copy, Eye, EyeOff } from 'lucide-react'
import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react'
import { CountUpAmount, CountUpNumber } from './CountUpAmount'

const CREDIT_SCORE_LEVELS = [
  { min: 300, max: 449, label: 'Poor', tier: 'poor', arcFrom: '#F87171', arcTo: '#EF4444' },
  { min: 450, max: 649, label: 'Fair', tier: 'fair', arcFrom: '#FB923C', arcTo: '#F97316' },
  { min: 650, max: 799, label: 'Good', tier: 'good', arcFrom: '#D4B06A', arcTo: '#DCC48A' },
  { min: 800, max: 850, label: 'Excellent', tier: 'excellent', arcFrom: '#4ADE80', arcTo: '#22C55E' },
] as const

type CreditScoreTier = (typeof CREDIT_SCORE_LEVELS)[number]['tier']

function getCreditScoreLevel(score: number) {
  const clamped = Math.min(850, Math.max(300, score))
  return (
    CREDIT_SCORE_LEVELS.find((level) => clamped >= level.min && clamped <= level.max) ??
    CREDIT_SCORE_LEVELS[0]
  )
}

function CreditScoreGauge({ score, tier }: { score: number; tier: CreditScoreTier }) {
  const min = 300
  const max = 850
  const pct = Math.min(1, Math.max(0, (score - min) / (max - min)))
  const arcLength = 157.08
  const level = getCreditScoreLevel(score)
  const gradientId = `creditScoreArc-${tier}`

  return (
    <div className="dashboard-bento__credit-score-gauge" aria-hidden>
      <svg viewBox="0 0 140 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={level.arcFrom} />
            <stop offset="100%" stopColor={level.arcTo} />
          </linearGradient>
        </defs>
        <path
          d="M 16 68 A 54 54 0 0 1 124 68"
          stroke="rgba(255, 255, 255, 0.08)"
          strokeWidth="10"
          strokeLinecap="round"
        />
        <path
          d="M 16 68 A 54 54 0 0 1 124 68"
          stroke={`url(#${gradientId})`}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={`${arcLength * pct} ${arcLength}`}
        />
      </svg>
      <CountUpNumber value={score} className="dashboard-bento__credit-score-value" />
    </div>
  )
}

const CREDIT_SCORE = 742

function CreditScoreCard() {
  const level = getCreditScoreLevel(CREDIT_SCORE)

  return (
    <article
      className={[
        'dashboard-bento__card',
        'dashboard-bento__card--credit-score',
        `dashboard-bento__card--credit-score-${level.tier}`,
      ].join(' ')}
      style={
        {
          '--credit-tier-color': level.arcTo,
          '--credit-tier-color-soft': level.arcFrom,
        } as CSSProperties
      }
    >
      <header className="dashboard-bento__card-head dashboard-bento__credit-score-head">
        <span className="dashboard-bento__card-label">Credit Score</span>
        <span
          className={[
            'dashboard-bento__credit-score-badge',
            `dashboard-bento__credit-score-badge--${level.tier}`,
          ].join(' ')}
        >
          {level.label}
        </span>
      </header>
      <div className="dashboard-bento__credit-score-body">
        <CreditScoreGauge score={CREDIT_SCORE} tier={level.tier} />
        <p className="dashboard-bento__credit-score-range" aria-hidden>
          <span>300</span>
          <span>850</span>
        </p>
        <p className="dashboard-bento__credit-score-meta">
          <span className="dashboard-bento__credit-score-delta" aria-hidden>
            ↗
          </span>{' '}
          +12 pts this month
        </p>
      </div>
    </article>
  )
}

const ANALYTICS_DATA = [
  { id: 'jan', month: 'Jan', amount: 38_420, change: 8.2, height: 42 },
  { id: 'feb', month: 'Feb', amount: 41_180, change: 7.1, height: 68 },
  { id: 'mar', month: 'Mar', amount: 36_940, change: -4.3, height: 55 },
  { id: 'apr', month: 'Apr', amount: 47_650, change: 11.5, height: 82 },
  { id: 'may', month: 'May', amount: 44_210, change: -7.2, height: 60 },
  { id: 'jun', month: 'Jun', amount: 52_340, change: 12.0, height: 90 },
  { id: 'jul', month: 'Jul', amount: 48_720, change: -6.9, height: 72 },
] as const

function formatAnalyticsAmount(value: number) {
  return `$${value.toLocaleString('en-US')}`
}

/** Candlestick chart with hover tooltips, glow & load motion. */
function AnalyticsCandlestickChart() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [selectedIndex, setSelectedIndex] = useState(5)

  const activeIndex = hoveredIndex ?? selectedIndex
  const active = ANALYTICS_DATA[activeIndex]

  return (
    <div className="dashboard-bento__fake-chart dashboard-bento__fake-chart--live">
      <div
        key={active.id}
        className="dashboard-bento__analytics-tooltip"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        <span className="dashboard-bento__analytics-tooltip-month">{active.month}</span>
        <CountUpAmount
          key={active.id}
          value={formatAnalyticsAmount(active.amount)}
          className="dashboard-bento__analytics-tooltip-amount"
          duration={900}
        />
        <MomChange percent={active.change} variant="inline" className="dashboard-bento__analytics-tooltip-mom" />
      </div>

      <div className="dashboard-bento__candlestick-chart">
        {ANALYTICS_DATA.map((point, i) => {
          const wickH = Math.min(98, point.height + 12)
          const bodyH = Math.max(18, point.height * 0.62)
          const isActive = activeIndex === i
          const isRise = point.change >= 0

          return (
            <button
              key={point.id}
              type="button"
              className={[
                'dashboard-bento__candle-col',
                isActive ? 'dashboard-bento__candle-col--active' : '',
                isActive
                  ? isRise
                    ? 'dashboard-bento__candle-col--rise'
                    : 'dashboard-bento__candle-col--fall'
                  : '',
              ]
                .filter(Boolean)
                .join(' ')}
              style={
                {
                  '--candle-delay': `${i * 55}ms`,
                  '--candle-body-h': `${bodyH}%`,
                  '--candle-wick-h': `${wickH}%`,
                } as CSSProperties
              }
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              onFocus={() => setHoveredIndex(i)}
              onBlur={() => setHoveredIndex(null)}
              onClick={() => setSelectedIndex(i)}
              aria-label={`${point.month}: ${formatAnalyticsAmount(point.amount)}, ${point.change >= 0 ? 'up' : 'down'} ${Math.abs(point.change)}%`}
              aria-pressed={selectedIndex === i}
            >
              <div className="dashboard-bento__candle-plot">
                <span className="dashboard-bento__candle-wick" />
                <span
                  className={[
                    'dashboard-bento__candle-body',
                    isActive
                      ? isRise
                        ? 'dashboard-bento__candle-body--rise'
                        : 'dashboard-bento__candle-body--fall'
                      : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                />
              </div>
              <span className="dashboard-bento__analytics-label">{point.month}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

function KpiSparklineBackground({
  lineId,
  fillId,
  pathD,
}: {
  lineId: string
  fillId: string
  pathD: string
}) {
  return (
    <svg className="dashboard-bento__kpi-bg-chart" viewBox="0 0 120 48" preserveAspectRatio="none" aria-hidden>
      <defs>
        <linearGradient id={lineId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#D4B06A" />
          <stop offset="100%" stopColor="#DCC48A" />
        </linearGradient>
        <linearGradient id={fillId} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#D4B06A" stopOpacity="0.16" />
          <stop offset="72%" stopColor="#D4B06A" stopOpacity="0.04" />
          <stop offset="100%" stopColor="#D4B06A" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        className="dashboard-bento__kpi-bg-fill"
        d={`${pathD} L120 48 L0 48 Z`}
        fill={`url(#${fillId})`}
      />
      <path
        className="dashboard-bento__kpi-bg-line"
        d={pathD}
        fill="none"
        stroke={`url(#${lineId})`}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

const KPI_SPARK_REVENUE = 'M0 38 L18 30 L36 34 L54 16 L72 22 L90 10 L120 18'
const KPI_SPARK_PROFIT = 'M0 36 L22 28 L40 32 L58 18 L76 24 L98 12 L120 20'
const KPI_SPARK_SAVINGS = 'M0 34 L20 26 L38 30 L56 20 L74 14 L92 8 L120 16'

type MomTrend = 'up' | 'down' | 'neutral'

function getMomTrend(percent: number): MomTrend {
  if (percent > 0) return 'up'
  if (percent < 0) return 'down'
  return 'neutral'
}

function formatMomPercent(percent: number) {
  if (percent > 0) return `+${percent}%`
  if (percent < 0) return `${percent}%`
  return '0.0%'
}

function momArrow(trend: MomTrend) {
  if (trend === 'up') return '↗'
  if (trend === 'down') return '↘'
  return '→'
}

function formatKpiDeltaAmount(amount: number) {
  const formatted = Math.abs(amount).toLocaleString('en-US')
  if (amount > 0) return `+$${formatted}`
  if (amount < 0) return `-$${formatted}`
  return '$0'
}

function getKpiDeltaTrend(amount: number): MomTrend {
  if (amount > 0) return 'up'
  if (amount < 0) return 'down'
  return 'neutral'
}

function KpiDelta({ amount, period = 'this month' }: { amount: number; period?: string }) {
  const trend = getKpiDeltaTrend(amount)

  return (
    <p
      className={[
        'dashboard-bento__kpi-delta',
        `dashboard-bento__kpi-delta--${trend}`,
      ].join(' ')}
    >
      <span className="dashboard-bento__kpi-delta-arrow" aria-hidden>
        {momArrow(trend)}
      </span>
      <span className="dashboard-bento__kpi-delta-amount">{formatKpiDeltaAmount(amount)}</span>
      <span className="dashboard-bento__kpi-delta-period">{period}</span>
    </p>
  )
}

function MomChange({
  percent,
  className,
  variant = 'badge',
}: {
  percent: number
  className?: string
  variant?: 'badge' | 'inline'
}) {
  const trend = getMomTrend(percent)

  return (
    <span
      className={[
        'dashboard-bento__mom-change',
        `dashboard-bento__mom-change--${trend}`,
        variant === 'inline' ? 'dashboard-bento__mom-change--inline' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <span className="dashboard-bento__mom-change-arrow" aria-hidden>
        {momArrow(trend)}
      </span>
      {formatMomPercent(percent)}
    </span>
  )
}

type KpiVariant = 'revenue' | 'profit' | 'savings'

const KPI_SPARK_PATHS: Record<KpiVariant, string> = {
  revenue: KPI_SPARK_REVENUE,
  profit: KPI_SPARK_PROFIT,
  savings: KPI_SPARK_SAVINGS,
}

type KpiCardProps = {
  label: string
  momPercent: number
  value: string
  delta?: string
  deltaAmount?: number
  sparkId: string
  variant?: KpiVariant
}

function KpiCard({
  label,
  momPercent,
  value,
  delta,
  deltaAmount,
  sparkId,
  variant = 'revenue',
}: KpiCardProps) {
  const sparkPath = KPI_SPARK_PATHS[variant]

  return (
    <article
      className={`dashboard-bento__card dashboard-bento__card--kpi dashboard-bento__card--${variant}`}
    >
      <div className="dashboard-bento__kpi-bg" aria-hidden>
        <KpiSparklineBackground
          lineId={`${sparkId}Line`}
          fillId={`${sparkId}Fill`}
          pathD={sparkPath}
        />
      </div>
      <div className="dashboard-bento__kpi-content">
        <div className="dashboard-bento__kpi-head">
          <span className="dashboard-bento__card-label">{label}</span>
          <MomChange percent={momPercent} />
        </div>
        <p className="dashboard-bento__kpi-value">
          <CountUpAmount value={value} duration={1200} />
        </p>
        {deltaAmount !== undefined ? (
          <KpiDelta amount={deltaAmount} />
        ) : (
          <p className="dashboard-bento__kpi-delta">{delta}</p>
        )}
      </div>
    </article>
  )
}

type StackedCard = {
  id: string
  variant: 'primary' | 'blue' | 'matte'
  network: 'visa' | 'mastercard'
  pan: string
  panCopy: string
  balance: string
  holder: string
  expiry: string
  last4: string
}

const STACKED_CARDS: StackedCard[] = [
  {
    id: 'primary',
    variant: 'primary',
    network: 'visa',
    pan: '4532 1200 8891 4291',
    panCopy: '4532120088914291',
    balance: '$18,125',
    holder: 'QUANT ASTRA',
    expiry: '09/28',
    last4: '4291',
  },
  {
    id: 'business',
    variant: 'blue',
    network: 'mastercard',
    pan: '5425 2334 6789 8832',
    panCopy: '5425233467898832',
    balance: '$4,280',
    holder: 'QUANT ASTRA',
    expiry: '03/27',
    last4: '8832',
  },
  {
    id: 'reserve',
    variant: 'matte',
    network: 'visa',
    pan: '4111 1111 1111 1044',
    panCopy: '4111111111111044',
    balance: '$12,400',
    holder: 'QUANT ASTRA',
    expiry: '11/29',
    last4: '1044',
  },
]

function CardChipIcon({ cardId }: { cardId: string }) {
  const faceId = `chipFace-${cardId}`
  const shineId = `chipShine-${cardId}`
  const edgeId = `chipEdge-${cardId}`
  return (
    <svg
      className="dashboard-bento__stack-chip"
      viewBox="0 0 44 34"
      width={44}
      height={34}
      aria-hidden
    >
      <defs>
        <linearGradient id={faceId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f5e6bc" />
          <stop offset="22%" stopColor="#d4b06a" />
          <stop offset="48%" stopColor="#b8943f" />
          <stop offset="72%" stopColor="#e2c878" />
          <stop offset="100%" stopColor="#8f7128" />
        </linearGradient>
        <linearGradient id={shineId} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.55)" />
          <stop offset="45%" stopColor="rgba(255,255,255,0.08)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
        <linearGradient id={edgeId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(0,0,0,0.35)" />
          <stop offset="50%" stopColor="rgba(255,255,255,0.12)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.4)" />
        </linearGradient>
      </defs>
      <rect x="1" y="1" width="42" height="32" rx="5" fill={`url(#${faceId})`} />
      <rect x="1" y="1" width="42" height="32" rx="5" fill={`url(#${shineId})`} />
      <rect
        x="1"
        y="1"
        width="42"
        height="32"
        rx="5"
        fill="none"
        stroke={`url(#${edgeId})`}
        strokeWidth="0.75"
      />
      <path d="M1 11h42M1 17h42M1 23h42M15 1v32M29 1v32" stroke="rgba(0,0,0,0.2)" strokeWidth="0.6" />
      <path d="M15 11v12M29 11v12" stroke="rgba(0,0,0,0.14)" strokeWidth="0.5" />
      <rect x="17" y="13" width="10" height="8" rx="1" fill="rgba(0,0,0,0.08)" stroke="rgba(0,0,0,0.12)" strokeWidth="0.4" />
    </svg>
  )
}

function CardNfcIcon() {
  return (
    <span className="dashboard-bento__stack-nfc" aria-hidden>
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M16.3 19.5002C17.4 17.2002 18 14.7002 18 12.0002C18 9.30024 17.4 6.70024 16.3 4.50024M12.7 17.8003C13.5 16.0003 14 14.0003 14 12.0003C14 10.0003 13.5 7.90034 12.7 6.10034M9.1001 16.1001C9.7001 14.8001 10.0001 13.4001 10.0001 12.0001C10.0001 10.6001 9.7001 9.10015 9.1001 7.90015M5.5 14.3003C5.8 13.6003 6 12.8003 6 12.0003C6 11.2003 5.8 10.3003 5.5 9.60034"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  )
}

function CardNetworkLogo({ network }: { network: StackedCard['network'] }) {
  if (network === 'mastercard') {
    return (
      <span className="dashboard-bento__stack-brand dashboard-bento__stack-brand--mc" aria-hidden>
        <svg viewBox="0 0 48 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="18" cy="15" r="11" fill="#EB001B" />
          <circle cx="30" cy="15" r="11" fill="#F79E1B" />
          <path
            d="M24 7.2a11 11 0 0 1 0 15.6A11 11 0 0 1 24 7.2z"
            fill="#FF5F00"
          />
        </svg>
      </span>
    )
  }

  return (
    <span className="dashboard-bento__stack-brand dashboard-bento__stack-brand--visa" aria-hidden>
      <img
        className="dashboard-bento__stack-brand-img"
        src="/visa-svgrepo-com.svg"
        alt=""
        decoding="async"
      />
    </span>
  )
}

function formatPanGroups(pan: string, masked: boolean, last4: string) {
  if (masked) {
    return ['••••', '••••', '••••', last4]
  }
  const digits = pan.replace(/\s/g, '')
  return digits.match(/.{1,4}/g) ?? []
}

function PhysicalCardFace({
  card,
  balanceRevealed,
  onToggleBalance,
}: {
  card: StackedCard
  balanceRevealed: boolean
  onToggleBalance: (e: React.MouseEvent<HTMLButtonElement>) => void
}) {
  const [panCopied, setPanCopied] = useState(false)
  const panGroups = formatPanGroups(card.pan, !balanceRevealed, card.last4)

  useEffect(() => {
    if (!balanceRevealed) setPanCopied(false)
  }, [balanceRevealed])

  const handleCopyPan = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    try {
      await navigator.clipboard.writeText(card.panCopy)
      setPanCopied(true)
      window.setTimeout(() => setPanCopied(false), 1800)
    } catch {
      setPanCopied(false)
    }
  }

  return (
    <>
      <span className="dashboard-bento__stack-card-shine" aria-hidden />
      <span className="dashboard-bento__stack-card-noise" aria-hidden />
      <span className="dashboard-bento__stack-card-edge" aria-hidden />

      <div className="dashboard-bento__stack-card-actions">
        <button
          type="button"
          className={[
            'dashboard-bento__stack-balance-eye',
            balanceRevealed ? 'dashboard-bento__stack-balance-eye--active' : '',
          ]
            .filter(Boolean)
            .join(' ')}
          onClick={onToggleBalance}
          aria-label={balanceRevealed ? 'Hide card details' : 'Show card details'}
          aria-pressed={balanceRevealed}
        >
          {balanceRevealed ? (
            <Eye size={17} strokeWidth={1.75} aria-hidden />
          ) : (
            <EyeOff size={17} strokeWidth={1.75} aria-hidden />
          )}
        </button>
        <CardNfcIcon />
      </div>

      <div className="dashboard-bento__stack-card-top">
        <CardChipIcon cardId={card.id} />
      </div>

      <div className="dashboard-bento__stack-card-body">
        <div className="dashboard-bento__stack-pan-row">
          <p
            key={balanceRevealed ? 'pan-revealed' : 'pan-masked'}
            className={[
              'dashboard-bento__stack-pan',
              balanceRevealed ? '' : 'dashboard-bento__stack-pan--masked',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            {panGroups.map((group, index) => (
              <span key={`${group}-${index}`} className="dashboard-bento__stack-pan-group">
                {group}
              </span>
            ))}
          </p>
          {balanceRevealed ? (
            <button
              type="button"
              className={[
                'dashboard-bento__stack-pan-copy',
                panCopied ? 'dashboard-bento__stack-pan-copy--done' : '',
              ]
                .filter(Boolean)
                .join(' ')}
              onClick={handleCopyPan}
              aria-label={panCopied ? 'Card number copied' : 'Copy card number'}
            >
              {panCopied ? (
                <Check size={14} strokeWidth={2} aria-hidden />
              ) : (
                <Copy size={14} strokeWidth={1.75} aria-hidden />
              )}
            </button>
          ) : null}
        </div>
        <p
          key={balanceRevealed ? 'revealed' : 'masked'}
          className={[
            'dashboard-bento__stack-balance',
            balanceRevealed
              ? 'dashboard-bento__stack-balance--revealed'
              : 'dashboard-bento__stack-balance--masked',
          ].join(' ')}
        >
          {balanceRevealed ? (
            <CountUpAmount
              key={`${card.id}-balance`}
              value={card.balance}
              duration={1000}
            />
          ) : (
            '******'
          )}
        </p>
      </div>

      <div className="dashboard-bento__stack-footer">
        <span className="dashboard-bento__stack-holder">{card.holder}</span>
        <div className="dashboard-bento__stack-footer-end">
          <span className="dashboard-bento__stack-expiry">{card.expiry}</span>
          <CardNetworkLogo network={card.network} />
        </div>
      </div>
    </>
  )
}

function StackedCardsView() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [revealedByCard, setRevealedByCard] = useState<Record<string, boolean>>({})
  const touchStartX = useRef(0)
  const count = STACKED_CARDS.length

  const toggleBalance = useCallback((cardId: string) => {
    return (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()
      setRevealedByCard((prev) => ({ ...prev, [cardId]: !prev[cardId] }))
    }
  }, [])

  const goNext = useCallback(() => {
    setActiveIndex((i) => (i + 1) % count)
  }, [count])

  const goPrev = useCallback(() => {
    setActiveIndex((i) => (i - 1 + count) % count)
  }, [count])

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    const delta = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(delta) < 36) return
    if (delta > 0) goNext()
    else goPrev()
  }

  return (
    <article className="dashboard-bento__card dashboard-bento__card--credit" aria-label="My Cards">
      <div className="dashboard-bento__cards-rail">
        <header className="dashboard-bento__card-stack-header">
          <button
            type="button"
            className="dashboard-bento__card-stack-badge dashboard-bento__card-stack-add"
            aria-label="Add card"
          >
            + Card
          </button>
          <span className="dashboard-bento__card-label">My Cards</span>
          <span className="dashboard-bento__card-stack-badge dashboard-bento__card-stack-count">
            +3 Cards
          </span>
        </header>

        <div className="dashboard-bento__card-stack-stage">
          <span className="dashboard-bento__card-stack-glow" aria-hidden />
          <div
            className="dashboard-bento__card-stack"
            onClick={goNext}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            role="group"
            aria-label="Linked payment cards"
          >
            {STACKED_CARDS.map((card, index) => {
              const depth = (index - activeIndex + count) % count
              return (
                <div
                  key={card.id}
                  role="button"
                  tabIndex={0}
                  className={[
                    'dashboard-bento__stack-card',
                    `dashboard-bento__stack-card--${card.variant}`,
                    `dashboard-bento__stack-card--depth-${depth}`,
                  ].join(' ')}
                  onClick={(e) => {
                    e.stopPropagation()
                    setActiveIndex(index)
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      e.stopPropagation()
                      setActiveIndex(index)
                    }
                  }}
                  aria-label={
                    revealedByCard[card.id]
                      ? `${card.network} card ending ${card.last4}, balance ${card.balance}`
                      : `${card.network} card ending ${card.last4}, details hidden`
                  }
                  aria-pressed={depth === 0}
                >
                  <PhysicalCardFace
                    card={card}
                    balanceRevealed={!!revealedByCard[card.id]}
                    onToggleBalance={toggleBalance(card.id)}
                  />
                </div>
              )
            })}
          </div>
          <span className="dashboard-bento__card-stack-reflection" aria-hidden />
        </div>

        <div className="dashboard-bento__card-stack-dots" role="tablist" aria-label="Select card">
          {STACKED_CARDS.map((card, index) => (
            <button
              key={card.id}
              type="button"
              role="tab"
              className={
                index === activeIndex
                  ? 'dashboard-bento__card-stack-dot dashboard-bento__card-stack-dot--active'
                  : 'dashboard-bento__card-stack-dot'
              }
              aria-selected={index === activeIndex}
              aria-label={`Show card ${index + 1}`}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>
      </div>
    </article>
  )
}

function TransactionAvatar({ id, initials }: { id: string; initials: string }) {
  if (id === 'netflix') {
    return (
      <img
        className="dashboard-bento__txn-icon dashboard-bento__txn-icon--netflix"
        src="/netflix-1-logo-svgrepo-com.svg"
        alt=""
        decoding="async"
      />
    )
  }

  if (id === 'apple-pay') {
    return (
      <img
        className="dashboard-bento__txn-icon dashboard-bento__txn-icon--apple-pay"
        src="/apple-pay-svgrepo-com.svg"
        alt=""
        decoding="async"
      />
    )
  }

  return <>{initials}</>
}

const TRANSACTIONS = [
  {
    id: 'netflix',
    name: 'Netflix',
    initials: 'N',
    amount: '-$12.99',
    direction: 'out' as const,
    status: 'Completed',
    statusVariant: 'completed' as const,
  },
  {
    id: 'apple-pay',
    name: 'Apple Pay',
    initials: 'AP',
    amount: '+$240',
    direction: 'in' as const,
    status: 'Pending',
    statusVariant: 'pending' as const,
  },
  {
    id: 'salary',
    name: 'Salary',
    initials: 'S',
    amount: '+$3200',
    direction: 'in' as const,
    status: 'Success',
    statusVariant: 'success' as const,
  },
  {
    id: 'aws',
    name: 'AWS',
    initials: 'AW',
    amount: '-$2180',
    direction: 'out' as const,
    status: 'Completed',
    statusVariant: 'completed' as const,
  },
  {
    id: 'stripe',
    name: 'Stripe',
    initials: 'ST',
    amount: '+$12400',
    direction: 'in' as const,
    status: 'Completed',
    statusVariant: 'completed' as const,
  },
  {
    id: 'uber',
    name: 'Uber',
    initials: 'U',
    amount: '-$24.50',
    direction: 'out' as const,
    status: 'Completed',
    statusVariant: 'completed' as const,
  },
] as const

function TransactionsCard() {
  return (
    <article className="dashboard-bento__card dashboard-bento__card--transactions">
      <header className="dashboard-bento__card-head">
        <span className="dashboard-bento__card-label">Transactions</span>
        <span className="dashboard-bento__card-meta">Recent activity</span>
      </header>
      <ul className="dashboard-bento__txn-list">
        {TRANSACTIONS.map((txn, index) => (
          <li key={txn.id} className="dashboard-bento__txn-item">
            <button type="button" className="dashboard-bento__txn-row">
              <span
                className={`dashboard-bento__txn-avatar dashboard-bento__txn-avatar--${txn.id}`}
                aria-hidden
              >
                <TransactionAvatar id={txn.id} initials={txn.initials} />
              </span>
              <span className="dashboard-bento__txn-name">{txn.name}</span>
              <CountUpAmount
                value={txn.amount}
                className={`dashboard-bento__txn-amount dashboard-bento__txn-amount--${txn.direction}`}
                duration={850}
                delay={index * 100}
              />
              <span
                className={`dashboard-bento__txn-status dashboard-bento__txn-status--${txn.statusVariant}`}
              >
                {txn.status}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </article>
  )
}

/** Share of total income — slices sum to 100%. */
const INCOME_ALLOCATION = [
  { id: 'expenses', label: 'Expenses', percent: 33, color: '#f07178' },
  { id: 'savings', label: 'Savings', percent: 30, color: '#5da9ff' },
  { id: 'investments', label: 'Investments', percent: 24, color: '#a78bfa' },
  { id: 'emergency', label: 'Emergency Fund', percent: 13, color: '#5ecf95' },
] as const

type StatSegment = {
  id: string
  label: string
  percent: number
  color: string
}

/** Visible space between slices (round caps extend past dash ends). */
const STAT_DONUT_GAP_DEG = 5

function StatDonutChart({
  segments,
  size = 132,
  stroke = 14,
  hoveredId,
  onHover,
}: {
  segments: readonly StatSegment[]
  size?: number
  stroke?: number
  hoveredId: string | null
  onHover: (id: string | null) => void
}) {
  const radius = (size - stroke) / 2 - 2
  const circumference = 2 * Math.PI * radius
  const center = size / 2
  /** Round caps add ~stroke/2 arc length at each end — trim so slices don't overlap. */
  const capTrim = stroke * 0.52

  let rotationDeg = -90
  const arcs = segments.map((segment) => {
    const sweepDeg = (segment.percent / 100) * 360 - STAT_DONUT_GAP_DEG
    const arcLen = (sweepDeg / 360) * circumference
    const dash = Math.max(0, arcLen - capTrim * 2)
    const arc = { segment, dash, rotationDeg }
    rotationDeg += sweepDeg + STAT_DONUT_GAP_DEG
    return arc
  })

  const drawOrder = hoveredId
    ? [...arcs.filter((a) => a.segment.id !== hoveredId), ...arcs.filter((a) => a.segment.id === hoveredId)]
    : arcs

  return (
    <svg
      className="dashboard-bento__stat-donut"
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      role="img"
      aria-label="Total income allocation chart"
    >
      <circle
        cx={center}
        cy={center}
        r={radius}
        fill="none"
        stroke="rgba(255, 255, 255, 0.07)"
        strokeWidth={stroke}
      />
      {drawOrder.map(({ segment, dash, rotationDeg }) => {
        const isHovered = hoveredId === segment.id

        return (
          <circle
            key={segment.id}
            className={
              isHovered
                ? 'dashboard-bento__stat-donut-segment dashboard-bento__stat-donut-segment--active'
                : 'dashboard-bento__stat-donut-segment'
            }
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={segment.color}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={`${dash} ${circumference}`}
            transform={`rotate(${rotationDeg} ${center} ${center})`}
            style={
              {
                '--segment-color': segment.color,
              } as CSSProperties
            }
            onMouseEnter={() => onHover(segment.id)}
            onFocus={() => onHover(segment.id)}
            tabIndex={0}
            role="graphics-symbol"
            aria-label={`${segment.label} ${segment.percent}%`}
          />
        )
      })}
    </svg>
  )
}

function StatisticsCard() {
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const hovered = INCOME_ALLOCATION.find((s) => s.id === hoveredId)

  return (
    <article className="dashboard-bento__card dashboard-bento__card--statistics">
      <header className="dashboard-bento__card-head">
        <span className="dashboard-bento__card-label">Statistics</span>
        <span className="dashboard-bento__card-meta">Of total income</span>
      </header>
      <div className="dashboard-bento__stat-layout">
        <div
          className="dashboard-bento__stat-donut-wrap"
          onMouseLeave={() => setHoveredId(null)}
        >
          <StatDonutChart
            segments={INCOME_ALLOCATION}
            hoveredId={hoveredId}
            onHover={setHoveredId}
          />
          <div
            className={[
              'dashboard-bento__stat-donut-center',
              hovered ? 'dashboard-bento__stat-donut-center--active' : '',
            ]
              .filter(Boolean)
              .join(' ')}
            aria-live="polite"
          >
            {hovered ? (
              <>
                <span className="dashboard-bento__stat-donut-center-label">{hovered.label}</span>
                <span className="dashboard-bento__stat-donut-center-value">{hovered.percent}%</span>
                <span className="dashboard-bento__stat-donut-center-meta">Of income</span>
              </>
            ) : (
              <>
                <span className="dashboard-bento__stat-donut-center-label">Total</span>
                <span className="dashboard-bento__stat-donut-center-value">100%</span>
                <span className="dashboard-bento__stat-donut-center-meta">Income</span>
              </>
            )}
          </div>
        </div>
        <ul className="dashboard-bento__stat-legend">
          {INCOME_ALLOCATION.map((item) => (
            <li key={item.id} className="dashboard-bento__stat-legend-item">
              <span
                className="dashboard-bento__stat-legend-dot"
                style={{ backgroundColor: item.color }}
                aria-hidden
              />
              <span className="dashboard-bento__stat-legend-label">{item.label}</span>
              <span className="dashboard-bento__stat-legend-value">{item.percent}%</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}

export function DashboardBento() {
  return (
    <section className="dashboard-bento" aria-label="Dashboard overview">
      <KpiCard
        variant="revenue"
        label="Income"
        momPercent={12.4}
        value="$284,500"
        deltaAmount={24_320}
        sparkId="sparkRevenue"
      />

      <KpiCard
        variant="profit"
        label="Expenses"
        momPercent={8.1}
        value="$96,240"
        deltaAmount={8_420}
        sparkId="sparkProfit"
      />

      <KpiCard
        variant="savings"
        label="Savings"
        momPercent={5.2}
        value="$42,180"
        deltaAmount={2_140}
        sparkId="sparkSavings"
      />

      <StackedCardsView />

      <CreditScoreCard />

      <article className="dashboard-bento__card dashboard-bento__card--chart">
        <header className="dashboard-bento__card-head">
          <span className="dashboard-bento__card-label">Analytics</span>
          <span className="dashboard-bento__card-meta">Last 7 months</span>
        </header>
        <AnalyticsCandlestickChart />
      </article>

      <TransactionsCard />

      <StatisticsCard />
    </section>
  )
}
