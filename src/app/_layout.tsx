import { Stack } from 'expo-router'

import '@global/styles/main.css'

export default function RootLayout() {
  return <Stack screenOptions={{ headerShown: false }} />
}
