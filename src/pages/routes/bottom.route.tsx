import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import List from "../list";
import User from "../users";
import CustomTabBar from "../../components/CustomTabBar";
import { AuthProviderList } from "../../context/authContext_list";

const Tab = createBottomTabNavigator();

export default function BottomRoutes() {
  return (
    <AuthProviderList>
    <Tab.Navigator 
      screenOptions={{
        headerShown: false, // Remove o cabeçalho padrão
       
      }}
      tabBar={props=> <CustomTabBar {...props} />}
    >
      <Tab.Screen name="List" component={List} />
      <Tab.Screen name="User" component={User} />
    </Tab.Navigator>
    </AuthProviderList>
  );
}
