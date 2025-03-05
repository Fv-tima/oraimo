import React, { useContext, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
 ScrollView
} from "react-native";
import { FavoritesContext } from "@/context/FavContext";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const FavoritesScreen = () => {
  const { favorites, setFavorites } = useContext(FavoritesContext); // Assuming setFavorites is available in context
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

  const handleRemoveFavorite = () => {
    setFavorites((prev) =>
      prev.filter((favorite) => favorite.id !== selectedItem.id)
    );
    setModalVisible(false);
    setSelectedItem(null);
  };

  const renderFavoriteItem = ({ item }) => (
    <View style={styles.favoriteItem}>
      <View style={styles.iconContainer}>
        <Image
          source={item.image}
          style={styles.productImage}
          resizeMode="contain"
        />
      </View>
      <View style={styles.favoriteDetails}>
        <Text style={styles.favoriteName}>{item.name}</Text>
        <Text style={styles.favoriteDescription}>{item.model}</Text>
        <Text style={styles.favoriteTime}>${item.price}</Text>
      </View>
      <View>
        <TouchableOpacity
          onPress={() => handleOpenModal(item)}
          style={styles.favIcon}
        >
          <Ionicons name="heart" size={24} color="#90E600" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.cartIcon}>
          <Ionicons name="cart-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={{backgroundColor: "#20221D", flex:1,  paddingBottom:80}}>
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress} style={styles.icon}>
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.profileTitle}>Favorites</Text>
      </View>
      {favorites.length === 0 ? (
        <Text style={styles.noFavorites}>No favorites yet.</Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderFavoriteItem}
          contentContainerStyle={styles.listContent}
        />
      )}

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
              Are you sure you want to remove {selectedItem?.name} from
              favorites? This item will be removed from your favorite list.
            </Text>
            <View style={styles.modalActions}>
              <Text
                style={{ color: "#fff" , fontSize: 14,}}
                onPress={() => setModalVisible(false)}
              >
                Cancel
              </Text>
              <Text style={{ color: "#FA6363", fontSize: 14, }} onPress={handleRemoveFavorite}>
                Remove
              </Text>
            </View>
          </View>
        </View>
      </Modal>
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
  productImage: {
    width: 74,
    height: 74,
  },
  noFavorites: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
  listContent: {
    gap: 10,
  },
  closeButton: {
    alignSelf: "flex-end",
   backgroundColor:"#FFFFFF29",
   padding: 5,
   margin:3,
   borderRadius: 50
  },
  favoriteItem: {
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
  favoriteDetails: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "column",
  },
  favoriteName: {
    color: "#eee",
    fontWeight: "500",
    marginTop: 5,
  },
  favoriteDescription: {
    color: "#8A8A8A",
    fontSize: 14,
    fontWeight: "500",
  },
  favoriteTime: {
    color: "#83D100",
    textAlign: "left",
    fontWeight: "bold",
    fontSize: 16,
  },
  favIcon: {
    backgroundColor: "#FFFFFF29",
    borderRadius: 50,
    padding: 5,
    marginBottom: 10,
  },
  cartIcon: {
    backgroundColor: "#66A300",
    borderRadius: 50,
    padding: 5,
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
});

export default FavoritesScreen;
