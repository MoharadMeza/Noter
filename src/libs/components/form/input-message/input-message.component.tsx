import { InputMessageProps } from '@libs/components/form/input-message/input-message'
import styles from '@libs/components/form/input-message/input-message.module.css'

function InputMessage(props: InputMessageProps) {
  const { errorMessage } = props
  if (!errorMessage) {
    return null
  }

  return <span className={styles.errorText}>{errorMessage}</span>
}

export default InputMessage
