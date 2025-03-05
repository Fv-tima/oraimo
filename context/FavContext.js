import React, { useState, useEffect, createContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

export const FavoritesContext = createContext({
  favorites: [],
  toggleFavorite: () => {},
  cart: [],
  toggleCart: () => {},
  increaseCartItem: () => {},
  decreaseCartItem: () => {},
});

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [cart, setCart] = useState([]);

  // Load favorites from AsyncStorage
  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const storedFavorites = await AsyncStorage.getItem("favorites");
        setFavorites(storedFavorites ? JSON.parse(storedFavorites) : []);
      } catch (error) {
        console.error("Error loading favorites:", error.message);
        setFavorites([]);
      }
    };
    loadFavorites();
  }, []);

  // Save favorites to AsyncStorage
  useEffect(() => {
    const saveFavorites = async () => {
      try {
        await AsyncStorage.setItem("favorites", JSON.stringify(favorites));
      } catch (error) {
        console.error("Error saving favorites:", error.message);
      }
    };
    saveFavorites();
  }, [favorites]);

  // Toggle favorite
  const toggleFavorite = (product) => {
    const updatedFavorites = favorites.some((fav) => fav.id === product.id)
      ? favorites.filter((fav) => fav.id !== product.id)
      : [...favorites, product];
    setFavorites(updatedFavorites);
  };

  // Load cart from AsyncStorage
  useEffect(() => {
    const loadCart = async () => {
      try {
        const storedCart = await AsyncStorage.getItem("cart");
        setCart(storedCart ? JSON.parse(storedCart) : []);
      } catch (error) {
        console.error("Error loading cart:", error.message);
        setCart([]);
      }
    };
    loadCart();
  }, []);

  // Save cart to AsyncStorage
  useEffect(() => {
    const saveCart = async () => {
      try {
        await AsyncStorage.setItem("cart", JSON.stringify(cart));
      } catch (error) {
        console.error("Error saving cart:", error.message);
      }
    };
    saveCart();
  }, [cart]);

const toggleCart = (product) => {
  const isInCart = cart.some((item) => item.id === product.id);
  const updatedCart = isInCart
    ? cart.filter((item) => item.id !== product.id)
    : [...cart, { ...product, quantity: 1 }];

  setCart(updatedCart);

  // Show alert
  Alert.alert(
    "Cart Update",
    isInCart ? "Item removed from cart" : "Item added to cart",
    [{ text: "OK" }]
  );
};
  // Increase cart item quantity
  const increaseCartItem = (productId) => {
    const updatedCart = cart.map((item) =>
      item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updatedCart);
    
  };

  // Decrease cart item quantity
  const decreaseCartItem = (productId) => {
    const updatedCart = cart
      .map((item) =>
        item.id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0);
    setCart(updatedCart);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        toggleFavorite,
        cart,
        toggleCart,
        increaseCartItem,
        decreaseCartItem,
        setCart, setFavorites
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
