import type { KeyboardEvent } from 'react'

import type { FieldValues } from 'react-hook-form'
import { FormProvider } from 'react-hook-form'

import type { FormWrapperProps } from '@libs/components/form/form-wrapper/form-wrapper'

const FormWrapper = <T extends FieldValues>(props: FormWrapperProps<T>) => {
  const { methods, onSubmit, children, saveByCtrlKey = false, ...formProps } = props

  const handleKeyDown = (e: KeyboardEvent<HTMLFormElement>) => {
    if (saveByCtrlKey && e.key === 'Enter' && e.ctrlKey) {
      e.preventDefault()
      methods.handleSubmit(onSubmit)()
    }
  }

  return (
    <FormProvider {...methods}>
      <form {...formProps} onKeyDown={handleKeyDown} onSubmit={methods.handleSubmit(onSubmit)}>
        {children}
      </form>
    </FormProvider>
  )
}

export default FormWrapper
