import { Note } from '@db-models'

export interface NoteContent extends Pick<Note, 'id' | 'content' | 'title'> {}
