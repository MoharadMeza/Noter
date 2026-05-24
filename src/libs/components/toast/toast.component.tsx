'use client'

import { useToastStore } from '@/libs/stores/toast-store'
import { cn } from '@libs/utils/tailwind'

const toastStyles = {
  success: 'bg-green-500',
  error: 'bg-red-500',
  info: 'bg-blue-500',
  warning: 'bg-yellow-500',
}

export const Toast = () => {
  const { toasts, removeToast } = useToastStore()

  return (
    <div className='fixed right-4 bottom-4 z-50 flex flex-col gap-2'>
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={cn(
            'min-w-[300px] rounded-lg p-4 text-white shadow-lg transition-all duration-300 ease-in-out',
            toastStyles[toast.type]
          )}
        >
          <div className='flex items-center justify-between'>
            <p className='text-sm font-medium'>{toast.message}</p>
            <button
              onClick={() => removeToast(toast.id)}
              className='ml-4 rounded-full p-1 hover:bg-white/20'
            >
              <svg
                className='h-4 w-4'
                fill='none'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path d='M6 18L18 6M6 6l12 12'></path>
              </svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
