import { Note as PrismaNote } from '@db-models'

export type NoteColor = 'red' | 'blue' | 'green' | 'amber' | 'yellow' | 'black'
export type NoteObject = Omit<PrismaNote, 'color'> & { color: NoteColor | null }
