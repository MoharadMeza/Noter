import { Note as PrismaNote } from '@db-models'

import { LabelObject } from '@app-types/label'

export type NoteColor =
  | 'red'
  | 'blue'
  | 'green'
  | 'amber'
  | 'purple'
  | 'orange'
  | 'teal'
  | 'fuchsia'
export type NoteObject = Omit<PrismaNote, 'color'> & {
  color: NoteColor | null
  labels?: LabelObject[]
}
