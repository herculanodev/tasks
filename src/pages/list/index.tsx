import React, { useContext, useRef } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import style from "./style";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import { Input } from "../../components/Input";
import { Ball } from "../../components/ball";
import { Flag } from "../../components/Flag";
import { themas } from "../../global/themes";
import { AuthContextList } from "../../context/authContext_list";
import { AuthContextType, PropCard } from "../../global/Props";
import { formatDateToBR } from "../../global/function";
import { Swipeable } from "react-native-gesture-handler";

export default function List() {
  const { taskList, handleDelete, handleEdit, filter } = useContext<AuthContextType>(AuthContextList);
  const swipeableRefs = useRef<Array<any>>([]);

  const renderRightActions = (item: PropCard, index: number) => (
    <TouchableOpacity
      style={[style.button, { backgroundColor: themas.colors.red }]}
      onPress={() => {
        handleDelete(item);
        swipeableRefs.current[index]?.close(); // Fecha o swipe ao deletar
      }}
    >
      <AntDesign name="delete" size={20} color="#FFF" />
    </TouchableOpacity>
  );

  const renderLeftActions = (item: PropCard, index: number) => (
    <TouchableOpacity
      style={[style.button, { backgroundColor: themas.colors.blueLight }]}
      onPress={() => {
        handleEdit(item);
        swipeableRefs.current[index]?.close(); // Fecha o swipe ao editar
      }}
    >
      <AntDesign name="edit" size={20} color="#FFF" />
    </TouchableOpacity>
  );

  const _renderCard = ({ item, index }: { item: PropCard; index: number }) => {
    const ballColor = item.flag === "urgente" ? themas.colors.red : themas.colors.blueLight;
    const flagColor = item.flag === "urgente" ? themas.colors.red : themas.colors.blueLight;

    return (
      <Swipeable
        ref={(ref) => (swipeableRefs.current[index] = ref)}
        renderRightActions={() => renderRightActions(item, index)}
        renderLeftActions={() => renderLeftActions(item, index)}
      >
        <View style={style.card}>
          <View style={style.rowCard}>
            <View style={style.rowCardLeft}>
              <Ball color={ballColor} />
              <View>
                <Text style={style.titleCard}>{item.title}</Text>
                <Text style={style.descriptionCard}>{item.description}</Text>
                <Text style={style.descriptionCard}>
                  até {formatDateToBR(item.timeLimit)}
                </Text>
              </View>
            </View>
            <Flag caption={item.flag} color={flagColor} selected />
          </View>
        </View>
      </Swipeable>
    );
  };

  return (
    <View style={style.container}>
      <View style={style.header}>
        <Text style={style.greeting}>
          Bom dia, <Text style={{ fontWeight: "bold" }}>Usuário.</Text>
        </Text>
        <View style={style.boxInput}>
          <Input IconLeft={MaterialIcons} iconLeftName="search" onChangeText={(t)=> filter(t)} />
        </View>
      </View>
      <View style={style.boxList}>
        <FlatList
          data={taskList}
          style={{ marginTop: 40, paddingHorizontal: 30 }}
          keyExtractor={(item) => item.item.toString()}
          renderItem={({ item, index }) => _renderCard({ item, index })}
          ListEmptyComponent={
            <Text style={{ textAlign: "center", marginTop: 20, color: "gray" }}>
              Nenhuma tarefa disponível
            </Text>
          }
        />
      </View>
    </View>
  );
}
