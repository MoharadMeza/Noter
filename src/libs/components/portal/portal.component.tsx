'use client'

import { useEffect, useRef, useState } from 'react'

import { createPortal } from 'react-dom'

import { PortalProps } from '@libs/components/portal/portal'

const Portal = ({ children }: PortalProps) => {
  const [mounted, setMounted] = useState(false)
  const portalRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    portalRef.current = document.createElement('div')
    document.body.appendChild(portalRef.current)
    setMounted(true)
    return () => {
      if (portalRef.current) {
        document.body.removeChild(portalRef.current)
      }
    }
  }, [])

  if (!mounted || !portalRef.current) return null
  return createPortal(children, portalRef.current)
}

export default Portal
