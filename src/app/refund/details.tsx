import { Text, View } from 'react-native';
import { router } from 'expo-router';
import { DateTime } from 'luxon'

import { Header } from '@components/Header';
import { SafeAreaView } from '@components/SafeAreaView';
import { Button } from '@components/Button';
import { useSales } from '@hooks/useSales';

export default function Details() {
  const { sales } = useSales()

  const lastSale = sales[sales.length - 1];
  const transactionValue = (parseFloat(lastSale.amount ?? '0') / 100) ?? 0;
  const dateSaleFormatted = DateTime.fromFormat(lastSale.date, 'dd-MM-yyyy').toFormat('dd/MM/yyyy')

  const transactionValueFormatted = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(transactionValue)

  function handleBack() {
    router.back()
  }

  function handleNext() {
    router.push('/refund/makeRefund');
  }

  return (
    <View className='flex-1 bg-white'>
      <Header title="Detalhes para estorno" onBack={handleBack} />
      
      <View className="flex-1 pt-6 px-6">
        <Text className="text-base text-gray-900">
          Detalhes de última venda
        </Text>

        <View className="space-y-4 pt-8">
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
              {lastSale.transactionId}
            </Text>
          </Text>

          <Text className="text-sm text-gray-900">
            Código da transação:{' '}

            <Text className="font-bold">
              {lastSale.transactionCode}
            </Text>
          </Text>

          <Text className="text-sm text-gray-900">
            Bandeira cartão:{' '}

            <Text className="font-bold">
              {lastSale.cardBrand ?? 'N/D'}
            </Text>
          </Text>

          <Text className="text-sm text-gray-900">
            Identificação últimos dígitos:{' '}

            <Text className="font-bold">
              {lastSale.holder ?? 'N/D'}
            </Text>
          </Text>
        </View>
      </View>

      <SafeAreaView className="p-6">
        <Button title="Continuar" onPress={handleNext} />
      </SafeAreaView>
    </View>
  );
}
