'use client'

import { FormEvent, useState } from 'react'

const NewNote = () => {
  const [noteContent, setNoteContent] = useState('')

  const onChangeNoter = (e: FormEvent<HTMLDivElement>) => {
    setNoteContent(e.currentTarget.textContent || '')
  }

  console.log(noteContent)

  return (
    <div
      className='w-ldv h-screen border-2 border-blue-900'
      contentEditable
      onInput={onChangeNoter}
    >
      {noteContent}
    </div>
  )
}

export default NewNote
