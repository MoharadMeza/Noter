'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import styles from './new-note.module.css'
import { NoteFormData, noteValidationSchema } from './new-note.validation'
import { toast } from '@libs/utils/toast'
import useAuthStore from '@libs/store/auth.store'
import { useMutateNote } from '@libs/models/note/useMutateNote'
import Input from '@libs/components/form/input/input.component'
import InputNote from '@libs/components/form/input-note/input-note.component'
import Button from '@libs/components/button/button.component'

const NewNote = () => {
  const { userIsLogin } = useAuthStore()
  const router = useRouter()
  const { isPending, mutate: createNote } = useMutateNote()
  const formMethods = useForm<NoteFormData>({
    resolver: zodResolver(noteValidationSchema),
    defaultValues: {
      title: 'بدون عنوان',
      content: undefined,
    },
  })

  const { handleSubmit, reset } = formMethods

  const onNoteCreated = () => {
    reset()
  }

  const handleSave = async (values: NoteFormData) => {
    if (!userIsLogin) {
      toast.error('لطفا ابتدا وارد حساب کاربری خود شوید')
      return
    }

    createNote(values, { onSuccess: onNoteCreated })
  }

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(handleSave)}>
        <div className={styles.inputContainer}>
          <Input type='text' name='title' placeholder='عنوان یادداشت' />
        </div>

        <div className={styles.inputContainer}>
          <InputNote name='content' />
        </div>

        <Button disabled={isPending} type='submit'>
          {isPending ? 'در حال ذخیره‌سازی...' : 'ذخیره یادداشت'}
        </Button>
      </form>
    </FormProvider>
  )
}

export default NewNote
