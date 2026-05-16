'use client'

import { ContentProps } from '@libs/components/content/content'

function Content(props: ContentProps) {
  return <div className='p-4 sm:p-6'>{props.children}</div>
}

export default Content
