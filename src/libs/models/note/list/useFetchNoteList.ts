import { NoteObject } from '@app-types/note'
import apiUrl from '@config/api-url'
import { QueryOptions, useApiQuery } from '@libs/hooks/use-connect-to-api'
import { apiKeys } from '@libs/models/api-keys'

export const useFetchNoteList = (options?: QueryOptions) => {
  return useApiQuery<NoteObject[]>(
    [apiKeys.NOTE.GET_LIST],
    { method: 'GET', url: apiUrl.note.list },
    options
  )
}
