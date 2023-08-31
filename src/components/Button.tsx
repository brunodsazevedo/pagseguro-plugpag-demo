import {
  View,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  ActivityIndicator,
} from 'react-native'
import { styled } from 'nativewind'
import { twMerge } from 'tailwind-merge'

type Props = TouchableOpacityProps & {
  title?: string
  isLoading?: boolean
}

const TouchableOpacityStyled = styled(TouchableOpacity)

export function Button({ title, isLoading = false, disabled = false, className, ...rest }: Props) {
  return (
    <TouchableOpacityStyled
      activeOpacity={0.7}
      disabled={disabled}
      className={twMerge([`h-12 w-full items-center justify-center py-2 px-3 bg-amber-400 rounded-md ${disabled ? 'opacity-40' : 'opacity-100'}`, className])}
      {...rest}
    >
      {isLoading ? (
        <ActivityIndicator color="white" />
      ) : (
        <Text className="text-md font-bold uppercase text-white">
          {title}
        </Text>
      )}
      {/* <View className="w-full h-12 items-center justify-center py-2 px-3 bg-amber-400 rounded-md">
      </View> */}
    </TouchableOpacityStyled>
  )
}
