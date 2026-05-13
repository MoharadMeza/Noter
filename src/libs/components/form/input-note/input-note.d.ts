import { TextareaHTMLAttributes } from 'react'

export interface InputNoteProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string
}
