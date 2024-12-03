import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../login";
import Register from "../register";
import BottomRoutes from "./bottom.route";

// Definir as rotas do aplicativo
export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  BottomRoutes: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function Routes() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BottomRoutes"
        component={BottomRoutes}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
