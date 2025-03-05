import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Import Ionicons
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const categories = [
  { id: 'audio', name: 'audio', iconName: 'headset-outline' }, // Use Ionicons names
  { id: 'wearable', name: 'Wearable', iconName: 'watch-outline' },
  { id: 'powers', name: 'Powers', iconName: 'battery-charging-outline' },
  { id: 'lifestyle', name: 'L', iconName: 'heart-outline' }, // Example lifestyle icon
];

const CategoryBar = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const router = useRouter();

  const handleCategoryPress = (categoryId) => {
    setActiveCategory(categoryId);
    router.push('/home/product');
  };

  return (
    <View>
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContainer}
    >
      {categories.map((category) => (
        <TouchableOpacity
          key={category.id}
          style={[
            styles.categoryButton,
            activeCategory === category.id && { borderColor: '#90E600', borderWidth: 2 },
          ]}
          onPress={() => handleCategoryPress(category.id)}
        >
          <Icon name={category.iconName} size={20} color="#83D100" style={styles.categoryIcon} /> 
          <Text style={styles.categoryText}>{category.name}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 10,
    marginVertical: 20
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    opacity: 0.7,
  },
  categoryIcon: {
    marginRight: 5,
  },
  categoryText: {
    color: '#eee',
  },
});

export default CategoryBar;
