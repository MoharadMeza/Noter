import {
  useQuery,
  useMutation,
  QueryKey,
  UseQueryOptions,
  UseMutationOptions,
  MutationFunction,
  useInfiniteQuery,
  InfiniteData,
  QueryFunction,
  GetNextPageParamFunction,
  UndefinedInitialDataInfiniteOptions,
} from '@tanstack/react-query'
import { useLocale, useTranslations } from 'next-intl'

import axiosClient from '@/config/fetch'
import { ErrorResponseApi, SuccessResponseApi } from '@app-types/api'

import { errorHandling, successHandling } from '@libs/utils/api-message-handling'

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

// Type for API request
export interface ApiRequest<TData = any> {
  url: string
  method: HttpMethod
  data?: TData
  params?: Record<string, any>
  headers?: Record<string, string>
}

type CustomOptionsObject = Partial<{
  toastSuccess: boolean | string
  toastError: boolean
}>

export interface MutateOptions<TVariables = any, TData = any>
  extends
    Partial<UseMutationOptions<SuccessResponseApi<TData>, ErrorResponseApi, TVariables>>,
    CustomOptionsObject {}

export interface QueryOptions<TData = any>
  extends
    Partial<UseQueryOptions<SuccessResponseApi<TData>, ErrorResponseApi>>,
    CustomOptionsObject {}

export interface InfiniteQueryOptions<TData = any>
  extends
    Partial<
      UndefinedInitialDataInfiniteOptions<
        SuccessResponseApi<TData>,
        ErrorResponseApi,
        InfiniteData<SuccessResponseApi<TData>, unknown>,
        QueryKey,
        any
      >
    >,
    CustomOptionsObject {}

// Generic useApiQuery hook for fetching data
export function useApiQuery<TData>(
  queryKey: QueryKey,
  request: ApiRequest,
  options?: QueryOptions<TData>
) {
  const applyRequestSetting = useSettingRequest()

  const fetchData = async (): Promise<SuccessResponseApi<TData>> => {
    const customOptionsObject = getDefaultOptions(options)
    applyRequestSetting()

    try {
      const response: SuccessResponseApi<TData> = await axiosClient.request({
        url: request.url,
        method: request.method,
        data: request.data,
        params: request.params,
        headers: request.headers,
      })

      if (customOptionsObject.toastSuccess) {
        successHandling(customOptionsObject.toastSuccess)
      }

      return response
    } catch (error: any) {
      if (customOptionsObject.toastError) {
        errorHandling(error.result)
      }

      throw error
    }
  }

  return useQuery<SuccessResponseApi<TData>, ErrorResponseApi>({
    queryKey,
    queryFn: fetchData,
    enabled: false,
    ...options,
  })
}

// Generic useApiMutation hook for mutating data
export function useApiMutation<TVariables, TData>(
  request: ApiRequest,
  options?: MutateOptions<TVariables, TData>
) {
  const applyRequestSetting = useSettingRequest()

  const mutateData: MutationFunction<SuccessResponseApi<TData>, TVariables> = async (variables) => {
    const customOptionsObject = getDefaultOptions(options)
    applyRequestSetting()

    try {
      const response: SuccessResponseApi<TData> = await axiosClient.request({
        url: request.url,
        method: request.method,
        data: variables,
        params: request.params,
        headers: request.headers,
      })

      if (customOptionsObject.toastSuccess) {
        successHandling(customOptionsObject.toastSuccess)
      }

      return response
    } catch (error: any) {
      if (customOptionsObject.toastError) {
        errorHandling(error.result)
      }

      throw error
    }
  }

  return useMutation<SuccessResponseApi<TData>, ErrorResponseApi, TVariables>({
    mutationFn: mutateData,
    ...options,
  })
}

// Generic useApiInfiniteQuery hook for fetching data
export function useApiInfiniteQuery<TData>(
  queryKey: QueryKey,
  request: ApiRequest,
  options?: InfiniteQueryOptions<TData>
) {
  const applyRequestSetting = useSettingRequest()

  const fetchData: QueryFunction<SuccessResponseApi<TData>, QueryKey, any> = async (params) => {
    const customOptionsObject = getDefaultOptions(options)
    applyRequestSetting()

    try {
      const response: SuccessResponseApi<TData> = await axiosClient.request({
        url: request.url,
        method: request.method,
        data: request.data,
        params: { ...request.params, page: params.pageParam },
        headers: request.headers,
      })

      if (customOptionsObject.toastSuccess) {
        successHandling(customOptionsObject.toastSuccess)
      }

      return response
    } catch (error: any) {
      if (customOptionsObject.toastError) {
        errorHandling(error.result)
      }

      throw error
    }
  }

  const getNextPageParam: GetNextPageParamFunction<unknown, SuccessResponseApi<TData>> = (page) => {
    const currentPage = page.result.currentPage ?? 0
    const totalPage = page.result.totalPages ?? 0

    if (currentPage >= totalPage) {
      return undefined
    }

    return currentPage + 1
  }

  return useInfiniteQuery<
    SuccessResponseApi<TData>,
    ErrorResponseApi,
    InfiniteData<SuccessResponseApi<TData>>,
    QueryKey,
    any
  >({
    queryKey,
    initialData: undefined,
    initialPageParam: 1,
    queryFn: fetchData,
    getNextPageParam,
    ...options,
  })
}

function useSettingRequest() {
  const locale = useLocale()

  return () => {
    axiosClient.defaults.headers.common['accept-language'] = locale ?? 'fa'
  }
}

function getDefaultOptions(options?: CustomOptionsObject) {
  const optionsDefaultValues: any = {}

  /// Error toast handling
  if (options?.toastError === undefined || options?.toastError === true) {
    optionsDefaultValues.toastError = true
  }

  /// Success toast handling
  if (typeof options?.toastSuccess === 'string') {
    optionsDefaultValues.toastSuccess = options.toastSuccess
  } else if (options?.toastSuccess === true) {
    optionsDefaultValues.toastSuccess = 'create' // default success toast
  }

  return optionsDefaultValues
}
