import { motion, useReducedMotion, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'

type PageTransitionProps = {
  children: ReactNode
  variant: 'landing' | 'dashboard'
}

const enterTransition = {
  opacity: { duration: 0.55, ease: [0.33, 1, 0.68, 1] as const },
  y: { duration: 0.72, ease: [0.22, 1, 0.36, 1] as const },
  scale: { duration: 0.72, ease: [0.22, 1, 0.36, 1] as const },
  filter: { duration: 0.62, ease: [0.33, 1, 0.68, 1] as const },
}

const exitTransition = {
  opacity: { duration: 0.38, ease: [0.4, 0, 0.2, 1] as const },
  y: { duration: 0.48, ease: [0.4, 0, 0.2, 1] as const },
  scale: { duration: 0.48, ease: [0.4, 0, 0.2, 1] as const },
  filter: { duration: 0.42, ease: [0.4, 0, 0.2, 1] as const },
}

const pageVariants: Record<'landing' | 'dashboard', Variants> = {
  landing: {
    initial: { opacity: 0, y: -10, scale: 1, filter: 'blur(6px)' },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: enterTransition,
    },
    exit: {
      opacity: 0,
      y: 12,
      scale: 0.996,
      filter: 'blur(8px)',
      transition: exitTransition,
    },
  },
  dashboard: {
    initial: { opacity: 0, y: 16, scale: 0.992, filter: 'blur(6px)' },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: enterTransition,
    },
    exit: {
      opacity: 0,
      y: -8,
      scale: 0.996,
      filter: 'blur(8px)',
      transition: exitTransition,
    },
  },
}

export function PageTransition({ children, variant }: PageTransitionProps) {
  const reduceMotion = useReducedMotion()

  if (reduceMotion) {
    return <div className="page-transition">{children}</div>
  }

  return (
    <motion.div
      className="page-transition"
      variants={pageVariants[variant]}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {children}
    </motion.div>
  )
}
