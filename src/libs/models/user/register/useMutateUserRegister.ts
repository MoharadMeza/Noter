import { User } from '@db-models'

import apiUrl from '@config/api-url'

import { LoginFormData } from '@libs/components/authentication/login/login'
import { RegisterFormData } from '@libs/components/authentication/register/register'
import { MutateOptions, useApiMutation } from '@libs/hooks/use-connect-to-api'

import { UserObject } from '@app-types/user'

export const useMutateUserRegister = (options?: MutateOptions<LoginFormData, UserObject>) => {
  return useApiMutation<RegisterFormData, User>(
    { method: 'POST', url: apiUrl.user.register },
    options
  )
}
