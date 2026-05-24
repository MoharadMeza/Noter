'use client'

import { useRouter, useSearchParams } from 'next/navigation'

import { map } from 'lodash-es'

import Icon from '@libs/components/icon/icon.component'
import Show from '@libs/components/show/show.component'
import { bgColorsMap } from '@libs/utils/common'
import { cn } from '@libs/utils/tailwind'

import { EditNoteModal } from '@components/note/edit-note/edit-note-modal.component'
import { NoteCardProps } from '@components/note/note-card/note-card'

function NoteCard(props: NoteCardProps) {
  const { color, content, id, title, selected, labels } = props
  const router = useRouter()
  const searchParams = useSearchParams()

  const isEditing = searchParams.get('edit') === String(id)

  const onCloseEditModal = () => {
    router.back()
  }

  const renderLabels = () => {
    if (!labels || labels.length === 0) return null

    const badges = map(labels, (label) => (
      <span
        key={label.id}
        className='flex items-center gap-1 rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-900/40 dark:text-blue-300'
      >
        <Icon name='tag' className='h-3 w-3 shrink-0' />
        {label.name}
      </span>
    ))

    return <div className='mt-2 flex flex-wrap gap-1'>{badges}</div>
  }

  return (
    <>
      <div className='cursor-pointer' onClick={() => router.push(`?edit=${id}`)}>
        <div
          className={cn(
            'group relative flex min-h-28 flex-col overflow-hidden rounded-xl border p-4 text-slate-800 shadow-sm transition-all duration-200',
            'hover:-translate-y-0.5 hover:shadow-md',
            'dark:text-slate-100',
            selected
              ? 'border-blue-500 ring-2 ring-blue-500/30 dark:border-blue-400'
              : 'border-gray-200 hover:border-gray-300 dark:border-slate-700 dark:hover:border-slate-500',
            color ? bgColorsMap[color!] : 'bg-gray-50 dark:bg-slate-800'
          )}
        >
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

          {renderLabels()}
        </div>
      </div>

      <Show when={isEditing} mode='unmount'>
        <EditNoteModal
          isOpen={isEditing}
          onClose={onCloseEditModal}
          noteId={id}
          defaultValues={{
            title: title ?? undefined,
            content: content ?? '',
            color: color ?? undefined,
            labelIds: labels?.map((l) => l.id) ?? [],
          }}
        />
      </Show>
    </>
  )
}
export default NoteCard
