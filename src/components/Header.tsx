import { Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Feather } from '@expo/vector-icons'

import { ButtonIcon } from '@components/ButtonIcon'

type Props = {
  title: string
  onBack: () => void
}

export function Header({ title, onBack }: Props) {
  return (
    <SafeAreaView
      edges={['top']}
      className="bg-amber-400 px-6 py-4 flex-row items-center"
    >
      <ButtonIcon onPress={onBack}>
        <Feather name="arrow-left" size={24} color="#f59e0b" />
      </ButtonIcon>

      <Text className="text-lg font-bold text-gray-900 ml-4">{title}</Text>
    </SafeAreaView>
  )
}
