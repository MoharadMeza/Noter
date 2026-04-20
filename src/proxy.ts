import createMiddleware from 'next-intl/middleware'

import { SUPPORTED_LOCALES, DEFAULT_LOCALE } from '@libs/utils/locale'

export default createMiddleware({
  // A list of all locales that are supported
  locales: SUPPORTED_LOCALES,
  // Used when no locale matches
  defaultLocale: DEFAULT_LOCALE,
  // If this locale is matched, pathnames work without a prefix (e.g. `/about`)
  localePrefix: 'as-needed',
})

export const config = {
  // Match only internationalized pathnames
  matcher: ['/((?!api|_next|.*\\..*).*)'],
}
