import React, { useState, useEffect } from "react";
import { Modal, Platform, View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { style } from "./style";

const CustomDateTimePicker = ({ type, onDateChange, show, setShow }) => {
  const [date, setDate] = useState(new Date());

  // Atualiza o valor inicial da data ao receber novas props
  useEffect(() => {
    if (onDateChange) {
      onDateChange(date); // Chama apenas uma vez quando o componente monta
    }
  }, [date]); // Observa alterações no estado da data

  const OnChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    if (setShow) {
      setShow(false); // Fecha o modal após a seleção
    }
    if (onDateChange) {
      onDateChange(currentDate); // Propaga a data para o componente pai
    }
  };

  return (
    <Modal
      transparent={true}
      visible={show}
      onRequestClose={() => setShow(false)} // Fecha o modal ao pressionar "voltar"
    >
      <View style={style.modalOverlay}>
        <View
          style={[
            style.container,
            Platform.OS === "android" && { backgroundColor: "white" }, // Para Android
          ]}
        >
          <DateTimePicker
            value={date}
            mode={type} // Aceita "date" ou "time"
            display={Platform.OS === "ios" ? "inline" : "default"}
            onChange={OnChange} // Define o manipulador de alterações
          />
        </View>
      </View>
    </Modal>
  );
};

export default CustomDateTimePicker;
