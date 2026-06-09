import { ReactNode, RefObject } from 'react'

export interface PortalProps {
  children: ReactNode
  containerRef?: RefObject<HTMLDivElement | null>
}
