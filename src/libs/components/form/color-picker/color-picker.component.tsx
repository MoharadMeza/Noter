// components/ColorPicker/ColorPicker.tsx
'use client'

import { useEffect, useState } from 'react'

import { map } from 'lodash-es'

import { ColorPickerProps } from '@libs/components/form/color-picker/color-picker'
import styles from '@libs/components/form/color-picker/color-picker.module.css'
import Show from '@libs/components/show/show.component'
import { useAppFormContext } from '@libs/hooks/use-form-context'
import { useAppFormController } from '@libs/hooks/use-form-controller'
import { bgColorsMap } from '@libs/utils/common'
import { cn } from '@libs/utils/tailwind'

export default function ColorPicker({ name, label }: ColorPickerProps) {
  const { control } = useAppFormContext()
  const [bounce, setBounce] = useState(false)
  const {
    field,
    fieldState: { error },
  } = useAppFormController({
    name,
    control,
  })

  useEffect(() => {
    if (error) {
      setBounce(true)
      const timer = setTimeout(() => setBounce(false), 500)

      return () => clearTimeout(timer)
    }
  }, [error])

  return (
    <div className={styles.container}>
      <Show when={!!label}>
        <label className={styles.label}>{label}</label>
      </Show>

      <div
        className={cn(
          'grid h-full min-h-8 auto-cols-max grid-flow-col gap-2',
          bounce && styles.bounce
        )}
      >
        {map(bgColorsMap, (colorValue, colorName) => (
          <label key={colorName} className={styles.colorOption}>
            <input
              type='radio'
              value={colorName}
              checked={field.value === colorName}
              onChange={(e) => field.onChange(e.target.value)}
              className={styles.radioInput}
            />

            <span className={cn('rounded-full', styles.colorCircle, colorValue)} />
          </label>
        ))}
      </div>
    </div>
  )
}
