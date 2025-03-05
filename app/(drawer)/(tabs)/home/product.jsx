import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
  Slider,
} from "react-native";
import ProductCard from "@/components/ProductsCard";
import { Ionicons } from "@expo/vector-icons";
import CategoryBar from "@/components/Categories";
import { FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { products } from "@/constants/data";

const Product = () => {
  const navigation = useNavigation();
  const handleBackPress = () => {
    navigation.goBack();
  };
  const [modalVisible, setModalVisible] = useState(false);
  const [price, setPrice] = useState(10);
  const [modelDateFrom, setModelDateFrom] = useState("");
  const [modelDateTo, setModelDateTo] = useState("");

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
      <View style={styles.container}>
        {/* Header Section */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBackPress} style={styles.icon}>
            <Ionicons name="arrow-back" size={24} color="#FFF" />
          </TouchableOpacity>
          <TextInput
            style={styles.searchBar}
            placeholder="Search anything on AlphaSearch"
            placeholderTextColor="#666"
          />
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Ionicons name="options-outline" size={24} color="#83D100" style={styles.icon} />
          </TouchableOpacity>
        </View>

        <CategoryBar />

        {/* Products Grid */}
        <FlatList
          data={products}
          renderItem={({ item }) => <ProductCard product={item} />}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.productGrid}
          showsVerticalScrollIndicator={false}
        />

        {/* Filter Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              {/* Close Button */}
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Ionicons name="close-outline" size={24} color="#FFF" />
              </TouchableOpacity>

              <Text style={styles.modalTitle}>Filter</Text>

              {/* Price Slider */}
              <View style={styles.sliderContainer}>
                <Text style={styles.sliderLabel}>Price</Text>
                <Text style={styles.sliderValue}>${price}</Text>
              </View>

              {/* Model Date Inputs */}
              <View style={styles.dateContainer}>
                <Text style={styles.dateLabel}>Model Date</Text>
                <View style={styles.dateInputContainer}>
                  <TextInput
                    style={styles.dateInput}
                    placeholder="From"
                    placeholderTextColor="#666"
                    value={modelDateFrom}
                    onChangeText={setModelDateFrom}
                  />
                  <TextInput
                    style={styles.dateInput}
                    placeholder="To"
                    placeholderTextColor="#666"
                    value={modelDateTo}
                    onChangeText={setModelDateTo}
                  />
                </View>
              </View>

              {/* Apply Button */}
              <TouchableOpacity style={styles.applyButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.applyButtonText}>Apply</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 20,
    paddingBottom: 80,
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
  searchBar: {
    flex: 1,
    backgroundColor: "#333",
    borderRadius: 10,
    marginHorizontal: 10,
    paddingHorizontal: 15,
    color: "#FFF",
    height: 40,
  },
  productGrid: {
    justifyContent: "space-between",
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    backgroundColor: "#111",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  closeButton: {
    alignSelf: "flex-end",
  },
  modalTitle: {
    fontSize: 18,
    color: "#FFF",
    fontWeight: "bold",
    marginBottom: 20,
  },
  sliderContainer: {
    marginBottom: 20,
  },
  sliderLabel: {
    fontSize: 16,
    color: "#FFF",
    marginBottom: 10,
  },
  sliderValue: {
    color: "#FFF",
    textAlign: "right",
    marginTop: 5,
  },
  dateContainer: {
    marginBottom: 20,
  },
  dateLabel: {
    fontSize: 16,
    color: "#FFF",
    marginBottom: 10,
  },
  dateInputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dateInput: {
    flex: 1,
    backgroundColor: "#222",
    color: "#FFF",
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 40,
    marginHorizontal: 5,
  },
  applyButton: {
    backgroundColor: "#83D100",
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: "center",
  },
  applyButtonText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default Product;