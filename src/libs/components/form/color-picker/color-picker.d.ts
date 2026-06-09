import { RefObject } from 'react'

export interface ColorPickerProps {
  name: string
  label?: string
  compact?: boolean
  portalContainerRef?: RefObject<HTMLDivElement | null>
}
