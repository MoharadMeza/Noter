import { useFormContext } from 'react-hook-form'

import InputMessage from '@libs/components/form/input-message/input-message.component'

import { InputNoteProps } from '@libs/components/form/input-note/input-note'

import { cn } from '@libs/utils/tailwind'

import styles from '@libs/components/form/input-note/input-note.module.css'

function InputNote(props: InputNoteProps) {
  const { name } = props
  const {
    formState: { errors },
    register,
  } = useFormContext()

  return (
    <div className={styles.inputContainer}>
      <textarea
        className={cn(styles.textarea, errors.content && 'border-red-500', 'input')}
        placeholder='محتوای یادداشت خود را اینجا بنویسید...'
        aria-label='محتوای یادداشت'
        {...props}
        {...register(name)}
      />

      <InputMessage errorMessage={errors?.[name]?.message as string} />
    </div>
  )
}
export default InputNote
