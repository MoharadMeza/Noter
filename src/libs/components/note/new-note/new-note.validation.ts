import * as z from 'zod'

export const noteValidationSchema = z.object({
  title: z
    .string()
    .min(1, 'عنوان نمی‌تواند خالی باشد')
    .max(100, 'عنوان نمی‌تواند بیشتر از 100 کاراکتر باشد'),
  content: z
    .string()
    .min(1, 'محتوای یادداشت نمی‌تواند خالی باشد')
    .max(10000, 'محتوای یادداشت نمی‌تواند بیشتر از 10000 کاراکتر باشد'),
})

export type NoteFormData = z.infer<typeof noteValidationSchema>
