import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, ScrollView } from 'react-native';
import ProductCard from './ProductsCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import { products } from "@/constants/data";
const PopularProducts = () => {
 const popular = products.sort(() => 0.5 - Math.random()) 
  .slice(0, 4); 

return (
  <View style={{marginTop:20}}>
    <View style={{flexDirection:"row", justifyContent:"space-between"}}>
      <Text style={{color:"white", fontSize:18, fontWeight:600}}>Popular</Text>
      <Text style={{color:"#90E600", fontSize:14, fontWeight:600}}>See all</Text>
    </View>
<FlatList
          data={popular}
          renderItem={({ item }) => <ProductCard product={item} />}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.productGrid}
          showsVerticalScrollIndicator={false}
        />
</View>
);
};

const styles = StyleSheet.create({
productGrid: {
    justifyContent: 'space-between',
    marginTop: 20,
    paddingBottom:80
},
})



export default PopularProducts;