import { keepPreviousData } from '@tanstack/react-query'

import apiUrl from '@config/api-url'

import { QueryOptions, useApiQuery } from '@libs/hooks/use-connect-to-api'
import { apiKeys } from '@libs/models/api-keys'

import { NoteObject } from '@app-types/note'

interface FetchNoteListParams {
  labelId?: number | null
}

export const useFetchNoteList = (params?: FetchNoteListParams, options?: QueryOptions) => {
  const searchParams = new URLSearchParams()

  if (params?.labelId) {
    searchParams.set('labelId', String(params.labelId))
  }

  const url = params?.labelId ? `${apiUrl.note.list}?${searchParams.toString()}` : apiUrl.note.list

  return useApiQuery<NoteObject[]>(
    [apiKeys.NOTE.GET_LIST, params?.labelId ?? null],
    { method: 'GET', url },
    { placeholderData: keepPreviousData, ...options }
  )
}
