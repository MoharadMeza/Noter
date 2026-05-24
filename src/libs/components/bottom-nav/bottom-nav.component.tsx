'use client'

import { useState } from 'react'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { useTranslations } from 'next-intl'

import { map } from 'lodash-es'

import Icon from '@libs/components/icon/icon.component'
import Show from '@libs/components/show/show.component'
import { BOTTOM_NAV_MAX_ITEMS, navItems } from '@libs/config/nav-items'
import { cn } from '@libs/utils/tailwind'

function BottomNav() {
  const t = useTranslations()
  const pathname = usePathname()
  const [isMoreOpen, setIsMoreOpen] = useState(false)

  const visibleItems = navItems.slice(0, BOTTOM_NAV_MAX_ITEMS - 1)
  const overflowItems = navItems.slice(BOTTOM_NAV_MAX_ITEMS - 1)
  const hasOverflow = overflowItems.length > 0

  const isOverflowActive = overflowItems.some((item) => pathname.endsWith(item.href))

  return (
    <>
      <Show when={isMoreOpen}>
        <div className='fixed inset-0 z-40' onClick={() => setIsMoreOpen(false)} />
      </Show>

      <nav className='fixed inset-x-0 bottom-0 z-50 flex border-t border-gray-200 bg-white lg:hidden dark:border-slate-700 dark:bg-slate-900'>
        {map(visibleItems, ({ key, href, icon }) => {
          const isActive = pathname.endsWith(href)

          return (
            <Link
              key={key}
              href={href}
              className={cn(
                'flex flex-1 flex-col items-center gap-1 py-3 text-xs font-medium transition-colors',
                isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500 dark:text-slate-400'
              )}
            >
              <Icon name={icon} className='h-5 w-5' />
              {t(key)}
            </Link>
          )
        })}

        <Show when={hasOverflow} mode='unmount'>
          <div className='relative flex flex-1 flex-col items-center'>
            <Show when={isMoreOpen}>
              <div className='absolute bottom-full mb-2 w-40 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-900'>
                {map(overflowItems, ({ key, href, icon }) => {
                  const isActive = pathname.endsWith(href)

                  return (
                    <Link
                      key={key}
                      href={href}
                      onClick={() => setIsMoreOpen(false)}
                      className={cn(
                        'flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors',
                        isActive
                          ? 'text-blue-600 dark:text-blue-400'
                          : 'text-slate-600 hover:bg-gray-50 dark:text-slate-300 dark:hover:bg-slate-800'
                      )}
                    >
                      <Icon name={icon} className='h-5 w-5' />
                      {t(key)}
                    </Link>
                  )
                })}
              </div>
            </Show>

            <button
              type='button'
              onClick={() => setIsMoreOpen((prev) => !prev)}
              className={cn(
                'flex w-full flex-col items-center gap-1 py-3 text-xs font-medium transition-colors',
                isOverflowActive || isMoreOpen
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-slate-500 dark:text-slate-400'
              )}
            >
              <Icon name='ellipsis' className='h-5 w-5 rotate-90' />
              {t('NAV_MORE')}
            </button>
          </div>
        </Show>
      </nav>
    </>
  )
}

export default BottomNav
