import { Ionicons } from '@expo/vector-icons'

export interface IconProps {
  name: React.ComponentProps<typeof Ionicons>['name']
  color?: string
  size?: number
}

export default function Icon(props: IconProps) {
  props.size = props.size ?? 28
  return <Ionicons {...props} />
}
