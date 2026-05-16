'use client'

import { useEffect } from 'react'

import { useTranslations } from 'next-intl'

import Button from '@libs/components/button/button.component'
import ColorPicker from '@libs/components/form/color-picker/color-picker.component'
import FormWrapper from '@libs/components/form/form-wrapper/form-wrapper.component'
import Input from '@libs/components/form/input/input.component'
import InputNote from '@libs/components/form/input-note/input-note.component'
import LabelPicker from '@libs/components/form/label-picker/label-picker.component'
import { Modal } from '@libs/components/modal/modal.component'
import Show from '@libs/components/show/show.component'
import { useAppForm } from '@libs/hooks/use-form'
import useIsDesktop from '@libs/hooks/use-is-desktop'
import useQueryClient from '@libs/hooks/use-query-client'
import { apiKeys } from '@libs/models/api-keys'
import { useFetchLabelList } from '@libs/models/label/useFetchLabelList'
import { useMutateNoteById } from '@libs/models/note/useMutateNoteById'
import { bgColorsMap } from '@libs/utils/common'
import { cn } from '@libs/utils/tailwind'

import { EditNoteModalProps } from '@components/note/edit-note/edit-note'
import {
  NoteFormData,
  createNoteValidationSchema,
} from '@components/note/new-note/new-note.validation'

import { NoteColor } from '@app-types/note'

import styles from '@components/note/new-note/new-note.module.css'

export function EditNoteModal(props: EditNoteModalProps) {
  const { isOpen, onClose, noteId, defaultValues } = props
  const t = useTranslations()

  const queryClient = useQueryClient()
  const { mutate: updateNote, isPending } = useMutateNoteById(noteId, 'PATCH')

  const { data: labelsData } = useFetchLabelList({ enabled: isOpen })
  const labels = labelsData?.result.data ?? []

  const formMethods = useAppForm<NoteFormData>({
    schema: createNoteValidationSchema(t),
    defaultValues,
  })

  const isDesktop = useIsDesktop()

  const selectedColor = formMethods.watch('color') as NoteColor | undefined
  const noteBg = selectedColor ? bgColorsMap[selectedColor] : ''

  useEffect(() => {
    if (!isOpen) return

    const handlePopState = () => {
      if (formMethods.formState.isDirty) {
        handleSave(formMethods.getValues())
      } else {
        closeHandler()
      }
    }

    window.addEventListener('popstate', handlePopState)

    return () => window.removeEventListener('popstate', handlePopState)
  }, [isOpen])

  const handleSave = (values: NoteFormData) => {
    updateNote(values, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [apiKeys.NOTE.GET_LIST] })
        closeHandler()
      },
    })
  }

  const closeHandler = () => {
    formMethods.reset()
    onClose()
  }

  const renderMobileForm = () => (
    <Show when={isOpen} mode='unmount'>
      <FormWrapper
        methods={formMethods}
        onSubmit={handleSave}
        saveByCtrlKey
        className={cn(
          styles.slideUp,
          'fixed inset-0 z-60 flex flex-col bg-white dark:bg-slate-950',
          noteBg
        )}
      >
        <div className='flex-1 overflow-y-auto px-4 pt-3 pb-1'>
          <Input
            type='text'
            name='title'
            placeholder={t('NOTE_TITLE_PLACEHOLDER')}
            className='border-none bg-transparent px-0 text-base font-medium shadow-none focus:ring-0 dark:bg-transparent'
          />

          <InputNote
            name='content'
            autoFocus
            className='border-none bg-transparent px-0 focus:ring-0 dark:bg-transparent'
          />

          <Show when={labels.length > 0} mode='unmount'>
            <LabelPicker name='labelIds' labels={labels} />
          </Show>
        </div>

        <div className='flex items-center justify-between border-t border-slate-100 px-3 py-1.5 dark:border-slate-800'>
          <ColorPicker name='color' compact />

          <Button type='submit' size='md' isLoading={isPending} loadingText={t('NOTE_SAVING')}>
            {t('NOTE_SAVE_BUTTON')}
          </Button>
        </div>
      </FormWrapper>
    </Show>
  )

  const renderDesktopModal = () => (
    <Modal isOpen={isOpen} onClose={closeHandler} panelClassName={noteBg}>
      <FormWrapper methods={formMethods} onSubmit={handleSave}>
        <Input
          type='text'
          className='border-none bg-transparent px-0 text-base font-medium shadow-none focus:ring-0 dark:bg-transparent'
          name='title'
          placeholder={t('NOTE_TITLE_PLACEHOLDER')}
        />

        <InputNote
          className='border-none bg-transparent focus:ring-0 md:px-0 dark:bg-transparent'
          name='content'
          rows={5}
        />

        <Show when={labels.length > 0} mode='unmount'>
          <LabelPicker name='labelIds' labels={labels} />
        </Show>

        <div className='flex items-center justify-between gap-4 pt-2'>
          <ColorPicker name='color' />

          <div className='flex items-center gap-2'>
            <Button type='button' variant='ghost' onClick={closeHandler}>
              {t('NOTE_CANCEL')}
            </Button>
            <Button type='submit' isLoading={isPending} loadingText={t('NOTE_SAVING')}>
              {t('NOTE_SAVE_BUTTON')}
            </Button>
          </div>
        </div>
      </FormWrapper>
    </Modal>
  )

  return isDesktop ? renderDesktopModal() : renderMobileForm()
}
