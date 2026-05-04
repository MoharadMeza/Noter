'use client'

import { useEffect, useState } from 'react'

import styles from '@libs/components/splash/splash-screen.module.css'
import { useSetTimeout } from '@libs/hooks/use-set-timeout'
import useAuthStore from '@libs/store/auth.store'
import { cn } from '@libs/utils/tailwind'

export function SplashScreen() {
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
        'fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-4 bg-blue-500 transition-opacity duration-300',
        showSplash ? 'opacity-100' : 'opacity-0'
      )}
    >
      <svg
        width='56'
        height='56'
        viewBox='0 0 32 32'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <rect width='32' height='32' rx='7' fill='white' fillOpacity='0.15' />
        <path
          d='M10 6h9.5L24 10.5V24a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z'
          fill='#FFFFFF'
        />
        <path d='M19.5 6v3.5a1 1 0 0 0 1 1H24L19.5 6Z' fill='white' fillOpacity='0.3' />
        <rect x='11' y='14' width='10' height='1.75' rx='0.875' fill='#1D4ED8' />
        <rect x='11' y='18' width='10' height='1.75' rx='0.875' fill='#1D4ED8' />
        <rect x='11' y='22' width='6.5' height='1.75' rx='0.875' fill='#1D4ED8' />
      </svg>

      <span className='text-xl font-bold tracking-tight text-white'>Penna</span>

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
