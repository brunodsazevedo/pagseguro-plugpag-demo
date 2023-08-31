import { ScrollView, Text, View } from 'react-native';
import { InstallmentTypes } from 'react-native-pagseguro-plugpag';
import { router } from 'expo-router';

import { Header } from '@components/Header';
import { Button } from '@components/Button';
import { SafeAreaView } from '@components/SafeAreaView';

import { useSales } from '@hooks/useSales';

export default function ChooseInstallments() {
  const { cart, onUpdateCart } = useSales()

  function handleBack() {
    router.back()
  }

  function handleChooseInstallments(installments: number) {
    onUpdateCart({...cart, installments, installmentType: installments === 1 ? InstallmentTypes.NO_INSTALLMENT : InstallmentTypes.SELLER_INSTALLMENT});

    router.push('/newSale/makePayment')
  }

  return (
    <View className='flex-1 bg-white'>
      <Header title="Parcelas" onBack={handleBack} />

      <SafeAreaView edges={['bottom']} className="flex-1 pt-6 px-6">
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 74 }}
        >
          <Text className="text-base text-gray-900">
            Escolha quantidade de parcelas
          </Text>

          <View className="mt-8 space-y-4">
            <Button title="x1" />
            <Button title="x2" onPress={() => handleChooseInstallments(2)} />
            <Button title="x3" onPress={() => handleChooseInstallments(3)} />
            <Button title="x4" onPress={() => handleChooseInstallments(4)} />
            <Button title="x5" onPress={() => handleChooseInstallments(5)} />
            <Button title="x6" onPress={() => handleChooseInstallments(6)} />
            <Button title="x7" onPress={() => handleChooseInstallments(7)} />
            <Button title="x8" onPress={() => handleChooseInstallments(8)} />
            <Button title="x9" onPress={() => handleChooseInstallments(9)} />
            <Button title="x10" onPress={() => handleChooseInstallments(10)} />
            <Button title="x11" onPress={() => handleChooseInstallments(11)} />
            <Button title="x12" onPress={() => handleChooseInstallments(12)} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
