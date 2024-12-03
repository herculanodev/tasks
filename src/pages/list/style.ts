import { Dimensions, StyleSheet } from "react-native";
import { themas } from '../../global/themes';
import { Button } from "../../components/Button";


const style = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      // backgroundColor: "red",
    },
    header: {
      width:'100%', 
      height:Dimensions.get('window').height/6,
      backgroundColor:themas.colors.primary,
      paddingHorizontal:20,
      justifyContent:'center'
    
    },
    greeting:{
      fontSize:20,
      color:'#FFF',
      marginTop: 20

    },
    boxInput:{
      width:'80%',
      backgroundColor:'white',
     

    },
    boxList:{
      flex:1,
      width:'100%'
    },
    card:{
      width:'100%',
      height:60,
      backgroundColor: '#FFF',
      marginTop:6,
      borderRadius:10,
      justifyContent:'center',
      padding: 10,
      borderWidth: 1,
      borderColor: themas.colors.lightGray
    },
    rowCard:{
      flexDirection:'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
        rowCardLeft:{
          width:'70%',
          alignItems:'center',
          flexDirection:'row',
          gap:10,
          },
        descriptionCard:{
          color:themas.colors.gray,
          
          
        },
        titleCard:{
            fontSize:16,
            fontWeight:'bold'
        },
        button:{
          backgroundColor: 'red',
          justifyContent:'center',
          alignItems:'center',
          width:100,
          marginVertical:10,
          borderRadius: 10
        }
  });
  export default style;