import Link from 'next/link'

import { NoteCardProps } from '@libs/components/note/note-card/note-card'

import { bgColorsMap } from '@libs/utils/common'
import { cn } from '@libs/utils/tailwind'

function NoteCard(props: NoteCardProps) {
  const { color, content, id, title } = props

  return (
    <Link href={`/note/${id}`}>
      <div className='relative overflow-hidden rounded-md border border-gray-200 bg-white p-2 text-gray-800 hover:border-gray-300 hover:shadow-md'>
        {color ? (
          <div className={cn('absolute top-0 right-0 left-0 h-1', bgColorsMap[color])} />
        ) : null}

        <div className='flex items-center'>
          <h1 className='text-md grow leading-8'>{title}</h1>
        </div>

        <div className='text-sm'>{content}</div>
      </div>
    </Link>
  )
}
export default NoteCard
