import { header } from "express-validator";
import { StyleSheet } from "react-native";

const style = StyleSheet.create({
   Label: {
      fontSize: 35,
      color: "white",
      textAlign: "center"
   },Modal:{
backgroundColor:'#0F4BFA',
   },
   Top: {
      backgroundColor: "#1E466B",
      alignContent: "center"

   },ContenedorModal:{
marginTop:100,
width:'100%',
height:500, 
backgroundColor:'#258D9E',
   },TextX:{
      alignSelf:'flex-end',
      width:35,
      height:35,
      textAlign:'center',
      color:'#ffffff',
      padding:6,
      borderRadius:100,
      fontSize:16,
      marginBottom:10,
      backgroundColor:'#c42b1c'
   },TextTitle:{
   fontSize:22,
   textAlign:'center'
   },
   Central: {
      backgroundColor: "#3378B8",
      width: "100%",
      height: "100%",
      alignItems:'center',
      paddingTop:10,
   },
   inputSty:
   {
 width: "100%",
      height: "100%",
       backgroundColor: "#3378B8",
   },
   button: {
      height: 55,
      width: 200,
      backgroundColor: "#36A9F7",
      marginVertical: 10,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 30,
   },
   Card:{
      width:300,
      borderWidth:2,
      borderColor:"#0F4BFA",
      borderRadius:15,
      backgroundColor:"#258D9E",  
   },
   TextCard:{
      color:"white",
     fontSize:20,
   
   },
   ViewBoton:{
      alignItems:'center',
      padding:10,
   },
   buttonList:{
      backgroundColor: "#36A9F7",
      borderRadius: 30,
      height:45,
      width: 150,
      justifyContent: 'center',
      alignItems: 'center',

   }
});
export default style;