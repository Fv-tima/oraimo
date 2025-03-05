import { ActivityIndicator, Text, TouchableOpacity, StyleSheet } from "react-native";

const CustomButton = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      style={[
        styles.button,
        containerStyles,
        isLoading && styles.disabledButton,
      ]}
      disabled={isLoading}
    >
      <Text style={[styles.buttonText, textStyles]}>{title}</Text>

      {isLoading && (
        <ActivityIndicator
          animating={isLoading}
          color="#fff"
          size="small"
          style={styles.loadingIndicator}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#90E600",
    paddingVertical: 15,
    alignItems: "center",
    borderRadius: 30,
    flexDirection: "row",
    justifyContent: "center",
    minHeight: 48,
  },
  buttonText: {
    color: "#333333",
    fontSize: 16,
    fontWeight: "500",
  },
  disabledButton: {
    opacity: 0.5,
  },
  loadingIndicator: {
    marginLeft: 8,
  },
});

export default CustomButton;
