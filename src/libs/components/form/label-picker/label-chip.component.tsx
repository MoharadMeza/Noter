import { LabelChipProps } from '@libs/components/form/label-picker/label-chip'
import Icon from '@libs/components/icon/icon.component'

const LabelChip = (props: LabelChipProps) => {
  const { label, onRemove } = props

  return (
    <span className='group flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 py-1 ps-2.5 pe-1.5 text-xs font-medium text-blue-700 transition-colors hover:border-blue-300 hover:bg-blue-100 dark:border-blue-700 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:border-blue-600 dark:hover:bg-blue-900/50'>
      <Icon name='tag' className='h-3 w-3 shrink-0 opacity-50' />

      <span className='max-w-32 truncate'>{label}</span>

      <button
        type='button'
        onClick={onRemove}
        className='flex h-4 w-4 shrink-0 items-center justify-center rounded-full opacity-40 transition-all hover:bg-blue-200 hover:opacity-100 dark:hover:bg-blue-800'
        aria-label={`Remove ${label}`}
      >
        <Icon name='close' className='h-3 w-3' />
      </button>
    </span>
  )
}

export default LabelChip
