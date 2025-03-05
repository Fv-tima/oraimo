import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal
} from "react-native";
import { FavoritesContext } from "@/context/FavContext";
import ProgressIndicator from "@/components/ProgressIndicator";
import { router, useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import CustomButton from "@/components/CustomButton";
import FormField from "@/components/FormField";
import { SafeAreaView } from "react-native-safe-area-context";

const CardDetails = () => {
  const [number, setNumber] = useState("");
  const [cvv, setCvv] = useState("");
  const [date, setDate] = useState("");
  const { cart } = useContext(FavoritesContext);

  const [modalVisible, setModalVisible] = useState(false);
  const [secondModalVisible, setSecondModalVisible] = useState(false);

  const handleProceed = () => {
    setModalVisible(true);
  };

  const handleSecondModalOpen = () => {
    setSecondModalVisible(true);
  };

  const handleConfirmPayment = () => {
    setSecondModalVisible(false);
    setModalVisible(false);
    router.push("/home/product"); 
  };

  const handleHome = () => {
    setSecondModalVisible(false);
    setModalVisible(false);
    router.push("/home"); 
  };

  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.goBack();
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#20221D", flex: 1, paddingBottom: 80 }}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBackPress} style={styles.icon}>
            <Ionicons name="arrow-back" size={24} color="#FFF" />
          </TouchableOpacity>
          <Text style={styles.profileTitle}>Checkout</Text>
          <TouchableOpacity onPress={handleBackPress} style={styles.heartIcon}>
            <Ionicons name="heart-outline" size={16} color="#FFF" />
          </TouchableOpacity>
        </View>

        <ProgressIndicator currentStep={3} totalSteps={3} label="Payment Method" />

        <View style={styles.form}>
          <FormField label="Input card number" placeholder="Card number" value={number} onChangeText={setNumber} keyboardType="phone-pad" />
          <FormField label="Enter CVV" placeholder="CVV" value={cvv} onChangeText={setCvv} keyboardType="phone-pad" />
          <FormField label="Expiry date" placeholder="DD/MM/YY" value={date} onChangeText={setDate} keyboardType="phone-pad" />
        </View>

        <TouchableOpacity style={styles.summaryContainer}>
          <View style={styles.leftSection}>
            <Ionicons name="cart-outline" size={24} color="#828282" />
            <Text style={styles.summaryText}>Cart Summary</Text>
            <Ionicons name="chevron-down-outline" size={16} color="#828282" />
          </View>
          <Text style={styles.summaryPrice}>${calculateTotal()}</Text>
        </TouchableOpacity>

        <CustomButton title="Proceed to Checkout" handlePress={handleProceed} containerStyles={styles.checkoutButton} />
      </ScrollView>

      <Modal transparent visible={modalVisible} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Pay money</Text>
            <View style={styles.modalDivider} />
            <Text style={styles.modalMessage}>
              Are you sure you want to make a payment of ${calculateTotal()} for Oraimo pod? <Text style={{ fontWeight: 300 }}>This amount will be deducted from the selected mode of payment.</Text> 
            </Text>

            <CustomButton title="Proceed" handlePress={handleSecondModalOpen} containerStyles={styles.checkoutButton} />

            <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal transparent visible={secondModalVisible} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
          <Ionicons name="checkmark-circle" size={50} color="#90E600" style={{alignSelf:"center"}} />
            <Text style={{textAlign:"center", fontSize:24, fontWeight:500, color:"#ffffff"}}>Payment successful!!</Text>
            <Text style={{textAlign:"center", fontSize:16, color:"#ffffff", marginTop:10}}>
            Thanks for placing an order. Your payment is successful
            </Text>

            <CustomButton title="Go to Order" handlePress={handleConfirmPayment} containerStyles={styles.checkoutButton} />
            <TouchableOpacity style={styles.cancelButton} onPress={handleHome}>
              <Text style={styles.cancelText}>Back to home</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  heartIcon: {
    padding: 4,
    borderRadius: 12,
    backgroundColor: "#FFFFFF29",
  },
  form: {
    marginVertical: 20,
  },
  summaryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#0d0d0d",
    borderColor: "#76b900",
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  summaryText: {
    color: "#E6E6E6",
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 5,
    marginRight: 3,
  },
  summaryPrice: {
    color: "#90E600",
    fontSize: 16,
    fontWeight: "bold",
  },
  checkoutButton: {
    marginTop: 20,
    width: "90%",
    alignSelf: "center",
  },
  secondModalButton: {
    marginTop: 20,
    width: "90%",
    alignSelf: "center",
    backgroundColor: "#76b900",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom:100
  },
  modalContainer: {
    backgroundColor: "#0d0d0d",
    width: "90%",
    borderRadius: 10,
    padding: 20,
    borderColor: "#FFFFFF66",
    borderWidth: 1,
  },
  modalTitle: {
    color: "#F5A633",
    fontSize: 18,
  },
  modalDivider: {
    width: "100%",
    height: 1.5,
    backgroundColor: "#EEF1F5",
    marginVertical: 10,
  },
  modalMessage: {
    color: "#fff",
    fontSize: 14,
    marginVertical: 20,
    fontWeight: "500",
  },
  proceedButton: {
    backgroundColor: "#76b900",
    width: "100%",
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: "center",
  },
  proceedText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
  cancelButton: {
    marginTop: 10,
  },
  cancelText: {
    color: "#90E600",
    fontSize: 16,
    fontWeight: "bold",
    textAlign:"center"
  },
});

export default CardDetails;