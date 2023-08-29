import { useEffect } from 'react'
import { Stack, router } from 'expo-router'

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
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)" />
    </Stack>
  )
}
