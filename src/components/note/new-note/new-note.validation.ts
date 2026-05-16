import * as z from 'zod'

import '@libs/validations/zod-extensions'

import { SimpleTranslator } from '@app-types/intl'
import { ZodInferSchema } from '@app-types/zod'

export type NoteFormData = ZodInferSchema<typeof createNoteValidationSchema>

export const createNoteValidationSchema = (t: SimpleTranslator) =>
  z.object({
    title: z.string().max(100, t('NOTE_TITLE_MAX')).emptyToNull().optional(),
    content: z.string().max(1000, t('NOTE_CONTENT_MAX')).optional(),
    color: z.string().nullable().optional(),
    labelIds: z.array(z.number()).optional(),
  })
