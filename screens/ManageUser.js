import { StyleSheet, View, Text } from "react-native";
import { Colors } from "../constants/colors";
import { useLayoutEffect, useContext, useState } from "react";
import { UsersContext } from "../store/users-context";
import { updateUser } from "../store/firebase";
import { LoaderOverlay } from "../ui/LoaderOverlay";
import { UserForm } from "../components/UserForm";

export const ManageUser = ({ route, navigation }) => {
  const usersCtx = useContext(UsersContext);
  const editedUserId = route.params?.userId;
  console.log(editedUserId);
  //   const isEditing = !!editedUserId;

  const selecteUser = usersCtx.users.find((user) => user.id === editedUserId);

  const cancelHandler = () => {
    navigation.goBack();
  };

  const confirmHandler = async (userData) => {
    usersCtx.updateUser(editedUserId, userData);
    await updateUser(editedUserId, userData);

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <UserForm
        submitButtonLabel="Update"
        onCalcel={cancelHandler}
        onSubmit={confirmHandler}
        defaultValues={selecteUser}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primaryPistachio300,
    padding: 24,
  },
});
