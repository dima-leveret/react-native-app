import { StyleSheet, View, Text } from "react-native";
import { Colors } from "../constants/colors";

export const UsersScreen = () => {
  return (
    <View style={styles.constiner}>
      <Text style={styles.text}> Users screen </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  constiner: {
    flex: 1,
    backgroundColor: Colors.primaryPistachio300,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "white",
  },
});
