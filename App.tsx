import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Routes from "./src/pages/routes/index.route";
import { AuthProviderList } from "./src/context/authContext_list"; // Se estiver usando o contexto

export default function App() {
  return (
    <AuthProviderList>
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
    </AuthProviderList>
  );
}
