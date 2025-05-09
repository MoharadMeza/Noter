import { toast } from 'react-toastify'

export const messageTranslationsKeys = {
  SHOW_ERROR_RESPONSE_BY_STATUS: 'SHOW_ERROR_RESPONSE_BY_STATUS',
  CONNECTING_TO_SERVER_ERROR: 'CONNECTING_TO_SERVER_ERROR',
  SUCCESS_REQUEST_TO_API: 'SUCCESS_REQUEST_TO_API',
}

export const errorHandling = (t: any, error: any) => {
  if (error?.error) {
    toast.error(error?.error)
  } else if (error?.errors) {
    toast.error(error?.errors[0]?.error)
  } else {
    if (error?.status)
      toast.error(
        t(messageTranslationsKeys.SHOW_ERROR_RESPONSE_BY_STATUS, {
          code: error?.status,
        })
      )
    else {
      toast.error(t(messageTranslationsKeys.CONNECTING_TO_SERVER_ERROR))
    }
  }
}

export const successHandling = (t: any, customMessage?: string) => {
  if (customMessage) {
    toast.success(customMessage)
  } else {
    toast.success(t(messageTranslationsKeys.SUCCESS_REQUEST_TO_API))
  }
}
