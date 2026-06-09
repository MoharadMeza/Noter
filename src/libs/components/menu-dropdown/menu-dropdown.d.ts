import { HTMLAttributes, ReactNode, RefObject } from 'react'

export interface MenuDropdownItem {
  label: string
  icon?: ReactNode
  disabled?: boolean
  danger?: boolean
  onClick: VoidFunction
}

export type MenuDropdownItemOrDivider = MenuDropdownItem | 'divider'

export interface MenuDropdownProps extends HTMLAttributes<HTMLDivElement> {
  items: MenuDropdownItemOrDivider[]
  trigger?: ReactNode
  triggerClassName?: string
  align?: 'start' | 'end'
  direction?: 'down' | 'up'
  headerSlot?: ReactNode | ((close: VoidFunction) => ReactNode)
  onClose?: VoidFunction
  menuId?: string
  portalContainerRef?: RefObject<HTMLDivElement | null>
}
