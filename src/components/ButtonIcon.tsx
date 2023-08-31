import {
  View,
  TouchableOpacity,
  TouchableOpacityProps,
  ActivityIndicator,
} from 'react-native'
import { twMerge } from 'tailwind-merge'

type Props = TouchableOpacityProps & {
  isLoading?: boolean
}

export function ButtonIcon({
  isLoading = false,
  className,
  children,
  ...rest
}: Props) {
  return (
    <TouchableOpacity activeOpacity={0.7} {...rest}>
      <View
        className={twMerge([
          'w-10 h-10 rounded-full items-center justify-center p-1 bg-gray-200',
          className,
        ])}
      >
        {isLoading ? <ActivityIndicator /> : <>{children}</>}
      </View>
    </TouchableOpacity>
  )
}
