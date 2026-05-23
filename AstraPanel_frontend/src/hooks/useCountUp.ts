import { useEffect, useState } from 'react'

type UseCountUpOptions = {
  duration?: number
  start?: number
  enabled?: boolean
  decimals?: number
  delay?: number
}

export function useCountUp(end: number, options: UseCountUpOptions = {}) {
  const { duration = 1100, start = 0, enabled = true, decimals = 0, delay = 0 } = options
  const [value, setValue] = useState(enabled ? start : end)

  useEffect(() => {
    if (!enabled) {
      setValue(end)
      return
    }

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReduced) {
      setValue(end)
      return
    }

    let raf = 0
    let delayTimer: ReturnType<typeof setTimeout> | undefined
    const from = start

    const run = () => {
      const t0 = performance.now()

      const tick = (now: number) => {
        const progress = Math.min(1, (now - t0) / duration)
        const eased = 1 - (1 - progress) ** 3
        const next = from + (end - from) * eased
        setValue(decimals > 0 ? next : Math.round(next))
        if (progress < 1) raf = requestAnimationFrame(tick)
        else setValue(end)
      }

      setValue(from)
      raf = requestAnimationFrame(tick)
    }

    if (delay > 0) {
      setValue(from)
      delayTimer = setTimeout(run, delay)
    } else {
      run()
    }

    return () => {
      if (delayTimer) clearTimeout(delayTimer)
      cancelAnimationFrame(raf)
    }
  }, [end, duration, start, enabled, decimals, delay])

  return decimals > 0 ? value : Math.round(value)
}
