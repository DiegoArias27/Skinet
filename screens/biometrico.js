import React, { useState, useContext } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Divider } from '@/components/ui/divider';
import { Button, ButtonText } from '@/components/ui/button';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import themeContext from "@/theme/themeContext";

export default function biometrico() {
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
                        <Text style={{ color: '#ffffff', textAlign: 'center', fontSize: 35, fontWeight: 700, paddingLeft: 40, paddingRight: 40 }}>Hola Leo Velasco Arias</Text>

                        <View style={[styles.azul, styles.cuadro]}>
                            <Text style={{ color: 'white', fontSize: 24, fontWeight: 700, paddingLeft: 50, paddingRight: 50, textAlign: 'center' }}>Lector de huella para Skinet Internet</Text>
                            <Text style={{ color: 'white', fontSize: 22, marginTop: 20, marginBottom: 20 }}>Ingresar a la app</Text>
                            <Divider className="my-0.5" style={{ marginBottom: 1 }} />
                            <Button variant="solid" action="primary" style={{ backgroundColor: '#439AB7', height: 'auto', bottom: 0, width: '100%', padding: 10, borderRadius: 20 }} onPress={() => navigation.goBack()}>
                                <ButtonText style={{ fontSize: 24 }}>Cancelar</ButtonText>
                            </Button>
                        </View>
                        <View style={styles.centrado}>
                            <TouchableOpacity style={styles.lector} onPressIn={() => setPressed(true)} onPressOut={() => { setPressed(false); navigation.navigate('Principal'); }}
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
        borderRadius: 10,       // 🔸 esquinas redondeadas
        backgroundColor: '#439AB7',
        height: 40,
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
