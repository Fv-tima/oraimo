import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link, router } from "expo-router";
import CustomButton from "@/components/CustomButton";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useRef } from "react";

const Verify = () => {
  const [otp, setOtp] = useState(["", "", "", "", ""]);
  const inputs = Array(5)
    .fill()
    .map(() => useRef());

  const handleInputChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Automatically focus next input if value is entered
    if (value && index < inputs.length - 1) {
      inputs[index + 1].current.focus();
    }
  };

  const handleBackspace = (index) => {
    if (index > 0) {
      inputs[index - 1].current.focus();
    }
  };

  const home= () => {
    router.push('/home'); 
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Link href="/register">
            <Ionicons name="arrow-back" size={20} color="#FFFFFF" />
          </Link>
        </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.headerTitle}>Verify account</Text>
        <Text style={styles.subTitle}>
          Enter verification code sent to{" "}
          <Text style={styles.othersub}>jimohjamiu2000@gmail.com.</Text>
        </Text>
      </View>
      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={inputs[index]}
            style={styles.otpInput}
            maxLength={1}
            keyboardType="numeric"
            value={digit}
            onChangeText={(value) => handleInputChange(value, index)}
            onKeyPress={({ nativeEvent }) => {
              if (nativeEvent.key === "Backspace") {
                handleBackspace(index);
              }
            }}
          />
        ))}
      </View>
      <Text style={styles.accountText}>
        Didn’t get the code?
        <Link href="/register" style={styles.otherText}>
          Resend
        </Link>
      </Text>
      <Text style={styles.otherText}>34secs</Text>
      <View style={styles.button}>
        <CustomButton title="Proceed" handlePress={home}/>
      </View>
    </SafeAreaView>
  );
};

export default Verify;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
    backgroundColor: "#000",
    paddingHorizontal: 20,
    paddingVertical: 20,
    color: "#fff",
  },
  header: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#23251F",
    width: 50,
    borderRadius: 6,
    marginBottom: 12,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 16,
    fontWeight: "400",
    color: "#B0B0B0",
    marginBottom: 20,
    width: 303,
  },
  othersub: {
    fontWeight: "500",
    color: "#fff",
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  otpInput: {
    backgroundColor: "#0D1400",
    borderRadius: 6,
    width: 63,
    height: 65,
    textAlign: "center",
    fontSize: 18,
    color: "#fff",
    borderWidth: 1,
    borderColor:"#3A5E00"
  },
  accountText: {
    fontSize: 14,
    color: "#B0B0B0",
    textAlign: "center",
  },
  otherText: {
    color: "#A6EB33",
    textAlign: "center",
  },
  button: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 40,
  },
});
