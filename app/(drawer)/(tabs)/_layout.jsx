import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import React from "react";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBarStyle,
        tabBarItemStyle: styles.tabBarItemStyle,
        tabBarShowLabel: false, // Hide labels
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="home"
              size={24}
              color={focused ? "#90E600" : "#8A8A8A"}
            />
          ),
        }}/>
      <Tabs.Screen
        name="favorites"
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="heart"
              size={24}
              color={focused ? "#90E600" : "#8A8A8A"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="cart"
              size={24}
              color={focused ? "#90E600" : "#8A8A8A"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="notifications"
              size={24}
              color={focused ? "#90E600" : "#8A8A8A"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="person"
              size={24}
              color={focused ? "#90E600" : "#8A8A8A"}
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: "#1A1C16",
    borderTopWidth: 0,
    elevation: 0,
    height: 60,
    position: "absolute",
  },
  tabBarItemStyle: {
    alignItems: "center",
    justifyContent: "center",
  },
  focusedIcon: {
    marginTop: 10,
    backgroundColor: "#90E6007A",
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: 75,
    borderTopRightRadius: 75,
  },
});
