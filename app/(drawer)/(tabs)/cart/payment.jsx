import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView
} from "react-native";
import { FavoritesContext } from "@/context/FavContext";
import ProgressIndicator from "@/components/ProgressIndicator";
import { router, useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import CustomButton from "@/components/CustomButton";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const PaymentMethod = () => {
    const { cart } =
      useContext(FavoritesContext);


  const handleProceed = () => {
    router.push("/cart/card");
  };

  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.goBack();
  };
  const [selected, setSelected] = useState(null);

  const options = [
    { id: "debit", label: "Debit card", description: "Pay using Mastercard, Visa, or Verve card", icon: "credit-card" },
    { id: "bank", label: "Bank transfer", description: "Make transfer to our bank account number", icon: "account-balance" },
    { id: "cash", label: "Cash on delivery", description: "Pay cash after delivery", icon: "attach-money" }
  ];
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
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
        <Text style={styles.profileTitle}>Payment</Text>
        <TouchableOpacity
          onPress={handleBackPress}
          style={{ padding: 4, borderRadius: 12, backgroundColor:"#FFFFFF29"}}
        >
          <Ionicons name="heart-outline" size={16} color="#FFF" />
        </TouchableOpacity>
      </View>
      <ProgressIndicator currentStep={3} totalSteps={3} label="Payment Method"/>
      <View style={styles.form}>
      {options.map((option) => (
        <TouchableOpacity 
          key={option.id} 
          style={[styles.option, selected === option.id && styles.selectedOption]} 
          onPress={() => setSelected(option.id)}
        >
          <MaterialIcons name={option.icon} size={24} color="#76b900" />
          <View style={styles.textContainer}>
            <Text style={styles.label}>{option.label}</Text>
            <Text style={styles.description}>{option.description}</Text>
          </View>
          <View style={styles.radio}>
            {selected === option.id && <View style={styles.radioSelected} />}
          </View>
        </TouchableOpacity>
      ))}
    </View>
    <View style={styles.summaryContainer}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Product price</Text>
            <Text style={styles.summaryValue}>${calculateTotal()}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>VAT</Text>
            <Text style={styles.summaryValue}>$50</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Pickup/delivery</Text>
            <Text style={styles.summaryValue}>$1350</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={{ color: "#fff", fontSize: 16, fontWeight: "500" }}>
              Total
            </Text>
            <Text style={styles.summaryTotal}>
              ${calculateTotal() + 50 + 1350}
            </Text>
          </View>
        </View>

        {/* Proceed to Checkout Button */}
        <CustomButton
          title="Proceed to Checkout"
          handlePress={handleProceed}
          containerStyles={styles.checkoutButton}
        />
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
  option: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#161616",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10
  },
  selectedOption: {
    borderColor: "#76b900",
    borderWidth: 1
  },
  textContainer: {
    flex: 1,
    marginLeft: 10
  },
  label: {
    color: "#fff",
    fontSize: 14,
    fontWeight: 500
  },
  description: {
    color: "#8A8A8A",
    fontSize: 14
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#76b900",
    alignItems: "center",
    justifyContent: "center"
  },
  radioSelected: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#76b900"
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
},
summaryContainer: {
  backgroundColor: "#32362C",
  borderRadius: 10,
  padding: 20,
  marginHorizontal: 8,
},
summaryRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  marginBottom: 10,
},
summaryLabel: {
  color: "#B0B0B0",
  fontWeight: "500",
},
summaryValue: {
  color: "#B0B0B0",
  fontWeight: "500",
},
summaryTotal: {
  color: "#fff",
  fontSize: 16,
  fontWeight: "700",
},
checkoutButton:{
  marginTop: 20,
  width:"90%",
  marginHorizontal:"auto"
}
});

export default PaymentMethod;
