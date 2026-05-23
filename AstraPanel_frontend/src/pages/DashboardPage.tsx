import '../styles/dashboard.css'
import '../styles/dashboard-theme.css'
import { Sidebar } from '../components/dashboard/Sidebar'
import { DashboardTopbar } from '../components/dashboard/DashboardTopbar'
import { DashboardBento } from '../components/dashboard/DashboardBento'
import { PageTransition } from '../components/layout/PageTransition'

export function DashboardPage() {
  return (
    <PageTransition variant="dashboard">
      <div className="dashboard-page">
        <Sidebar />
        <main className="dashboard-main">
          <DashboardTopbar />
          <DashboardBento />
        </main>
      </div>
    </PageTransition>
  )
}
