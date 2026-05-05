import * as z from 'zod'

import { SimpleTranslator } from '@app-types/intl'
import { ZodInferSchema } from '@app-types/zod'

export type NoteFormData = ZodInferSchema<typeof createNoteValidationSchema>

export const createNoteValidationSchema = (t: SimpleTranslator) =>
  z.object({
    title: z.string().max(100, t('NOTE_TITLE_MAX')).optional(),
    content: z.string().min(1, t('NOTE_CONTENT_REQUIRED')).max(10000, t('NOTE_CONTENT_MAX')),
    color: z.string().optional(),
  })
