import { createContext, useReducer, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const UsersContext = createContext({
  users: [],
  addUser: ({ name, surname, email }) => {},
  deleteUser: (id) => {},
  updateUser: (id, { name, surname, email }) => {},
  setUsers: (users) => {},
  token: "",
  isAuthenticated: false,
  authenticate: (token) => {},
  logout: () => {},
});

function usersReducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [action.payload, ...state];
    case "SET":
      return action.payload;
    case "UPDATE":
      const updatableUserIndex = state.findIndex(
        (user) => user.id === action.payload.id
      );
      const updatableUser = state[updatableUserIndex];
      const updatedItem = { ...updatableUser, ...action.payload.data };
      const updatedUser = [...state];
      updatedUser[updatableUserIndex] = updatedItem;
      return updatedUser;
    case "DELETE":
      return state.filter((user) => user.id !== action.payload);
    default:
      return state;
  }
}

export const UsersContextProvider = ({ children }) => {
  const [usersState, dispatch] = useReducer(usersReducer, []);

  const [authToken, setAuthToken] = useState();

  function addUser(userData) {
    dispatch({ type: "ADD", payload: userData });
  }

  function setUsers(users) {
    dispatch({ type: "SET", payload: users });
  }

  function deleteUser(id) {
    dispatch({ type: "DELETE", payload: id });
  }

  function updateUser(id, userData) {
    dispatch({ type: "UPDATE", payload: { id: id, data: userData } });
  }

  useEffect(() => {
    const getToken = async () => {
      const storedToken = await AsyncStorage.getItem("token");

      if (storedToken) {
        setAuthToken(storedToken);
      }
    };

    getToken();
  }, []);

  const authenticate = (token) => {
    setAuthToken(token);
    AsyncStorage.setItem("token", token);
  };

  const logout = () => {
    setAuthToken(null);
    AsyncStorage.removeItem("token");
  };

  const value = {
    users: usersState,
    addUser: addUser,
    deleteUser: deleteUser,
    updateUser: updateUser,
    setUsers: setUsers,
    token: authToken,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    logout: logout,
  };

  return (
    <UsersContext.Provider value={value}>{children}</UsersContext.Provider>
  );
};
