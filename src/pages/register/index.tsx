import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import style from "./style";

// Definição da navegação
type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

export default function Register() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  // Usando o hook useNavigation para navegação
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();

  // Regex para validar o e-mail
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleRegister = () => {
    // Verificando se os campos estão preenchidos
    if (!email || !password || !confirmPassword) {
      return Alert.alert("Erro", "Por favor, preencha todos os campos.");
    }

    // Verificando se o email é válido
    if (!emailRegex.test(email)) {
      return Alert.alert("Erro", "Por favor, insira um email válido.");
    }

    // Verificando se as senhas coincidem
    if (password !== confirmPassword) {
      return Alert.alert("Erro", "As senhas não coincidem.");
    }

    try {
      // Simulação de cadastro (pode ser substituído por qualquer lógica de cadastro desejada)
      Alert.alert("Sucesso", "Usuário cadastrado com sucesso!");
      
      // Navega para a tela de login
      navigation.navigate("Login");
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Não foi possível realizar o cadastro.");
    }
  };

  return (
    <View style={style.container}>
      <Text style={style.title}>Cadastrar</Text>
      <TextInput
        style={style.input}
        placeholder="Digite seu email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address" // Adicionado para facilitar entrada de e-mails
      />
      <TextInput
        style={style.input}
        placeholder="Digite sua senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={style.input}
        placeholder="Confirme sua senha"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <TouchableOpacity style={style.button} onPress={handleRegister}>
        <Text style={style.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={style.link}>Já possui uma conta? Faça login</Text>
      </TouchableOpacity>
    </View>
  );
}
