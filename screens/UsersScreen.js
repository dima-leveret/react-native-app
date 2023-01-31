import { StyleSheet, View, Text, FlatList } from "react-native";
import { Colors } from "../constants/colors";
// import { getUsers } from "../store/firebase";
import { useState, useEffect } from "react";
import axios from "axios";
import { UsersList } from "../components/UsersList";

const URL =
  "https://rn-email-app-19b9a-default-rtdb.europe-west1.firebasedatabase.app/";

export const UsersScreen = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get(URL + "/users.json")
      .then((res) => {
        console.log(res.data);
        const fetchedUsers = [];
        for (const key in res.data) {
          fetchedUsers.unshift({
            ...res.data[key],
            id: key,
          });
        }
        setUsers(fetchedUsers);
      })
      .catch((err) => {
        console.log(err);
      });

    console.log("fetched user =>", users);

    // const fechedUsers = getUsers();
    // setUsers(fechedUsers);
    // console.log("fetched users =>", fechedUsers);
  }, []);

  return (
    <View style={styles.rootConstiner}>
      <View style={styles.listContainer}>
        <UsersList users={users} />
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
  text: {
    color: "white",
  },
  text2: {
    color: "bleck",
  },
  users: {
    flex: 1,
  },
});
