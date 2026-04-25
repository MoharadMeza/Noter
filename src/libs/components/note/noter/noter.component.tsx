'use client'

import { useState, useEffect } from 'react'
import styles from './noter.module.css'
import { NoteContent } from '@libs/components/note/noter/noter'
import useAuthStore from '@libs/store/auth.store'
import { createNote, getNoteById, getNotesByUserId } from '@server/modules/note/services'
import { noteValidationSchema } from '../new-note/new-note.validation'
import { toast } from '@libs/utils/toast'
import { useRouter } from 'next/navigation'
import useProfileStore from '@libs/store/profile.store'
import NewNote from '@libs/components/note/new-note/new-note.component'

const Noter = () => {
  const { userIsLogin } = useAuthStore()
  const { profileData } = useProfileStore()
  const router = useRouter()
  const [noteContent, setNoteContent] = useState('')
  const [title, setTitle] = useState('')
  const [notes, setNotes] = useState<NoteContent[]>([])
  const [errors, setErrors] = useState<{ title?: string; content?: string }>({})
  const [isSaving, setIsSaving] = useState(false)
  const [selectedNoteId, setSelectedNoteId] = useState<number | null>(null)

  useEffect(() => {
    loadNotes()
  }, [userIsLogin])

  const loadNotes = async () => {
    try {
      if (!profileData?.id) {
        return
      }

      const userNotes = await getNotesByUserId(profileData.id)
      setNotes(userNotes)
    } catch (error) {
      console.error('Failed to load notes:', error)
      toast.error('خطا در بارگذاری یادداشت‌ها')
    }
  }

  const validateForm = () => {
    try {
      noteValidationSchema.parse({ title, content: noteContent })
      setErrors({})
      return true
    } catch (error) {
      if (error instanceof Error) {
        const formattedError = JSON.parse(error.message)
        const newErrors: { title?: string; content?: string } = {}
        formattedError.forEach((err: any) => {
          if (err.path[0] === 'title') newErrors.title = err.message
          if (err.path[0] === 'content') newErrors.content = err.message
        })
        setErrors(newErrors)
      }
      return false
    }
  }

  const handleSaveNote = async () => {
    if (!userIsLogin) {
      toast.error('لطفا ابتدا وارد حساب کاربری خود شوید')
      router.push('/login')
      return
    }

    if (!validateForm()) return

    setIsSaving(true)
    try {
      if (!profileData?.id) {
        throw new Error('User ID not found')
      }

      await createNote(title || 'Untitled Note', noteContent, profileData.id)
      toast.success('یادداشت با موفقیت ذخیره شد')
      await loadNotes() // Reload notes after saving
      setNoteContent('')
      setTitle('')
      setSelectedNoteId(null)
    } catch (error) {
      console.error('Failed to save note:', error)
      toast.error('خطا در ذخیره‌سازی یادداشت')
    } finally {
      setIsSaving(false)
    }
  }

  const handleNoteSelect = async (noteId: number) => {
    try {
      setSelectedNoteId(noteId)
      const note = await getNoteById(noteId)
      if (note) {
        setTitle(note.title ?? '')
        setNoteContent(note.content ?? '')
      }
    } catch (error) {
      console.error('Failed to load note:', error)
      toast.error('خطا در بارگذاری یادداشت')
    }
  }

  const getButtonText = () => {
    if (isSaving) return 'در حال ذخیره‌سازی...'
    return selectedNoteId ? 'به‌روزرسانی یادداشت' : 'ایجاد یادداشت جدید'
  }

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <h2 className='mb-4 text-xl font-semibold'>یادداشت‌های شما</h2>
        <ul className={styles.noteList}>
          {notes.map((note) => (
            <button
              type='button'
              key={note.id}
              className={`${styles.noteItem} ${selectedNoteId === note.id ? styles.selectedNote : ''} w-full text-left`}
              onClick={() => handleNoteSelect(note.id)}
            >
              <h3 className='font-medium'>{note.title}</h3>
              <p className='truncate text-sm text-gray-500'>{note.content}</p>
            </button>
          ))}
        </ul>
      </aside>

      <main className={styles.editor}>
        <NewNote />
      </main>
    </div>
  )
}

export default Noter
