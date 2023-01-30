import { StyleSheet, View, Text } from "react-native";
import { Colors } from "../constants/colors";

export const WelcomeScreen = () => {
  return (
    <View style={styles.constiner}>
      <Text style={styles.text}> Welcome screen </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  constiner: {
    flex: 1,
    backgroundColor: Colors.primaryPistachio400,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "white",
  },
});
