// components/ColorPicker/ColorPicker.tsx
'use client'

import { useEffect, useState } from 'react'

import { useController, useFormContext } from 'react-hook-form'

import lodashMap from 'lodash/map'

import { ColorPickerProps } from '@libs/components/form/color-picker/color-picker'

import { bgColorsMap } from '@libs/utils/common'
import { cn } from '@libs/utils/tailwind'

import styles from '@libs/components/form/color-picker/color-picker.module.css'

export default function ColorPicker({ name, label }: ColorPickerProps) {
  const { control } = useFormContext()
  const [bounce, setBounce] = useState(false)
  const {
    field,
    fieldState: { error },
  } = useController({
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
      {label ? <label className={styles.label}>{label}</label> : null}

      <div className={cn(styles.colorGrid, bounce && styles.bounce)}>
        {lodashMap(bgColorsMap, (colorValue, colorName) => (
          <label key={colorName} className={styles.colorOption}>
            <input
              type='radio'
              value={colorValue}
              checked={field.value === colorValue}
              onChange={(e) => field.onChange(e.target.value)}
              className={styles.radioInput}
            />

            <span className={cn(styles.colorCircle, colorValue)} />
          </label>
        ))}
      </div>
    </div>
  )
}
