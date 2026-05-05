'use client'

import { useRef, useState } from 'react'

import { useTranslations } from 'next-intl'

import Button from '@libs/components/button/button.component'
import ColorPicker from '@libs/components/form/color-picker/color-picker.component'
import FormWrapper from '@libs/components/form/form-wrapper/form-wrapper.component'
import Input from '@libs/components/form/input/input.component'
import InputNote from '@libs/components/form/input-note/input-note.component'
import Icon from '@libs/components/icon/icon.component'
import Show from '@libs/components/show/show.component'
import useClickOutside from '@libs/hooks/use-click-outside'
import { useAppForm } from '@libs/hooks/use-form'
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
  const [isExpanded, setIsExpanded] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const formMethods = useAppForm<NoteFormData>({
    schema: createNoteValidationSchema(t),
    defaultValues: { title: '', content: undefined },
  })

  const { reset } = formMethods

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
          className={cn(
            styles.noteCardEnter,
            'flex w-full cursor-text items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 text-start shadow-sm transition-shadow hover:shadow-md dark:border-slate-700 dark:bg-slate-800'
          )}
        >
          <Icon name='pencil' className='h-5 w-5 shrink-0 text-slate-400' />

          <span className='text-sm text-slate-400 dark:text-slate-500'>
            {t('NOTE_NEW_PLACEHOLDER')}
          </span>
        </button>
      </Show>

      <Show when={isExpanded} mode='unmount'>
        <FormWrapper
          methods={formMethods}
          onSubmit={handleSave}
          saveByCtrlKey
          className={cn(
            styles.noteCardEnter,
            'rounded-xl border border-blue-300 bg-white p-4 shadow-md dark:border-blue-700 dark:bg-slate-800'
          )}
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
              <Button type='button' variant='ghost' size='sm' onClick={collapse}>
                {t('NOTE_CANCEL')}
              </Button>

              <Button type='submit' size='sm' isLoading={isPending} loadingText={t('NOTE_SAVING')}>
                {t('NOTE_SAVE_BUTTON')}
              </Button>
            </div>
          </div>
        </FormWrapper>
      </Show>
    </div>
  )
}

export default NewNote
