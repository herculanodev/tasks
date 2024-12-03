import React, { useContext } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import style from "./style";
import { AuthContextList } from "../../context/authContext_list";

export default function User() {
  const navigation = useNavigation<NavigationProp<any>>();
  const { userName, setUserName } = useContext(AuthContextList); // Obtemos o nome do usuário do contexto

  const handleLogout = () => {
    Alert.alert("Logout", "Você saiu da conta.");
    if (setUserName) {
      setUserName(""); // Limpa o nome do usuário
    }
    navigation.reset({ routes: [{ name: "Login" }] });
  };

  return (
    <View style={style.container}>
      <Text style={style.name}>
        {userName ? `Olá, ${userName}` : "Olá, Usuário"}
      </Text>
      <TouchableOpacity style={style.logoutButton} onPress={handleLogout}>
        <Ionicons name="exit" style={{ color: "gray" }} size={40} />
      </TouchableOpacity>
    </View>
  );
}
