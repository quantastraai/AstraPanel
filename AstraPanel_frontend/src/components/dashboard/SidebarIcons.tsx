import type { CSSProperties } from 'react'
import {
  LayoutDashboard,
  BarChart3,
  ArrowLeftRight,
  PiggyBank,
  TrendingUp,
  Landmark,
  FileText,
  Wallet,
  Settings,
} from 'lucide-react'

export const SIDEBAR_ICONS = {
  dashboard: LayoutDashboard,
  analytics: BarChart3,
  finance: Wallet,
  transaction: ArrowLeftRight,
  budget: PiggyBank,
  investments: TrendingUp,
  wallets: Landmark,
  reports: FileText,
  settings: Settings,
} as const

export type SidebarIconId = keyof typeof SIDEBAR_ICONS

/** Muted default → brighter on hover/active */
export const SIDEBAR_ICON_THEME: Record<
  SidebarIconId,
  { muted: string; bright: string }
> = {
  dashboard: { muted: '#6E6644', bright: '#D4B06A' },
  analytics: { muted: '#356B58', bright: '#34D399' },
  finance: { muted: '#7A5F28', bright: '#F59E0B' },
  transaction: { muted: '#6E5528', bright: '#FBBF24' },
  budget: { muted: '#6E5528', bright: '#F59E0B' },
  investments: { muted: '#6E5528', bright: '#FCD34D' },
  wallets: { muted: '#6E5528', bright: '#F59E0B' },
  reports: { muted: '#7A5238', bright: '#FB923C' },
  settings: { muted: '#5C6370', bright: '#9CA3AF' },
}

export function sidebarIconWrapStyle(id: SidebarIconId): CSSProperties {
  const theme = SIDEBAR_ICON_THEME[id]
  return {
    '--icon-muted': theme.muted,
    '--icon-bright': theme.bright,
  } as CSSProperties
}

export const FINANCE_CHILD_IDS = ['transaction', 'budget', 'investments', 'wallets'] as const

export type FinanceChildId = (typeof FINANCE_CHILD_IDS)[number]

export function isFinanceChildId(id: string): id is FinanceChildId {
  return (FINANCE_CHILD_IDS as readonly string[]).includes(id)
}
