'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { useTranslations } from 'next-intl'

import { map } from 'lodash-es'

import Icon from '@libs/components/icon/icon.component'
import LabelManager from '@libs/components/label-manager/label-manager.component'
import { navItems } from '@libs/config/nav-items'
import { cn } from '@libs/utils/tailwind'

function Sidebar() {
  const t = useTranslations()
  const pathname = usePathname()

  return (
    <nav className='py-3'>
      {map(navItems, ({ key, href, icon }) => {
        const isActive = pathname.endsWith(href)
        return (
          <Link
            key={key}
            href={href}
            className={cn(
              'mx-2 flex items-center gap-3 rounded-e-full px-4 py-2.5 text-sm font-medium transition-colors',
              isActive
                ? 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300'
                : 'text-slate-600 hover:bg-gray-100 dark:text-slate-400 dark:hover:bg-slate-700/60'
            )}
          >
            <Icon name={icon} className='h-5 w-5' />
            {t(key)}
          </Link>
        )
      })}

      <LabelManager />
    </nav>
  )
}

export default Sidebar
