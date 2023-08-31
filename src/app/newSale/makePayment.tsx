import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { router } from 'expo-router';
import { useTransactionPaymentEvent, doPayment, PaymentTransactionResponseProps } from 'react-native-pagseguro-plugpag'
import LottieView from 'lottie-react-native';

import { SafeAreaView } from '@components/SafeAreaView';

import { useSales } from '@hooks/useSales'

import LoadingAnimation from '@assets/loading-circle-animation.json';
import SuccessAnimation from '@assets/success-animation.json';
import ErrorAnimation from '@assets/error-animation.json';
import InsertCardAnimation from '@assets/insert-credit-card-animation.json';
import InsertPasswordAnimation from '@assets/insert-password-animation.json';
import { Button } from '@components/Button';

export default function MakePayment() {
  const [statusMessage, setStatusMessage] = useState('Processando')
  const [saleData, setSaleData] = useState<PaymentTransactionResponseProps>({} as PaymentTransactionResponseProps)
  const [isProcessing, setIsProcessing] = useState(true)
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false)
  const [handleType, setHandleType] = useState<
    | 'pos'
    | 'userInsertCard'
    | 'userRemoveCard'
    | 'userInsertPassword'
    | 'success'
  >('pos')

  const transactionEvent = useTransactionPaymentEvent()
  const { cart, onAddSale } = useSales()

  function handleChangePaymentMethod() {
    router.push('/newSale/choosePaymentType')
  }

  function handleFinish() {
    onAddSale(saleData)

    router.push('/')
  }

  async function onPayment() {
    try {
      setIsProcessing(true);

      const data = await doPayment({
        amount: cart.amount,
        installments: cart.installments,
        installmentType: cart.installmentType,
        type: cart.paymentType,
        printReceipt: true,
        userReference: 'pagseguro-plugpag-test'
      })

      console.log(data);

      if(data.result !== 0) {
        throw data
      }

      setSaleData(data)

      setStatusMessage('TRANSAÇÃO CONCLUÍDA')
      setIsPaymentSuccessful(true);
    } catch (error) {
      console.log(error);
      if (error && typeof error === 'object' && 'errorMessage' in error) {
        setStatusMessage(error.message ?? 'Erro ao processar transação');
      }
    } finally {
      setIsProcessing(false);
    }
  }

  useEffect(() => {
    console.log(transactionEvent);
    setStatusMessage(transactionEvent.message)

    if (transactionEvent.message === 'INSIRA O CARTÃO') {
      setHandleType('userInsertCard')
      return
    }

    if (transactionEvent.message === 'APROXIME, INSIRA OU PASSE O CARTAO') {
      setHandleType('userInsertCard')
      return
    }

    if (transactionEvent.code === 7) {
      setHandleType('userRemoveCard')
      return
    }

    if (transactionEvent.code === 17) {
      setHandleType('userInsertPassword')
      return
    }

    if (transactionEvent.code === 16) {
      setHandleType('userInsertPassword')
      return
    }

    if (transactionEvent.code === 18) {
      setHandleType('success')
      return
    }

    setHandleType('pos')
  }, [transactionEvent])

  useEffect(() => {
    onPayment()
  }, [])

  return (
    <SafeAreaView className='flex-1 bg-white p-6'>
      <Text className="text-center uppercase text-lg text-gray-900">
        {statusMessage ?? 'Processando'}
      </Text>

      <View className="flex-1 items-center justify-center mb-10">
        {isProcessing && handleType === 'pos' && (
          <LottieView
            source={LoadingAnimation}
            autoPlay
            loop
            style={{ height: 150, width: 150 }}
          />
        )}

        {isProcessing && handleType === 'userInsertCard' && (
          <LottieView
            source={InsertCardAnimation}
            autoPlay
            loop
            style={{ height: 500, width: 500 }}
          />
        )}

        {isProcessing && handleType === 'userInsertPassword' && (
          <LottieView
            source={InsertPasswordAnimation}
            autoPlay
            loop
            style={{ height: 150, width: 150 }}
          />
        )}

        {isProcessing && handleType === 'userRemoveCard' && (
          <LottieView
            source={InsertCardAnimation}
            autoPlay
            loop
            style={{ height: 500, width: 500 }}
          />
        )}

        {isProcessing && handleType === 'success' && (
          <LottieView
            source={SuccessAnimation}
            autoPlay
            loop={false}
            style={{ height: 150, width: 150 }}
          />
        )}

        {!isProcessing && isPaymentSuccessful && (
          <LottieView
            source={SuccessAnimation}
            autoPlay
            loop={false}
            style={{ height: 150, width: 150 }}
          />
        )}

        {!isProcessing && !isPaymentSuccessful && (
          <LottieView
            source={ErrorAnimation}
            autoPlay
            loop={false}
            style={{ height: 600, width: 600 }}
          />
        )}
      </View>

      <View className="space-y-4">
        {!isProcessing && !isPaymentSuccessful && (
          <>
            <Button title="Tentar novamente" className="mb-4" onPress={onPayment} />

            <Button title="Alterar método de pagamento" onPress={handleChangePaymentMethod} />
          </>
        )}

        {!isProcessing && isPaymentSuccessful && (
          <Button title="Finalizar" onPress={handleFinish} />
        )}
      </View>
    </SafeAreaView>
  );
}
