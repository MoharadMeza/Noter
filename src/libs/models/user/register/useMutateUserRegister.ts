import { User } from '@db-models'

import apiUrl from '@config/api-url'

import { RegisterFormData } from '@libs/components/authentication/register/register'
import { MutateOptions, useApiMutation } from '@libs/hooks/use-connect-to-api'

export const useMutateUserRegister = (options?: MutateOptions) => {
  return useApiMutation<RegisterFormData, User>(
    { method: 'POST', url: apiUrl.user.register },
    options
  )
}
