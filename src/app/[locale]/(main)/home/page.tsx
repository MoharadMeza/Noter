import NewNote from '@components/note/new-note/new-note.component'
import RecentNotes from '@components/note/recent-notes/recent-notes.component'

export default async function Page() {
  return (
    <div className='flex flex-col gap-6'>
      <div className='mx-auto w-full max-w-2xl'>
        <NewNote />
      </div>

      <RecentNotes />
    </div>
  )
}
