import { StyleSheet, View, Alert } from "react-native";
import { AuthContent } from "../components/Auth/AuthContent";
import { Colors } from "../constants/colors";
import { createUser } from "../util/auth";
import { useState, useContext } from "react";
import { LoaderOverlay } from "../ui/LoaderOverlay";
import { UsersContext } from "../store/users-context";

export const SignupSceen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);

  const authCtx = useContext(UsersContext);

  const signupHandler = async ({ email, password }) => {
    setIsLoading(true);
    try {
      const token = await createUser(email, password);
      authCtx.authenticate(token);
      navigation.navigate("Home");
    } catch (err) {
      console.log(err.message);
      Alert.alert("Authentication failed", err.message);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <LoaderOverlay />;
  }

  return (
    <View style={styles.container}>
      <AuthContent onAuthenticate={signupHandler} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primaryPistachio300,
  },
});
