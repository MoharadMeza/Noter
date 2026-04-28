'use client'

import RecentNotes from '@libs/components/note/recent-notes/recent-notes.component'

function Sidebar() {
  return (
    <aside className='h-screen overflow-y-scroll p-4'>
      <RecentNotes />
    </aside>
  )
}

export default Sidebar
