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

export const storeUser = async (userData) => {
  const response = await axios.post(URL + "/users.json", userData);
  const id = response.data.name;
  return id;
};

export const updateUser = (id, userData) => {
  return axios.put(URL + `/users/${id}.json`, userData);
};

export const deleteUser = (id) => {
  return axios.delete(URL + `/users/${id}.json`);
};
