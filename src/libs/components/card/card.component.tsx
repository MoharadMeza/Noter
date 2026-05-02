import { HTMLAttributes } from 'react'

import { cn } from '@libs/utils/tailwind'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const Card = ({ children, className, ...props }: CardProps) => {
  return (
    <div
      className={cn(
        'bg-white dark:bg-slate-900',
        'border border-gray-200 dark:border-slate-700',
        'rounded-xl shadow-sm',
        'transition-colors duration-200',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

const CardHeader = ({ children, className, ...props }: CardProps) => {
  return (
    <div
      className={cn(
        'flex flex-col space-y-1.5',
        'p-6',
        'border-b border-gray-200 dark:border-slate-700',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

const CardTitle = ({ children, className, ...props }: CardProps) => {
  return (
    <h3
      className={cn(
        'text-2xl leading-none font-semibold tracking-tight',
        'text-slate-900 dark:text-slate-50',
        className
      )}
      {...props}
    >
      {children}
    </h3>
  )
}

const CardDescription = ({ children, className, ...props }: CardProps) => {
  return (
    <p
      className={cn('text-sm font-light', 'text-gray-500 dark:text-slate-400', className)}
      {...props}
    >
      {children}
    </p>
  )
}

const CardContent = ({ children, className, ...props }: CardProps) => {
  return (
    <div className={cn('p-6', 'text-foreground', className)} {...props}>
      {children}
    </div>
  )
}

const CardFooter = ({ children, className, ...props }: CardProps) => {
  return (
    <div
      className={cn(
        'flex items-center',
        'p-6 pt-0',
        'border-border border-t',
        'text-muted-foreground',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter }
