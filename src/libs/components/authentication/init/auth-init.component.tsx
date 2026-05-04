'use client'

import { useEffect } from 'react'

import { usePathname, useRouter } from 'next/navigation'

import { getCookie } from 'typescript-cookie'

import appUrl from '@config/app-url'
import { cookieKeys } from '@config/cookie'

import { useFetchUserMe } from '@libs/models/user/me/useFetchUserMe'
import useAuthStore from '@libs/store/auth.store'
import useProfileStore from '@libs/store/profile.store'

function AuthInitiate() {
  const router = useRouter()
  const pathname = usePathname()
  const { setUserLogin, setUserLogout } = useAuthStore()
  const { setProfileData } = useProfileStore()
  const {
    data: meData,
    isSuccess: isUserMeLoaded,
    isError: hasUserMeError,
    isLoading,
    refetch,
  } = useFetchUserMe({ enabled: false })

  useEffect(() => {
    handlingUserAuth()
  }, [])

  useEffect(() => {
    if (meData?.result.data && isUserMeLoaded) {
      setProfileData(meData.result.data)

      const isOnAuthPage = pathname.startsWith('/auth')
      if (isOnAuthPage) {
        router.push(appUrl.HOME)
      }
    } else if (!isLoading && hasUserMeError) {
      handleUserLogout()
    }
  }, [meData?.result.data, isUserMeLoaded, hasUserMeError])

  const handlingUserAuth = () => {
    const session = getCookie(cookieKeys.session)

    if (session) {
      setUserLogin()
      refetch()
    } else {
      handleUserLogout()
    }
  }

  const handleUserLogout = () => {
    setUserLogout()
    setProfileData(undefined)
    router.push('/auth/login')
  }

  return null
}

export default AuthInitiate
