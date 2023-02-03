import { StyleSheet, View, Alert } from "react-native";
import { AuthContent } from "../components/Auth/AuthContent";
import { Colors } from "../constants/colors";
import { useState, useContext } from "react";
import { login } from "../util/auth";
import { LoaderOverlay } from "../ui/LoaderOverlay";
import { UsersContext } from "../store/users-context";

export const LoginSceen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);

  const authCtx = useContext(UsersContext);

  const loginHandler = async ({ email, password }) => {
    setIsLoading(true);
    try {
      const token = await login(email, password);
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
    <View style={style.container}>
      <AuthContent isLogin onAuthenticate={loginHandler} />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primaryPistachio300,
  },
});
