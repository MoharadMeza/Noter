import * as z from 'zod'

export type NoteFormData = {
  title: string
  content: string
  color: string
}

export const createNoteValidationSchema = (t: (key: string) => string) =>
  z.object({
    title: z.string().min(1, t('NOTE_TITLE_REQUIRED')).max(100, t('NOTE_TITLE_MAX')),
    content: z.string().min(1, t('NOTE_CONTENT_REQUIRED')).max(10000, t('NOTE_CONTENT_MAX')),
    color: z.string().nonoptional(),
  })
