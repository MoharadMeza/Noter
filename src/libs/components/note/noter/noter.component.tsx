'use client'

import { useState, FormEvent } from 'react'

import { NoteContent } from '@libs/components/note/noter/noter'
import useAuthSlice from '@libs/store/auth.slice'
import { createNote, getNotesByUserId } from '@server/modules/note/services'

const Noter = () => {
  const [noteContent, setNoteContent] = useState('')
  const [notes, setNotes] = useState<NoteContent[]>([])

  const onChangeNote = (e: FormEvent<HTMLDivElement>) => {
    setNoteContent(e.currentTarget.textContent || '')
  }

  const handleSaveNote = async () => {
    // await createNote('New Note', noteContent)
    // const userNotes = await getNotesByUserId()
    // setNotes(userNotes)
  }

  return (
    <div>
      <div
        className='w-ldv h-screen border-2 border-blue-900'
        contentEditable
        onInput={onChangeNote}
      >
        {noteContent}
      </div>
      <button onClick={handleSaveNote}>Save Note</button>
      <div>
        <h2>Your Notes</h2>
        <ul>
          {notes.map((note) => (
            <li key={note.id}>
              {note.title}: {note.content}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Noter
