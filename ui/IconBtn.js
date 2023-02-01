import { Pressable, StyleSheet, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export const IconBtn = ({
  icon,
  size,
  color,
  onPress,
  iconStyle,
  iconLabel,
  labelStyle,
  disabled,
}) => {
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => pressed && styles.pressed}>
      <View style={[styles.constiner, iconStyle]}>
        <Ionicons name={icon} size={size} color={color} />
        {iconLabel && <Text style={labelStyle}>{iconLabel}</Text>}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  constiner: {
    alignItems: "center",
    justifyContent: "center",
  },
  pressed: {
    opacity: 0.75,
  },
});
