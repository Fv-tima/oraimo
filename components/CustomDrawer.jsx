import * as React from "react";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
} from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import Drawer from "expo-router/drawer";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Link, router, useSegments } from "expo-router";
import images from "@/constants/images";

const CustomDrawer = () => {
  const segments = useSegments();

  const isActive = (route) => segments[segments.length - 1] === route;
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#20221D",
        padding: 20,
        paddingTop: 40,
      }}
    >
      <DrawerContentScrollView>
        <View>
          <Image source={images.splash} style={styles.image} />
        </View>
        <View style={styles.container}>
          <DrawerItem
            label={() => <Text style={styles.activeLabel}>Nearby agents</Text>}
            icon={() => (
              <Ionicons name="person-add-outline" color="#90E600" size={21} />
            )}
            style={styles.activeItem}
            onPress={() => router.push("/home")}
          />
          <DrawerItem
            label={() => <Text style={styles.activeLabel}>Track order</Text>}
            icon={() => (
              <Ionicons name="location-outline" color="#90E600" size={21} />
            )}
            style={styles.activeItem}
            onPress={() => router.push("/home")}
          />
          <DrawerItem
            label={() => <Text style={styles.activeLabel}>Order history</Text>}
            icon={() => (
              <Ionicons name="refresh-outline" color="#90E600" size={21} />
            )}
            style={styles.activeItem}
            onPress={() => router.push("/home")}
          />
          <DrawerItem
            label={() => <Text style={styles.activeLabel}>Saved card</Text>}
            icon={() => (
              <Ionicons name="card-outline" color="#90E600" size={21} />
            )}
            style={styles.activeItem}
            onPress={() => router.push("/home")}
          />
          <DrawerItem
            label={() => (
              <Text style={styles.activeLabel}>Chat with Oraimo</Text>
            )}
            icon={() => (
              <Ionicons name="chatbox-outline" color="#90E600" size={21} />
            )}
            style={styles.activeItem}
            onPress={() => router.push("/home")}
          />
          <DrawerItem
            label={() => (
              <Text style={styles.activeLabel}>Privacy and settings</Text>
            )}
            icon={() => (
              <Ionicons name="settings-outline" color="#90E600" size={21} />
            )}
            style={styles.activeItem}
            onPress={() => router.push("/home")}
          />
          <Link href="/login" style={styles.logout}>
            <Ionicons name="log-out-outline" color="#EB5757" size={24} />
            <Text style={styles.logoutText}>logout</Text>
          </Link>
        </View>
      </DrawerContentScrollView>
      <View style={styles.bottomDrawerSection}>
        <Ionicons style={styles.icon} name="person" color="#90E600" size={24} />
        <View>
          <Text style={styles.text}>
            Become <Text style={styles.subText}>Oraimo Agent </Text>{" "}
          </Text>
          <Text style={styles.otherText}>
            Lorem ipsum dolor sit amet consectetur. Aliquet ac lorem velit.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default CustomDrawer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 25,
    gap: 10,
  },
  activeItem: {
    backgroundColor: "#060A00",
    borderRadius: 8,
    height: 62,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  activeLabel: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  logout: {
    display: "flex",
    flexDirection: "row",
    marginTop: 20,
    alignItems: "center",
    gap: 10,
    marginHorizontal: 12,
  },
  logoutText: {
    color: "#EB5757",
    fontSize: 16,
    fontWeight: 500,
  },
  bottomDrawerSection: {
    marginVertical: 15,
    display: "flex",
    alignItems:"flex-start",
    padding: 5,
    flexDirection: "row",
    gap: 10,
    borderWidth: 1,
    marginHorizontal: 10,
   borderColor: 'rgba(255, 255, 255, 0.07)',
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.21)', 
  },
  text: {
    fontSize: 18,
    fontWeight: 600,
    color: "#ffffff",
  },
  subText: {
    color: "#90E600",
  },
  otherText: {
    color: "#ffffff",
    fontSize: 14,
    width: 218,
  },
  icon:{
    borderRadius:100,
    borderWidth:0.5,
    borderColor:"#FFFFFF36",
   padding:9
  }
});
