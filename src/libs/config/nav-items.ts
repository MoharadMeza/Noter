import { IconProps } from '@libs/components/icon/icon'

export interface NavItem {
  key: 'NAV_NOTES' | 'NAV_ARCHIVE' | 'NAV_TRASH'
  href: string
  icon: IconProps['name']
}

export const navItems: NavItem[] = [
  { key: 'NAV_NOTES', href: '/home', icon: 'notes' },
  { key: 'NAV_ARCHIVE', href: '/archive', icon: 'archive' },
  { key: 'NAV_TRASH', href: '/trash', icon: 'trash' },
]

export const BOTTOM_NAV_MAX_ITEMS = 4
