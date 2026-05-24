import NewNote from '@components/note/new-note/new-note.component'
import RecentNotes from '@components/note/recent-notes/recent-notes.component'

export default async function Page() {
  return (
    <div className='flex flex-col gap-4 lg:h-full lg:overflow-hidden'>
      <div className='mx-auto w-full max-w-2xl lg:shrink-0'>
        <NewNote />
      </div>

      <div className='lg:flex-1 lg:overflow-y-auto'>
        <RecentNotes />
      </div>
    </div>
  )
}
