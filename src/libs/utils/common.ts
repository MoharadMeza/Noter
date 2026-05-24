import { NoteColor } from '@app-types/note'

export const colorsMap: Record<NoteColor, string> = {
  red: 'red-500',
  blue: 'blue-500',
  green: 'green-500',
  amber: 'amber-500',
  purple: 'purple-500',
  orange: 'orange-500',
  teal: 'teal-500',
  fuchsia: 'fuchsia-500',
}

export const bgColorsMap: Record<NoteColor, string> = {
  red: 'bg-red-100 dark:bg-red-950',
  blue: 'bg-blue-100 dark:bg-blue-950',
  green: 'bg-green-100 dark:bg-green-950',
  amber: 'bg-amber-100 dark:bg-amber-950',
  purple: 'bg-purple-100 dark:bg-purple-950',
  orange: 'bg-orange-100 dark:bg-orange-950',
  teal: 'bg-teal-100 dark:bg-teal-950',
  fuchsia: 'bg-fuchsia-100 dark:bg-fuchsia-950',
}

export const colorPickerMap: Record<NoteColor, string> = {
  red: 'bg-red-400',
  blue: 'bg-blue-400',
  green: 'bg-green-400',
  amber: 'bg-amber-400',
  purple: 'bg-purple-400',
  orange: 'bg-orange-400',
  teal: 'bg-teal-400',
  fuchsia: 'bg-fuchsia-400',
}
