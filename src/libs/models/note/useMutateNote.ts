import apiUrl from '@config/api-url'

import { MutateOptions, useApiMutation } from '@libs/hooks/use-connect-to-api'

import { NoteFormData } from '@components/note/new-note/new-note.validation'

import { NoteObject } from '@app-types/note'

export const useMutateNote = (options?: MutateOptions) => {
  return useApiMutation<NoteFormData, NoteObject>(
    { method: 'POST', url: apiUrl.note.base },
    options
  )
}
