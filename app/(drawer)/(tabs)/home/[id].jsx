import React, { useState, useContext } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { products } from "@/constants/data";
import { Ionicons } from "@expo/vector-icons";
import images from "@/constants/images";
import { FavoritesContext } from "@/context/FavContext";

// Review Card Component
const ReviewCard = ({ name, date, rating, comment, image }) => {
  const renderStars = () => {
    return [...Array(5)].map((_, index) => (
      <Ionicons
        key={index}
        name={index < rating ? "star" : "star-outline"}
        size={16}
        color={index < rating ? "#FFC90C" : "#4A4A4A"}
        style={{ marginRight: 2 }}
      />
    ));
  };

  return (
    <View style={styles.reviewCard}>
      <View style={styles.reviewHeader}>
        <Image source={image} style={styles.reviewerImage} />
        <View style={styles.reviewerInfo}>
          <Text style={styles.reviewerName}>{name}</Text>
          <View style={styles.reviewStats}>
            <View style={styles.starContainer}>{renderStars()}</View>
            <Text style={styles.reviewDate}>{date}</Text>
          </View>
        </View>
      </View>
      <Text style={styles.reviewText}>{comment}</Text>
    </View>
  );
};

// Product Gallery Component
const ProductGallery = ({ mainImage, galleryImages }) => (
  <>
    <Image source={mainImage} style={styles.mainImage} />
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.galleryContainer}
    >
      {galleryImages.map((image, index) => (
        <Image
          key={index}
          source={image}
          style={styles.galleryImage}
        />
      ))}
    </ScrollView>
  </>
);

// Product Header Component
const ProductHeader = ({ onBack, title }) => (
  <View style={styles.header}>
    <TouchableOpacity onPress={onBack}>
      <Ionicons name="arrow-back" size={24} color="#fff" />
    </TouchableOpacity>
    <Text style={styles.headerTitle}>{title}</Text>
    <TouchableOpacity>
      <Ionicons name="heart-outline" size={24} color="#fff" />
    </TouchableOpacity>
  </View>
);

// Main Component
const ProductDetails = () => {
  const { toggleCart } = useContext(FavoritesContext); 
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState("description");
  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return <Text style={styles.notFound}>Product not found</Text>;
  }

  const galleryImages = [images.watch, images.watch, images.watch, images.watch, images.watch];

  const descriptionContent = (
    <>
      <Text style={styles.sectionTitle}>Uniqueness</Text>
      <Text style={styles.feature}>• 40-hour Playtime</Text>
      <Text style={styles.feature}>• AniFast™ Fast Charge</Text>
      <Text style={styles.feature}>• oraimo Signature Sound</Text>
      <Text style={styles.feature}>• 2-mic ENC Technology</Text>
      <Text style={styles.feature}>• Customize Listening with oraimo Sound App</Text>
      <Text style={styles.feature}>• Low-latency Game Mode</Text>
      
      <Text style={styles.sectionTitle}>Customer Service</Text>
      <Text style={styles.feature}>• 24/7 Support</Text>
      <Text style={styles.feature}>• Warranty Information</Text>
      <Text style={styles.feature}>• Return Policy</Text>
    </>
  );

  const customerContent = (
    <View style={styles.customerReviewsContainer}>
      <TouchableOpacity style={styles.reviewButton}>
        <Ionicons name="create-outline" size={24} color="#90E600" />
        <Text style={styles.reviewButtonText}>Review product</Text>
      </TouchableOpacity>
      
      <ReviewCard
        name="Wittiq lyon"
        date="3/15/2023"
        rating={5}
        comment="Your work is a masterpiece of creativity, elegance, and attention to detail. Truly awe-inspiring and extraordinary!"
        image={images.avatar}
      />
      
      <ReviewCard
        name="Jane Cooper"
        date="3/10/2023"
        rating={4}
        comment="Great product! The quality exceeded my expectations. Would definitely recommend."
        image={images.avatar}
      />
      
      <ReviewCard
        name="Robert Fox"
        date="3/5/2023"
        rating={5}
        comment="Absolutely love it! Perfect fit and amazing features."
        image={images.avatar}
      />
    </View>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <ProductHeader onBack={() => router.back()} title="Product details" />
      <ProductGallery mainImage={product.image} galleryImages={galleryImages} />

      <ScrollView style={styles.detailsContainer} showsVerticalScrollIndicator={false}>
        {/* Product Info */}
        <View style={styles.row}>
          <Text style={styles.productTitle}>
            {product.name} {product.model}
          </Text>
          <TouchableOpacity style={styles.view3DButton}>
            <Text style={styles.view3DText}>View 3D</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.subtitle}>
          Call Quickly Reply Health Monitor Smart Watch
        </Text>

        {/* Rating Summary */}
        <View style={styles.row}>
          <View style={styles.ratingContainer}>
            {[...Array(5)].map((_, index) => (
              <Ionicons
                key={index}
                name={index < 4 ? "star" : "star-outline"}
                size={16}
                color={index < 4 ? "#FFC90C" : "#4A4A4A"}
              />
            ))}
            <Text style={styles.reviews}>1,543 Reviews</Text>
          </View>
        </View>

        <Text style={styles.price}>$15</Text>

        {/* Tabs */}
        <View style={styles.tabContainer}>
          {["description", "customer"].map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setSelectedTab(tab)}
              style={[styles.tab, selectedTab === tab && styles.activeTab]}
            >
              <Text style={styles.tabText}>
                {tab === "description" ? "Descriptions" : "Customer service"}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Tab Content */}
        <View style={styles.content}>
          {selectedTab === "description" ? descriptionContent : customerContent}
        </View>
      </ScrollView>

      {/* Bottom Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.addToCartButton} onPress={() => toggleCart(product)}>
          <Text style={styles.buttonTextCart}>Add to cart</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buyNowButton} onPress={() => toggleCart(product)}>
          <Text style={styles.buttonText}>Buy it now</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#20221D",
    paddingTop: 10,
    paddingBottom:50
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
  mainImage: {
    width: "100%",
    height: 250,
    resizeMode: "contain",
  },
  galleryContainer: {
    paddingHorizontal: 10,
    gap: 20,
  },
  galleryImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  detailsContainer: {
    padding: 20,
    backgroundColor: "#060A00",
    marginTop: 20,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderTopWidth: 1,
    borderTopColor: "#FFFFFF7D",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  productTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  view3DButton: {
    backgroundColor: "#FFFFFF21",
    padding: 10,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: "#FFFFFF54",
  },
  view3DText: {
    color: "#90E600",
    fontSize: 14,
    fontWeight: "500",
  },
  subtitle: {
    color: "#A0A0A0",
    fontSize: 14,
    marginTop: 5,
    fontWeight: "500",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  reviews: {
    color: "#A0A0A0",
    marginLeft: 6,
    fontSize: 14,
    fontWeight: "500",
  },
  price: {
    color: "#83D100",
    fontSize: 32,
    fontWeight: "600",
    marginTop: 10,
  },
  tabContainer: {
    flexDirection: "row",
    marginTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#2A2A2A",
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#83D100",
  },
  tabText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
  content: {
    marginTop: 15,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 5,
    marginTop: 15,
  },
  feature: {
    color: "#E6E6E6",
    fontSize: 14,
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    paddingBottom: 80,
  },
  addToCartButton: {
    flex: 1,
    padding: 12,
    backgroundColor: "transparent",
    alignItems: "center",
    borderRadius: 6,
    marginRight: 10,
  },
  buyNowButton: {
    flex: 1,
    padding: 12,
    backgroundColor: "#83D100",
    alignItems: "center",
    borderRadius: 6,
  },
  buttonText: {
    color: "#333333",
    fontSize: 16,
    fontWeight: "600",
  },
  buttonTextCart: {
    color: "#83D100",
    fontSize: 16,
    fontWeight: "600",
  },
  // New Review Styles
  customerReviewsContainer: {
    marginTop: 20,
  },
  reviewButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: 10,
    marginBottom: 20,
  },
  reviewButtonText: {
    color: "#90E600",
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 8,
  },
  reviewCard: {
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderBottomColor: "#F2F2F2",
  },
  reviewHeader: {
    flexDirection: "row",
    marginBottom: 12,
  },
  reviewerImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  reviewerInfo: {
    flex: 1,
  },
  reviewerName: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 4,
  },
  reviewStats: {
    flexDirection: "row",
    alignItems: "center",
  },
  starContainer: {
    flexDirection: "row",
    marginRight: 8,
  },
  reviewDate: {
    color: "#A0A0A0",
    fontSize: 10,
  },
  reviewText: {
    color: "#E6E6E6",
    fontSize: 14,
    lineHeight: 20,
  },
  notFound: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
});

export default ProductDetails;