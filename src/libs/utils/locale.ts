import env from '@libs/utils/env'

export const DEFAULT_LOCALE = env.DEFAULT_LOCALE || 'en'

export const SUPPORTED_LOCALES = ['en', 'fa']
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number]

export const isValidLocale = (locale: string): locale is SupportedLocale => {
  return SUPPORTED_LOCALES.includes(locale as SupportedLocale)
}

export const getLocale = (locale?: string): SupportedLocale => {
  if (locale && isValidLocale(locale)) {
    return locale
  }
  return DEFAULT_LOCALE as SupportedLocale
}

export const getDirection = (locale: SupportedLocale): 'ltr' | 'rtl' => {
  return locale === 'fa' ? 'rtl' : 'ltr'
}
