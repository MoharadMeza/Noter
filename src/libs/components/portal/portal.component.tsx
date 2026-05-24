'use client'

import { useEffect, useState } from 'react'

import { createPortal } from 'react-dom'

import { PortalProps } from '@libs/components/portal/portal'

const Portal = ({ children }: PortalProps) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const portalRoot = document.getElementById('portal-root')
  if (!portalRoot) return null

  return createPortal(children, portalRoot)
}

export default Portal
