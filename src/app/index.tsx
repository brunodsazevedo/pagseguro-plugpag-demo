import { Text, View } from 'react-native'
import { router } from 'expo-router'

import { SafeAreaView } from '@components/SafeAreaView'
import { Button } from '@components/Button'

import { useSales } from '@hooks/useSales'

export default function Home() {
  const { sales } = useSales()

  function handleNewSale() {
    router.push('/newSale/')
  }

  return (
    <View className="flex-1">
      <SafeAreaView edges={['top']} className='items-center justify-center bg-amber-400 px-6 py-4'>
        <Text className="text-xl text-center font-bold">React Native PagSeguro PlugPag</Text>
      </SafeAreaView>
      
      <View className="py-6">
        <Text className="text-lg font-semibold text-center">Escolha uma das opções</Text>
      </View>

      <View className="flex-1 items-center justify-center px-6 space-y-6">
        <Button title="Nova venda" onPress={handleNewSale} />

        <Button title="Estornar última venda" disabled={sales.length === 0} />

        <Button title="Impressão personalizada" />
      </View>
    </View>
  )
}
