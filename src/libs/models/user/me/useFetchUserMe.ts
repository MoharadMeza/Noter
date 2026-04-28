import { UserProfileData } from '@app-types/user'
import apiUrl from '@config/api-url'
import { QueryOptions, useApiQuery } from '@libs/hooks/use-connect-to-api'
import { apiKeys } from '@libs/models/api-keys'

export const useFetchUserMe = (options?: QueryOptions) => {
  return useApiQuery<UserProfileData>(
    [apiKeys.USER.ME],
    { method: 'GET', url: apiUrl.user.me },
    options
  )
}
