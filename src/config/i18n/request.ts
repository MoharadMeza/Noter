import { getRequestConfig, GetRequestConfigParams } from 'next-intl/server'

import { SUPPORTED_LOCALES, DEFAULT_LOCALE, SupportedLocale } from '@libs/utils/locale'

export default getRequestConfig(async ({ locale }: GetRequestConfigParams) => {
  // Validate that the incoming `locale` parameter is valid
  const validLocale =
    locale && SUPPORTED_LOCALES.includes(locale as SupportedLocale) ? locale : DEFAULT_LOCALE

  return {
    locale: validLocale,
    messages: (await import(`./messages/${validLocale}.json`)).default,
  }
})
