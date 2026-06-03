import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'Home', href: '#', active: true },
  { label: 'Features', href: '#features' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'About', href: '#how-it-works' },
  { label: 'Contact', href: '#contact' },
] as const

type NavbarProps = {
  className?: string
}

export function Navbar({ className = '' }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className={`nav ${className}`.trim()}>
      <div className="nav__bar">
        <div className="nav__zone nav__zone--brand">
          <a href="#" className="nav__brand">
            <img
              src="/astra-logo-icon-96.png"
              alt=""
              className="nav__logo"
              width={32}
              height={32}
            />
            <span className="nav__brand-copy nav__brand-copy--wordmark">
              <img
                src="/astra-wordmark-transparent.png"
                alt="AstraPanel"
                className="nav__wordmark"
              />
              <span className="nav__byline">by QuantAstraAI</span>
            </span>
          </a>
        </div>

        <nav className="nav__zone nav__zone--center" aria-label="Main">
          <ul className="nav__links">
            {navLinks.map(({ label, href, ...link }) => (
              <li key={label}>
                <a
                  href={href}
                  className={'active' in link && link.active ? 'nav__link--active' : undefined}
                  aria-current={'active' in link && link.active ? 'page' : undefined}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="nav__zone nav__zone--actions">
          <button type="button" className="btn btn--ghost">
            Login
          </button>
          <motion.div
            className="nav__cta-wrap"
            whileHover={{ scale: 1.015 }}
            whileTap={{ scale: 0.985 }}
            transition={{ type: 'spring', stiffness: 280, damping: 26, mass: 0.85 }}
          >
            <Link to="/dashboard" className="btn btn--primary">
              Dashboard
            </Link>
          </motion.div>
          
          <button 
            type="button" 
            className="nav__mobile-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div 
              className="nav__mobile-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
            />
            <motion.div 
              className="nav__mobile-menu"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <button 
                type="button" 
                className="nav__mobile-close"
                onClick={() => setIsMenuOpen(false)}
                aria-label="Close menu"
              >
                <X size={24} />
              </button>

              <ul className="nav__mobile-links">
                {navLinks.map(({ label, href, ...link }) => (
                  <li key={label}>
                    <a
                      href={href}
                      onClick={() => setIsMenuOpen(false)}
                      className={'active' in link && link.active ? 'nav__link--active' : undefined}
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>

              <div className="nav__mobile-actions">
                <button type="button" className="btn btn--ghost">
                  Login
                </button>
                <Link
                  to="/dashboard"
                  className="btn btn--primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}
