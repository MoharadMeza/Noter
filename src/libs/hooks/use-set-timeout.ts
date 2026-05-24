import { useCallback, useEffect, useRef } from 'react'

/**
 * A hook that returns a function to safely execute setTimeout
 * @param delay - Delay in milliseconds
 * @returns A function that executes a callback after the specified delay
 */
export function useSetTimeout(delay = 0) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    return () => {
      cancel()
    }
  }, [])

  const execute = useCallback(
    (callback: () => void) => {
      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }

      timeoutRef.current = setTimeout(() => {
        callback()
        timeoutRef.current = null
      }, delay)
    },
    [delay]
  )

  const cancel = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }, [])

  return { execute, cancel }
}
