import { Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "../constants/colors";

export const Button = ({ children, onPress, mode, style }) => {
  return (
    <View style={style}>
      <Pressable
        disabled={false}
        onPress={onPress}
        style={({ pressed }) => pressed && styles.pressed}>
        <View style={[styles.button, mode === "flat" && styles.flat]}>
          <Text style={[styles.buttonText, mode === "flat" && styles.flatText]}>
            {children}
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 4,
    padding: 8,
    backgroundColor: Colors.primaryPistachio100,
  },
  flat: {
    backgroundColor: Colors.primaryPistachio500,
  },
  buttonText: {
    textAlign: "center",
  },
  flatText: {
    // color: "white",
  },
  pressed: {
    opacity: 0.75,
    borderRadius: 4,
  },
});
