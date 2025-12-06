import React, { useState, useEffect, useContext } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Button, ButtonText } from '@/components/ui/button';
import { useNavigation } from '@react-navigation/native';
import themeContext from "@/theme/themeContext";

export default function Inicio() {
    const navigation = useNavigation();
    const [pressed, setPressed] = useState(false);
    const theme = useContext(themeContext);

    const mainBg = theme.theme === "dark" ? "#1A1A1A" : "#042c50";
    const insideBg = theme.theme === "dark" ? "#121212ff" : "white";
    const boxBg = theme.theme === "dark" ? "#2A2A2A" : "#F6F6F6";
    const textColor = theme.color;

    return (
        <KeyboardAvoidingView style={{ flex: 1, backgroundColor: mainBg }} behavior={Platform.OS === 'android' ? "padding" : "height"}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
                
                <View style={{ backgroundColor: theme.backgroundColor, flex: 1 }}>
                    
                    <View style={{ display: 'flex', flexDirection: 'row', marginTop: 40, justifyContent: 'space-between', marginRight: 20, marginLeft: 20 }}>
                        <Text style={{ fontWeight: 700, fontSize: 24, color: textColor }}>ID 1525</Text>

                        <Button style={{ backgroundColor: '#FF914D' }}>
                            <ButtonText style={{ color: 'black' }}>Suspendido</ButtonText>
                        </Button>
                    </View>

                    <Text style={{ fontWeight: 700, fontSize: 20, marginLeft: 20, marginTop: 5, color: textColor }}>
                        Saldo pendiente
                    </Text>

                    <View style={{ flexDirection: 'column', marginTop: 20 }}>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ fontWeight: 700, fontSize: 50, color: textColor }}>$300.00</Text>
                        </View>

                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ fontWeight: 700, fontSize: 18, color: textColor }}>tu cuenta tiene adeudo</Text>
                        </View>

                        <View style={{ marginTop: 20, alignItems: 'center', justifyContent: 'center' }}>
                            <Button style={{ backgroundColor:  '#439AB7', width: '60%' }} onPress={() => navigation.navigate("Pagos")}>
                                <ButtonText style={{ color: theme.theme === "dark" ? "black" : "white" }}>Pagar ahora</ButtonText>
                            </Button>
                        </View>
                    </View>

                    <View style={{ backgroundColor: mainBg, height: "100%", borderTopRightRadius: 30, borderTopLeftRadius: 30, marginTop: 30, padding: 20 }}>
                        
                        <View style={{ backgroundColor: boxBg, height: 150, padding: 20, borderRadius: 20, marginTop: 10 }}>
                            <Text style={{ fontWeight: 700, fontSize: 18, color: textColor }}>Paquete actual</Text>
                            <Text style={{ fontWeight: 700, fontSize: 36, textAlign: 'center', marginBottom: 10, color: textColor }}>10 MB</Text>
                            <Text style={{ fontWeight: 700, fontSize: 18, textAlign: 'center', color: textColor }}>Fibra Óptica</Text>
                        </View>

                        <View style={{ flexDirection: 'row', marginTop: 30, right: 0, justifyContent: 'space-between' }}>
                            
                            <View style={{ backgroundColor: boxBg, width: 150, height: 150, borderRadius: 20, padding: 20 }}>
                                <Text style={{ fontWeight: 700, fontSize: 18, color: textColor }}>Red</Text>
                                <Text style={{ fontWeight: 700, marginTop: 40, fontSize: 17, color: textColor }}>SKT_3885</Text>
                            </View>

                            <View style={{ backgroundColor: boxBg, width: 150, height: 150, borderRadius: 20, padding: 20 }}>
                                <Text style={{ fontWeight: 700, fontSize: 18, color: textColor }}>Red 5G</Text>
                                <Text style={{ fontWeight: 700, marginTop: 40, fontSize: 17, color: textColor }}>SKT_3885_5G</Text>
                            </View>

                        </View>
                    </View>

                </View>

            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    azul: { backgroundColor: '#439AB7' },
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
    }
});
