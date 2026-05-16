'use client'

import Icon from '@libs/components/icon/icon.component'
import { useThemeStore } from '@libs/store/theme.store'

export function ThemeToggle() {
  const { theme, toggleTheme } = useThemeStore()

  return (
    <button
      onClick={toggleTheme}
      aria-label='Toggle theme'
      title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
      style={{
        background: 'none',
        border: '1px solid var(--border-color)',
        borderRadius: '0.5rem',
        padding: '0.375rem 0.5rem',
        cursor: 'pointer',
        color: 'var(--text-primary)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'background-color 0.2s ease',
      }}
    >
      {theme === 'light' ? (
        <Icon name='moon' className='h-4.5 w-4.5' />
      ) : (
        <Icon name='sun' className='h-4.5 w-4.5' />
      )}
    </button>
  )
}
