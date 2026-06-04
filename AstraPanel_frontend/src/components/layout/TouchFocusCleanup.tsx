import { useEffect } from 'react'

/** Interactive elements that may show Android's blue tap flash / sticky :focus ring */
const TAPPABLE_SELECTOR = [
  'button',
  'a[href]',
  '[role="button"]',
  '[role="tab"]',
  '[role="menuitem"]',
  '[role="graphics-symbol"]',
  '[tabindex]:not([tabindex="-1"])',
].join(', ')

/**
 * On touch devices, blur tappable controls after tap so Chrome/Android
 * does not leave a blue :focus overlay on buttons and custom controls.
 */
export function TouchFocusCleanup() {
  useEffect(() => {
    const isTouchCoarse = window.matchMedia('(hover: none) and (pointer: coarse)').matches
    if (!isTouchCoarse) return

    const onPointerUp = (event: PointerEvent) => {
      const el = (event.target as Element | null)?.closest?.(TAPPABLE_SELECTOR)
      if (!(el instanceof HTMLElement)) return
      if (el.matches('input, textarea, select, [contenteditable="true"]')) return

      requestAnimationFrame(() => {
        if (document.activeElement === el) el.blur()
      })
    }

    document.addEventListener('pointerup', onPointerUp, { passive: true })
    return () => document.removeEventListener('pointerup', onPointerUp)
  }, [])

  return null
}
