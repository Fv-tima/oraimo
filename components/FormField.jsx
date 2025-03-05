import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const FormField = ({
  title, 
  label,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false); 

  return (
    <View style={[styles.container, otherStyles]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.inputWrapper}>
        <TextInput
          style={[styles.input, title === "Password" ? { flex: 1 } : null]}
          placeholder={placeholder}
          placeholderTextColor="#4F4F4F"
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password" && !showPassword}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
        {label === "Password" && isFocused && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons
              name={showPassword ? "eye-off-outline" : "eye-outline"}
              size={24}
              color="#4F4F4F"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    color: "#828282",
    marginBottom: 8,
  },
  inputWrapper: {
    width: "100%",
    height: 64,
    paddingHorizontal: 16,
    backgroundColor: "#090F00",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#2E4901",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  input: {
    fontSize: 16,
    color: "#fff",
    outlineStyle: "none",
  },
});

export default FormField;
