import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const handleBackPress = () => {
    navigation.goBack();
  };
  const profileData = {
    username: "Mohh_Jumah",
    email: "jimohjamiu2000@....",
    fullName: "Jamiu Jimoh",
    whatsapp: "08082116547",
    phone: "08082116547",
    state: "Kwara",
    city: "Ilorin",
    address: "Tanke Oke Odo, Ilorin, Kwara State.",
    profileImage: require("../../../assets/images/avatar.png"), // Replace with your image path
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress} style={styles.icon}>
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.profileTitle}>Profile</Text>
      </View>
      <View style={styles.profileHeader}>
        <Image source={profileData.profileImage} style={styles.profileImage} />
        <View>
          <Text style={styles.username}>{profileData.username}</Text>
          <Text style={styles.email}>{profileData.email}</Text>
        </View>
        <TouchableOpacity style={styles.editProfileButton}>
          <Ionicons name="create-outline" size={20} color="#90E600" />
          <Text style={styles.editProfileButtonText}>Edit profile</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.profileInfoContainer}>
        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>User Information</Text>
          <Text style={styles.infoText}>Full name: </Text>
          <Text style={styles.infoSubText}>{profileData.fullName}</Text>
          <Text style={styles.infoText}>Whatsapp:</Text>
          <Text style={styles.infoSubText}>{profileData.whatsapp}</Text>
          <Text style={styles.infoText}>Phone:</Text>
          <Text style={styles.infoSubText}>{profileData.phone}</Text>
        </View>
      </View>
      <View style={styles.profileInfoContainer}>
        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Shipping Information:</Text>
          <Text style={styles.infoText}>State:</Text>
          <Text style={styles.infoSubText}>{profileData.state}</Text>
          <Text style={styles.infoText}>City:</Text>
          <Text style={styles.infoSubText}>{profileData.city}</Text>
          <Text style={styles.infoText}>Address:</Text>
          <Text style={styles.infoSubText}>{profileData.address}</Text>
        </View>
      </View>
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
    color: "#fff",
    fontSize: 16,
    fontWeight: 500,
    flex: 1,
    textAlign: "center",
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 52,
    height: 52,
    borderRadius: 30,
    marginRight: 10,
  },
  username: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  email: {
    color: "grey",
  },

  editProfileButtonText: {
    color: "#fff",
  },
  editProfileButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF21",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#FFFFFF54",
  },
  editProfileIcon: {
    marginRight: 5,
  },
  editProfileButtonText: {
    color: "#90E600",
  },
  infoSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    color: "#66A300",
    fontSize: 14,
    fontWeight: 500,
    marginBottom: 5,
  },
  infoText: {
    color: "#8A8A8A",
    marginTop: 10,
    fontSize: 14,
  },
  infoSubText: {
    color: "#fff",
    fontWeight:500,
    marginTop: 3,
    fontSize: 14,
  },
  profileInfoContainer: {
    backgroundColor: "#111",
    padding: 20,
    borderRadius: 10,
    marginVertical:10
  },
});

export default ProfileScreen;
