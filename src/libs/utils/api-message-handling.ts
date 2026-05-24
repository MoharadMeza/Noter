import { toast } from '@libs/utils/toast'

export const messageTranslationsKeys = {
  SHOW_ERROR_RESPONSE_BY_STATUS: 'SHOW_ERROR_RESPONSE_BY_STATUS',
  CONNECTING_TO_SERVER_ERROR: 'CONNECTING_TO_SERVER_ERROR',
  SUCCESS_REQUEST_TO_API: 'SUCCESS_REQUEST_TO_API',
}

export const errorHandling = (error: any) => {
  if (error?.message) {
    toast.error(error?.message)
  } else if (error?.errors) {
    toast.error(error.errors[0].error)
  } else {
    if (error?.statusCode) {
      toast.error(messageTranslationsKeys.SHOW_ERROR_RESPONSE_BY_STATUS)
    } else {
      toast.error(messageTranslationsKeys.CONNECTING_TO_SERVER_ERROR)
    }
  }
}

export const successHandling = (customMessage?: string) => {
  if (customMessage) {
    toast.success(customMessage)
  } else {
    toast.success(messageTranslationsKeys.SUCCESS_REQUEST_TO_API)
  }
}
