import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { GlobalStyles } from "../../Constants/style";

function SpinnerOverlay() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="white" />
    </View>
  );
}

export default SpinnerOverlay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
    backgroundColor: GlobalStyles.colors.primary700,
  },
});
