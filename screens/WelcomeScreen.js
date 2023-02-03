import { StyleSheet, View, Text } from "react-native";
import { Colors } from "../constants/colors";
import { IconBtn } from "../ui/IconBtn";
import { Button } from "../ui/Button";
import { useContext } from "react";
import { UsersContext } from "../store/users-context";

export const WelcomeScreen = ({ navigation }) => {
  const authCtx = useContext(UsersContext);

  const addNewUserPressHandler = () => {
    navigation.navigate("AddNewUser");
  };

  const LogInPress = () => {
    navigation.navigate("LoginSceen");
  };

  const SignUpPress = () => {
    navigation.navigate("SignupSceen");
  };

  const logoutPress = () => {
    authCtx.logout();
  };

  return (
    <View style={styles.constiner}>
      {authCtx.isAuthenticated ? (
        <Button style={styles.authBtn} onPress={logoutPress}>
          Log out
        </Button>
      ) : (
        <View style={styles.authBtnsContainer}>
          <View style={styles.authBtns}>
            <Button style={styles.authBtn} onPress={LogInPress}>
              Log in
            </Button>
            <Button style={styles.authBtn} onPress={SignUpPress}>
              Sign up
            </Button>
          </View>
        </View>
      )}

      {authCtx.isAuthenticated ? (
        <View>
          <Text style={styles.infoText}>Welcome!</Text>
          <Text style={styles.infoText}>
            Now you can add new user and edit users information if it is
            necessary
          </Text>
        </View>
      ) : (
        <View>
          <Text style={styles.infoText}>Please, log in or sign up!</Text>
          <Text style={styles.infoText}>
            Now you can only read users and send emails
          </Text>
        </View>
      )}

      {authCtx.isAuthenticated && (
        <IconBtn
          onPress={addNewUserPressHandler}
          iconStyle={styles.iconBtnContainer}
          icon="person-add-outline"
          color="white"
          size={75}
          iconLabel="Add new user"
          labelStyle={styles.label}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  constiner: {
    flex: 1,
    backgroundColor: Colors.primaryPistachio300,
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 50,
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
  authBtnsContainer: {
    width: "60%",
    margin: 20,
  },
  authBtns: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  authBtn: {
    width: 100,
  },
  infoText: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
});
