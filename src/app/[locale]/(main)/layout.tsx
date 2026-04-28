import Content from '@libs/components/content/content.component'
import Sidebar from '@libs/components/sidebar/sidebar.component'

import { LayoutProps } from '@app/type'

export default async function Layout(props: LayoutProps) {
  return (
    <div className='grid grid-cols-[auto_1fr]'>
      <div className='w-64 md:hidden xl:block'>
        <Sidebar />
      </div>

      <div className=''>
        <Content>{props.children}</Content>
      </div>
    </div>
  )
}
