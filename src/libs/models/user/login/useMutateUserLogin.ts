import apiUrl from '@config/api-url'

import { LoginFormData } from '@libs/components/authentication/login/login'
import { MutateOptions, useApiMutation } from '@libs/hooks/use-connect-to-api'

import { UserObject } from '@app-types/user'

export const useMutateUserLogin = (options?: MutateOptions<LoginFormData, UserObject>) => {
  return useApiMutation<LoginFormData, UserObject>(
    { method: 'POST', url: apiUrl.user.login },
    options
  )
}
