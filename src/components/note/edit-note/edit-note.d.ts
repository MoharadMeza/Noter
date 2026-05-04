import { NoteFormData } from '@components/note/new-note/new-note.validation'

export interface EditNoteModalProps {
  isOpen: boolean
  onClose: VoidFunction
  noteId: number
  defaultValues: NoteFormData
}
