import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ProgressIndicator = ({ currentStep = 1, totalSteps = 3, label = "Personal Details" }) => {
  return (
    <View style={styles.container}>
      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        {[...Array(totalSteps)].map((_, index) => (
          <View key={index} style={styles.stepContainer}>
            {/* Circle */}
            <View
              style={[
                styles.circle,
                index + 1 <= currentStep
                  ? styles.activeCircle
                  : styles.inactiveCircle,
              ]}
            />
            {/* Line */}
            {index < totalSteps - 1 && (
              <View
                style={[
                  styles.line,
                  index + 1 < currentStep ? styles.activeLine : styles.inactiveLine,
                ]}
              />
            )}
          </View>
        ))}
      </View>
      {/* Step Label */}
      <Text style={styles.text}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginBottom: 20,
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  stepContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  circle: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  activeCircle: {
    backgroundColor: "#90E600",
    borderColor: "#90E600",
    padding:2,
    borderWidth: 2,
  },
  inactiveCircle: {
    backgroundColor: "#626759",
    borderColor: "#626759",
    borderWidth: 1,
  },
  line: {
    width: 90,
    height: 2,
    marginHorizontal: 5,
  },
  activeLine: {
    backgroundColor: "#90E600",
  },
  inactiveLine: {
    backgroundColor: "#626759",
  },
  text: {
    marginTop: 10,
    color: "#E6E6E6",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default ProgressIndicator;
