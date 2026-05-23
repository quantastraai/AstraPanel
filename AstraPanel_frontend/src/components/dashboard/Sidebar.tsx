import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, Pin } from 'lucide-react'
import {
  isFinanceChildId,
  SIDEBAR_ICONS,
  sidebarIconWrapStyle,
  type FinanceChildId,
  type SidebarIconId,
} from './SidebarIcons'

const FINANCE_ITEMS = [
  { id: 'transaction' as const, label: 'Transactions' },
  { id: 'budget' as const, label: 'Budget' },
  { id: 'investments' as const, label: 'Investments' },
  { id: 'wallets' as const, label: 'Wallets' },
]

const TOP_NAV = [
  { id: 'dashboard' as const, label: 'Dashboard' },
  { id: 'analytics' as const, label: 'Analytics' },
  { id: 'finance' as const, label: 'Finance' },
  { id: 'reports' as const, label: 'Reports' },
  { id: 'settings' as const, label: 'Settings' },
]

type TopNavId = (typeof TOP_NAV)[number]['id']
type ActiveId = TopNavId | FinanceChildId

function renderNavButton(
  id: SidebarIconId,
  label: string,
  active: string,
  isExpanded: boolean,
  onSelect: (id: ActiveId) => void,
  options?: { sub?: boolean },
) {
  const Icon = SIDEBAR_ICONS[id]
  const isActive = active === id || (id === 'finance' && isFinanceChildId(active))
  const isSub = options?.sub

  return (
    <button
      type="button"
      className={
        isActive
          ? isSub
            ? 'dashboard-sidebar__link dashboard-sidebar__link--sub dashboard-sidebar__link--active'
            : 'dashboard-sidebar__link dashboard-sidebar__link--active'
          : isSub
            ? 'dashboard-sidebar__link dashboard-sidebar__link--sub'
            : 'dashboard-sidebar__link'
      }
      data-nav={id}
      aria-current={active === id ? 'page' : undefined}
      aria-label={label}
      title={!isExpanded ? label : undefined}
      onClick={() => onSelect(id as ActiveId)}
    >
      <span className="dashboard-sidebar__icon-wrap" style={sidebarIconWrapStyle(id)}>
        <Icon
          className="dashboard-sidebar__icon"
          size={isSub ? 16 : 18}
          strokeWidth={1.75}
          aria-hidden
        />
      </span>
      <span className="dashboard-sidebar__label">{label}</span>
      {!isExpanded && (
        <span className="dashboard-sidebar__tooltip" role="tooltip">
          {label}
        </span>
      )}
    </button>
  )
}

function renderFlyoutItem(
  id: FinanceChildId,
  label: string,
  active: ActiveId,
  onSelect: (id: FinanceChildId) => void,
) {
  const Icon = SIDEBAR_ICONS[id]
  const isActive = active === id

  return (
    <li role="none">
      <button
        type="button"
        role="menuitem"
        className={
          isActive
            ? 'dashboard-sidebar__flyout-link dashboard-sidebar__flyout-link--active'
            : 'dashboard-sidebar__flyout-link'
        }
        data-nav={id}
        aria-current={isActive ? 'page' : undefined}
        onClick={() => onSelect(id)}
      >
        <span className="dashboard-sidebar__icon-wrap" style={sidebarIconWrapStyle(id)}>
          <Icon className="dashboard-sidebar__icon" size={16} strokeWidth={1.75} aria-hidden />
        </span>
        <span>{label}</span>
      </button>
    </li>
  )
}

/** High-res PNG downscaled in CSS — sharper when browser zoom changes. */
const LOGO_SRC = '/astra-logo-icon-96.png'
const WORDMARK_SRC = '/astra-wordmark-transparent.png'
const WORDMARK_WIDTH = 642
const WORDMARK_HEIGHT = 182

export function Sidebar() {
  const [active, setActive] = useState<ActiveId>('dashboard')
  const [financeOpen, setFinanceOpen] = useState(false)
  const [pinned, setPinned] = useState(false)
  const [pinnedCollapsed, setPinnedCollapsed] = useState(false)
  const [hovered, setHovered] = useState(false)
  const isExpanded = pinned ? !pinnedCollapsed : hovered

  useEffect(() => {
    if (isFinanceChildId(active)) setFinanceOpen(true)
  }, [active])

  const handlePinClick = () => {
    if (pinned) {
      setPinned(false)
      setPinnedCollapsed(false)
      setHovered(false)
    } else {
      setPinned(true)
      setPinnedCollapsed(false)
    }
  }

  const handleCollapseClick = () => {
    setPinnedCollapsed((c) => !c)
  }

  const handleMouseEnter = () => {
    if (!pinned) setHovered(true)
  }

  const handleMouseLeave = () => {
    if (!pinned) setHovered(false)
  }

  const handleNavSelect = (id: ActiveId) => {
    if (id === 'finance') {
      setFinanceOpen((open) => !open)
      return
    }
    setActive(id)
  }

  const handleFlyoutSelect = (id: FinanceChildId) => {
    setActive(id)
    setFinanceOpen(true)
  }

  const sidebarClass = [
    'dashboard-sidebar',
    isExpanded ? 'dashboard-sidebar--expanded' : '',
    pinned ? 'dashboard-sidebar--pinned' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <aside
      className={sidebarClass}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="dashboard-sidebar__header">
        <div className="dashboard-sidebar__top">
          <span className="dashboard-sidebar__logo">
            <img
              src={LOGO_SRC}
              alt="AstraPanel"
              className="dashboard-sidebar__logo-img"
              width={96}
              height={96}
              decoding="async"
              loading="eager"
              fetchPriority="high"
            />
          </span>
          <div className="dashboard-sidebar__brand-text">
            <img
              src={WORDMARK_SRC}
              alt="Astra Panel"
              className="dashboard-sidebar__wordmark"
              width={WORDMARK_WIDTH}
              height={WORDMARK_HEIGHT}
              decoding="async"
              loading="eager"
              fetchPriority="high"
            />
          </div>
          <div className="dashboard-sidebar__header-actions">
            {pinned && isExpanded && (
              <button
                type="button"
                className="dashboard-sidebar__collapse-btn"
                onClick={handleCollapseClick}
                aria-label="Collapse sidebar"
              >
                <ChevronLeft size={16} strokeWidth={2} aria-hidden />
              </button>
            )}
            <button
              type="button"
              className={
                pinned
                  ? 'dashboard-sidebar__pin dashboard-sidebar__pin--active'
                  : 'dashboard-sidebar__pin'
              }
              onClick={handlePinClick}
              aria-label={pinned ? 'Unpin sidebar' : 'Pin sidebar open'}
              aria-pressed={pinned}
              title={pinned ? 'Unpin' : 'Pin open'}
            >
              <Pin size={14} strokeWidth={2} aria-hidden />
            </button>
          </div>
        </div>
      </div>

      <nav className="dashboard-sidebar__nav" aria-label="Main navigation">
        <ul className="dashboard-sidebar__list">
          {TOP_NAV.map((item) => {
            if (item.id === 'finance') {
              const financeParentActive = isFinanceChildId(active)
              const financeItemClass = [
                'dashboard-sidebar__item',
                'dashboard-sidebar__item--finance',
                financeOpen ? 'dashboard-sidebar__item--flyout-open' : '',
              ]
                .filter(Boolean)
                .join(' ')

              return (
                <li
                  key={item.id}
                  className={financeItemClass}
                  onMouseEnter={() => setFinanceOpen(true)}
                  onMouseLeave={() => {
                    if (!isFinanceChildId(active)) setFinanceOpen(false)
                  }}
                >
                  <button
                    type="button"
                    className={
                      financeParentActive
                        ? 'dashboard-sidebar__link dashboard-sidebar__link--parent dashboard-sidebar__link--active'
                        : 'dashboard-sidebar__link dashboard-sidebar__link--parent'
                    }
                    data-nav="finance"
                    aria-expanded={financeOpen}
                    aria-haspopup="menu"
                    aria-label="Finance menu"
                    title={!isExpanded ? 'Finance' : undefined}
                    onClick={() => handleNavSelect('finance')}
                  >
                    <span
                      className="dashboard-sidebar__icon-wrap"
                      style={sidebarIconWrapStyle('finance')}
                    >
                      <SIDEBAR_ICONS.finance
                        className="dashboard-sidebar__icon"
                        size={18}
                        strokeWidth={1.75}
                        aria-hidden
                      />
                    </span>
                    <span className="dashboard-sidebar__label-row">
                      <span className="dashboard-sidebar__label">Finance</span>
                      <ChevronRight
                        className={
                          financeOpen
                            ? 'dashboard-sidebar__chevron dashboard-sidebar__chevron--open'
                            : 'dashboard-sidebar__chevron'
                        }
                        size={15}
                        strokeWidth={2}
                        aria-hidden
                      />
                    </span>
                    {!isExpanded && (
                      <span className="dashboard-sidebar__tooltip" role="tooltip">
                        Finance
                      </span>
                    )}
                  </button>
                  <div
                    className={
                      financeOpen
                        ? 'dashboard-sidebar__flyout dashboard-sidebar__flyout--open'
                        : 'dashboard-sidebar__flyout'
                    }
                    role="menu"
                    aria-label="Finance"
                  >
                    <ul className="dashboard-sidebar__flyout-list">
                      {FINANCE_ITEMS.map((sub) =>
                        renderFlyoutItem(sub.id, sub.label, active, handleFlyoutSelect),
                      )}
                    </ul>
                  </div>
                </li>
              )
            }

            return (
              <li key={item.id} className="dashboard-sidebar__item">
                {renderNavButton(item.id, item.label, active, isExpanded, handleNavSelect)}
              </li>
            )
          })}
        </ul>
      </nav>

      {pinned && !isExpanded && (
        <button
          type="button"
          className="dashboard-sidebar__expand-fab"
          onClick={handleCollapseClick}
          aria-label="Expand sidebar"
          title="Expand sidebar"
        >
          <ChevronRight size={15} strokeWidth={2} aria-hidden />
        </button>
      )}

      <div className="dashboard-sidebar__footer">
        <button
          type="button"
          className="dashboard-sidebar__profile"
          aria-label="AstraPanel account — Premium plan, online"
          title="AstraPanel · Premium"
        >
          <span className="dashboard-sidebar__profile-avatar-wrap">
            <span className="dashboard-sidebar__profile-avatar" aria-hidden="true">
              👤
            </span>
            <span className="dashboard-sidebar__profile-dot" aria-hidden="true" />
          </span>
          <span className="dashboard-sidebar__profile-meta">
            <span className="dashboard-sidebar__profile-label">AstraPanel</span>
            <span className="dashboard-sidebar__profile-tier">Premium</span>
          </span>
          {!isExpanded && (
            <span className="dashboard-sidebar__tooltip" role="tooltip">
              AstraPanel · Premium
            </span>
          )}
        </button>
      </div>
    </aside>
  )
}
