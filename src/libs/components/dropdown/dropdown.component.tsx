'use client'

import { useEffect, useRef, useState } from 'react'

import { DropdownProps } from '@libs/components/dropdown/dropdown'
import { cn } from '@libs/utils/tailwind'

const Dropdown = ({
  items,
  value,
  placeholder = 'انتخاب کنید',
  disabled = false,
  className,
  onChange,
  ...rest
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const selectedItem = items.find((item) => item.value === value)

  const handleSelect = (item: DropdownProps['items'][number]) => {
    if (item.disabled) return
    onChange?.(item)
    setIsOpen(false)
  }

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={containerRef} className={cn('relative inline-block w-full', className)} {...rest}>
      <button
        type='button'
        disabled={disabled}
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(
          'flex w-full items-center justify-between gap-2',
          'rounded-md border border-gray-200 bg-white px-3 py-2',
          'text-sm transition-colors',
          'hover:bg-gray-50 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none',
          'disabled:cursor-not-allowed disabled:opacity-50',
          isOpen && 'ring-2 ring-blue-500'
        )}
      >
        <span className={cn(!selectedItem && 'text-gray-400')}>
          {selectedItem ? selectedItem.label : placeholder}
        </span>
        <svg
          className={cn('h-4 w-4 text-gray-500 transition-transform', isOpen && 'rotate-180')}
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
        </svg>
      </button>

      {isOpen && (
        <ul
          role='listbox'
          className={cn(
            'absolute z-50 mt-1 w-full',
            'rounded-md border border-gray-200 bg-white shadow-md',
            'max-h-60 overflow-auto py-1'
          )}
        >
          {items.map((item) => (
            <li
              key={item.value}
              role='option'
              aria-selected={item.value === value}
              onClick={() => handleSelect(item)}
              className={cn(
                'flex cursor-pointer items-center gap-2 px-3 py-2 text-sm',
                'hover:bg-gray-50',
                item.value === value && 'bg-blue-50 font-medium text-blue-600',
                item.disabled && 'cursor-not-allowed opacity-40'
              )}
            >
              {item.icon && <span>{item.icon}</span>}
              {item.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Dropdown
