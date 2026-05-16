import { SkeletonCardProps, SkeletonProps } from '@libs/components/skeleton/skeleton'
import { cn } from '@libs/utils/tailwind'

export const Skeleton = (props: SkeletonProps) => (
  <div className={cn('animate-pulse rounded bg-gray-200 dark:bg-slate-700', props.className)} />
)

export const SkeletonCard = (props: SkeletonCardProps) => {
  const { list } = props

  return (
    <div
      className={cn(
        'animate-pulse rounded-xl border border-gray-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800',
        list && 'flex items-center gap-4'
      )}
    >
      <Skeleton className={cn('mb-3 h-4 w-2/3', list && 'mb-0 w-1/4 shrink-0')} />

      <div className={cn('space-y-2', list && 'flex-1')}>
        <Skeleton className='h-3 w-full bg-gray-100 dark:bg-slate-700' />
        <Skeleton className='h-3 w-4/5 bg-gray-100 dark:bg-slate-700' />
      </div>
    </div>
  )
}
