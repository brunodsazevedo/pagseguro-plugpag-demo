import { Text, View } from 'react-native'

import LogoSvg from '@assets/logo.svg'
import { Button } from '@components/Button'
import { router } from 'expo-router'

export default function Welcome() {
  function handleActivationCode() {
    router.push('/activePinPad')
  }

  return (
    <View className="flex-1 items-center justify-center p-6 bg-white ">
      <Text className="text-2xl text-center font-bold">
        React Native Pagseguro Plugpag Demo App
      </Text>

      <LogoSvg width={120} />

      <Text className="text-xl text-center font-bold">Bem-vindo</Text>

      <Text className="text-md text-center my-4">
        Para continuar, vamos ativar seu terminal com seu código de ativação
      </Text>

      <Button title="Avançar" onPress={handleActivationCode} />
    </View>
  )
}
