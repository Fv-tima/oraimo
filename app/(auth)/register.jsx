import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link, router } from "expo-router";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { SafeAreaView } from "react-native-safe-area-context";

const register = () => {
  const verify= () => {
    router.push('/verify'); 
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Link href="/">
            <Ionicons name="arrow-back" size={20} color="#FFFFFF" />
          </Link>
        </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.headerTitle}>
          Welcome to <Text style={styles.otherText}>Oraimo</Text>
        </Text>
        <Text style={styles.subTitle}>
          Get Wired In! Sign up and plug into a world of gadget goodness
        </Text>
      </View>
      <View>
        <FormField label="Email Address" placeholder="Enter email address" />
        <FormField label="Password" placeholder="Enter password" />
        <FormField label="Confirm password" placeholder="Enter password" />
      </View>
      <View>
          <CustomButton title="SignUp" 
          handlePress={verify}
       />
        <View style={styles.hrContainer}>
          <View style={styles.hrLine} />
          <Text style={styles.hrText}>OR</Text>
          <View style={styles.hrLine} />
        </View>
        <TouchableOpacity style={styles.googleButton}>
          <Ionicons name="logo-google" size={20} color="#4285F4" />
          <Text style={styles.googleButtonText}>SignUp with Google</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.accountText}>
          Don't have an account?{" "}
          <Link href="/login" style={styles.otherText}>
            Log in
          </Link>
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    backgroundColor: "#000",
    paddingHorizontal: 20,
    paddingVertical: 20,
    color: "#fff",
  },
  header: {
    marginTop: -30,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#23251F",
    fontFamily: "Felix-Titling",
    width: 50,
    borderRadius: 6,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 10,
  },
  otherText: {
    color: "#A6EB33",
  },
  subTitle: {
    fontSize: 16,
    fontWeight: 500,
    color: "#B0B0B0",
    marginBottom: 20,
    width: 303,
  },
  link: {
    color: "#66A300",
    fontSize: 14,
    marginTop: 10,
  },
  hrContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  hrLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#8A8A8A",
    marginHorizontal: 10,
  },
  hrText: {
    color: "#8A8A8A",
    fontSize: 14,
    fontWeight: 500,
  },
  googleButton: {
    backgroundColor: "transparent",
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
    paddingVertical: 15,
    minHeight: 48,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#4F7F00",
  },
  googleButtonText: {
    color: "#B0B0B0",
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },
  accountText: {
    fontSize: 16,
    color: "#323232",
    textAlign: "center",
  },
});
