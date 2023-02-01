import { StyleSheet, View, Text, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../constants/colors";

export const User = ({ id, name, surname, email }) => {
  const navigation = useNavigation();

  const userPressHandler = () => {
    navigation.navigate("ManageUser", {
      userId: id,
      userEmail: email,
      userName: name,
    });
  };

  return (
    <Pressable
      onPress={userPressHandler}
      style={({ pressed }) => pressed && styles.pressed}>
      <View style={styles.userItem}>
        <View>
          <Text style={styles.text}>{name}</Text>
          <Text style={styles.text}>{surname}</Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.75,
  },
  userItem: {
    width: 150,
    height: 120,
    margin: 16,
    padding: 16,
    borderRadius: 8,
    backgroundColor: Colors.primaryPistachio100,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.primaryPistachio500,
    textAlign: "center",
  },
});
