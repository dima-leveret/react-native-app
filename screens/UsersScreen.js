import { StyleSheet, View, Text, FlatList } from "react-native";
import { Colors } from "../constants/colors";
// import { getUsers } from "../store/firebase";
import { useState, useEffect } from "react";
import axios from "axios";

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
    <View style={styles.constiner}>
      <Text style={styles.text}> Users screen </Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={(itemData) => {
          return <Text> {itemData.item.name} </Text>;
        }}
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
  text2: {
    color: "bleck",
  },
  users: {
    flex: 1,
  },
});
