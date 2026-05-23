import { Bell, ChevronRight, PanelsTopLeft, Search, Settings, Sparkles } from 'lucide-react'

const NOTIFICATION_UNREAD_COUNT = 3

const TOPBAR_ACTIONS = [
  {
    id: 'notifications',
    label: 'Notifications',
    Icon: Bell,
    unreadCount: NOTIFICATION_UNREAD_COUNT,
  },
  { id: 'layout', label: 'Switch layout', Icon: PanelsTopLeft },
  { id: 'settings', label: 'Settings', Icon: Settings },
] as const

const BREADCRUMBS = ['Dashboard', 'Overview'] as const

function getTodayLabel() {
  return new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export function DashboardTopbar() {
  const today = getTodayLabel()

  return (
    <header className="dashboard-topbar">
      <div className="dashboard-topbar__left">
        <nav className="dashboard-topbar__breadcrumbs" aria-label="Breadcrumb">
          {BREADCRUMBS.map((crumb, index) => (
            <span key={crumb} className="dashboard-topbar__breadcrumb-item">
              {index > 0 && (
                <ChevronRight
                  className="dashboard-topbar__breadcrumb-sep"
                  size={14}
                  strokeWidth={2}
                  aria-hidden
                />
              )}
              <span
                className={
                  index === BREADCRUMBS.length - 1
                    ? 'dashboard-topbar__breadcrumb-current'
                    : 'dashboard-topbar__breadcrumb-link'
                }
              >
                {crumb}
              </span>
            </span>
          ))}
        </nav>
        <time className="dashboard-topbar__date" dateTime={new Date().toISOString().slice(0, 10)}>
          {today}
        </time>
      </div>

      <div className="dashboard-topbar__center">
        <label className="dashboard-topbar__search">
          <Search className="dashboard-topbar__search-icon" size={17} strokeWidth={1.75} aria-hidden />
          <input
            type="search"
            className="dashboard-topbar__search-input"
            placeholder="Search transactions, reports..."
            aria-label="Search"
          />
        </label>
        <button type="button" className="dashboard-topbar__ai-btn" aria-label="AI search">
          <Sparkles
            className="dashboard-topbar__ai-icon"
            size={16}
            strokeWidth={1.75}
            aria-hidden
          />
          <span>AI Search</span>
        </button>
      </div>

      <div className="dashboard-topbar__actions">
        {TOPBAR_ACTIONS.map((action) => {
          const { id, label, Icon } = action
          const unreadCount: number =
            'unreadCount' in action ? action.unreadCount : 0
          const badgeLabel =
            unreadCount > 0
              ? `${label}, ${unreadCount} unread notification${unreadCount === 1 ? '' : 's'}`
              : label

          return (
            <button
              key={id}
              type="button"
              className={[
                'dashboard-topbar__btn',
                unreadCount > 0 ? 'dashboard-topbar__btn--has-badge' : '',
              ]
                .filter(Boolean)
                .join(' ')}
              aria-label={badgeLabel}
              title={badgeLabel}
            >
              <Icon size={17} strokeWidth={1.75} aria-hidden />
              {unreadCount > 0 ? (
                <span className="dashboard-topbar__badge" aria-hidden>
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              ) : null}
            </button>
          )
        })}
      </div>
    </header>
  )
}
