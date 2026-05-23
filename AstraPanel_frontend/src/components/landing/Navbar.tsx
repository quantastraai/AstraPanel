import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

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
            <span className="nav__brand-copy">
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
            whileHover={{ scale: 1.015 }}
            whileTap={{ scale: 0.985 }}
            transition={{ type: 'spring', stiffness: 280, damping: 26, mass: 0.85 }}
          >
            <Link to="/dashboard" className="btn btn--primary">
              Dashboard
            </Link>
          </motion.div>
        </div>
      </div>
    </header>
  )
}
