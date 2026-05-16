'use client'

import { ButtonProps } from '@libs/components/button/button'
import { createVariant, createSize } from '@libs/utils/tailwind'

const Button = (props: ButtonProps) => {
  const {
    children,
    isLoading,
    loadingText,
    className = '',
    variant = 'primary',
    size = 'md',
    ...rest
  } = props

  const baseStyles =
    'inline-flex cursor-pointer items-center justify-center gap-2 rounded-md text-sm font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-95 disabled:pointer-events-none disabled:opacity-50'

  const variants = {
    primary: 'bg-primary text-primary-foreground shadow hover:bg-primary/90',
    secondary: 'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
    outline:
      'border border-border bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
    destructive: 'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
    ghost:
      'text-slate-500 hover:bg-accent hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-slate-200',
  } as const

  const sizes = {
    sm: 'h-8 px-3 text-xs',
    md: 'h-9 px-4 py-2',
    lg: 'h-10 px-8',
    icon: 'h-9 w-9',
  } as const

  const getVariantClasses = createVariant(baseStyles, variants)
  const getSizeClasses = createSize('', sizes)

  return (
    <button
      className={getVariantClasses(variant, getSizeClasses(size, className))}
      disabled={isLoading || rest.disabled}
      {...rest}
    >
      {isLoading ? (
        <>
          <svg className='h-4 w-4 animate-spin' viewBox='0 0 24 24' fill='none' aria-hidden='true'>
            <circle
              className='opacity-25'
              cx='12'
              cy='12'
              r='10'
              stroke='currentColor'
              strokeWidth='4'
            />
            <path
              className='opacity-75'
              fill='currentColor'
              d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
            />
          </svg>
          {loadingText ?? children}
        </>
      ) : (
        children
      )}
    </button>
  )
}

export default Button
