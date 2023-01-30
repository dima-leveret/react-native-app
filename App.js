import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { WelcomeScreen } from "./screens/WelcomeScreen";
import { UsersScreen } from "./screens/UsersScreen";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import { Colors } from "./constants/colors";

const Tab = createMaterialBottomTabNavigator();

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer>
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
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({});
