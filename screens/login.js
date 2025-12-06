import * as React from 'react';
import { useContext } from 'react';
import { View, Image, Text, TextInput, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import themeContext from "@/theme/themeContext";

// Firebase
import { ref, get } from "firebase/database";
import { db } from "@/components/config";

// AsyncStorage para almacenamiento local del usuario  
import AsyncStorage from '@react-native-async-storage/async-storage';

// IMPORTAR CONTEXTO para GUARDAR USUARIO
import { useUserContext } from "@/context/UserContext";

export default function Login() {

  const navigation = useNavigation();
  const theme = useContext(themeContext)

  // OBTENER FUNCIONES DEL CONTEXTO DE USUARIO PARA GUARDAR EL USUARIO LOGUEADO
  const { setUser, setSelectedUserId } = useUserContext();

  const imagenes = {
    dark: require('../image/black.png'),
    light: require('../image/skinet.png')
  };

  const imagen = theme.theme === "dark" ? imagenes.dark : imagenes.light;

  const fondo = theme.theme === "dark" ? "#1A1A1A" : "white";
  const cardBg = theme.theme === "dark" ? "#1E1E1E" : "#042c50";

  // ESTADOS PARA EL FORMULARIO DE LOGIN
  const [clientId, setClientId] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [error, setError] = React.useState("");

  // funcion para manejar el login 
  const handleLogin = async () => {
    setError("");

    if (!clientId || !phone) {
      setError("Debes llenar ambos campos.");
      return;
    }

    try {
      // Referencia al usuario en la base de datos
      const userRef = ref(db, `users/${clientId}`);
      // Obtener datos del usuario
      const snapshot = await get(userRef);

      //verificar si el usuario existe
      if (!snapshot.exists()) {
        setError("El ID de cliente no existe.");
        return;
      }

      const user = snapshot.val();

      if (!user.active) {
        setError("El usuario está inactivo. Contacte a soporte.");
        return;
      }

      if (user.phone !== phone) {
        setError("El número de teléfono no coincide.");
        return;
      }

      // Login exitoso
      await AsyncStorage.setItem("userId", clientId);

      // guarda el usuario en el contexto 
      setUser({ id: clientId, ...user });
      setSelectedUserId(clientId);

      navigation.navigate('Logueado');

    } catch (err) {
      setError("Error al conectar con el servidor.");
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: fondo }}
      behavior={Platform.OS === 'android' ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={{ flex: 1, backgroundColor: fondo }}>
          <View style={{ flexDirection: 'column', alignItems: 'center' }}>
            <Image source={imagen} style={{ width: '100%', height: 200, marginTop: '10%' }} />
          </View>
          <View style={{ flexDirection: 'column', alignItems: 'center' }}>
            <Text style={{ color: '#439AB7', fontSize: 50, fontWeight: 700 }}>BIENVENIDO</Text>
          </View>

          <View style={{
            backgroundColor: cardBg,
            flex: 1,
            borderTopRightRadius: 30,
            borderTopLeftRadius: 30,
            marginTop: 20,
            padding: 30
          }}>
            <Text style={{ color: '#ffffff', textAlign: 'center', fontSize: 35, fontWeight: 700 }}>
              Iniciar Sesión
            </Text>

            <Text style={{ color: 'white', marginTop: '10%', fontSize: 20 }}>ID CLIENTE</Text>
            <TextInput
              placeholder='ej. 1934'
              style={styles.input}
              value={clientId}
              onChangeText={setClientId}
              keyboardType="number-pad"
              returnKeyType="next"
            />

            <Text style={{ color: 'white', marginTop: '10%', fontSize: 20 }}>NÚMERO DE TELÉFONO</Text>
            <TextInput
              placeholder='ej. 4495123498'
              style={styles.input}
              keyboardType='number-pad'
              returnKeyType="done"
              value={phone}
              onChangeText={setPhone}
              onSubmitEditing={handleLogin}
            />

            {/* Mensaje de error */}
            {error !== "" && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>
                  {error}
                </Text>
              </View>
            )}

            <View style={styles.centrado}>
              <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.text}>Acceder</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate('Cobertura')}>
                <Text style={styles.noClientText}>No soy cliente</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: 'white',
    marginTop: '2%',
    borderRadius: 5,
    height: 50,
    paddingLeft: 15,
    fontSize: 16,
  },
  button: {
    borderRadius: 10,
    backgroundColor: '#439AB7',
    height: 50,
    justifyContent: 'center',
    width: '80%',
    alignItems: 'center',
    marginTop: 20,
  },
  text: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '700'
  },
  centrado: {
    alignItems: 'center',
    marginTop: 20,
  },
  errorContainer: {
    marginTop: 15,
    padding: 10,
    backgroundColor: 'rgba(255, 0, 0, 0.1)',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500'
  },
  noClientText: {
    textDecorationLine: 'underline',
    color: 'white',
    marginTop: 15,
    fontSize: 16
  }
});