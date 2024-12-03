import React, { forwardRef, Fragment, LegacyRef } from "react";
import { View, Text, TextInput, TextInputProps, TouchableOpacity , StyleProp, TextStyle} from "react-native";
import { MaterialIcons, FontAwesome, Octicons } from "@expo/vector-icons";
import { themas } from "../../global/themes";
import { style } from "../../components/Input/style";

type IconComponent = 
  React.ComponentType<React.ComponentProps<typeof MaterialIcons>> |
  React.ComponentType<React.ComponentProps<typeof FontAwesome>> |
  React.ComponentType<React.ComponentProps<typeof Octicons>>;

type Props = TextInputProps & {
  IconLeft?: IconComponent;
  IconRight?: IconComponent;
  iconLeftName?: string;
  iconRightName?: string;
  title?: string;
  onIconLeftPress?: () => void;
  onIconRightPress?: () => void;
  height?:number,
  labelStyle?:StyleProp<TextStyle>
};

export const Input = forwardRef((props: Props, ref: LegacyRef<TextInput | null>) => {
  const {
    IconLeft,
    IconRight,
    iconLeftName,
    iconRightName,
    title,
    onIconLeftPress,
    onIconRightPress,
    height,
    labelStyle,
    ...rest
  } = props;

  // Calcula a largura do campo de texto
  const calculateWidth = () => {
    if (IconLeft && IconRight) {
      return '80%';
    } else if (IconLeft || IconRight) {
      return '90%';
    } else {
      return '100%';
    }
  };

  // Calcula o padding à esquerda
  const calculateSizePaddingLeft = () => {
    if (IconLeft && IconRight) {
      return 0;
    } else if (IconLeft || IconRight) {
      return 10;
    } else {
      return 20; // Retorna um valor padrão
    }
  };

  return (
    <Fragment>
      {title && <Text style={[style.titleInput, labelStyle]}>{title}</Text>}
      <View style={[style.container, { paddingLeft: calculateSizePaddingLeft(), height:height||40 }]}>
        {/* Ícone à esquerda */}
        {IconLeft && iconLeftName && (
          <TouchableOpacity onPress={onIconLeftPress}>
            <IconLeft
              name={iconLeftName as any}
              size={20}
              color={themas.colors.gray}
            />
          </TouchableOpacity>
        )}

        {/* Campo de texto */}
        <TextInput
          ref={ref}
          style={[style.input, { width: calculateWidth(),height:'100%' }]}
          {...rest}
        />

        {/* Ícone à direita */}
        {IconRight && iconRightName && (
          <TouchableOpacity onPress={onIconRightPress}>
            <IconRight
              name={iconRightName as any}
              size={20}
              color={themas.colors.gray}
            />
          </TouchableOpacity>
        )}
      </View>
    </Fragment>
  );
});
