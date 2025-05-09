import { NextIntlClientProvider } from 'next-intl'
import { getLocale } from 'next-intl/server'

import { LayoutProps } from '@app/type'
import { vazirFont } from '@config/font/font'
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
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  )
}
