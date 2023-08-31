import { useRef, useState } from 'react';
import { Text, View, Modal } from 'react-native'
import { router } from 'expo-router'
import * as MediaLibrary from 'expo-media-library'
import ViewShot from 'react-native-view-shot'
import { print } from 'react-native-pagseguro-plugpag'
import { DateTime } from 'luxon';

import { SafeAreaView } from '@components/SafeAreaView'
import { Button } from '@components/Button'

import LogoSvg from '@assets/logo.svg';

import { useSales } from '@hooks/useSales'

export default function Home() {
  const [isLoading, setIsLoading] = useState(false)
  const [isShow, setIsShow] = useState(false)

  const { sales } = useSales()

  const viewShotRef = useRef<ViewShot>()

  const lastSales = sales[sales.length - 1]

  const transactionValue = lastSales && lastSales.amount ? (parseFloat(lastSales.amount ?? '0') / 100) : 0;
  const dateSaleFormatted = lastSales && lastSales.date ? DateTime.fromFormat(lastSales.date, 'dd-MM-yyyy').toFormat('dd/MM/yyyy') : ''
  const transactionValueFormatted = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(transactionValue)

  function handleNewSale() {
    router.push('/newSale/')
  }

  function handleRefundLastSale() {
    router.push('/refund/details');
  }

  function handleShowModal() {
    setIsShow(true)
  }

  async function handlePrint() {
    try {
      setIsLoading(true);
  
      const { granted } = await MediaLibrary.requestPermissionsAsync()
  
      if (granted) {
        const uri = await viewShotRef.current.capture()
        const asset = await MediaLibrary.createAssetAsync(uri)
        const uriFormatted = asset.uri.replace(/(?:file:\/\/)(.*)/g, '$1')
        await print(uriFormatted)
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false)
      setIsShow(false)
    }
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

        <Button
          title="Estornar última venda"
          disabled={sales.length === 0}
          onPress={handleRefundLastSale}
        />

        <Button title="Impressão personalizada" onPress={handleShowModal} />
      </View>

      <Modal
        visible={isShow}
        transparent
      >
        <View className="flex-1 items-center justify-center">
          <ViewShot
            ref={viewShotRef}
            options={{
              format: 'png',
            }}
          >
            <View className="m-6 p-8 items-center shadow-lg sha rounded-lg  bg-white">

                <LogoSvg height={120} width={120} />

                <Text>
                  Última transação realizada
                </Text>

                {lastSales && lastSales.transactionCode ? (
                  <View className="py-8">
                    <Text className="text-sm text-gray-900">
                      Valor transação:{' '}

                      <Text className="font-bold">
                        {transactionValueFormatted}
                      </Text>
                    </Text>
                    

                    <Text className="text-sm text-gray-900">
                      Data:{' '}

                      <Text className="font-bold">
                        {dateSaleFormatted}
                      </Text>
                    </Text>

                    <Text className="text-sm text-gray-900">
                      ID da transação:{' '}

                      <Text className="font-bold">
                        {lastSales && lastSales.transactionId}
                      </Text>
                    </Text>

                    <Text className="text-sm text-gray-900">
                      Código da transação:{' '}

                      <Text className="font-bold">
                        {lastSales && lastSales.transactionCode}
                      </Text>
                    </Text>

                    <Text className="text-sm text-gray-900">
                      Bandeira cartão:{' '}

                      <Text className="font-bold">
                        {lastSales && lastSales.cardBrand ? lastSales.cardBrand : 'N/D'}
                      </Text>
                    </Text>

                    <Text className="text-sm text-gray-900">
                      Identificação últimos dígitos:{' '}

                      <Text className="font-bold">
                        {lastSales && lastSales.holder ? lastSales.holder : 'N/D'}
                      </Text>
                    </Text>
                  </View>
                ) : (
                  <View className="py-8">
                    <Text>Não há transações realizadas</Text>
                  </View>
                )}

              <Button title="Imprimir" isLoading={isLoading} onPress={handlePrint} />
            </View>
          </ViewShot>
        </View>
      </Modal>
    </View>
  )
}
