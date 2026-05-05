import type { FormHTMLAttributes, ReactNode } from 'react'

import type { FieldValues, UseFormReturn } from 'react-hook-form'

export interface FormWrapperProps<T extends FieldValues = FieldValues> extends Omit<
  FormHTMLAttributes<HTMLFormElement>,
  'onSubmit'
> {
  methods: UseFormReturn<T>
  onSubmit: (data: T) => void | Promise<void>
  children: ReactNode
}
