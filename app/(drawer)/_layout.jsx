// app/drawer.tsx
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Drawer } from "expo-router/drawer";
import CustomDrawer from "@/components/CustomDrawer"; // Import your custom drawer
import { Text } from "react-native";

export default function DrawerLayout() {
  return (
    <Drawer
      drawerContent={(props) => <CustomDrawer {...props} />} // Custom Drawer Component
      screenOptions={{
        drawerActiveTintColor: "#000",
        drawerActiveBackgroundColor: "#fff",
        drawerStyle: {
          padding: 0,
          margin: 0,
        },
        headerStyle: {
          borderWidth: 0,
          elevation: 0,
        },
        headerShown: false,
      }}
    />
  );
}
