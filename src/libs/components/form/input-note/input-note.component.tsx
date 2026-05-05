import { useAppFormContext } from '@libs/hooks/use-form-context'

import InputMessage from '@libs/components/form/input-message/input-message.component'
import { InputNoteProps } from '@libs/components/form/input-note/input-note'
import styles from '@libs/components/form/input-note/input-note.module.css'
import { cn } from '@libs/utils/tailwind'

function InputNote(props: InputNoteProps) {
  const { name } = props
  const {
    formState: { errors },
    register,
  } = useAppFormContext()

  return (
    <div className={styles.inputContainer}>
      <textarea
        className={cn(
          styles.textarea,
          errors.content && 'border-red-500',
          'rounded-md border border-gray-300 bg-white placeholder:text-gray-500 focus:ring-1 focus:ring-blue-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-50 dark:placeholder:text-slate-400'
        )}
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
