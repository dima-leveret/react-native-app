import { FlatList } from "react-native";
import { User } from "./User";

const renderUser = (itemData) => {
  return <User {...itemData.item} />;
};

export const UsersList = ({ users }) => {
  return (
    <FlatList
      data={users}
      renderItem={renderUser}
      keyExtractor={(item) => item.id}
      numColumns="2"
    />
  );
};
