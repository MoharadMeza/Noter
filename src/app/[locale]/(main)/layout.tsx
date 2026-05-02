import Content from '@libs/components/content/content.component'
import Header from '@libs/components/header/header.component'
import Sidebar from '@libs/components/sidebar/sidebar.component'

import { LayoutProps } from '@app/type'

export default async function Layout(props: LayoutProps) {
  return (
    <div className='flex h-screen flex-col'>
      <Header />

      <div className='flex flex-1 overflow-hidden'>
        <aside className='hidden w-72 shrink-0 overflow-y-auto border-s border-gray-200 xl:block dark:border-slate-700'>
          <Sidebar />
        </aside>

        <main className='flex-1 overflow-y-auto'>
          <Content>{props.children}</Content>
        </main>
      </div>
    </div>
  )
}
