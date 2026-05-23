import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

const overlayTransition = {
  duration: 0.34,
  ease: [0.33, 1, 0.68, 1] as const,
}

export function RouteTransitionOverlay() {
  const location = useLocation()
  const reduceMotion = useReducedMotion()
  const previousPath = useRef(location.pathname)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (previousPath.current === location.pathname) return
    previousPath.current = location.pathname
    if (reduceMotion) return

    setVisible(true)
    const hideTimer = window.setTimeout(() => setVisible(false), 720)

    return () => window.clearTimeout(hideTimer)
  }, [location.pathname, reduceMotion])

  if (reduceMotion) return null

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="route-blur-overlay"
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={overlayTransition}
        />
      )}
    </AnimatePresence>
  )
}
