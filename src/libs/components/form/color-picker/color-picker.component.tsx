'use client'

import { useEffect } from 'react'

import { entries, map } from 'lodash-es'

import { ColorPickerProps } from '@libs/components/form/color-picker/color-picker'
import styles from '@libs/components/form/color-picker/color-picker.module.css'
import Icon from '@libs/components/icon/icon.component'
import MenuDropdown from '@libs/components/menu-dropdown/menu-dropdown.component'
import Show from '@libs/components/show/show.component'
import { useAppFormContext } from '@libs/hooks/use-form-context'
import { useAppFormController } from '@libs/hooks/use-form-controller'
import useIsDesktop from '@libs/hooks/use-is-desktop'
import { useSetTimeout } from '@libs/hooks/use-set-timeout'
import { colorPickerMap } from '@libs/utils/common'
import { cn } from '@libs/utils/tailwind'

const selectedRing = 'scale-110'
const unselectedOpacity = 'opacity-40 hover:opacity-90'

export default function ColorPicker(props: ColorPickerProps) {
  const { name, label } = props
  const { control } = useAppFormContext()
  const isDesktop = useIsDesktop()
  const { execute: executeBounce } = useSetTimeout(500)
  const {
    field,
    fieldState: { error },
  } = useAppFormController({ name, control })

  useEffect(() => {
    if (error) {
      executeBounce(() => {})
    }
  }, [error])

  const allColorEntries = entries(colorPickerMap)

  const handleColorSelect = (colorName: string) => {
    field.onChange(field.value === colorName ? null : colorName)
  }

  const renderDropdownTrigger = () => (
    <div
      className={cn(
        'flex h-8 w-8 items-center justify-center rounded-full transition-all',
        field.value
          ? cn(colorPickerMap[field.value as keyof typeof colorPickerMap], selectedRing)
          : 'bg-slate-200 hover:bg-slate-300 dark:bg-slate-600 dark:hover:bg-slate-500'
      )}
    >
      <Show when={!field.value} mode='unmount'>
        <Icon name='paint-brush' className='h-4 w-4 text-slate-500 dark:text-slate-300' />
      </Show>
    </div>
  )

  const renderDropdownColors = (close: () => void) => {
    const colorButtons = map(allColorEntries, ([colorName, colorValue]) => {
      return (
        <button
          key={colorName}
          type='button'
          onClick={() => {
            handleColorSelect(colorName)
            close()
          }}
          className={cn(
            'h-6 w-6 rounded-full transition-all hover:scale-110',
            colorValue,
            field.value === colorName ? selectedRing : unselectedOpacity
          )}
          aria-label={colorName}
        />
      )
    })

    const clearButton = (
      <button
        key='clear'
        type='button'
        onClick={() => {
          field.onChange(null)
          close()
        }}
        className={cn(
          'relative flex h-6 w-6 items-center justify-center rounded-full border border-slate-300 bg-white transition-all hover:scale-110 dark:border-slate-600 dark:bg-slate-800',
          !field.value && selectedRing
        )}
        aria-label='بدون رنگ'
      >
        <Icon name='no-symbol' className='h-4 w-4 text-slate-400 dark:text-slate-500' />
      </button>
    )

    return (
      <div className='flex flex-wrap gap-1.5 p-1'>
        {clearButton}
        {colorButtons}
      </div>
    )
  }

  return (
    <div className={cn('flex items-center gap-1.5', error && styles.bounce)}>
      <Show when={!!label}>
        <label className={styles.label}>{label}</label>
      </Show>

      <MenuDropdown
        items={[]}
        align='end'
        direction={isDesktop ? 'down' : 'up'}
        trigger={renderDropdownTrigger()}
        triggerClassName='p-0 rounded-full hover:bg-transparent dark:hover:bg-transparent'
        headerSlot={renderDropdownColors}
      />
    </div>
  )
}
