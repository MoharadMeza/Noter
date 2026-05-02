import React from 'react'
import { ThemeToggle } from '@libs/components/theme-toggle/theme-toggle.component'

function Header() {
  return (
    <header className='flex h-[70px] shrink-0 items-center justify-between border-b border-gray-200 bg-white px-6 dark:border-slate-700 dark:bg-slate-900'>
      <span className='text-lg font-semibold text-slate-800 dark:text-slate-100'>Noter</span>
      <ThemeToggle />
    </header>
  )
}

export default Header
