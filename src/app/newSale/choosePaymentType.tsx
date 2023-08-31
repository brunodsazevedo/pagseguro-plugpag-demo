import { Text, View } from 'react-native';
import { router } from 'expo-router';
import { PaymentTypes, InstallmentTypes } from 'react-native-pagseguro-plugpag'

import { Header } from '@components/Header';
import { Button } from '@components/Button';

import { useSales } from '@hooks/useSales';

export default function ChoosePaymentType() {
  const { cart, onUpdateCart } = useSales()

  function handleBack() {
    router.back()
  }

  function handleChoosePaymentType(paymentType: PaymentTypes) {
    if(paymentType === PaymentTypes.CREDIT) {
      onUpdateCart({...cart, paymentType})

      router.push('/newSale/chooseInstallments')
      return
    }

    onUpdateCart({...cart, paymentType, installments: 1, installmentType: InstallmentTypes.NO_INSTALLMENT})
    router.push('/newSale/makePayment')
  }

  return (
    <View className='flex-1 bg-white'>
      <Header title="Forma de pagamento" onBack={handleBack} />

      <Text className="text-base text-gray-900 px-6 pt-6">
        Informe a forma de pagamento
      </Text>
      
      <View className="flex-1 items-center justify-center px-6 space-y-4">
        <Button
          title="Crédito"
          onPress={() => handleChoosePaymentType(PaymentTypes.CREDIT)}
        />

        <Button
          title="Débito"
          onPress={() => handleChoosePaymentType(PaymentTypes.DEBIT)}
        />
        
        <Button
          title="PIX QR Code"
          onPress={() => handleChoosePaymentType(PaymentTypes.PIX_QR_CODE)}
        />
      </View>
    </View>
  );
}
