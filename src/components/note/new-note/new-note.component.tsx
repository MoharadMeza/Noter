'use client'

import { useTranslations } from 'next-intl'

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

import {
  NoteFormData,
  createNoteValidationSchema,
} from '@components/note/new-note/new-note.validation'

import styles from '@components/note/new-note/new-note.module.css'

const NewNote = () => {
  const t = useTranslations()
  const { userIsLogin } = useAuthStore()
  const queryClient = useQueryClient()
  const { isPending, mutate: createNote } = useMutateNote()
  const formMethods = useForm<NoteFormData>({
    resolver: zodResolver(createNoteValidationSchema(t)),
    defaultValues: {
      title: t('NOTE_DEFAULT_TITLE'),
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
      toast.error(t('NOTE_LOGIN_REQUIRED'))
      return
    }

    createNote(values, { onSuccess: onNoteCreated })
  }

  return (
    <FormProvider {...formMethods}>
      <form
        onSubmit={handleSubmit(handleSave)}
        className='rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800'
      >
        <div className={cn('grid grid-cols-[1fr_auto] items-start gap-x-4', styles.inputContainer)}>
          <Input type='text' name='title' placeholder={t('NOTE_TITLE_PLACEHOLDER')} />

          <ColorPicker name='color' />
        </div>

        <div className={styles.inputContainer}>
          <InputNote name='content' />
        </div>

        <div className='flex justify-end'>
          <Button disabled={isPending} type='submit'>
            {isPending ? (
              <span className='flex items-center gap-2'>
                <svg className='h-4 w-4 animate-spin' fill='none' viewBox='0 0 24 24'>
                  <circle
                    className='opacity-25'
                    cx='12'
                    cy='12'
                    r='10'
                    stroke='currentColor'
                    strokeWidth='4'
                  />
                  <path
                    className='opacity-75'
                    fill='currentColor'
                    d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z'
                  />
                </svg>
                {t('NOTE_SAVING')}
              </span>
            ) : (
              t('NOTE_SAVE_BUTTON')
            )}
          </Button>
        </div>
      </form>
    </FormProvider>
  )
}

export default NewNote
