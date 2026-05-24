import apiUrl from '@config/api-url'

import { MutateOptions, useApiMutation } from '@libs/hooks/use-connect-to-api'

import { LabelObject } from '@app-types/label'

export const useMutateLabel = (options?: MutateOptions) => {
  return useApiMutation<{ name: string }, LabelObject>(
    { method: 'POST', url: apiUrl.label.base },
    options
  )
}
