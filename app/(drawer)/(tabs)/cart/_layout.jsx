import { Stack } from "expo-router";

export default function HomeLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="checkout" options={{ headerShown: false }} />
      <Stack.Screen name="payment" options={{ headerShown: false }} />
      <Stack.Screen name="personal" options={{ headerShown: false }} />
      <Stack.Screen name="shipping" options={{ headerShown: false }} />
      <Stack.Screen name="card" options={{ headerShown: false }} />
      <Stack.Screen name="carddetails" options={{ headerShown: false }} />
    </Stack>
  )
}