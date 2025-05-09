import { create } from 'zustand'

import { UserLoginData } from '@app-types/user'

interface AuthState {
  data: UserLoginData | undefined
  userIsLogin: boolean
  loadingData: boolean
  setAuthData: (data: UserLoginData | undefined) => void
  setUserLogout: VoidFunction
}

const useAuthSlice = create<AuthState>()((set) => ({
  data: undefined,
  userIsLogin: false,
  loadingData: true,
  bannedUserSupportDescription: null,
  setAuthData: (data) => {
    set({ data, userIsLogin: true, loadingData: false })
  },
  setUserLogout: () => {
    set({
      data: undefined,
      userIsLogin: false,
      loadingData: false,
    })

    // removeCookie(cookieKeys.token, getConfigCookie())
    // removeCookie(cookieKeys.refreshToken, getConfigCookie())

    // removeCookie(cookieKeys.token, getConfigCookie())
    // removeCookie(cookieKeys.refreshToken, getConfigCookie())
  },
}))

export default useAuthSlice
