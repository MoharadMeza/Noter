'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'

import Button from '@libs/components/button/button.component'
import ColorPicker from '@libs/components/form/color-picker/color-picker.component'
import Input from '@libs/components/form/input/input.component'
import InputNote from '@libs/components/form/input-note/input-note.component'
import useQueryClient from '@libs/hooks/use-query-client'
import { apiKeys } from '@libs/models/api-keys'
import { useMutateNote } from '@libs/models/note/useMutateNote'
import useAuthStore from '@libs/store/auth.store'
import { cn } from '@libs/utils/tailwind'
import { toast } from '@libs/utils/toast'

import { NoteFormData, noteValidationSchema } from '@components/note/new-note/new-note.validation'

import styles from '@components/note/new-note/new-note.module.css'

const NewNote = () => {
  const { userIsLogin } = useAuthStore()
  const queryClient = useQueryClient()
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
    queryClient.invalidateQueries({ queryKey: [apiKeys.NOTE.GET_LIST] })
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
        <div className={cn('grid grid-cols-[1fr_auto] gap-x-5', styles.inputContainer)}>
          <Input type='text' name='title' placeholder='عنوان یادداشت' />

          <ColorPicker name='color' />
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
