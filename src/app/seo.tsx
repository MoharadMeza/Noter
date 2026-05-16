import { getTranslations } from 'next-intl/server'

export async function generateMainMetadata() {
  const t = await getTranslations()

  return {
    title: {
      default: t('APP_NAME'),
      template: `%s | ${t('APP_NAME')}`,
    },
    description: t('APP_DESCRIPTION'),
  }
}
