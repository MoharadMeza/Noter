'use client'

import { useState } from 'react'
import { createNote } from '@server/modules/note/services'
import styles from './new-note.module.css'
import { noteValidationSchema } from './new-note.validation'
import { toast } from '@libs/utils/toast'
import useAuthStore from '@libs/store/auth.store'
import { useRouter } from 'next/navigation'

const NewNote = () => {
  const { data: userData, userIsLogin } = useAuthStore()
  const router = useRouter()
  const [noteContent, setNoteContent] = useState('')
  const [title, setTitle] = useState('')
  const [errors, setErrors] = useState<{ title?: string; content?: string }>({})
  const [isSaving, setIsSaving] = useState(false)

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

  const handleSave = async () => {
    if (!userIsLogin) {
      toast.error('لطفا ابتدا وارد حساب کاربری خود شوید')
      return
    }

    if (!validateForm()) return

    setIsSaving(true)
    try {
      if (!userData?.id) throw new Error('User ID not found')

      await createNote(title || 'Untitled Note', noteContent, userData.id)
      toast.success('نوت با موفقیت ذخیره شد')
      setNoteContent('')
      setTitle('')
    } catch (error) {
      console.error('Failed to save note:', error)
      toast.error('خطا در ذخیره‌سازی نوت')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.inputContainer}>
        <input
          type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder='عنوان نوت'
          className={`mb-1 w-full border-b p-2 text-xl font-semibold focus:border-blue-500 focus:outline-none ${
            errors.title ? 'border-red-500' : ''
          }`}
        />
        {errors.title && <span className={styles.errorText}>{errors.title}</span>}
      </div>

      <div className={styles.inputContainer}>
        <textarea
          className={`${styles.textarea} ${errors.content ? 'border-red-500' : ''}`}
          value={noteContent}
          onChange={(e) => setNoteContent(e.target.value)}
          placeholder='محتوای نوت خود را اینجا بنویسید...'
          aria-label='محتوای نوت'
        />
        {errors.content && <span className={styles.errorText}>{errors.content}</span>}
      </div>

      <button
        className={`${styles.button} ${isSaving ? styles.buttonLoading : ''}`}
        onClick={handleSave}
        disabled={isSaving}
      >
        {isSaving ? 'در حال ذخیره‌سازی...' : 'ذخیره نوت'}
      </button>
    </div>
  )
}

export default NewNote
