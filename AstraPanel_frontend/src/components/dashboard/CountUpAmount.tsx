import { useCountUp } from '../../hooks/useCountUp'

function parseAmountString(raw: string): number | null {
  const trimmed = raw.trim()
  if (!trimmed || trimmed.includes('*')) return null
  const cleaned = trimmed.replace(/[^0-9.-]/g, '')
  if (!cleaned || cleaned === '-' || cleaned === '.') return null
  const n = Number(cleaned)
  return Number.isFinite(n) ? n : null
}

function decimalPlacesFromTemplate(template: string) {
  const match = template.match(/\.(\d+)/)
  return match ? match[1].length : 0
}

function formatLikeTemplate(value: number, template: string) {
  const decimals = decimalPlacesFromTemplate(template)
  const abs = Math.abs(value)
  const absFormatted =
    decimals > 0 ? abs.toFixed(decimals) : Math.round(abs).toLocaleString('en-US')

  if (template.startsWith('+$')) return `+$${absFormatted}`
  if (template.startsWith('-$')) return `-$${absFormatted}`
  if (template.startsWith('$')) return `$${absFormatted}`
  if (template.startsWith('+')) return `+${absFormatted}`
  if (template.startsWith('-')) return `-${absFormatted}`
  return absFormatted
}

type CountUpAmountProps = {
  value: string
  className?: string
  duration?: number
  enabled?: boolean
  delay?: number
}

export function CountUpAmount({ value, className, duration, enabled = true, delay }: CountUpAmountProps) {
  const target = parseAmountString(value)

  if (target === null) {
    return <span className={className}>{value}</span>
  }

  return (
    <CountUpAmountInner
      target={target}
      template={value}
      className={className}
      duration={duration}
      enabled={enabled}
      delay={delay}
    />
  )
}

function CountUpAmountInner({
  target,
  template,
  className,
  duration,
  enabled,
  delay,
}: {
  target: number
  template: string
  className?: string
  duration?: number
  enabled?: boolean
  delay?: number
}) {
  const decimals = decimalPlacesFromTemplate(template)
  const animated = useCountUp(target, { duration, enabled, decimals, delay })

  return <span className={className}>{formatLikeTemplate(animated, template)}</span>
}

type CountUpNumberProps = {
  value: number
  className?: string
  duration?: number
  enabled?: boolean
}

export function CountUpNumber({ value, className, duration, enabled = true }: CountUpNumberProps) {
  const animated = useCountUp(value, { duration, enabled })
  return <span className={className}>{animated.toLocaleString('en-US')}</span>
}
