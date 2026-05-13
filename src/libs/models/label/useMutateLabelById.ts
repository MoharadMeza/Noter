import apiUrl from '@config/api-url'

import { MutateOptions, useApiMutation } from '@libs/hooks/use-connect-to-api'

import { LabelObject } from '@app-types/label'

export const useMutateLabelById = (id: number, options?: MutateOptions) => {
  return useApiMutation<undefined, LabelObject>(
    { method: 'DELETE', url: apiUrl.label.byId(id) },
    options
  )
}
