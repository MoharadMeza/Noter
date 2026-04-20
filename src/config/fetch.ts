import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios'

import env from '@libs/utils/env'
import { SuccessResponseApi } from '@app-types/api'

const axiosClient: AxiosInstance = axios.create({
  adapter: 'fetch',
  timeout: 120000,
  withCredentials: true,
  headers: {
    common: {
      'accept-language': env.DEFAULT_LANGUAGE,
      'Content-Type': 'application/json',
    },
  },
})

/* ----------------------------CONFIGS---------------------------- */
if (!axiosClient.defaults.baseURL) {
  axiosClient.defaults.baseURL = env.API_URL
}
/* --------------------------INTERCEPTOR-------------------------- */

// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config) {
    // Do something before request is sent

    return config
  },
  function (error: AxiosError) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data

    const formattedResponse = formatSuccessResponse(response)

    /* ------------- return customize data ------------- */
    return formattedResponse as any
  },
  async function (error: AxiosError) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error

    /* ------------- return customize data ------------- */
    let data: any = {}
    let status = null

    if (error.response) {
      data = error.response.data
      status = error.response.status
    }

    return Promise.reject({
      http: {
        status,
      },
      result: data,
    })
  }
)

export default axiosClient

const formatSuccessResponse = (response: AxiosResponse): SuccessResponseApi<any> => {
  const responseData = response.data

  let data: SuccessResponseApi<any>['result']['data'] = undefined
  let currentPage: SuccessResponseApi<any>['result']['currentPage'] = undefined
  let totalPages: SuccessResponseApi<any>['result']['totalPages'] = undefined
  let total: SuccessResponseApi<any>['result']['total'] = undefined

  const isPaginatedData =
    typeof responseData.limit === 'number' &&
    typeof responseData.page === 'number' &&
    typeof responseData.total === 'number' &&
    Array.isArray(responseData.data)

  if (isPaginatedData) {
    data = responseData.data
    currentPage = responseData.page
    total = responseData.total
    totalPages = Math.ceil(responseData.total / responseData.limit)
  } else {
    data = responseData
  }

  const formattedResponse: SuccessResponseApi<any> = {
    http: {
      status: response.status,
    },
    result: {
      data,
      currentPage,
      total,
      totalPages,
      success: true,
    },
  }

  return formattedResponse
}
