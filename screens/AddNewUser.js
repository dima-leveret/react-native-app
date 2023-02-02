import { StyleSheet, ScrollView } from "react-native";
import { UserForm } from "../components/UserForm";
import { Colors } from "../constants/colors";
import { LoaderOverlay } from "../ui/LoaderOverlay";
import { storeUser } from "../store/firebase";
import { UsersContext } from "../store/users-context";
import { useState, useContext } from "react";

export const AddNewUser = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const userCtx = useContext(UsersContext);

  const cancelHandler = () => {
    navigation.goBack();
  };

  const confirmHandler = async (userData) => {
    try {
      setIsLoading(true);
      const id = await storeUser(userData);
      userCtx.addUser({ ...userData, id: id });
      setIsLoading(false);
      navigation.goBack();
    } catch (err) {
      console.log(err.message);
    }
  };

  if (isLoading) {
    return <LoaderOverlay />;
  }

  return (
    <ScrollView style={styles.container}>
      <UserForm
        submitButtonLabel="Add"
        onCalcel={cancelHandler}
        onSubmit={confirmHandler}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primaryPistachio300,
    padding: 24,
  },
});
