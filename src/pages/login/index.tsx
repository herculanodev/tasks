import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { style } from "./style";
import Logo from "../../assets/logo.png";
import { themas } from "../../global/themes";
import { Input } from "../../components/Input";
import { MaterialIcons, Octicons } from "@expo/vector-icons";
import { Button } from "../../components/Button";
import { useNavigation, NavigationProp } from "@react-navigation/native";

export default function Login() {
  const navigation = useNavigation<NavigationProp<any>>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Controle da visibilidade da senha
  const [loading, setLoading] = useState(false); // Estado de carregamento do botão

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex para validar e-mail

  async function getLogin() {
    try {
      setLoading(true);

      if (!email || !password) {
        Alert.alert("Atenção", "Informe os campos obrigatórios!");
        return;
      }

      if (!emailRegex.test(email)) {
        Alert.alert("Atenção", "Informe um e-mail válido!");
        return;
      }

      // Simulação de login bem-sucedido
      navigation.reset({ routes: [{ name: "BottomRoutes" }] });

      setTimeout(() => {
        setEmail("");
        setPassword("");
      }, 3000);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={style.container}>
      <View style={style.boxTop}>
        <Image source={Logo} style={style.logo} resizeMode="contain" />
        <Text style={style.text}>Bem-vindo de volta!</Text>
      </View>

      <View style={style.boxMid}>
        {/* Campo de e-mail */}
        <Input
          value={email}
          onChangeText={setEmail} // Atualiza o estado ao digitar
          title="ENDEREÇO DE E-MAIL"
          IconRight={MaterialIcons}
          iconRightName="email"
          placeholder="Digite seu email"
        />

        {/* Campo de senha */}
        <Input
          onChangeText={setPassword}
          value={password}
          title="SENHA"
          IconRight={Octicons}
          iconRightName={showPassword ? "eye" : "eye-closed"}
          secureTextEntry={!showPassword} // Controla a visibilidade do texto
          onIconRightPress={() => setShowPassword(!showPassword)} // Alterna entre mostrar/ocultar
          placeholder="Digite sua senha"
        />
      </View>

      <View style={style.boxBottom}>
        <Button
          text="ENTRAR"
          loading={loading} // Exibe o indicador de carregamento
          onPress={getLogin} // Evento de clique do botão
        />
      </View>

      <Text style={style.textBottom}>
        Não tem conta?{" "}
        <Text
          style={{ color: themas.colors.primary }}
          onPress={() => navigation.navigate("Register")} // Agora navega para Register
        >
          Crie agora!
        </Text>
      </Text>
    </View>
  );
}
