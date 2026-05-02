'use client'

import lodashMap from 'lodash/map'

import { useTranslations } from 'next-intl'

import { useFetchNoteList } from '@libs/models/note/list/useFetchNoteList'

import NoteCard from '@components/note/note-card/note-card.component'

const SkeletonCard = () => (
  <div className='animate-pulse rounded-xl border border-gray-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800'>
    <div className='mb-3 h-4 w-2/3 rounded bg-gray-200 dark:bg-slate-700' />
    <div className='space-y-2'>
      <div className='h-3 rounded bg-gray-100 dark:bg-slate-700' />
      <div className='h-3 w-4/5 rounded bg-gray-100 dark:bg-slate-700' />
    </div>
  </div>
)

function RecentNotes() {
  const t = useTranslations()
  const { data: notes, isLoading } = useFetchNoteList({ enabled: true })

  const renderContent = () => {
    if (isLoading) {
      return Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
    }

    if (!notes?.result.total) {
      return (
        <div className='col-span-full flex flex-col items-center justify-center py-16 text-slate-400 dark:text-slate-500'>
          <svg
            className='mb-3 h-12 w-12 opacity-40'
            fill='none'
            stroke='currentColor'
            strokeWidth={1.5}
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z'
            />
          </svg>
          <p className='text-sm'>{t('RECENT_NOTES_EMPTY')}</p>
        </div>
      )
    }

    return lodashMap(notes.result.data, (note) => (
      <NoteCard
        key={note.id}
        id={note.id}
        title={note.title}
        color={note.color}
        content={note.content}
      />
    ))
  }

  return (
    <div>
      <h2 className='mb-4 text-lg font-semibold text-slate-800 dark:text-slate-100'>
        {t('RECENT_NOTES_TITLE')}
      </h2>

      <div className='grid grid-cols-1 gap-3'>{renderContent()}</div>
    </div>
  )
}

export default RecentNotes
