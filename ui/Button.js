import { Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "../constants/colors";

export const Button = ({ children, onPress, mode, style, disabled }) => {
  return (
    <View style={style}>
      <Pressable
        disabled={disabled}
        onPress={onPress}
        style={({ pressed }) => pressed && styles.pressed}>
        <View
          style={[
            styles.button,
            mode === "flat" && styles.flat,
            disabled && styles.disabled,
          ]}>
          <Text
            style={[
              styles.buttonText,
              mode === "flat" && styles.flatText,
              disabled && styles.disabledText,
            ]}>
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
    backgroundColor: Colors.primaryPistachio200,
  },
  flat: {
    backgroundColor: Colors.primaryPistachio500,
  },
  disabled: {
    backgroundColor: "white",
  },
  disabledText: {
    opacity: 0.5,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "500",
  },
  flatText: {},
  pressed: {
    opacity: 0.75,
    borderRadius: 4,
  },
});
