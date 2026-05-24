'use client'

import { useTranslations } from 'next-intl'

import { ThemeToggle } from '@libs/components/theme-toggle/theme-toggle.component'
import UserMenu from '@libs/components/user-menu/user-menu.component'

function Header() {
  const t = useTranslations()

  return (
    <header className='flex h-14 shrink-0 items-center justify-between border-b border-gray-200 bg-gray-100 px-4 sm:h-17.5 sm:px-6 dark:border-slate-700 dark:bg-slate-900'>
      <span className='text-lg font-semibold text-slate-800 dark:text-slate-100'>
        {t('APP_NAME')}
      </span>

      <div className='flex items-center gap-2'>
        <ThemeToggle />
        <UserMenu />
      </div>
    </header>
  )
}

export default Header
