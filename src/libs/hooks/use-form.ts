import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import type { DefaultValues, FieldValues, Resolver } from 'react-hook-form'
import type { ZodType } from 'zod'

interface UseAppFormOptions<T extends FieldValues> {
  schema: ZodType<T>
  defaultValues?: DefaultValues<T>
}

export function useAppForm<T extends FieldValues>(options: UseAppFormOptions<T>) {
  const { schema, defaultValues } = options

  return useForm<T>({
    resolver: zodResolver(schema as ZodType<T, FieldValues>) as Resolver<T>,
    defaultValues,
  })
}
