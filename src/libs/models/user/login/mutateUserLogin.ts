import { User } from '@db-models'

import apiUrl from '@config/api-url'

import { LoginFormData } from '@libs/components/authentication/login/login'
import { MutateOptions, useApiMutation } from '@libs/hooks/use-connect-to-api'

export const useMutateUserLogin = (options?: MutateOptions) => {
  return useApiMutation<LoginFormData, User>({ method: 'POST', url: apiUrl.user.login }, options)
}
