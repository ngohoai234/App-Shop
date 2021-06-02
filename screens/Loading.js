import React from "react";
import { ActivityIndicator, Colors } from "react-native-paper";
import { StyleSheet, Text, View } from "react-native";

export default function Loading() {
  console.log("Loading");
  return (
    <View style={styles.center}>
      <ActivityIndicator animating={true} color={Colors.red800} size="large" />
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
});
