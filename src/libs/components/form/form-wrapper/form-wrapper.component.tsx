import type { FieldValues } from 'react-hook-form'
import { FormProvider } from 'react-hook-form'

import type { FormWrapperProps } from '@libs/components/form/form-wrapper/form-wrapper'

const FormWrapper = <T extends FieldValues>(props: FormWrapperProps<T>) => {
  const { methods, onSubmit, children, ...formProps } = props

  return (
    <FormProvider {...methods}>
      <form {...formProps} onSubmit={methods.handleSubmit(onSubmit)}>
        {children}
      </form>
    </FormProvider>
  )
}

export default FormWrapper
