'use client'

import { useEffect, useState } from 'react'

import Icon from '@libs/components/icon/icon.component'
import { ModalProps } from '@libs/components/modal/modal'
import Portal from '@libs/components/portal/portal.component'
import Show from '@libs/components/show/show.component'
import { cn } from '@libs/utils/tailwind'

const sizeMap = {
  sm: 'sm:max-w-sm',
  md: 'sm:max-w-lg',
  lg: 'sm:max-w-2xl',
}

export function Modal(props: ModalProps) {
  const { isOpen, onClose, title, children, footer, size = 'md' } = props
  const [visible, setVisible] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setMounted(true)
    } else {
      setVisible(false)
      // TODO: useSetTimeout hook
      const timer = setTimeout(() => setMounted(false), 250)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  useEffect(() => {
    if (mounted) {
      const frame = requestAnimationFrame(() => {
        requestAnimationFrame(() => setVisible(true))
      })

      return () => cancelAnimationFrame(frame)
    }
  }, [mounted])

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen, onClose])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      const timer = setTimeout(() => {
        document.body.style.overflow = ''
      }, 250)
      return () => clearTimeout(timer)
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!mounted) return null

  return (
    <Portal>
      {/* Backdrop */}
      <div
        className={cn(
          'fixed inset-0 z-50 flex items-end justify-center transition-opacity duration-250 sm:items-center sm:p-4',
          visible ? 'opacity-100' : 'opacity-0'
        )}
        onClick={onClose}
      >
        <div className='absolute inset-0 bg-black/50 backdrop-blur-sm' />

        {/* Panel */}
        <div
          className={cn(
            'relative z-10 w-full rounded-t-2xl shadow-2xl sm:rounded-2xl',
            'bg-white dark:bg-slate-900',
            'border border-gray-200 dark:border-slate-700',
            'transition-all duration-250',
            visible
              ? 'translate-y-0 opacity-100 sm:scale-100'
              : 'translate-y-full opacity-0 sm:translate-y-4 sm:scale-95',
            sizeMap[size]
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Drag handle (mobile only) */}
          <div className='mx-auto mt-3 h-1.5 w-12 rounded-full bg-gray-300 sm:hidden dark:bg-slate-600' />

          {/* Header */}
          <Show when={!!title}>
            <div className='flex items-center justify-between border-b border-gray-100 px-6 py-4 dark:border-slate-700'>
              <h2 className='text-base font-semibold text-slate-800 dark:text-slate-100'>
                {title}
              </h2>
              <button
                type='button'
                onClick={onClose}
                className='flex h-8 w-8 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-gray-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-300'
              >
                <Icon name='close' className='h-4 w-4' />
              </button>
            </div>
          </Show>

          {/* Content */}
          <div className='px-6 py-5'>{children}</div>

          {/* Footer */}
          <Show when={!!footer}>
            <div className='flex items-center justify-end gap-2 border-t border-gray-100 px-6 py-4 dark:border-slate-700'>
              {footer}
            </div>
          </Show>
        </div>
      </div>
    </Portal>
  )
}
