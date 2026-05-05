'use client'

import { useTranslations } from 'next-intl'

import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'

import Button from '@libs/components/button/button.component'
import ColorPicker from '@libs/components/form/color-picker/color-picker.component'
import Input from '@libs/components/form/input/input.component'
import InputNote from '@libs/components/form/input-note/input-note.component'
import { Modal } from '@libs/components/modal/modal.component'
import useQueryClient from '@libs/hooks/use-query-client'
import { apiKeys } from '@libs/models/api-keys'
import { useMutateNoteById } from '@libs/models/note/useMutateNoteById'

import { EditNoteModalProps } from '@components/note/edit-note/edit-note'
import {
  NoteFormData,
  createNoteValidationSchema,
} from '@components/note/new-note/new-note.validation'

export function EditNoteModal(props: EditNoteModalProps) {
  const { isOpen, onClose, noteId, defaultValues } = props
  const t = useTranslations()

  const queryClient = useQueryClient()
  const { mutate: updateNote, isPending } = useMutateNoteById(noteId, 'PATCH')

  const formMethods = useForm<NoteFormData>({
    resolver: zodResolver(createNoteValidationSchema(t)),
    defaultValues,
  })

  const { handleSubmit } = formMethods

  const handleSave = (values: NoteFormData) => {
    updateNote(values, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [apiKeys.NOTE.GET_LIST] })
        onClose()
      },
    })
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t('NOTE_EDIT')} locked>
      <FormProvider {...formMethods}>
        <form onSubmit={handleSubmit(handleSave)} className='space-y-4'>
          <Input type='text' name='title' placeholder={t('NOTE_TITLE_PLACEHOLDER')} />

          <InputNote name='content' />

          <div className='flex items-center justify-between gap-4 pt-1'>
            <ColorPicker name='color' />

            <Button
              type='submit'
              disabled={isPending}
              isLoading={isPending}
              loadingText={t('NOTE_SAVING')}
            >
              {t('NOTE_SAVE_BUTTON')}
            </Button>
          </div>
        </form>
      </FormProvider>
    </Modal>
  )
}
