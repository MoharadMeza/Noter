'use client'

import { useRouter, useSearchParams } from 'next/navigation'

import Show from '@libs/components/show/show.component'
import { bgColorsMap } from '@libs/utils/common'
import { cn } from '@libs/utils/tailwind'

import { EditNoteModal } from '@components/note/edit-note/edit-note-modal.component'
import { NoteCardProps } from '@components/note/note-card/note-card'

function NoteCard(props: NoteCardProps) {
  const { color, content, id, title, selected } = props
  const router = useRouter()
  const searchParams = useSearchParams()

  const isEditing = searchParams.get('edit') === String(id)

  const onCloseEditModal = () => {
    router.back()
  }

  return (
    <>
      <div className='cursor-pointer' onClick={() => router.push(`?edit=${id}`)}>
        <div
          className={cn(
            'group relative flex min-h-28 flex-col overflow-hidden rounded-xl border bg-gray-50 p-4 text-slate-800 shadow-sm transition-all duration-200',
            'hover:-translate-y-0.5 hover:shadow-md',
            'dark:bg-slate-800 dark:text-slate-100',
            selected
              ? 'border-blue-500 ring-2 ring-blue-500/30 dark:border-blue-400'
              : 'border-gray-200 hover:border-gray-300 dark:border-slate-700 dark:hover:border-slate-500'
          )}
        >
          <Show when={!!color}>
            <div
              className={cn('absolute top-0 right-0 left-0 h-1 rounded-t-xl', bgColorsMap[color!])}
            />
          </Show>

          <Show when={!!title}>
            <p className='mb-1 truncate text-xs font-medium text-slate-400 dark:text-slate-500'>
              {title}
            </p>
          </Show>

          <Show when={!!content}>
            <p className='line-clamp-4 grow text-sm leading-5 text-slate-800 dark:text-slate-100'>
              {content}
            </p>
          </Show>
        </div>
      </div>

      <EditNoteModal
        isOpen={isEditing}
        onClose={onCloseEditModal}
        noteId={id}
        defaultValues={{
          title: title ?? undefined,
          content: content ?? '',
          color: color ?? undefined,
        }}
      />
    </>
  )
}
export default NoteCard
