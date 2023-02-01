import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { WelcomeScreen } from "./screens/WelcomeScreen";
import { UsersScreen } from "./screens/UsersScreen";
import { ManageUser } from "./screens/ManageUser";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import { Colors } from "./constants/colors";
import { UsersContextProvider } from "./store/users-context";
import { AddNewUser } from "./screens/AddNewUser";

const Tab = createMaterialBottomTabNavigator();
const Stack = createNativeStackNavigator();

const UsersOveview = () => {
  return (
    <Tab.Navigator
      activeColor="white"
      barStyle={{ backgroundColor: Colors.primaryPistachio500 }}>
      <Tab.Screen
        name="Home"
        component={WelcomeScreen}
        options={{
          tabBarIcon: () => <AntDesign name="home" size={24} />,
        }}
      />
      <Tab.Screen
        name="Users"
        component={UsersScreen}
        options={{
          tabBarIcon: () => <Feather name="users" size={24} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <UsersContextProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: Colors.primaryPistachio500 },
            }}>
            <Stack.Screen
              name="UsersOveview"
              component={UsersOveview}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="ManageUser"
              component={ManageUser}
              options={{
                title: "Manage User",
              }}
            />
            <Stack.Screen
              name="AddNewUser"
              component={AddNewUser}
              options={{
                title: "Add new user",
                presentation: "modal",
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </UsersContextProvider>
    </>
  );
}
