'use client'

import { useRef, useState } from 'react'

import { useTranslations } from 'next-intl'

import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'

import Button from '@libs/components/button/button.component'
import ColorPicker from '@libs/components/form/color-picker/color-picker.component'
import Input from '@libs/components/form/input/input.component'
import InputNote from '@libs/components/form/input-note/input-note.component'
import Icon from '@libs/components/icon/icon.component'
import Show from '@libs/components/show/show.component'
import useClickOutside from '@libs/hooks/use-click-outside'
import useQueryClient from '@libs/hooks/use-query-client'
import { apiKeys } from '@libs/models/api-keys'
import { useMutateNote } from '@libs/models/note/useMutateNote'
import useAuthStore from '@libs/store/auth.store'
import { toast } from '@libs/utils/toast'

import {
  NoteFormData,
  createNoteValidationSchema,
} from '@components/note/new-note/new-note.validation'

const NewNote = () => {
  const t = useTranslations()
  const { userIsLogin } = useAuthStore()
  const queryClient = useQueryClient()
  const { isPending, mutate: createNote } = useMutateNote()
  const [isExpanded, setIsExpanded] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const formMethods = useForm<NoteFormData>({
    resolver: zodResolver(createNoteValidationSchema(t)),
    defaultValues: { title: '', content: undefined },
  })

  const { handleSubmit, reset } = formMethods

  const collapse = () => {
    setIsExpanded(false)
    reset()
  }

  useClickOutside(containerRef, collapse)

  const onNoteCreated = () => {
    collapse()
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
    <div ref={containerRef}>
      <Show when={!isExpanded} mode='unmount'>
        <button
          type='button'
          onClick={() => setIsExpanded(true)}
          className='note-card-enter flex w-full cursor-text items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 text-start shadow-sm transition-shadow hover:shadow-md dark:border-slate-700 dark:bg-slate-800'
        >
          <Icon name='pencil' className='h-5 w-5 shrink-0 text-slate-400' />

          <span className='text-sm text-slate-400 dark:text-slate-500'>
            {t('NOTE_NEW_PLACEHOLDER')}
          </span>
        </button>
      </Show>

      <Show when={isExpanded} mode='unmount'>
        <FormProvider {...formMethods}>
          <form
            onSubmit={handleSubmit(handleSave)}
            className='note-card-enter rounded-xl border border-blue-300 bg-white p-4 shadow-md dark:border-blue-700 dark:bg-slate-800'
          >
            <div className='mb-3'>
              <Input type='text' name='title' placeholder={t('NOTE_TITLE_PLACEHOLDER')} />
            </div>

            <div className='mb-4'>
              <InputNote name='content' autoFocus />
            </div>

            <div className='flex items-center justify-between'>
              <ColorPicker name='color' />

              <div className='flex items-center gap-2'>
                <button
                  type='button'
                  onClick={collapse}
                  className='rounded-lg px-3 py-1.5 text-sm text-slate-500 hover:bg-gray-100 dark:text-slate-400 dark:hover:bg-slate-700'
                >
                  {t('NOTE_CANCEL')}
                </button>
                <Button disabled={isPending} type='submit' size='sm'>
                  {isPending ? t('NOTE_SAVING') : t('NOTE_SAVE_BUTTON')}
                </Button>
              </div>
            </div>
          </form>
        </FormProvider>
      </Show>
    </div>
  )
}

export default NewNote
