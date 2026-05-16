import { CSSProperties, RefObject } from 'react'

export type MenuAlign = 'start' | 'end'
export type MenuDirection = 'down' | 'up'

export function getMenuPosition(
  triggerRef: RefObject<HTMLButtonElement | null>,
  align: MenuAlign,
  direction: MenuDirection = 'down'
): CSSProperties {
  if (!triggerRef.current) return {}
  const rect = triggerRef.current.getBoundingClientRect()
  return {
    position: 'fixed',
    ...(direction === 'up'
      ? { bottom: window.innerHeight - rect.top + 4 }
      : { top: rect.bottom + 4 }),
    ...(align === 'end' ? { right: window.innerWidth - rect.right } : { left: rect.left }),
  }
}

export function registerClickOutside(
  containerRef: RefObject<HTMLUListElement | null>,
  onOutside: () => void
): () => void {
  const handler = (e: MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
      onOutside()
    }
  }
  document.addEventListener('mousedown', handler)
  return () => document.removeEventListener('mousedown', handler)
}

export function registerPositionListeners(onUpdate: () => void): () => void {
  window.addEventListener('scroll', onUpdate, true)
  window.addEventListener('resize', onUpdate)
  return () => {
    window.removeEventListener('scroll', onUpdate, true)
    window.removeEventListener('resize', onUpdate)
  }
}
