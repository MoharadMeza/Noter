import Content from '@libs/components/content/content.component'
import Header from '@libs/components/header/header.component'
import Sidebar from '@libs/components/sidebar/sidebar.component'

export default async function Page() {
  return (
    <>
      <Sidebar />

      {/* <Header /> */}

      <Content />
    </>
  )
}
