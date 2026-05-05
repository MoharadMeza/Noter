'use client'

import { CardProps } from '@libs/components/card/card'
import { cn } from '@libs/utils/tailwind'

const Card = (props: CardProps) => {
  const { children, className, ...rest } = props
  return (
    <div
      className={cn(
        'bg-gray-100 dark:bg-slate-900',
        'border border-gray-200 dark:border-slate-700',
        'rounded-xl shadow-sm',
        'transition-colors duration-200',
        className
      )}
      {...rest}
    >
      {children}
    </div>
  )
}

const CardHeader = (props: CardProps) => {
  const { children, className, ...rest } = props
  return (
    <div
      className={cn(
        'flex flex-col space-y-1.5',
        'p-6',
        'border-b border-gray-200 dark:border-slate-700',
        className
      )}
      {...rest}
    >
      {children}
    </div>
  )
}

const CardTitle = (props: CardProps) => {
  const { children, className, ...rest } = props
  return (
    <h3
      className={cn(
        'text-2xl leading-none font-semibold tracking-tight',
        'text-slate-900 dark:text-slate-50',
        className
      )}
      {...rest}
    >
      {children}
    </h3>
  )
}

const CardDescription = (props: CardProps) => {
  const { children, className, ...rest } = props
  return (
    <p
      className={cn('text-sm font-light', 'text-gray-500 dark:text-slate-400', className)}
      {...rest}
    >
      {children}
    </p>
  )
}

const CardContent = (props: CardProps) => {
  const { children, className, ...rest } = props
  return (
    <div className={cn('p-6', 'text-foreground', className)} {...rest}>
      {children}
    </div>
  )
}

const CardFooter = (props: CardProps) => {
  const { children, className, ...rest } = props
  return (
    <div
      className={cn(
        'flex items-center',
        'p-6 pt-0',
        'border-border border-t',
        'text-muted-foreground',
        className
      )}
      {...rest}
    >
      {children}
    </div>
  )
}

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter }
