'use client'

import { useEffect, useState } from 'react'

import Image from 'next/image'

import { useTranslations } from 'next-intl'

import styles from '@libs/components/splash/splash-screen.module.css'
import { useSetTimeout } from '@libs/hooks/use-set-timeout'
import useAuthStore from '@libs/store/auth.store'
import { cn } from '@libs/utils/tailwind'

export function SplashScreen() {
  const t = useTranslations()

  const { loadingData } = useAuthStore()
  const [visible, setVisible] = useState(true)
  const [showSplash, setShowSplash] = useState(true)

  const { execute: executeVisibility } = useSetTimeout(1000)
  const { execute: executeOpacity } = useSetTimeout(300)

  useEffect(() => {
    if (!loadingData) {
      executeVisibility(() => setVisible(false))

      executeOpacity(() => setShowSplash(false))
    }
  }, [loadingData])

  if (!visible) {
    return null
  }

  return (
    <div
      className={cn(
        'dark:bg-accent-foreground fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-4 bg-blue-500 transition-opacity duration-300',
        showSplash ? 'opacity-100' : 'opacity-0'
      )}
    >
      <Image src='/icons/app-icon.svg' alt='yadame' width={60} height={60} />

      <span className='text-xl font-bold tracking-tight text-white'>{t('APP_NAME')}</span>

      {/* Loading dots */}
      <div className='mt-2 flex gap-1.5'>
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className={cn(styles.animateSplashDot, 'h-1.5 w-1.5 rounded-full bg-white opacity-60')}
            style={{
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </div>
    </div>
  )
}
