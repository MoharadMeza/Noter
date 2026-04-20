import { LayoutProps } from '@/app/type'
import TanStackQueryProviders from '@config/tanstack-query'
import { Toast } from '@libs/components/toast/toast.component'

export default async function AuthLayout(props: LayoutProps) {
  return (
    <>
      <TanStackQueryProviders>{props.children}</TanStackQueryProviders>

      <Toast />
    </>
  )
}
