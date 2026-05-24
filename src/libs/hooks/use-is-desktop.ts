import { useEffect, useState } from 'react'

const DESKTOP_BREAKPOINT = 1024 // lg

const useIsDesktop = () => {
  const [isDesktop, setIsDesktop] = useState(() => {
    if (typeof window === 'undefined') {
      return false
    }

    return window.matchMedia(`(min-width: ${DESKTOP_BREAKPOINT}px)`).matches
  })

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(min-width: ${DESKTOP_BREAKPOINT}px)`)

    setIsDesktop(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches)

    mediaQuery.addEventListener('change', handleChange)

    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return isDesktop
}

export default useIsDesktop
