import React from "react";
import {
  TouchableHighlightProps,
  TouchableOpacity,
  ActivityIndicator,
  Text,
} from "react-native";
import { style } from "../Button/style";

type Props = TouchableHighlightProps & {
  text: string;
  loading: boolean;
};

export function Button({ text, loading, ...rest }: Props) {
  return (
    <TouchableOpacity 
      style={style.button} 
      {...rest}
    >
      {loading ? (
        <ActivityIndicator />
      ) : (
        <Text style={style.textButton}>{text}</Text>
      )}
    </TouchableOpacity>
  );
}
