import { create } from 'zustand'

interface AuthState {
  userIsLogin: boolean
  loadingData: boolean
  setUserLogin: VoidFunction
  setUserLogout: VoidFunction
}

const useAuthStore = create<AuthState>()((set) => ({
  userIsLogin: false,
  loadingData: true,
  setUserLogin: () => {
    set({ userIsLogin: true, loadingData: false })
  },
  setUserLogout: () => {
    set({
      userIsLogin: false,
      loadingData: false,
    })
  },
}))

export default useAuthStore
