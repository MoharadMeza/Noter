import { HTMLAttributes, ReactNode } from 'react'

export interface DropdownItem {
  label: string
  value: string
  disabled?: boolean
  icon?: ReactNode
}

export interface DropdownProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  items: DropdownItem[]
  value?: string
  placeholder?: string
  disabled?: boolean
  onChange?: (item: DropdownItem) => void
}
