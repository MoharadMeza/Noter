import { NextIntlClientProvider } from 'next-intl'

import { getLocale } from 'next-intl/server'

import { vazirFont } from '@config/font/font'
import TanStackQueryProviders from '@config/tanstack-query'

import AuthInitiate from '@libs/components/authentication/init/auth-init.component'
import { SplashScreen } from '@libs/components/splash/splash-screen.component'
import { ThemeProvider } from '@libs/components/theme-toggle/theme-provider.component'
import { Toast } from '@libs/components/toast/toast.component'
import '@libs/validations/zod-extensions'

import { generateMainMetadata as generateMetadata } from '@app/seo'
import { LayoutProps } from '@app/type'
import '@app/globals.css'

export { generateMetadata }

export default async function RootLayout({ children }: LayoutProps) {
  const locale = await getLocale()

  return (
    <html className={vazirFont.variable} lang={locale} dir={locale === 'fa' ? 'rtl' : 'ltr'}>
      <body>
        <ThemeProvider>
          <NextIntlClientProvider>
            <SplashScreen />
            <TanStackQueryProviders>
              <AuthInitiate />

              {children}
            </TanStackQueryProviders>

            <Toast />

            <div id='portal-root' />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
