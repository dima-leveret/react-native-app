import { StyleSheet, ScrollView } from "react-native";
import { Colors } from "../constants/colors";
import { useContext, useState } from "react";
import { UsersContext } from "../store/users-context";
import { updateUser, deleteUser } from "../store/firebase";
import { LoaderOverlay } from "../ui/LoaderOverlay";
import { UserForm } from "../components/UserForm";
import { Button } from "../ui/Button";
import { IconBtn } from "../ui/IconBtn";

export const ManageUser = ({ route, navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [disabled, setDisableb] = useState(true);
  const usersCtx = useContext(UsersContext);
  const editedUserId = route.params?.userId;

  const selecteUser = usersCtx.users.find((user) => user.id === editedUserId);

  const cancelHandler = () => {
    navigation.goBack();
  };

  const confirmHandler = async (userData) => {
    try {
      usersCtx.updateUser(editedUserId, userData);
      setIsLoading(true);
      await updateUser(editedUserId, userData);
      setIsLoading(false);
      navigation.goBack();
    } catch (err) {
      console.log(err.message);
    }
  };

  const deleteUserHandler = async () => {
    try {
      usersCtx.deleteUser(editedUserId);
      setIsLoading(true);
      await deleteUser(editedUserId);
      setIsLoading(false);
      navigation.goBack();
    } catch (err) {
      console.log(err.message);
    }
  };

  const emailIconPress = () => {
    navigation.navigate("SendEmailForm", {
      userEmail: route.params.userEmail,
      userName: route.params.userName,
    });
  };

  if (isLoading) {
    return <LoaderOverlay />;
  }

  return (
    <ScrollView style={styles.container}>
      <Button mode={!disabled && "flat"} onPress={() => setDisableb(!disabled)}>
        {disabled ? "Edit mode" : "Cancel edit mode"}
      </Button>
      <UserForm
        editable={disabled}
        submitButtonLabel="Update"
        onCalcel={cancelHandler}
        onSubmit={confirmHandler}
        defaultValues={selecteUser}
      />

      <IconBtn
        size={50}
        color={disabled ? "white" : "tomato"}
        icon="trash-outline"
        iconStyle={disabled ? styles.trashIconDisabled : styles.trashIcon}
        disabled={disabled}
        onPress={deleteUserHandler}
      />

      <IconBtn
        iconStyle={styles.emailIcon}
        size={80}
        icon="mail"
        onPress={emailIconPress}
        color={Colors.primaryPistachio100}
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
  trashIcon: {
    width: "100%",
    borderWidth: 4,
    borderRadius: 8,
    borderColor: "tomato",
    marginVertical: 10,
  },
  trashIconDisabled: {
    width: "100%",
    borderWidth: 4,
    borderRadius: 8,
    borderColor: "white",
    marginVertical: 10,
    opacity: 0.5,
  },
  emailIcon: {
    width: "100%",
    borderWidth: 4,
    borderRadius: 8,
    borderColor: Colors.primaryPistachio100,
  },
});
