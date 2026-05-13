'use client'

import { useState } from 'react'

import { useSearchParams } from 'next/navigation'

import { useTranslations } from 'next-intl'

import { map } from 'lodash-es'

import Icon from '@libs/components/icon/icon.component'
import { useFetchNoteList } from '@libs/models/note/list/useFetchNoteList'
import { cn } from '@libs/utils/tailwind'

import NoteCard from '@components/note/note-card/note-card.component'

const SkeletonCard = ({ list }: { list?: boolean }) => (
  <div
    className={cn(
      'animate-pulse rounded-xl border border-gray-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800',
      list && 'flex items-center gap-4'
    )}
  >
    <div
      className={cn(
        'mb-3 h-4 w-2/3 rounded bg-gray-200 dark:bg-slate-700',
        list && 'mb-0 w-1/4 shrink-0'
      )}
    />
    <div className={cn('space-y-2', list && 'flex-1')}>
      <div className='h-3 rounded bg-gray-100 dark:bg-slate-700' />
      <div className='h-3 w-4/5 rounded bg-gray-100 dark:bg-slate-700' />
    </div>
  </div>
)

function RecentNotes() {
  const t = useTranslations()
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const searchParams = useSearchParams()
  const activeLabelId = searchParams.get('labelId') ? Number(searchParams.get('labelId')) : null
  const {
    data: notes,
    isLoading,
    isFetching,
  } = useFetchNoteList({ labelId: activeLabelId }, { enabled: true })
  const isSwitching = isFetching && !isLoading

  const total = notes?.result.total ?? 0

  const renderContent = () => {
    if (isLoading) {
      return Array.from({ length: 4 }).map((_, i) => (
        <SkeletonCard key={i} list={viewMode === 'list'} />
      ))
    }

    if (!total) {
      return (
        <div className='col-span-full flex flex-col items-center justify-center py-20 text-slate-400 dark:text-slate-500'>
          <Icon name='notes' className='mb-3 h-14 w-14 opacity-30' />
          <p className='text-sm'>{t('RECENT_NOTES_EMPTY')}</p>
        </div>
      )
    }

    return map(notes!.result.data, (note) => (
      <NoteCard
        key={note.id}
        id={note.id}
        title={note.title}
        color={note.color}
        content={note.content}
        labels={note.labels}
      />
    ))
  }

  return (
    <div>
      {/* toolbar */}
      <div className='mb-3 flex items-center justify-between'>
        <span className='text-xs text-slate-400 dark:text-slate-500'>
          {!isLoading && total > 0 ? `${total} ${t('RECENT_NOTES_TITLE')}` : null}
        </span>

        <div className='flex items-center gap-0.5 rounded-lg border border-gray-200 p-0.5 dark:border-slate-700'>
          <button
            type='button'
            onClick={() => setViewMode('grid')}
            title='Grid view'
            className={cn(
              'rounded-md p-1.5 transition-colors',
              viewMode === 'grid'
                ? 'bg-gray-100 text-slate-700 dark:bg-slate-700 dark:text-slate-100'
                : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
            )}
          >
            <Icon name='grid' className='h-4 w-4' />
          </button>

          <button
            type='button'
            onClick={() => setViewMode('list')}
            title='List view'
            className={cn(
              'rounded-md p-1.5 transition-colors',
              viewMode === 'list'
                ? 'bg-gray-100 text-slate-700 dark:bg-slate-700 dark:text-slate-100'
                : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
            )}
          >
            <Icon name='list' className='h-4 w-4' />
          </button>
        </div>
      </div>

      <div
        className={cn(
          'transition-opacity duration-200',
          isSwitching && 'opacity-40',
          viewMode === 'grid'
            ? 'grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4'
            : 'flex flex-col gap-2'
        )}
      >
        {renderContent()}
      </div>
    </div>
  )
}

export default RecentNotes
