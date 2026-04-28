import lodashMap from 'lodash/map'

import NoteCard from '@libs/components/note/note-card/note-card.component'

import { useFetchNoteList } from '@libs/models/note/list/useFetchNoteList'

function RecentNotes() {
  const { data: notes, isLoading } = useFetchNoteList({ enabled: true })

  const renderedNotes = () => {
    if (notes?.result.total && !isLoading) {
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

    return null
  }

  return (
    <div className='grid gap-4'>
      <h2 className='mb-4 text-xl font-semibold'>یادداشت‌های اخیر</h2>

      {renderedNotes()}
    </div>
  )
}

export default RecentNotes
