import { useEffect, useState } from 'react';
import { Text, TouchableWithoutFeedback, View, Keyboard } from 'react-native';
import { router } from 'expo-router';
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { Header } from '@components/Header';
import { SafeAreaView } from '@components/SafeAreaView';
import { Button } from '@components/Button';
import { InputCurrency } from '@components/forms/CurrencyInput';

import { useSales } from '@hooks/useSales';

type DataFormProps = {
  value: number
}

const saleValueSchema = yup.object({
  value: yup.number().required('Campo é obrigatório').min(10, 'Valor precisa ser igual ou maior de R$ 10,00')
})

export default function NewSale() {
  const [isDisabled, setIsDisabled] = useState(true)

  const { cart, onUpdateCart } = useSales()
  const { control, watch, formState: { errors }, handleSubmit } = useForm({
    resolver: yupResolver(saleValueSchema),
    defaultValues: {
      value: 0,
    },
  })

  const { value } = watch()

  function handleBack() {
    router.back()
  }

  function handleNextStep(data: DataFormProps) {
    const valueInCents = data.value * 100
    onUpdateCart({...cart, amount: valueInCents})

    router.push('/newSale/choosePaymentType')
  }

  useEffect(() => {
    if (value && value > 0) {
      setIsDisabled(false)
      return
    }

    setIsDisabled(true)
  }, [value])

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className='flex-1 bg-white'>
        <Header title="Nova venda" onBack={handleBack} />

        <View className="flex-1 pt-6 px-6">
          <Text className="text-base text-gray-900">Informe o valor a ser recebido</Text>

          <View className="mt-8">
            <Controller
              control={control}
              name="value"
              render={({ field: { value, onChange } }) => (
                <InputCurrency
                  value={value}
                  onChangeValue={onChange}
                  label="Valor a receber"
                  prefix="R$ "
                  precision={2}
                  minValue={0}
                  error={errors.value && errors.value.message}
                />
              )}
            />
          </View>
        </View>

        <SafeAreaView edges={['bottom']} className="p-6">
          <Button title="Avançar" disabled={isDisabled} onPress={handleSubmit(handleNextStep)} />
        </SafeAreaView>
      </View>
    </TouchableWithoutFeedback>
  );
}
