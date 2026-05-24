import { IconProps } from '@libs/components/icon/icon'
import { icons } from '@libs/components/icon/icon.utils'

function Icon(props: IconProps) {
  const { name, className } = props
  const IconComponent = icons[name]

  return <IconComponent className={className} />
}

export default Icon
