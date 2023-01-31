import { StyleSheet, View, Text, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

export const User = ({ id, name, surname }) => {
  const navigation = useNavigation();

  const userPressHandler = () => {
    navigation.navigate("ManageUser");
  };

  return (
    <Pressable
      onPress={userPressHandler}
      style={({ pressed }) => pressed && styles.pressed}>
      <View>
        <Text>{name}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.75,
  },
});
