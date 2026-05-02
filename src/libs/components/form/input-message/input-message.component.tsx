import { InputMessageProps } from '@libs/components/form/input-message/input-message'

function InputMessage(props: InputMessageProps) {
  const { errorMessage } = props
  if (!errorMessage) {
    return null
  }

  return (
    <span className='mt-1 flex items-center gap-1 text-xs text-red-500 dark:text-red-400'>
      <svg className='h-3.5 w-3.5 shrink-0' fill='currentColor' viewBox='0 0 20 20'>
        <path
          fillRule='evenodd'
          d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z'
          clipRule='evenodd'
        />
      </svg>
      {errorMessage}
    </span>
  )
}

export default InputMessage
