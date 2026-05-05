import { InputMessageProps } from '@libs/components/form/input-message/input-message'
import Icon from '@libs/components/icon/icon.component'

function InputMessage(props: InputMessageProps) {
  const { errorMessage } = props

  if (!errorMessage) {
    return null
  }

  return (
    <span className='mt-1 flex items-center gap-1 text-xs text-red-500 dark:text-red-400'>
      <Icon name='exclamation-circle' className='h-3.5 w-3.5 shrink-0' />
      {errorMessage}
    </span>
  )
}

export default InputMessage
