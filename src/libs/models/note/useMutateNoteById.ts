import apiUrl from '@config/api-url'

import { HttpMethod, MutateOptions, useApiMutation } from '@libs/hooks/use-connect-to-api'

import { NoteFormData } from '@components/note/new-note/new-note.validation'

import { NoteObject } from '@app-types/note'

export const useMutateNoteById = (id: number, method: HttpMethod, options?: MutateOptions) => {
  return useApiMutation<NoteFormData | undefined, NoteObject>(
    { method, url: apiUrl.note.byId(id) },
    options
  )
}
