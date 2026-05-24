import type { FieldValues } from 'react-hook-form'
import { useFormContext } from 'react-hook-form'

export function useAppFormContext<T extends FieldValues = FieldValues>() {
  return useFormContext<T>()
}
