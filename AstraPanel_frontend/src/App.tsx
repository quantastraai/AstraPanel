import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { LandingPage } from './pages/LandingPage'
import { DashboardPage } from './pages/DashboardPage'
import { RouteTransitionOverlay } from './components/layout/RouteTransitionOverlay'

function AppRoutes() {
  const location = useLocation()

  return (
    <>
      <AnimatePresence initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </AnimatePresence>
      <RouteTransitionOverlay />
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <div className="app-shell__backdrop" aria-hidden="true" />
        <AppRoutes />
      </div>
    </BrowserRouter>
  )
}

export default App
