import { View, Text } from 'react-native'
import React from 'react'
import OnboardingScreen from '@/components/OnboardingScreens'
import { SafeAreaProvider } from 'react-native-safe-area-context'

const index = () => {
  return (
    <SafeAreaProvider>
   <OnboardingScreen />
   </SafeAreaProvider>
  )
}

export default index