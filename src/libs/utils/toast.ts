import { useToastStore } from '@libs/stores/toast-store'

type ToastFunction = (message: string) => void

const toast = {
  success: ((message: string) => {
    useToastStore.getState().addToast(message, 'success')
  }) as ToastFunction,

  error: ((message: string) => {
    useToastStore.getState().addToast(message, 'error')
  }) as ToastFunction,

  info: ((message: string) => {
    useToastStore.getState().addToast(message, 'info')
  }) as ToastFunction,

  warning: ((message: string) => {
    useToastStore.getState().addToast(message, 'warning')
  }) as ToastFunction,
}

export { toast }
