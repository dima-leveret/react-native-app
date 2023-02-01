import { StyleSheet, View, Text } from "react-native";
import { Colors } from "../constants/colors";
import { IconBtn } from "../ui/IconBtn";

export const WelcomeScreen = ({ navigation }) => {
  const addNewUserPressHandler = () => {
    navigation.navigate("AddNewUser");
  };

  return (
    <View style={styles.constiner}>
      <IconBtn
        onPress={addNewUserPressHandler}
        iconStyle={styles.iconBtnContainer}
        icon="person-add-outline"
        color="white"
        size={75}
        iconLabel="Add new user"
        labelStyle={styles.label}
      />
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
  iconBtnContainer: {
    borderColor: Colors.primaryPistachio500,
    borderWidth: 4,
    borderRadius: 8,
    padding: 24,
  },
  label: {
    color: "white",
    fontSize: 18,
    fontWeight: "500",
  },
});
