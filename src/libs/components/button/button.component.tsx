import { ButtonProps } from '@libs/components/button/button'
import { createVariant, createSize } from '@libs/utils/tailwind'

const Button = (props: ButtonProps) => {
  const {
    children,
    isLoading,
    loadingText,
    className = '',
    variant = 'primary',
    size = 'md',
    ...rest
  } = props

  const baseStyles =
    'btn inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'

  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-500',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 focus-visible:ring-gray-500',
    outline: 'border border-gray-200 bg-white hover:bg-gray-100 focus-visible:ring-gray-500',
  } as const

  const sizes = {
    sm: 'h-8 px-3 text-sm',
    md: 'h-10 px-4',
    lg: 'h-12 px-6 text-lg',
  } as const

  const getVariantClasses = createVariant(baseStyles, variants)
  const getSizeClasses = createSize('', sizes)

  return (
    <button
      className={getVariantClasses(variant, getSizeClasses(size, className))}
      disabled={isLoading}
      {...rest}
    >
      {isLoading ? (
        <>
          <svg className='mx-2 h-4 w-4 animate-spin' viewBox='0 0 24 24'>
            <circle
              className='opacity-25'
              cx='12'
              cy='12'
              r='10'
              stroke='currentColor'
              strokeWidth='4'
              fill='none'
            />
            <path
              className='opacity-75'
              fill='currentColor'
              d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
            />
          </svg>

          {loadingText}
        </>
      ) : (
        children
      )}
    </button>
  )
}

export default Button
