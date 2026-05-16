import { InputHTMLAttributes } from 'react'

export interface InputNoteProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  name: string
}
