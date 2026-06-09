import { ReactNode } from 'react'

export interface ModalProps {
  isOpen: boolean
  onClose: VoidFunction
  title?: string
  children: ReactNode
  footer?: ReactNode
  size?: 'sm' | 'md' | 'lg'
  locked?: boolean
  panelClassName?: string
}
