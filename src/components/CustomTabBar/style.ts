import { StyleSheet } from "react-native";
import { themas } from '../../global/themes';

const style = StyleSheet.create({
    tabArea:{
       flexDirection: 'row',
       height: 80,
       justifyContent:'space-around',
       shadowColor:"#000",
       shadowOffset:{
        width: 0,
        height: 12,
       },
       shadowOpacity:0.58,
       shadowRadius: 16.00,

       elevation:24,
    },
    tabItem:{
    flex: 1,
    justifyContent:'center',
    alignItems:'center'
    },
    tabItemButton: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "blue", // Altere conforme necessário
        borderRadius: 50,
        height: 70,
        width: 70,
        marginBottom: 10,
      },
      
})
export default style;