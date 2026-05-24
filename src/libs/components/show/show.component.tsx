import { Activity } from 'react'

import { ShowProps } from '@libs/components/show/show'

const Show = (props: ShowProps) => {
  const { when, mode = 'activity', children } = props

  if (mode === 'unmount') {
    return when ? <>{children}</> : null
  }

  return <Activity mode={when ? 'visible' : 'hidden'}>{children}</Activity>
}

export default Show
