import { View, Text, ScrollView, StyleSheet, Image } from "react-native";
import HomeHeader from "@/components/HomeHeader";
import React from "react";
import CategoryBar from "@/components/Categories";
import PopularProducts from "@/components/PopularProducts";
import { SafeAreaView } from "react-native-safe-area-context";

const home = () => {
  return (
    <SafeAreaView style={{ backgroundColor: "#20221D", flex: 1 }}>
      <HomeHeader />
      <View style={styles.container}>
        <View style={styles.banner}>
          <Image
            source={require("../../../../assets/images/banner.png")}
            style={styles.banner}
          />
        </View>
        <CategoryBar />
        <PopularProducts />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    color: "white",
    padding: 8,
  },
  banner: {
    borderRadius: 8,
    borderColor: "#090E00",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default home;
