import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Divider } from '@/components/ui/divider';
import { Send } from "lucide-react-native";
import { Button, ButtonText } from '@/components/ui/button';
import { useNavigation } from '@react-navigation/native';

export default function Inicio() {
    const navigation = useNavigation();
    const [pressed, setPressed] = useState(false);
    return (

        <KeyboardAvoidingView style={{ flex: 1, backgroundColor: "#042c50" }} behavior={Platform.OS === 'android' ? "padding" : "height"}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
                <View style={{ backgroundColor: 'white', flex: 1 }}>
                    <View style={{ display: 'flex', flexDirection: 'row', marginTop: 40, justifyContent: 'space-between', marginRight: 20, marginLeft: 20 }}>
                        <View>
                            <Text style={{ fontWeight: 700, fontSize: 24 }}>ID 1525</Text>
                        </View>
                        <View>
                            <Button style={{ backgroundColor: '#FF914D' }}>
                                <ButtonText style={{ color: 'black' }}>Suspendido</ButtonText>
                            </Button>
                        </View>
                    </View>
                    <Text style={{ fontWeight: 700, fontSize: 20, marginLeft: 20, marginTop: 5 }}>Saldo pendiente</Text>
                    <View style={{ flexDirection: 'column', marginTop: 20 }}>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ fontWeight: 700, fontSize: 50 }}>$300.00</Text>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ fontWeight: 700, fontSize: 18 }}>tu cuenta tiene adeudo</Text>
                        </View>
                        <View style={{ marginTop: 20, alignItems: 'center', justifyContent: 'center' }}>
                            <Button style={{ backgroundColor: '#439AB7', width: '60%' }} onPress={() => navigation.navigate("Pagos")}>
                                <ButtonText style={{ alignItems: 'center' }}>Pagar ahora</ButtonText>
                            </Button>
                        </View>
                    </View>
                    <View style={{ backgroundColor: '#042c50', height: "100%", borderTopRightRadius: 30, borderTopLeftRadius: 30, marginTop: 30, padding: 20 }}>
                        <View style={{ backgroundColor: '#F6F6F6', height: 150, padding: 20, borderRadius: 20, marginTop: 10 }}>
                            <Text style={{ fontWeight: 700, fontSize: 18 }}>Paquete actual</Text>
                            <Text style={{ fontWeight: 700, fontSize: 36, textAlign: 'center', marginBottom: 10 }}>10 MB</Text>
                            <Text style={{ fontWeight: 700, fontSize: 18, textAlign: 'center' }}>Fibra Óptica</Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 30, right: 0, justifyContent: 'space-between' }}>
                            <View style={{ backgroundColor: '#F6F6F6', width: 150, height: 150, borderRadius: 20, padding: 20 }}>
                                <Text style={{ fontWeight: 700, fontSize: 18 }}>Red</Text>
                                <Text style={{ fontWeight: 700, marginTop: 40, fontSize: 17 }}>SKT_3885</Text>
                            </View>
                            <View style={{ backgroundColor: '#F6F6F6', width: 150, height: 150, borderRadius: 20, padding: 20 }}>
                                <Text style={{ fontWeight: 700, fontSize: 18 }}>Red 5G</Text>
                                <Text style={{ fontWeight: 700, marginTop: 40, fontSize: 17 }}>SKT_3885_5G</Text>
                            </View>
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
