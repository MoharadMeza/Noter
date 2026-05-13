import apiUrl from '@config/api-url'

import { QueryOptions, useApiQuery } from '@libs/hooks/use-connect-to-api'
import { apiKeys } from '@libs/models/api-keys'

import { LabelObject } from '@app-types/label'

export const useFetchLabelList = (options?: QueryOptions) => {
  return useApiQuery<LabelObject[]>(
    [apiKeys.LABEL.GET_LIST],
    { method: 'GET', url: apiUrl.label.base },
    options
  )
}
