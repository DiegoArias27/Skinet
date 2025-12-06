import React, { useState, useContext, useEffect } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Divider } from '@/components/ui/divider';
import { Button, ButtonText } from '@/components/ui/button';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import themeContext from "@/theme/themeContext";
import * as LocalAuthentication from 'expo-local-authentication';
import { db, functions } from "@/components/config";
import { ref, get, set } from "firebase/database";
import { httpsCallable } from "firebase/functions";
import * as Notifications from 'expo-notifications';

import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Biometrico() {
    const navigation = useNavigation();
    const [pressed, setPressed] = useState(false);
    const theme = useContext(themeContext);

    const imagenes = {
        dark: require('../image/black.png'),
        light: require('../image/skinet.png')
    };

    const imagen = theme.theme === "dark" ? imagenes.dark : imagenes.light;

    const fondo = theme.theme === "dark" ? "#1A1A1A" : "white";
    const cardBg = theme.theme === "dark" ? "#1E1E1E" : "#042c50";

    const [userName, setUserName] = useState('');
    const [clientId, setUser] = useState('');

    useEffect(() => {
        const loadUserName = async () => {
            const name = await AsyncStorage.getItem('userName');
            if (name) setUserName(name);
        };
        loadUserName();
    }, []);

     useEffect(() => {
        const loadUser= async () => {
            const id = await AsyncStorage.getItem('userId');
            if (id) setUser(id);
        };
        loadUser();
    }, []);

    const handleBiometricAuth = async () => {
        try {
            // Verificar si el dispositivo soporta biometría
            const compatible = await LocalAuthentication.hasHardwareAsync();
            const enrolled = await LocalAuthentication.isEnrolledAsync();

            if (!compatible || !enrolled) {
                alert("Tu dispositivo no soporta biometría o no tiene huellas/rostro registrado.");
                return;
            }

            // Intentar autenticación
            const result = await LocalAuthentication.authenticateAsync({
                promptMessage: "Skinet",
                fallbackLabel: "Usar contraseña",
                disableDeviceFallback: false,
            });

            if (result.success) {
                await saveFcmToken(clientId);

                // *LLAMADA A LA CLOUD FUNCTION PARA NOTIFICACIÓN*
                console.log("Antes de llamar a la función, clientId:", clientId);
                try {
                    console.log("clientId antes de llamar a la función:", clientId);

                    const notifySaldoPendiente = httpsCallable(functions, 'notifySaldoPendienteOnLogin');
                    const result = await notifySaldoPendiente({ userId: clientId });
                    console.log("Resultado de la función:", result.data);
                } catch (err) {
                    console.error("Error llamando a notifySaldoPendiente:", err);
                }
                navigation.navigate('Principal');
            } else {
                console.log("Autenticación fallida, intenta de nuevo.");
            }
        } catch (error) {
            console.log("Error en autenticación biométrica:", error);
            console.log("Ocurrió un error al autenticar.");
        }
    };


    const saveFcmToken = async (userId) => {
        try {
            let token;
            // Solicitar permiso
            const { status: existingStatus } = await Notifications.getPermissionsAsync();
            console.log("existingStatus:", existingStatus);

            let finalStatus = existingStatus;

            console.log("Permiso de notificación:", finalStatus);

            if (existingStatus !== 'granted') {
                console.log("Solicitando permisos...");
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
                console.log("Nuevo status:", finalStatus);
            }

            if (finalStatus !== 'granted') {
                console.log("Permiso NO concedido");
                alert("Permiso de notificaciones denegado");
                return;
            }

            console.log("Obteniendo token...");
            try {
                const expoTokenResponse = await Notifications.getExpoPushTokenAsync();
                console.log("Respuesta getExpoPushTokenAsync:", expoTokenResponse);
                token = expoTokenResponse.data;
            } catch (err) {
                console.log("ERROR getExpoPushTokenAsync:", err);
            }

            // Guardarlo en la BD
            await set(ref(db, users/${userId}/fcmToken), token);

            console.log("Token FCM guardado:", token);
        } catch (error) {
            console.log("Error guardando token FCM:", error);
        }
    };

    return (
        <KeyboardAvoidingView style={{ flex: 1, backgroundColor: cardBg }} behavior={Platform.OS === 'android' ? "padding" : "height"}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
                <View style={{ backgroundColor: fondo, flex: 1 }}>
                    <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                        <Image source={imagen} style={{ width: '100%', height: 200, marginTop: '10%' }} />
                    </View>
                    <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                        <Text style={{ color: '#439AB7', fontSize: 50, fontWeight: 700 }}>BIENVENIDO</Text>
                    </View>
                    <View style={{ backgroundColor: cardBg, height: '100%', borderTopRightRadius: 30, borderTopLeftRadius: 30, marginTop: 20, padding: 30 }}>
                        <Text style={{ color: '#ffffff', textAlign: 'center', fontSize: 35, fontWeight: 700, paddingLeft: 40, paddingRight: 40 }}>Hola {userName}</Text>

                        <View style={[styles.azul, styles.cuadro]}>
                            <Text style={{ color: 'white', fontSize: 24, fontWeight: 700, paddingLeft: 50, paddingRight: 50, textAlign: 'center' }}>Lector de huella para Skinet Internet</Text>
                            <Text style={{ color: 'white', fontSize: 22, marginTop: 20, marginBottom: 20 }}>Ingresar a la app</Text>
                            <Divider className="my-0.5" style={{ marginBottom: 1 }} />
                            <Button variant="solid" action="primary" style={{ backgroundColor: '#439AB7', height: 'auto', bottom: 0, width: '100%', padding: 10, borderRadius: 20 }} onPress={() => navigation.goBack()}>
                                <ButtonText style={{ fontSize: 24 }}>Cancelar</ButtonText>
                            </Button>
                        </View>
                        <View style={styles.centrado}>
                            <TouchableOpacity style={styles.lector} onPressIn={() => setPressed(true)} onPressOut={() => { setPressed(false); handleBiometricAuth(); }}
                            >
                                <Icon
                                    name="fingerprint"
                                    size={80}
                                    color={pressed ? '#042c50' : '#FFFFFF'}
                                />
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    azul: {
        backgroundColor: '#439AB7'

    },
    button: {
        marginTop: 40,
        borderRadius: 10,      
        backgroundColor: '#439AB7',
        height: 40,
        justifyContent: 'center',
        width: '80%',
        alignItems: 'center',
        display: 'flex'    
    },
    text: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 700,
    },
    centrado: {
        alignItems: 'center',
    },
    cuadro: {
        width: "100%",
        alignItems: 'center',
        borderRadius: 20,
        paddingTop: 10,
        paddingBottom: 0,
        marginTop: 25,
    },
    lector: {
        backgroundColor: "#439AB7",
        borderRadius: "100%",
        width: 90,
        height: 100,
        justifyContent: 'center',
        marginTop: 40,
        alignItems: 'center'
    }
});