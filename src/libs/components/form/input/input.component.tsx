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
    <div className='w-full'>
      {label && (
        <label htmlFor={props.id} className='text-foreground mb-1 block text-sm font-medium'>
          {label}
        </label>
      )}

      <input
        className={cn('input w-full', errorMessage && 'border-red-500', className)}
        {...rest}
        {...register(name)}
      />

      <InputMessage errorMessage={errorMessage} />
    </div>
  )
}

export default Input
