import React, { useContext, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  ScrollView,
} from "react-native";
import { FavoritesContext } from "@/context/FavContext";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/CustomButton";

const CartScreen = () => {
  const { cart, setCart, increaseCartItem, decreaseCartItem } =
    useContext(FavoritesContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleOpenModal = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const handleRemoveFromCart = () => {
    setCart((prev) => prev.filter((item) => item.id !== selectedItem.id));
    setModalVisible(false);
    setSelectedItem(null);
  };

  const proceed = () => {
    router.push("/cart/personal");
  };

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <View style={styles.iconContainer}>
        <Image
          source={item.image}
          style={styles.productImage}
          resizeMode="contain"
        />
      </View>
      <View style={styles.cartDetails}>
        <Text style={styles.cartName}>{item.name}</Text>
        <Text style={styles.cartDescription}>{item.model}</Text>
        <Text style={styles.cartPrice}>${item.price * item.quantity}</Text>
      </View>
      <View>
        <TouchableOpacity
          onPress={() => handleOpenModal(item)}
          style={styles.removeIcon}
        >
          <Ionicons name="close" size={16} color="#fff" />
        </TouchableOpacity>
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            onPress={() => decreaseCartItem(item.id)}
            style={{
              color: "#333333",
              marginHorizontal: 10,
              backgroundColor: "#90E600",
              padding: 5,
              borderRadius: 29,
            }}
          >
            <Ionicons name="remove" size={16} color="#333333" />
          </TouchableOpacity>
          <Text style={styles.quantityText}>{item.quantity}</Text>
          <TouchableOpacity
            onPress={() => increaseCartItem(item.id)}
            style={{
              color: "#333333",
              marginHorizontal: 10,
              backgroundColor: "#90E600",
              padding: 5,
              borderRadius: 29,
            }}
          >
            <Ionicons name="add" size={16} color="#333333" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#20221D", flex: 1 }}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBackPress} style={styles.icon}>
            <Ionicons name="arrow-back" size={24} color="#FFF" />
          </TouchableOpacity>
          <Text style={styles.profileTitle}>Cart</Text>
        </View>

        {/* Scrollable Product List */}
        <ScrollView
          style={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          {cart.length === 0 ? (
            <Text style={styles.noItems}>No items in cart.</Text>
          ) : (
            <FlatList
              data={cart}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderCartItem}
              contentContainerStyle={styles.listContent}
              scrollEnabled={false} // Disable scrolling for FlatList inside ScrollView
            />
          )}
        </ScrollView>

        {/* Fixed Summary Container */}
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
          handlePress={proceed}
          containerStyles={styles.checkoutButton}
        />
      </View>

      {/* Modal */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Ionicons name="close-outline" size={24} color="#FFF" />
            </TouchableOpacity>
            <Text style={styles.modalMessage}>
              Are you sure you want to remove {selectedItem?.name} from your
              cart?
            </Text>
            <View style={styles.modalActions}>
              <Text
                style={{ color: "#fff", fontSize: 14 }}
                onPress={() => setModalVisible(false)}
              >
                Cancel
              </Text>
              <Text
                style={{ color: "#FA6363", fontSize: 14 }}
                onPress={handleRemoveFromCart}
              >
                Remove
              </Text>
            </View>
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
    padding: 8,
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
  scrollContainer: {
    flex: 1,
    marginBottom: 300,
  },
  productImage: {
    width: 74,
    height: 74,
  },
  noItems: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
  listContent: {
    gap: 10,
  },
  cartItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#060A00",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  iconContainer: {
    marginRight: 10,
    backgroundColor: "#FFFFFF1A",
    borderColor: "#FFFFFF00",
    borderWidth: 1,
    borderRadius: 10,
    padding: 2,
  },
  cartDetails: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "column",
  },
  cartName: {
    color: "#eee",
    fontWeight: "500",
    marginTop: 5,
  },
  cartDescription: {
    color: "#8A8A8A",
    fontSize: 14,
    fontWeight: "500",
  },
  cartPrice: {
    color: "#83D100",
    textAlign: "left",
    fontWeight: "bold",
    fontSize: 16,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  quantityText: {
    color: "#fff",
    fontWeight: "500",
  },
  removeIcon: {
    backgroundColor: "#FFFFFF29",
    borderRadius: 50,
    padding: 5,
    position: "absolute",
    top: "-40%",
    left: "91%",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "#00000073",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#00000073",
    paddingVertical: 20,
    borderRadius: 10,
    width: "80%",
    borderWidth: 1,
    borderColor: "#FFFFFF2B",
  },
  modalMessage: {
    fontSize: 14,
    color: "#fff",
    marginBottom: 20,
    textAlign: "center",
    padding: 20,
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    padding: 20,
    borderTopColor: "#FFFFFF2B",
    paddingBottom: 0,
    paddingHorizontal: 40,
  },
  summaryContainer: {
    position: "absolute",
    bottom: 150, 
    left: 0,
    right: 0,
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
  checkoutButton: {
    position: "absolute",
    bottom: 80, 
    left: 8,
    right: 8,
  },
  closeButton:{
    position: "absolute",
    top: 8,
    right: 10,
    backgroundColor: "#32362C",
    padding: 5,
    borderRadius: 50,
  }
});

export default CartScreen;