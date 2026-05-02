'use client'

import Link from 'next/link'

import { useTranslations } from 'next-intl'

import MenuDropdown from '@libs/components/menu-dropdown/menu-dropdown.component'
import useQueryClient from '@libs/hooks/use-query-client'
import { apiKeys } from '@libs/models/api-keys'
import { useMutateNoteById } from '@libs/models/note/useMutateNoteById'
import { bgColorsMap } from '@libs/utils/common'
import { cn } from '@libs/utils/tailwind'

import { NoteCardProps } from '@components/note/note-card/note-card'

function NoteCard(props: NoteCardProps) {
  const { color, content, id, title, selected } = props
  const t = useTranslations()
  const queryClient = useQueryClient()

  const { mutate: deleteNote, isPending } = useMutateNoteById(id, 'DELETE')

  const deleteHandler = () => {
    console.log('mmd')

    const onSuccess = () => {
      queryClient.invalidateQueries({ queryKey: [apiKeys.NOTE.GET_LIST] })
    }

    deleteNote(undefined, { onSuccess })
  }

  return (
    <Link href={`/note/${id}`}>
      <div
        className={cn(
          'group relative flex min-h-28 flex-col overflow-hidden rounded-xl border bg-white p-4 text-slate-800 shadow-sm transition-all duration-200',
          'hover:-translate-y-0.5 hover:shadow-md',
          'dark:bg-slate-800 dark:text-slate-100',
          selected
            ? 'border-blue-500 ring-2 ring-blue-500/30 dark:border-blue-400'
            : 'border-gray-200 hover:border-gray-300 dark:border-slate-700 dark:hover:border-slate-500'
        )}
      >
        {color && (
          <div
            className={cn('absolute top-0 right-0 left-0 h-1 rounded-t-xl', bgColorsMap[color])}
          />
        )}

        <div className='flex items-start justify-between gap-2'>
          <h1 className='grow truncate text-sm leading-6 font-semibold'>{title}</h1>

          <div className='shrink-0 opacity-0 transition-opacity duration-150 group-hover:opacity-100'>
            <MenuDropdown
              items={[
                { label: t('NOTE_EDIT'), onClick: () => console.log('Edit clicked') },
                {
                  label: t('NOTE_DELETE'),
                  onClick: deleteHandler,
                  danger: true,
                  disabled: isPending,
                },
              ]}
            />
          </div>
        </div>

        {content && (
          <p className='mt-2 line-clamp-3 text-xs leading-5 text-slate-500 dark:text-slate-400'>
            {content}
          </p>
        )}
      </div>
    </Link>
  )
}
export default NoteCard
