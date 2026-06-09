'use client'

import { useEffect, useState } from 'react'

import { createPortal } from 'react-dom'

import { PortalProps } from '@libs/components/portal/portal'

const Portal = (props: PortalProps) => {
  const { children, containerRef } = props
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const portalRoot = document.getElementById('portal-root')
  if (!portalRoot) return null

  if (containerRef) {
    return createPortal(<div ref={containerRef}>{children}</div>, portalRoot)
  }

  return createPortal(children, portalRoot)
}

export default Portal
