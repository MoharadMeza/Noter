'use client'

import { useRouter } from 'next/navigation'

import { useTranslations } from 'next-intl'

import { removeCookie } from 'typescript-cookie'

import Icon from '@libs/components/icon/icon.component'

import { cookieKeys } from '@config/cookie'

import MenuDropdown from '@libs/components/menu-dropdown/menu-dropdown.component'
import useAuthStore from '@libs/store/auth.store'
import useProfileStore from '@libs/store/profile.store'

function UserMenu() {
  const t = useTranslations()
  const router = useRouter()
  const { setUserLogout } = useAuthStore()
  const { profileData, setProfileData } = useProfileStore()

  const handleLogout = () => {
    removeCookie(cookieKeys.session)
    setUserLogout()
    setProfileData(undefined)
    router.push('/auth/login')
  }

  const initials = profileData?.name
    ? profileData.name
        .split(' ')
        .map((w) => w[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : '?'

  const trigger = (
    <div className='flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-blue-600 text-xs font-semibold text-white transition-opacity duration-150 hover:opacity-85'>
      {initials}
    </div>
  )

  const header = (
    <div className='border-b border-gray-100 px-3 py-2.5 dark:border-slate-700'>
      <p className='truncate text-sm font-semibold text-slate-800 dark:text-slate-100'>
        {profileData?.name}
      </p>
      <p className='mt-0.5 truncate text-xs text-gray-500 dark:text-slate-400'>
        {profileData?.email}
      </p>
    </div>
  )

  return (
    <MenuDropdown
      trigger={trigger}
      triggerClassName='rounded-full p-0'
      align='start'
      headerSlot={header}
      items={[
        {
          label: t('USER_MENU_LOGOUT'),
          danger: true,
          icon: <Icon name='logout' className='h-4 w-4' />,
          onClick: handleLogout,
        },
      ]}
    />
  )
}

export default UserMenu
