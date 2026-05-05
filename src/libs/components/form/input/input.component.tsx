import { useAppFormContext } from '@libs/hooks/use-form-context'

import { InputProps } from '@libs/components/form/input/input'
import InputMessage from '@libs/components/form/input-message/input-message.component'
import Show from '@libs/components/show/show.component'
import { cn } from '@libs/utils/tailwind'

const Input = (props: InputProps) => {
  const { label, name, className = '', ...rest } = props
  const {
    formState: { errors },
    register,
  } = useAppFormContext()

  const errorMessage = errors?.[name]?.message as string

  return (
    <div className='w-full space-y-1'>
      <Show when={!!label}>
        <label
          htmlFor={props.id}
          className='block text-sm font-medium text-slate-700 dark:text-slate-300'
        >
          {label}
        </label>
      </Show>

      <input
        className={cn(
          'flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm transition-shadow duration-150 placeholder:text-gray-500 focus:ring-1 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-50 dark:placeholder:text-slate-400',
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
