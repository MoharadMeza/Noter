import { Metadata } from 'next'

import { getTranslations } from 'next-intl/server'

export async function generateMainMetadata(): Promise<Metadata> {
  const t = await getTranslations()

  return {
    title: {
      default: t('APP_NAME'),
      template: `%s | ${t('APP_NAME')}`,
    },
    icons: {
      icon: '/icons/app-icon.svg',
      shortcut: '/icons/app-icon.svg',
      apple: '/icons/app-icon.svg',
    },
    description: t('APP_DESCRIPTION'),
  }
}
