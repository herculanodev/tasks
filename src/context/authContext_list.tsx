import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import {
  Alert,
  Dimensions,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Modalize } from "react-native-modalize";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import { Input } from "../components/Input";
import { themas } from "../global/themes";
import { Flag } from "../components/Flag";
import CustomDateTimePicker from "../components/CustomDataTimePicker";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Definindo os tipos
type Task = {
  item: number;
  title: string;
  description: string;
  flag: string;
  timeLimit: string;
};

type AuthContextType = {
  onOpen: () => void;
  taskList: Task[];
  handleDelete: (task: Task) => void;
  handleEdit: (task: Task) => void;
  filter: (text: string) => void; // Função de filtro
  userName: string; // Adicionado para o contexto
  setUserName: React.Dispatch<React.SetStateAction<string>>; // Adicionado para o contexto
};

export const AuthContextList = createContext<AuthContextType | null>(null);

const flags = [
  { caption: "urgente", color: themas.colors.red },
  { caption: "opcional", color: themas.colors.blueLight },
];

export const AuthProviderList = (props: any): JSX.Element => {
  const modalizeRef = useRef<Modalize>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedFlag, setSelectedFlag] = useState("urgente");
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDataPicker, setShowDataPicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [taskList, setTaskList] = useState<Task[]>([]);
  const [taskListBackup, setTaskListBackup] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [userName, setUserName] = useState("Usuário");

  const onOpen = () => {
    modalizeRef?.current?.open();
  };

  const onClose = () => {
    modalizeRef?.current?.close();
    resetForm();
  };

  useEffect(() => {
    getTaskList();
  }, []);

  const _renderFlags = () => {
    return flags.map((item, index) => (
      <TouchableOpacity
        key={index}
        onPress={() => {
          setSelectedFlag(item.caption);
        }}
      >
        <Flag caption={item.caption} color={item.color} selected={item.caption === selectedFlag} />
      </TouchableOpacity>
    ));
  };

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    setShowDataPicker(false);
  };

  const handleTimeChange = (time: Date) => {
    setSelectedTime(time);
    setShowTimePicker(false);
  };

  const handleSave = async () => {
    if (!title || !description || !selectedFlag) {
      return Alert.alert("Atenção", "Preencha os campos corretamente!");
    }

    try {
      let items = [...taskList];
      const newItem: Task = {
        item: editingTask?.item || Date.now(),
        title,
        description,
        flag: selectedFlag,
        timeLimit: new Date(
          selectedDate.getFullYear(),
          selectedDate.getMonth(),
          selectedDate.getDate(),
          selectedTime.getHours(),
          selectedTime.getMinutes()
        ).toISOString(),
      };

      if (editingTask) {
        items = items.map((task) => (task.item === editingTask.item ? newItem : task));
      } else {
        items.push(newItem);
      }

      await AsyncStorage.setItem("@tasks", JSON.stringify(items));
      setTaskList(items);
      setTaskListBackup(items);
      resetForm();
      onClose();
    } catch (error) {
      console.error("Erro ao salvar a tarefa:", error);
    }
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setSelectedFlag("urgente");
    setSelectedDate(new Date());
    setSelectedTime(new Date());
    setEditingTask(null);
  };

  async function getTaskList() {
    try {
      const storageData = await AsyncStorage.getItem("@tasks");
      const tasks = storageData ? JSON.parse(storageData) : [];
      setTaskList(tasks);
      setTaskListBackup(tasks);
    } catch (error) {
      console.error("Erro ao carregar tarefas:", error);
    }
  }

  const handleDelete = async (itemToDelete: Task) => {
    try {
      const updatedTaskList = taskList.filter((item) => item.item !== itemToDelete.item);
      await AsyncStorage.setItem("@tasks", JSON.stringify(updatedTaskList));
      setTaskList(updatedTaskList);
      setTaskListBackup(updatedTaskList);
    } catch (error) {
      console.log("Erro ao excluir o item", error);
    }
  };

  const handleEdit = (itemToEdit: Task) => {
    setEditingTask(itemToEdit);
    setTitle(itemToEdit.title);
    setDescription(itemToEdit.description);
    setSelectedFlag(itemToEdit.flag);
    setSelectedDate(new Date(itemToEdit.timeLimit));
    setSelectedTime(new Date(itemToEdit.timeLimit));
    onOpen();
  };

  const filter = (text: string) => {
    if (!text || taskListBackup.length === 0) return;

    const searchTerm = text.trim().toLowerCase();
    const fieldsToSearch = ["title", "description"];

    const filteredArray = taskListBackup.filter((item) =>
      fieldsToSearch.some((field) =>
        item[field]?.toString().trim().toLowerCase().includes(searchTerm)
      )
    );

    setTaskList(filteredArray);
  };

  const _container = () => {
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => onClose()}>
              <MaterialIcons name="close" size={30} />
            </TouchableOpacity>
            <Text style={styles.title}>
              {editingTask ? "Editar tarefa" : "Criar tarefa"}
            </Text>
            <TouchableOpacity onPress={() => handleSave()}>
              <AntDesign name="check" size={30} />
            </TouchableOpacity>
          </View>
          <View style={styles.content}>
            <Input title="Título:" labelStyle={styles.label} value={title} onChangeText={setTitle} />
            <Input
              title="Descrição:"
              labelStyle={styles.label}
              multiline
              numberOfLines={5}
              value={description}
              onChangeText={setDescription}
              textAlignVertical="top"
            />
            <View style={{ width: "100%" }}>
              <View style={{ flexDirection: "row", gap: 10 }}>
                <TouchableOpacity
                  onPress={() => setShowDataPicker(true)}
                  style={{ width: "60%" }}
                >
                  <Input
                    title="Data Limite"
                    labelStyle={styles.label}
                    editable={false}
                    value={selectedDate.toLocaleDateString()}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setShowTimePicker(true)}
                  style={{ width: "40%" }}
                >
                  <Input
                    title="Hora Limite"
                    labelStyle={styles.label}
                    editable={false}
                    value={selectedTime.toLocaleTimeString()}
                  />
                </TouchableOpacity>
              </View>
              <CustomDateTimePicker
                onDateChange={handleDateChange}
                setShow={setShowDataPicker}
                show={showDataPicker}
                type={"date"}
              />
              <CustomDateTimePicker
                onDateChange={handleTimeChange}
                setShow={setShowTimePicker}
                show={showTimePicker}
                type={"time"}
              />
            </View>
            <View style={styles.containerFlag}>
              <Text style={styles.label}>Flags</Text>
              <View style={styles.RowFlags}>{_renderFlags()}</View>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  };

  return (
    <AuthContextList.Provider value={{ onOpen, taskList, handleDelete, handleEdit, filter, userName, setUserName }}>
      {props.children}
      <Modalize
        ref={modalizeRef}
        childrenStyle={{ height: Dimensions.get("window").height / 1.7 }}
        adjustToContentHeight={true}
      >
        {_container()}
      </Modalize>
    </AuthContextList.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContextList);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProviderList");
  }
  return context;
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  header: {
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 20,
    paddingHorizontal: 40,
    flexDirection: "row",
    marginTop: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  content: {
    paddingHorizontal: 20,
  },
  containerFlag: {
    width: "100%",
    padding: 10,
  },
  label: {
    fontWeight: "bold",
    color: "#000",
  },
  RowFlags: {
    flexDirection: "row",
    gap: 10,
    marginTop: 10,
  },
});
