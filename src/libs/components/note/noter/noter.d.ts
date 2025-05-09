import { Note } from '@prisma/client'

export interface NoteContent extends Pick<Note, 'id' | 'content' | 'title'> {}
