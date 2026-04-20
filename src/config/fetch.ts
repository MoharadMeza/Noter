import axios, { AxiosError, AxiosInstance } from 'axios'

import env from '@libs/utils/env'

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

    /* ------------- return customize data ------------- */
    return {
      result: response.data,
      http: {
        status: response.status,
      },
    } as any
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

    const originalRequest: any = { ...error.config }

    // if (status === 401 && [2, 7].includes(data?.additionalStatus) && !originalRequest?.retryThis) {
    //   originalRequest.retryThis = true
    //   const access_token = await refreshAccessToken()

    //   if (access_token) {
    //     originalRequest.headers['authorization'] = 'Bearer ' + access_token

    //     return axiosClient(originalRequest)
    //   }
    // }

    return Promise.reject({
      http: {
        status,
      },
      result: data,
    })
  }
)

export default axiosClient
