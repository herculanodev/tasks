import { StyleSheet } from "react-native";
import { themas } from '../../global/themes';

export const style = StyleSheet.create({
    boxInput:{
        width: '100%',
        height: 40,
        borderWidth:1,
       borderRadius: 40,
        marginTop:10,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal:20,
        backgroundColor: themas.colors.lightGray,
        borderColor: themas.colors.lightGray,
        
      },
      input:{
        height:'100%',
        width:'90%',
        borderRadius:40,
      },
      titleInput:{
        marginLeft:  5,
        color: themas.colors.gray,
        marginTop:20,
      },
      icon:{
        marginBottom: 15,
      },
      container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: themas.colors.lightGray,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 15,
      },
      
      
})