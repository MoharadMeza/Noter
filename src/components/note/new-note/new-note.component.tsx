'use client'

import { useEffect, useRef, useState } from 'react'

import { useTranslations } from 'next-intl'

import Button from '@libs/components/button/button.component'
import ColorPicker from '@libs/components/form/color-picker/color-picker.component'
import FormWrapper from '@libs/components/form/form-wrapper/form-wrapper.component'
import Input from '@libs/components/form/input/input.component'
import InputNote from '@libs/components/form/input-note/input-note.component'
import Icon from '@libs/components/icon/icon.component'
import Portal from '@libs/components/portal/portal.component'
import Show from '@libs/components/show/show.component'
import useClickOutside from '@libs/hooks/use-click-outside'
import { useAppForm } from '@libs/hooks/use-form'
import useQueryClient from '@libs/hooks/use-query-client'
import { apiKeys } from '@libs/models/api-keys'
import { useMutateNote } from '@libs/models/note/useMutateNote'
import useAuthStore from '@libs/store/auth.store'
import { bgColorsMap } from '@libs/utils/common'
import { cn } from '@libs/utils/tailwind'
import { toast } from '@libs/utils/toast'

import {
  NoteFormData,
  createNoteValidationSchema,
} from '@components/note/new-note/new-note.validation'

import { NoteColor } from '@app-types/note'

import styles from '@components/note/new-note/new-note.module.css'

const NewNote = () => {
  const t = useTranslations()
  const { userIsLogin } = useAuthStore()
  const queryClient = useQueryClient()
  const { isPending, mutate: createNote } = useMutateNote()
  const [isExpanded, setIsExpanded] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const colorPickerRef = useRef<HTMLDivElement | null>(null)

  const formMethods = useAppForm<NoteFormData>({
    schema: createNoteValidationSchema(t),
    defaultValues: { title: '', content: undefined, labelIds: [] },
  })

  const { reset, watch } = formMethods

  const selectedColor = watch('color') as NoteColor | undefined
  const noteBg = selectedColor ? bgColorsMap[selectedColor] : 'bg-white dark:bg-slate-800'

  const collapse = () => {
    setIsExpanded(false)
    reset()
  }

  useClickOutside(containerRef, collapse, [colorPickerRef])

  useEffect(() => {
    if (!isExpanded) return

    history.pushState({ newNote: true }, '')

    const handlePopState = () => {
      const values = formMethods.getValues()
      const hasContent = values.title?.trim() || values.content?.trim()

      if (hasContent && userIsLogin) {
        createNote(values, { onSuccess: onNoteCreated })
      } else {
        collapse()
      }
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [isExpanded])

  const onNoteCreated = () => {
    collapse()
    queryClient.invalidateQueries({ queryKey: [apiKeys.NOTE.GET_LIST] })
  }

  const handleSave = async (values: NoteFormData) => {
    const hasContent = values.title?.trim() || values.content?.trim()

    if (!hasContent) {
      collapse()
      return
    }

    if (!userIsLogin) {
      toast.error(t('NOTE_LOGIN_REQUIRED'))
      return
    }

    createNote(values, { onSuccess: onNoteCreated })
  }

  return (
    <>
      <div ref={containerRef}>
        <Show when={!isExpanded} mode='unmount'>
          <button
            type='button'
            onClick={() => setIsExpanded(true)}
            className={cn(
              styles.noteCardEnter,
              'hidden w-full cursor-text items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 text-start shadow-sm transition-shadow hover:shadow-md lg:flex dark:border-slate-700 dark:bg-slate-800'
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
              styles.slideUp,
              'fixed inset-0 z-60 flex flex-col',
              'lg:static lg:inset-auto lg:z-auto lg:block lg:rounded-xl lg:border lg:border-slate-200 lg:shadow-sm lg:dark:border-slate-700',
              noteBg
            )}
          >
            <div className='flex-1 overflow-y-auto px-2 py-2 lg:flex-none lg:px-4 lg:pt-4'>
              <Input
                type='text'
                name='title'
                placeholder={t('NOTE_TITLE_PLACEHOLDER')}
                className='border-none bg-transparent text-base font-medium shadow-none focus:ring-0 dark:bg-transparent'
              />

              <InputNote
                name='content'
                autoFocus
                className='border-none bg-transparent focus:ring-0 dark:bg-transparent'
              />
            </div>

            <div className='flex items-center justify-between border-t border-slate-100 p-3 dark:border-slate-800'>
              <ColorPicker name='color' compact portalContainerRef={colorPickerRef} />

              <div className='flex items-center gap-2'>
                <Button
                  type='button'
                  variant='ghost'
                  size='md'
                  onClick={collapse}
                  className='hidden lg:inline-flex'
                >
                  {t('NOTE_CANCEL')}
                </Button>

                <Button type='submit' size='md' isLoading={isPending}>
                  {t('NOTE_SAVE_BUTTON')}
                </Button>
              </div>
            </div>
          </FormWrapper>
        </Show>
      </div>

      <Portal>
        <Show when={!isExpanded} mode='unmount'>
          <button
            type='button'
            onClick={() => setIsExpanded(true)}
            className='fixed inset-e-4 bottom-20 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 shadow-lg transition-all hover:bg-blue-700 active:scale-95 lg:hidden'
          >
            <Icon name='pencil' className='h-6 w-6 text-white' />
          </button>
        </Show>
      </Portal>
    </>
  )
}

export default NewNote
