import { cn } from '@libs/utils/tailwind'

import { InputProps } from './input'

const Input = (props: InputProps) => {
  const { label, error, className = '', ...rest } = props

  return (
    <div className='w-full'>
      {label && (
        <label htmlFor={props.id} className='text-foreground block text-sm font-medium'>
          {label}
        </label>
      )}

      <input className={cn('input mt-1 w-full', error && 'border-red-500', className)} {...rest} />
      {error && <p className='mt-1 text-sm text-red-500'>{error}</p>}
    </div>
  )
}

export default Input
