import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView
} from "react-native";
import ProgressIndicator from "@/components/ProgressIndicator";
import { router, useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { SafeAreaView } from "react-native-safe-area-context";

const PersonalDetailsScreen = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");

  const handleProceed = () => {
    router.push("/cart/shipping");
  };

  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
       <SafeAreaView
          style={{ backgroundColor: "#20221D", flex: 1, paddingBottom: 80 }}
        >
          <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress} style={styles.icon}>
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.profileTitle}>Checkout</Text>
        <TouchableOpacity
          onPress={handleBackPress}
          style={{ padding: 4, borderRadius: 12, backgroundColor:"#FFFFFF29"}}
        >
          <Ionicons name="heart-outline" size={16} color="#FFF" />
        </TouchableOpacity>
      </View>
      <ProgressIndicator currentStep={1} totalSteps={3} label="Personal Details"/>
      <View style={styles.form}>
      <FormField label="First name" placeholder="First name"
        value={firstName}
        onChangeText={setFirstName} />
       <FormField label="Last name"  placeholder="Last name"
        value={lastName}
        onChangeText={setLastName} />
       <FormField label="Email Address"  placeholder="Email Address"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"/>
         <FormField label="Phone Number"  placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad" />
      <FormField label="WhatsApp Number" placeholder="WhatsApp Number"
        value={whatsappNumber}
        onChangeText={setWhatsappNumber}
        keyboardType="phone-pad"/>
        </View>
       <CustomButton title="Proceed" handlePress={handleProceed}/>
    </ScrollView>
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
    fontWeight: "500",
    flex: 1,
    textAlign: "center",
    marginRight: 30,
  },
form:{
  marginVertical:20
}
});

export default PersonalDetailsScreen;
