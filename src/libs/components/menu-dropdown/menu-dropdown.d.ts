import { HTMLAttributes, ReactNode } from 'react'

export interface MenuDropdownItem {
  label: string
  icon?: ReactNode
  disabled?: boolean
  danger?: boolean
  onClick: () => void
}

export type MenuDropdownItemOrDivider = MenuDropdownItem | 'divider'

export interface MenuDropdownProps extends HTMLAttributes<HTMLDivElement> {
  items: MenuDropdownItemOrDivider[]
  trigger?: ReactNode
  triggerClassName?: string
  align?: 'start' | 'end'
  direction?: 'down' | 'up'
  headerSlot?: ReactNode | ((close: () => void) => ReactNode)
  onClose?: () => void
}
