import * as React from 'react';
import { View, Image, Text, TextInput, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import {useNavigation} from '@react-navigation/native';

export default function login() {
    const navigation = useNavigation();
  return (
      <KeyboardAvoidingView style={{ flex: 1, backgroundColor: "#042c50" }} behavior={Platform.OS === 'android' ? "padding" : "height"}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
          <View style={{backgroundColor:'white', flex:1}}>
            <View style={{ flexDirection: 'column', alignItems: 'center' }}>
              <Image source={require('../image/skinet.png')} style={{ width: '100%', height: 200, marginTop: '10%' }} />
            </View>
            <View style={{ flexDirection: 'column', alignItems: 'center' }}>
              <Text style={{ color: '#439AB7', fontSize: 50, fontWeight: 700 }}>BIENVENIDO</Text>
            </View>
            <View style={{ backgroundColor: "#042c50", height: '100%', borderTopRightRadius: 30, borderTopLeftRadius: 30, marginTop: 20, padding: 30 }}>
              <Text style={{ color: '#ffffff', textAlign: 'center', fontSize: 35, fontWeight: 700 }}>Iniciar Sesión</Text>
              <Text style={{ color: 'white', marginTop: '20%', fontSize: 20 }}>ID CLIENTE</Text>
              <TextInput placeholder='ej. 1525' style={{ backgroundColor: 'white', marginTop: '2%', borderRadius: 5, height: '6%', paddingLeft: '6%' }} keyboardType='numeric'></TextInput>
              <Text style={{ color: 'white', marginTop: '10%', fontSize: 20 }}>NÚMERO DE TELÉFONO</Text>
              <TextInput placeholder='ej. 4491824567' style={{ backgroundColor: 'white', marginTop: '2%', borderRadius: 5, height: '6%', marginBottom: '10%', paddingLeft: '6%' }} keyboardType='phone-pad'></TextInput>
              <View style={styles.centrado}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Logueado')}>
                  <Text style={styles.text}>Acceder</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Cobertura')}>
                <Text style={{ textDecorationLine: 'underline', color: 'white', marginTop: '5%' }}>No soy cliente</Text>
                </TouchableOpacity>
              </View>

            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
  );
}


const styles = StyleSheet.create({
  button: {
    borderRadius: 10,       // 🔸 esquinas redondeadas
    backgroundColor: '#439AB7',
    height: '5%',
    justifyContent: 'center',
    width: '80%',
    alignItems: 'center',
    display: 'flex'     // necesario para que se vea el borde redondeado
  },
  text: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 700,
  },
  centrado: {
    alignItems: 'center',
    height: '100%'
  }
});

