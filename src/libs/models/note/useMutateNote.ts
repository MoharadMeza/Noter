import { NoteObject } from '@app-types/note'
import apiUrl from '@config/api-url'
import { NoteFormData } from '@libs/components/note/new-note/new-note.validation'
import { MutateOptions, useApiMutation } from '@libs/hooks/use-connect-to-api'

export const useMutateNote = (options?: MutateOptions) => {
  return useApiMutation<NoteFormData, NoteObject>(
    { method: 'POST', url: apiUrl.note.base },
    options
  )
}
