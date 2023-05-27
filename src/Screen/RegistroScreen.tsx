import React, { useState,useEffect } from 'react'
import { View, TouchableOpacity, Alert } from 'react-native'
import { Text, TextInput } from 'react-native-paper';
import style from '../theme/styles';
import axios from 'axios';
import { StackScreenProps } from '@react-navigation/stack';
import { useRoute } from '@react-navigation/native';



interface Props extends StackScreenProps<any,any>{};



export const RegistroScreen = ({navigation}:Props) => {

  const route = useRoute();


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

  useEffect(() => {
    if (route.params) {
      

    const fetchData = async () => {
      try {
        const response = await axios.get(`http://192.168.124.93:8000/PersonaActualizar?cedula=${cedula}`);
        const { data } = response;
        if (data) {
      setCedula(data.cedula);
      setNombre(data.nombre);
      setApellido(data.apellido);
      setTelefono(data.telefono);
      setCorreo(data.correo);
      setContrasenia(data.contrasenia);
      fetchData();
    }
  } catch (error) {
    console.error('No se pudieron obtener los datos:', error);
  }
};
fetchData();
}
  }, [route.params]);

//insertar los datos
  const Insert = async () => {
    if(cedula.length>0 && nombre.length>0 && apellido.length>0 && telefono.length>0 && correo.length>0 && contrasenia.length>0){
      try {
      //  await axios.post(`http://192.168.137.195:8000/guardar?cedula=${cedula}&nombre=${nombre}&apellido=${apellido}&telefono=${telefono}&correo=${correo}&contrasenia=${contrasenia}`,{  //INA
      await axios.post(`http://192.168.1.145.93:8000/guardar?cedula=${cedula}&nombre=${nombre}&apellido=${apellido}&telefono=${telefono}&correo=${correo}&contrasenia=${contrasenia}`,{ //casa WIFI
         });
     
         Alert.alert("Datos guardados con exito");
         setCedula('');
         setNombre('');
         setApellido('');
         setTelefono('');
         setCorreo('');
         setContrasenia('');
       } catch (error) {
         console.error('No se envian los datos:', error);
       }
    }else{
      Alert.alert("Debes rellenar todos los espacios");
    }
  
  };

  




  return (
    <View>
      <View style={style.inputSty}>
        <View style={{ marginVertical: 20,alignItems:'center' }}>
          <TextInput
          style={{width:'90%'}}
            label="Identificación"
            placeholder="Ingrese su identificación"
            value={cedula}
            onChangeText={ChangeDNI}
          />
          <TextInput
          style={{width:'90%'}}
            label="Nombre"
            placeholder="Ingrese su nombre"
            value={nombre}
            onChangeText={ChangeName}
          />
          <TextInput
          style={{width:'90%'}}
            label="Apellido"
            placeholder="Ingrese su apellido"
            value={apellido}
            onChangeText={ChangeApellido}
          />
          <TextInput
          style={{width:'90%'}}
            keyboardType="numeric"
            label="Telefono"
            placeholder="Ingrese su numero de telefono"
            value={telefono}
            onChangeText={ChangePhone}
          />
          <TextInput
          style={{width:'90%'}}
            label="Correo"
            placeholder="Ingrese su correo"
            value={correo}
            onChangeText={ChangeEmail}
          />
          <TextInput
          style={{width:'90%'}}
            placeholder="Ingrese su contraseña"
            value={contrasenia}
            label="Contraseña"
            onChangeText={ChangePass}
          />

          <Text
            style={{
              fontWeight: 'bold',
              textAlign: 'center',
              fontSize: 16,
            }}>
            <View>
              <TouchableOpacity
                activeOpacity={7}
                style={style.button}
                onPress={Insert}>
                <Text style={{
                  fontWeight: 'bold',
                  fontSize: 20, textAlign: "center"
                }}>Guardar
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={7}
                style={style.button}
                onPress={()=> navigation.navigate('Lista') }>
                <Text style={{
                  fontWeight: 'bold',
                  fontSize: 20, textAlign: "center"  
                }}>Mostrar
                </Text>
              </TouchableOpacity>
            </View>
          </Text>
        </View>
      </View>
    </View>
  )
}
