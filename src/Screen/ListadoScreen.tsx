import React, { useEffect, useState } from 'react'
import { FlatList, View, Text, Alert, TouchableOpacity ,Modal, Pressable} from 'react-native';
import style from '../theme/styles'
import axios from 'axios';
import { StackScreenProps } from '@react-navigation/stack';
import {  TextInput } from 'react-native-paper';


interface Persona {
  cedula: string,
  nombre: string,
  apellido: string,
  telefono: string,
  correo: string,
  contrasenia: string
}


interface Props extends StackScreenProps<any, any> { };


export const ListadoScreen = ({ navigation }: Props) => {

  const [Datos, setDatos] = useState<Persona[]>([]);
const [editaDatos,setEditaDatos]= useState<Persona|null>(null);


  useEffect(() => {
    List();
  }, [])



  //mostrar pagina listado
  const List = async () => {

    try {
      // await axios.get("http://192.168.137.100:8000/Listar") //INA
      await axios.get("http://192.168.1.145:8000/Listar") //CASA WIFI
        .then(Response => setDatos(Response.data));
      console.log(setDatos);
    } catch (error) {
      console.log("No se puede mostrar datos ", setDatos);
    }
  };

  const [modal, setmodalTrue] = useState(false);
  const [cedula, setCedula] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [telefono, setTelefono] = useState('');
  const [contrasenia, setContrasenia] = useState('');
  const [correo, setCorreo] = useState('');

  const ChangeDNI = (DNI: string) => {
    setCedula(DNI);
  };
  const ChangeName = (name: string) => {
    setNombre(name);
  };
  const ChangeApellido = (lastname: string) => {
    setApellido(lastname);
  };
  const ChangePhone = (phone: string) => {
    setTelefono(phone);
  };
  const ChangePass = (pass: string) => {
    setContrasenia(pass);
  };
  const ChangeEmail = (email: string) => {
    setCorreo(email);
  };





  const MostarModal = (item:Persona) => {
    setEditaDatos(item);
   setmodalTrue(true);
   setCedula(item.cedula);
   setNombre(item.nombre);
   setApellido(item.apellido);
   setTelefono(item.telefono);
   setCorreo(item.correo);
   setContrasenia(item.contrasenia);
  };

  const Delet = async (cedulaDelet: string) => {

    try {
      // await axios.delete(`http://192.168.137.195:8000/delete?cedula=${cedula}}`,); //INA
      await axios.delete(`http://192.168.1.145:8000/delete?cedula=${cedulaDelet}`, {}); //casaWIFI
      Alert.alert("Persona eliminada con exito");
      List();
    } catch (error) {
      console.log(error, "No se puede borrar ");
    }
  };

  //actualizar los datos
  const Update = async (cedula:string,nombre:string,apellido:string,telefono:string,correo:string,contrasenia:string) => {

    try {
      // await axios.put(`http://192.168.137.195:8000/actualizar?cedula=${cedula}&nombre=${nombre}&apellido=${apellido}&telefono=${telefono}&correo=${correo}&contrasenia=${contrasenia}`,{  //INA
        await axios.put(`http://192.168.1.145:8000/actualizar?cedula=${cedula}&nombre=${nombre}&apellido=${apellido}&telefono=${telefono}&correo=${correo}&contrasenia=${contrasenia}`,{
       });
   
       Alert.alert("Datos se actualizaron");
       List();
   setmodalTrue(false);
       setCedula('');
       setNombre('');
       setApellido('');
       setTelefono('');
       setCorreo('');
       setContrasenia('');
     } catch (error) {
       console.error('No se actualizaron los datos:', error);
     }

};

  const render = ({ item }: { item: Persona }) => {
    return (
      <View style={style.Card}>
        <View style={{ left: 20 }}>
          <Text style={style.TextCard}>Cedula : {item.cedula}</Text>
          <Text style={style.TextCard}>Nombre : {item.nombre}</Text>
          <Text style={style.TextCard}>Apellido : {item.apellido}</Text>
          <Text style={style.TextCard}>Telefono : {item.telefono}</Text>
          <Text style={style.TextCard}>Correo : {item.correo}</Text>
          <Text style={style.TextCard}>Contraseña : {item.contrasenia}</Text>
        </View>
        <View style={style.ViewBoton}>
          <TouchableOpacity style={style.buttonList}
            onPress={() => MostarModal(item)}>
            <Text style={style.TextCard}>Actualizar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={style.buttonList}
            onPress={() => Delet(item.cedula)}>
            <Text style={style.TextCard}>Eliminar</Text>
          </TouchableOpacity>
        </View>
        <Modal
          visible={modal}
         transparent={true}
         animationType='slide'
         style={style.Modal} 
         onRequestClose={()=>setmodalTrue(false)}
          >{Datos &&(
            <View style={style.ContenedorModal}>
              <Pressable
              onPress={()=>setmodalTrue(false)}
              >
                 <Text style={style.TextX}>X</Text>
              </Pressable>
              <Text style={style.TextTitle}>Editar Datos</Text>
          <TextInput
            style={{ width: '90%',left:20 }}
            label="Identificación"
            placeholder="Ingrese su identificación"
            value={cedula}
            onChangeText={ChangeDNI}
          />
          <TextInput
            style={{ width: '90%',left:20 }}
            label="Nombre"
            placeholder="Ingrese su nombre"
            value={nombre}
            onChangeText={ChangeName}
          />
          <TextInput
            style={{ width: '90%',left:20 }}
            label="Apellido"
            placeholder="Ingrese su apellido"
            value={apellido}
            onChangeText={ChangeApellido}
          />
          <TextInput
            style={{ width: '90%',left:20 }}
            keyboardType="numeric"
            label="Telefono"
            placeholder="Ingrese su numero de telefono"
            value={telefono}
            onChangeText={ChangePhone}
          />
          <TextInput
            style={{ width: '90%',left:20 }}
            label="Correo"
            placeholder="Ingrese su correo"
            value={correo}
            onChangeText={ChangeEmail}
          />
          <TextInput
            style={{ width: '90%',left:20 }}
            placeholder="Ingrese su contraseña"
            value={contrasenia}
            label="Contraseña"
            onChangeText={ChangePass}
          />
          <View style={{flexDirection:'row',flex:1,justifyContent:'center',alignItems:'center'}}>
            <Pressable onPress={()=>Update(cedula,nombre,apellido,telefono,correo,contrasenia)} style={style.buttonList}>
              <Text>Actualizar</Text>
            </Pressable>
          </View>
            </View>
          )}

        </Modal>
      </View>
    )
  };

  return (
    <View style={style.Central}>
      <View style={style.Top}>
      </View>
      <FlatList
        data={Datos}
        renderItem={render}
        keyExtractor={item => item.cedula}
      />
    </View>

  )
}
