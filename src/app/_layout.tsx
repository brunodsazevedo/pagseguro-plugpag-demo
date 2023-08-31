import 'intl'
import 'intl/locale-data/jsonp/pt-BR'

import { useEffect } from 'react'
import { Stack, router } from 'expo-router'
import { StatusBar } from 'react-native'

import { SalesProvider } from '@contexts/SalesContext'

import { getActivationCodeStorage } from '@storage/storagePlugpag'

import '@global/styles/main.css'

export default function RootLayout() {
  async function onLoad() {
    const activationCode = await getActivationCodeStorage()
    if (!activationCode) {
      router.replace('/welcome')
      return
    }

    router.replace('/')
  }

  useEffect(() => {
    onLoad()
  }, [])

  return (
    <SalesProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" />
      </Stack>

      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
    </SalesProvider>
  )
}
