import { StyleSheet } from "react-native";
import { themas } from '../../global/themes';

export const style = StyleSheet.create({
button:{
    width: 250,
    height: 50,
    alignItems: 'center',
    justifyContent:'center',
     backgroundColor:themas.colors.primary,
     borderRadius: 40,
     shadowOpacity:0.29,
     shadowRadius: 4.65,
     elevation: 7,
     shadowOffset:{
      width:0,
      height:3,
     }
     
  },
  textButton:{
    fontSize:16,
    color:'#FFFF',
    fontWeight:'bold'
  },
  textBottom:{
    fontSize:16,
    color: themas.colors.gray
  },
})