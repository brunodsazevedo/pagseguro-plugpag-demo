import AsyncStorage from '@react-native-async-storage/async-storage'

import { ACTIVATION_CODE_STORAGE } from '@storage/storageConfig'

export async function setActivationCodeStorage(code: string) {
  await AsyncStorage.setItem(ACTIVATION_CODE_STORAGE, code)
}

export async function getActivationCodeStorage() {
  const activationCode = await AsyncStorage.getItem(ACTIVATION_CODE_STORAGE)

  return activationCode
}
