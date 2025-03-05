import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

const NotificationsScreen = () => {
  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.goBack();
  };

  const notifications = [
    {
      icon: 'cube-outline', 
      message: 'Your order is on its way to dispatch rider',
      time: '2h',
    },
    {
      icon: 'bicycle-outline',
      message: 'Your item has been shipped! track your order',
      time: '2h',
    },
    {
      icon: 'cube-outline',
      message: 'Order placed! we will let you know known when it get to dispatch rider',
      time: '2h',
    },
    {
      icon: 'musical-notes-outline',
      message: 'checkout the Oraimo burna boy limited edition.',
      time: '2h',
    },
        {
      icon: 'cube-outline',
      message: 'Your order is on its way to dispatch rider',
      time: '2h',
    },
    {
      icon: 'bicycle-outline', 
      message: 'Your item has been shipped! track your order',
      time: '2h',
    },
    {
      icon: 'cube-outline',
      message: 'Order placed! we will let you know known when it get to dispatch rider',
      time: '2h',
    },
    {
      icon: 'musical-notes-outline', 
      message: 'checkout the Oraimo burna boy limited edition.',
      time: '2h',
    },
  ];



  const renderItem = ({ item }) => (
    <View style={styles.notificationItem}>
      <View style={styles.iconContainer}>
        <Ionicons name={item.icon} size={20} color="#83D100" />
      </View>
      <Text style={styles.message}>{item.message}</Text>
      <Text style={styles.time}>{item.time}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header Section */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress} style={styles.icon}>
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.profileTitle}>Notifications</Text>
      </View>

      {/* Notifications List */}
      <FlatList
        data={notifications}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#20221D",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  icon: {
    backgroundColor: "#23251F",
    padding: 7,
    borderRadius: 5,
  },
  profileTitle: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "500", // Changed to string
    flex: 1,
    textAlign: "center",
  },
  listContent: {
    gap: 10,
  },
  notificationItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#060A00",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  message: {
    flex: 1,
    color: "#FFF",
  },
  time: {
    color: "#888",
  },
  iconContainer: {
    marginRight: 10,
    backgroundColor: "#FFFFFF1A",
    borderColor: "#FFFFFF00",
    borderWidth: 0.5, // Changed to a number
    borderRadius: 100,
    padding: 10,
  },
});

export default NotificationsScreen;
