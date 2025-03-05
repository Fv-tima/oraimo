import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Stack } from "expo-router";
import images from "../constants/images";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "react-native";
import { FavoritesProvider } from "@/context/FavContext";


// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true);
      SplashScreen.hideAsync(); 
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!isReady) {
    // Render the splash screen
    return (
      <View style={styles.splashContainer}>
       <Image
            source={images.splash}
            resizeMode="contain"
          style={styles.splashImage} />
      </View>
    );
  }

  // Render the actual app once the splash screen is hidden
  return (
    <FavoritesProvider>
    <Stack >
        <StatusBar style="light" backgroundColor="#000" />
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
    </Stack>
    </FavoritesProvider>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000000",
  },
  splashImage: {
    width: 253,
    height: 83,
  },
});

