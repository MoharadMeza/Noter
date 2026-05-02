import { useFormContext } from 'react-hook-form'

import { InputProps } from '@libs/components/form/input/input'
import InputMessage from '@libs/components/form/input-message/input-message.component'
import { cn } from '@libs/utils/tailwind'

const Input = (props: InputProps) => {
  const { label, name, className = '', ...rest } = props
  const {
    formState: { errors },
    register,
  } = useFormContext()

  const errorMessage = errors?.[name]?.message as string

  return (
    <div className='w-full space-y-1'>
      {label && (
        <label
          htmlFor={props.id}
          className='block text-sm font-medium text-slate-700 dark:text-slate-300'
        >
          {label}
        </label>
      )}

      <input
        className={cn(
          'input w-full transition-shadow duration-150',
          errorMessage
            ? 'border-red-400 focus:ring-red-400 dark:border-red-500'
            : 'focus:ring-blue-500',
          className
        )}
        {...rest}
        {...register(name)}
      />

      <InputMessage errorMessage={errorMessage} />
    </div>
  )
}

export default Input
