import { LayoutProps } from '@/app/type'

export default function Layout({ children }: LayoutProps) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  )
}
