import { RefObject, useEffect, useRef } from 'react'

const useClickOutside = <T extends HTMLElement>(
  ref: RefObject<T | null>,
  handler: VoidFunction,
  extraRefs?: Array<RefObject<HTMLElement | null>>
) => {
  const handlerRef = useRef(handler)

  useEffect(() => {
    handlerRef.current = handler
  })

  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node

      if (!ref.current || ref.current.contains(target)) return

      if (extraRefs?.some((extraRef) => extraRef?.current && extraRef.current.contains(target))) {
        return
      }

      handlerRef.current()
    }

    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)

    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [ref, extraRefs])
}

export default useClickOutside
