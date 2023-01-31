import { StyleSheet, View, Text, FlatList, Button } from "react-native";
import { Colors } from "../constants/colors";
import { getUsers } from "../store/firebase";
import { useState, useEffect, useContext } from "react";
import { UsersContext } from "../store/users-context";
import { UsersList } from "../components/UsersList";
import { LoaderOverlay } from "../ui/LoaderOverlay";

export const UsersScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const usersCtx = useContext(UsersContext);

  useEffect(() => {
    async function fetchUsers() {
      try {
        setIsLoading(true);
        const fechedUsers = await getUsers();
        setIsLoading(false);
        usersCtx.setUsers(fechedUsers);
      } catch (err) {
        console.log(err.message);
      }
    }
    fetchUsers();
  }, []);

  if (isLoading) {
    return <LoaderOverlay />;
  }

  return (
    <View style={styles.rootConstiner}>
      <View style={styles.listContainer}>
        <UsersList users={usersCtx.users} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rootConstiner: {
    flex: 1,
    backgroundColor: Colors.primaryPistachio300,
  },
  listContainer: {
    fle: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 100,
    overflow: "hidden",
  },
});
