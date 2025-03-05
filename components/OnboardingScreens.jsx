import React, { useRef } from "react";
import { StatusBar, View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedScrollHandler,
  interpolate,
  withSpring,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import CustomButton from "./CustomButton";
import images from "@/constants/images";
import { useRouter } from "expo-router";

const { width, height } = Dimensions.get("window");

export default function OnboardingScreen() {
  const router = useRouter();
  const scrollX = useSharedValue(0); // Reanimated shared value for scroll position
  const flatListRef = useRef(null); // Ref for FlatList

  // Onboarding Data
  const onboardingData = [
    {
      id: "1",
      title: "Buy all Oraimo products at your comfort home",
      description:
        "Lorem ipsum dolor sit amet consectetur. Suscipit nulla convallis amet tristique nisi ipsum massa. Ut tincidunt amet et.",
      image: images.onboard1,
    },
    {
      id: "2",
      title: "Buy all Oraimo products at your comfort home",
      description:
        "Lorem ipsum dolor sit amet consectetur. Suscipit nulla convallis amet tristique nisi ipsum massa. Ut tincidunt amet et.",
      image: images.onboard2,
    },
    {
      id: "3",
      title: "Locate any Oraimo agent around you",
      description:
        "Lorem ipsum dolor sit amet consectetur. Suscipit nulla convallis amet tristique nisi ipsum massa. Ut tincidunt amet et.",
      image: images.onboard3,
    },
  ];

  // Navigate to Auth Screen
  const navigateToAuth = () => {
    router.push("/login");
  };

  // Handle Scroll Events
  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
  });

  // Render Onboarding Slide
  const renderSlide = ({ item }) => (
    <View style={[styles.slide, { width }]}>
      <View style={styles.imageContainer}>
        <Image source={item.image} style={styles.image} resizeMode="contain" />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  );

  // Animated Pagination Dots
  const Pagination = () => {
    return (
      <View style={styles.pagination}>
        {onboardingData.map((_, index) => {
          const animatedStyle = useAnimatedStyle(() => {
            const dotWidth = interpolate(
              scrollX.value,
              [(index - 1) * width, index * width, (index + 1) * width],
              [10, 20, 10],
              "clamp"
            );
            const dotOpacity = interpolate(
              scrollX.value,
              [(index - 1) * width, index * width, (index + 1) * width],
              [0.5, 1, 0.5],
              "clamp"
            );
            return {
              width: dotWidth,
              opacity: dotOpacity,
            };
          });

          return (
            <Animated.View key={index} style={[styles.dot, animatedStyle]} />
          );
        })}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={20} color="#FFFFFF" />
        </TouchableOpacity>
        <TouchableOpacity onPress={navigateToAuth} style={styles.skipButton}>
          <Text style={styles.headerTitle}>Skip</Text>
          <Ionicons name="chevron-forward-outline" size={20} color="#90E600" />
          <Ionicons
            name="chevron-forward-outline"
            size={20}
            color="#90E600"
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>

      {/* Onboarding Slides */}
      <Animated.FlatList
        ref={flatListRef}
        data={onboardingData}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        renderItem={renderSlide}
      />

      {/* Pagination */}
      <Pagination />

      {/* Action Button */}
      <CustomButton
        title={
          scrollX.value >= (onboardingData.length - 1) * width
            ? "Get Started"
            : "Next"
        }
        handlePress={navigateToAuth}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#111",
  },
  backButton: {
    backgroundColor: "#23251F",
    padding: 10,
    borderRadius: 10,
  },
  skipButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  icon: {
    marginLeft: -10,
  },
  headerTitle: {
    fontSize: 18,
    color: "#90E600",
    fontWeight: "bold",
    marginLeft: 10,
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    flex: 0.7,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: width * 0.8,
    height: height * 0.4,
  },
  textContainer: {
    flex: 0.3,
    paddingHorizontal: 20,
    alignItems: "flex-start",
  },
  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    color: "#aaa",
    fontSize: 16,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  dot: {
    height: 10,
    borderRadius: 5,
    backgroundColor: "#90E600",
    marginHorizontal: 5,
  },
});