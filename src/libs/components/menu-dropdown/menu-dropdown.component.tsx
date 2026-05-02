'use client'

import { useEffect, useRef, useState } from 'react'

import lodashMap from 'lodash/map'

import { MenuDropdownProps } from '@libs/components/menu-dropdown/menu-dropdown'
import {
  getMenuPosition,
  registerClickOutside,
  registerPositionListeners,
} from '@libs/components/menu-dropdown/menu-dropdown.utils'
import Portal from '@libs/components/portal/portal.component'
import { cn } from '@libs/utils/tailwind'

const DefaultTrigger = () => (
  <svg className='h-4 w-4' fill='currentColor' viewBox='0 0 24 24'>
    <circle cx='12' cy='5' r='1.5' />
    <circle cx='12' cy='12' r='1.5' />
    <circle cx='12' cy='19' r='1.5' />
  </svg>
)

const MenuDropdown = (props: MenuDropdownProps) => {
  const { items, trigger, align = 'end', className, ...rest } = props
  const [isOpen, setIsOpen] = useState(false)
  const [menuStyle, setMenuStyle] = useState<React.CSSProperties>({})
  const containerRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  const updatePosition = () => setMenuStyle(getMenuPosition(triggerRef, align))

  useEffect(() => registerClickOutside(containerRef, () => setIsOpen(false)), [])

  useEffect(() => {
    if (!isOpen) {
      return
    }

    return registerPositionListeners(updatePosition)
  }, [isOpen])

  const handleOpen = (e: React.MouseEvent) => {
    e.preventDefault()
    if (isOpen) {
      setIsOpen(false)
      return
    }
    updatePosition()
    setIsOpen(true)
  }

  const menu = isOpen && (
    <ul
      role='menu'
      style={menuStyle}
      className={cn(
        'z-100 min-w-36',
        'rounded-lg border border-gray-200 bg-white shadow-lg',
        'dark:border-slate-700 dark:bg-slate-800',
        'py-1'
      )}
    >
      {lodashMap(items, (item, index) => {
        if (item === 'divider') {
          return (
            <li
              key={index}
              role='separator'
              className='my-1 border-t border-gray-100 dark:border-slate-700'
            />
          )
        }

        return (
          <li key={index} role='menuitem'>
            <button
              type='button'
              disabled={item.disabled}
              onClick={() => {
                item.onClick()
                setIsOpen(false)
              }}
              className={cn(
                'flex w-full items-center gap-2 px-3 py-2 text-sm',
                'transition-colors duration-100',
                item.danger
                  ? 'text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/40'
                  : 'text-gray-700 hover:bg-gray-50 dark:text-slate-200 dark:hover:bg-slate-700',
                item.disabled && 'cursor-not-allowed opacity-40'
              )}
            >
              {item.icon && <span className='h-4 w-4'>{item.icon}</span>}
              {item.label}
            </button>
          </li>
        )
      })}
    </ul>
  )

  return (
    <div ref={containerRef} className={cn('relative inline-block', className)} {...rest}>
      <button
        ref={triggerRef}
        type='button'
        onClick={handleOpen}
        className={cn(
          'flex items-center justify-center rounded-md p-1.5',
          'text-gray-500 transition-colors duration-100',
          'hover:bg-gray-100 hover:text-gray-700',
          'dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-slate-200',
          'focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none',
          isOpen && 'bg-gray-100 text-gray-700 dark:bg-slate-700 dark:text-slate-200'
        )}
      >
        {trigger ?? <DefaultTrigger />}
      </button>

      <Portal>{menu || null}</Portal>
    </div>
  )
}

export default MenuDropdown
