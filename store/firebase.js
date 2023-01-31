import axios from "axios";

const URL =
  "https://rn-email-app-19b9a-default-rtdb.europe-west1.firebasedatabase.app/";

export const getUsers = async () => {
  const response = await axios.get(URL + "/users.json");

  const users = [];

  for (const key in response.data) {
    const userObj = {
      id: key,
      name: response.data[key].name,
      surname: response.data[key].surname,
      email: response.data[key].email,
    };
    users.unshift(userObj);
  }
  return users;
};
