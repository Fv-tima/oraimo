import React, { useContext } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { FavoritesContext } from '@/context/FavContext';

const ProductCard = ({ product }) => {
  const { favorites, toggleFavorite, toggleCart } = useContext(FavoritesContext);
  const isFavorite = favorites.some(fav => fav.id === product.id);
  const router = useRouter();

  return (
    <TouchableOpacity 
      style={styles.productCard} 
      onPress={() => router.push(`/home/${product.id}`)}
    >
      <View style={styles.imageContainer}>
        <Image source={product.image} style={styles.productImage} resizeMode="contain" />
        <TouchableOpacity style={styles.favoriteButton} onPress={() => toggleFavorite(product)}>
          <Icon name={isFavorite ? 'heart' : 'heart-outline'} size={16} color={isFavorite ? '#90E600' : 'white'} />
        </TouchableOpacity>
      </View>
      <View style={styles.producttitle}>
        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.productModel}>{product.model}</Text>
        <Text style={styles.productPrice}>${product.price}</Text>
        <TouchableOpacity style={styles.cartButton} onPress={() => toggleCart(product)}>
          <Icon name="cart-outline" size={16} color="white" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  productCard: {
    flex: 1,
    backgroundColor: '#FFFFFF00',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: "#FFFFFF2B",
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 152,
  },
  productImage: {
    width: '100%',
    height: 152,
  },
  favoriteButton: {
    position: 'absolute',
    top: 2,
    right: 0,
    backgroundColor: '#FFFFFF29',
    borderRadius: 15,
    padding: 5,
  },
  producttitle: {
    backgroundColor: "#FFFFFF0D",
    marginTop: 20,
    padding: 16,
  },
  cartButton: {
    backgroundColor: '#4F7F00',
    borderRadius: 30,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    right: 15,
  },
  productName: {
    color: '#eee',
    fontWeight: '500',
    marginTop: 5,
  },
  productPrice: {
    color: '#83D100',
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 10,
  },
  productModel: {
    color: "#8A8A8A",
    fontSize: 14,
    fontWeight: '500',
  },
});

export default ProductCard;
