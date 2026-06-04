import { useState } from 'react'
import '../styles/dashboard.css'
import '../styles/dashboard-theme.css'
import '../styles/dashboard-polish.css'
import '../styles/dashboard-responsive.css'
import { Sidebar } from '../components/dashboard/Sidebar'
import { DashboardTopbar } from '../components/dashboard/DashboardTopbar'
import { DashboardBento } from '../components/dashboard/DashboardBento'
import { PageTransition } from '../components/layout/PageTransition'

export function DashboardPage() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  return (
    <PageTransition variant="dashboard">
      <div className="dashboard-page">
        {mobileNavOpen ? (
          <button
            type="button"
            className="dashboard-sidebar-overlay"
            aria-label="Close navigation"
            onClick={() => setMobileNavOpen(false)}
          />
        ) : null}
        <Sidebar
          mobileOpen={mobileNavOpen}
          onMobileClose={() => setMobileNavOpen(false)}
        />
        <main className="dashboard-main">
          <DashboardTopbar onMenuOpen={() => setMobileNavOpen(true)} />
          <DashboardBento />
        </main>
      </div>
    </PageTransition>
  )
}
