import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import ProgressIndicator from "@/components/ProgressIndicator";
import { Ionicons } from "@expo/vector-icons";
import { router, useNavigation } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";

const ShippingDetailsScreen = () => {
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const handleProceed = () => {
    router.push("/cart/payment");
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
            style={{
              padding: 4,
              borderRadius: 12,
              backgroundColor: "#FFFFFF29",
            }}
          >
            <Ionicons name="heart-outline" size={16} color="#FFF" />
          </TouchableOpacity>
        </View>
        <ProgressIndicator
          currentStep={2}
          totalSteps={3}
          label="Shipping Details"
        />
        <View style={styles.form}>
          <FormField
            label="State/Province"
            placeholder="State/Province"
            value={state}
            onChangeText={setState}
          />
          <FormField
            label="City"
            placeholder="City"
            value={city}
            onChangeText={setCity}
          />
          <FormField
            label="Street Address"
            placeholder="Street Address"
            value={streetAddress}
            onChangeText={setStreetAddress}
          />
        </View>
        <CustomButton title="Proceed" handlePress={handleProceed} />
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
  form: {
    marginVertical: 20,
  },
});
export default ShippingDetailsScreen;
