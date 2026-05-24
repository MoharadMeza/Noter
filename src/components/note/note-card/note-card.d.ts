import { LabelObject } from '@app-types/label'
import { NoteObject } from '@app-types/note'

export interface NoteCardProps extends Pick<NoteObject, 'color' | 'content' | 'id' | 'title'> {
  selected?: boolean
  labels?: LabelObject[]
}
