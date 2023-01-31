import { createContext, useReducer } from "react";

export const UsersContext = createContext({
  users: [],
  addUser: ({ name, surname, email }) => {},
  deleteUser: (id) => {},
  updateUser: (id, { name, surname, email }) => {},
  setUsers: (users) => {},
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

  const value = {
    users: usersState,
    addUser: addUser,
    deleteUser: deleteUser,
    updateUser: updateUser,
    setUsers: setUsers,
  };

  return (
    <UsersContext.Provider value={value}>{children}</UsersContext.Provider>
  );
};
