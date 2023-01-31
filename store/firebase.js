import axios from "axios";

const URL =
  "https://rn-email-app-19b9a-default-rtdb.europe-west1.firebasedatabase.app/";

export const getUsers = async () => {
  await axios
    .get(URL + "/users.json")
    .then((res) => {
      console.log(res.data);
      const users = [];
      for (const key in res.data) {
        users.unshift({
          ...res.data[key],
          id: key,
        });
      }
      return users;
    })
    .catch((err) => {
      console.log(err);
    });

  // console.log(response.data);
  // const users = [];
  // for (const key in response.data) {
  //   const userObj = {
  //     id: key,
  //     name: response.data[key].name,
  //     surname: response.data[key].surname,
  //     email: response.data[key].email,
  //   };
  //   users.push(userObj);
  // }
  // return users;
};
