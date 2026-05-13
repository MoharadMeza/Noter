'use client'

import { useTranslations } from 'next-intl'

import { map } from 'lodash-es'

import LabelChip from '@libs/components/form/label-picker/label-chip.component'
import { LabelPickerProps } from '@libs/components/form/label-picker/label-picker'
import Icon from '@libs/components/icon/icon.component'
import MenuDropdown from '@libs/components/menu-dropdown/menu-dropdown.component'
import Show from '@libs/components/show/show.component'
import { useAppFormContext } from '@libs/hooks/use-form-context'
import { useAppFormController } from '@libs/hooks/use-form-controller'

export default function LabelPicker(props: LabelPickerProps) {
  const { name, labels } = props
  const { control } = useAppFormContext()
  const t = useTranslations()

  const { field } = useAppFormController({ name, control })

  const selectedIds: number[] = field.value ?? []
  const selectedLabels = labels.filter((l) => selectedIds.includes(l.id))
  const hasSelected = selectedLabels.length > 0

  const handleToggleLabel = (labelId: number) => {
    const isSelected = selectedIds.includes(labelId)
    const next = isSelected ? selectedIds.filter((id) => id !== labelId) : [...selectedIds, labelId]
    field.onChange(next)
  }

  const handleRemoveChip = (e: React.MouseEvent, labelId: number) => {
    e.stopPropagation()
    field.onChange(selectedIds.filter((id) => id !== labelId))
  }

  const renderChips = () => {
    const chips = map(selectedLabels, (label) => (
      <LabelChip
        key={label.id}
        label={label.name}
        onRemove={(e) => handleRemoveChip(e, label.id)}
      />
    ))

    return chips
  }

  const buildMenuItems = () => {
    if (labels.length === 0) {
      return [{ label: t('LABEL_EMPTY'), disabled: true, onClick: () => {} }]
    }

    return map(labels, (label) => {
      const isSelected = selectedIds.includes(label.id)

      return {
        label: label.name,
        icon: isSelected ? (
          <Icon name='check' className='h-4 w-4 text-blue-500 dark:text-blue-400' />
        ) : (
          <span className='block h-4 w-4' />
        ),
        onClick: () => handleToggleLabel(label.id),
      }
    })
  }

  const renderTrigger = () => (
    <span className='flex h-full items-center gap-1 rounded-full border border-dashed border-slate-300 py-1 pr-2.5 pl-2 text-xs text-slate-400 transition-all group-hover:border-slate-400 group-hover:text-slate-500 dark:border-slate-600 dark:text-slate-500 dark:group-hover:border-slate-500'>
      <Icon name='plus' className='h-3 w-3' />

      <Show when={!hasSelected} mode='unmount'>
        <span>{t('NOTE_LABELS_PLACEHOLDER')}</span>
      </Show>
    </span>
  )

  return (
    <div className='flex flex-wrap items-stretch gap-2'>
      <MenuDropdown
        trigger={renderTrigger()}
        triggerClassName='group h-full p-0 rounded-full bg-transparent hover:bg-transparent dark:bg-transparent dark:hover:bg-transparent'
        align='end'
        items={buildMenuItems()}
      />

      {renderChips()}
    </div>
  )
}
