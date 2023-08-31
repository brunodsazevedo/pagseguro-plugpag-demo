import { useState } from 'react'
import {
  Text,
  TouchableWithoutFeedback,
  View,
  Keyboard,
  Alert,
} from 'react-native'
import { router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { initializeAndActivatePinPad } from 'react-native-pagseguro-plugpag'

import { Button } from '@components/Button'
import { Header } from '@components/Header'
import { Input } from '@components/forms/Input'

import { setActivationCodeStorage } from '@storage/storagePlugpag'

type DataFormProps = {
  activationCode: string
}

const activationCodeSchema = yup.object({
  activationCode: yup.string().required('Campo é obrigatório'),
})

export default function ActivePinPad() {
  const [isLoading, setIsLoading] = useState(false)

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(activationCodeSchema),
  })

  function handleBack() {
    router.back()
  }

  function handleNext() {
    router.push('/')
  }

  async function handleActivationCode(dataForm: DataFormProps) {
    try {
      setIsLoading(true)

      const response = await onInitializeAndActivatePinPad(dataForm.activationCode)

      if (response.result !== 0) {
        Alert.alert(
          'Erro em ativar PinPad',
          response.errorMessage ??
            'Ocorreu um erro inesperado ao ativar PinPad. Por favor, tente novamente!',
        )
        return
      }

      await setActivationCodeStorage(dataForm.activationCode)

      Alert.alert('Ativação PinPad', 'Terminal ativado com sucesso!', [
        {
          text: 'Finalizar',
          onPress: handleNext,
        },
      ])
    } catch (error) {
      console.log(error)
      Alert.alert(
        'Erro em ativar PinPad',
        'Ocorreu um erro inesperado ao ativar PinPad. Por favor, tente novamente!',
      )
    } finally {
      setIsLoading(false)
    }
  }

  async function onInitializeAndActivatePinPad(code: string) {
    const response = await initializeAndActivatePinPad(code)

    return response
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="flex-1 bg-white">
        <Header title="Ativando Pin Pad" onBack={handleBack} />

        <View className="flex-1 pt-6 px-6">
          <Text className="font-md text-gray-900 mb-8">
            Informe seu código de ativação
          </Text>

          <Controller
            control={control}
            name="activationCode"
            render={({ field: { value, onChange } }) => (
              <Input
                value={value}
                onChangeText={onChange}
                label="Código de ativação"
                keyboardType="number-pad"
                error={errors.activationCode && errors.activationCode.message}
              />
            )}
          />
        </View>

        <SafeAreaView edges={['bottom']} className="p-6">
          <Button
            title="Cadastrar"
            isLoading={isLoading}
            onPress={handleSubmit(handleActivationCode)}
          />
        </SafeAreaView>
      </View>
    </TouchableWithoutFeedback>
  )
}
