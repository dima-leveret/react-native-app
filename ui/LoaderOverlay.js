import { View, ActivityIndicator, StyleSheet } from "react-native";
import { Colors } from "../constants/colors";

export const LoaderOverlay = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="white" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primaryPistachio400,
  },
});
