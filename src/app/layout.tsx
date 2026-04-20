import { NextIntlClientProvider } from 'next-intl'
import { getLocale } from 'next-intl/server'
import { Toast } from '@libs/components/toast/toast.component'
import { LayoutProps } from '@app/type'
import { vazirFont } from '@config/font/font'
import TanStackQueryProviders from '@config/tanstack-query'
import AuthInitiate from '@libs/components/authentication/init/auth-init.component'
import './globals.css'

export const metadata = {
  title: 'Noter',
  description: 'Note every thing',
}

export default async function RootLayout({ children }: LayoutProps) {
  const locale = await getLocale()

  return (
    <html className={vazirFont.className} lang={locale} dir={locale === 'fa' ? 'rtl' : 'ltr'}>
      <body>
        <NextIntlClientProvider>
          <TanStackQueryProviders>
            <AuthInitiate />

            {children}
          </TanStackQueryProviders>

          <Toast />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
