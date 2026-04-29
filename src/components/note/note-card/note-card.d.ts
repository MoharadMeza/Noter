import { NoteObject } from '@app-types/note'

export interface NoteCardProps extends Pick<NoteObject, 'color' | 'content' | 'id' | 'title'> {
  selected?: boolean
}
