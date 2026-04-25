import { cn } from '@libs/utils/tailwind'
import InputMessage from '@libs/components/form/input-message/input-message.component'
import { InputProps } from '@libs/components/form/input/input'
import { useFormContext } from 'react-hook-form'

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
        <label htmlFor={props.id} className='text-foreground block text-sm font-medium'>
          {label}
        </label>
      )}

      <input
        className={cn('input mt-1 w-full', errorMessage && 'border-red-500', className)}
        {...rest}
        {...register(name)}
      />

      <InputMessage errorMessage={errorMessage} />
    </div>
  )
}

export default Input
