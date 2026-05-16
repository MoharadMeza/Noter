import { create } from 'zustand'

import { UserProfileData } from '@app-types/user'

interface ProfileState {
  profileData: UserProfileData | undefined
  setProfileData: (data: UserProfileData | undefined) => void
}

const useProfileStore = create<ProfileState>()((set) => ({
  profileData: undefined,
  setProfileData: (profileData) => {
    set({ profileData })
  },
}))

export default useProfileStore
