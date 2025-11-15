import React from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Avatar, AvatarBadge, AvatarFallbackText, AvatarImage } from '@/components/ui/avatar';
import {useNavigation} from '@react-navigation/native';


export default function logueado() {
    const navigation = useNavigation();
    return (
        <KeyboardAvoidingView style={{ flex: 1, backgroundColor: "#042c50" }} behavior={Platform.OS === 'android' ? "padding" : "height"}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
                <View style={{ backgroundColor: 'white', flex: 1 }}>
                    <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                        <Image source={require('../image/skinet.png')} style={{ width: '100%', height: 200, marginTop: '10%' }} />
                    </View>
                    <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                        <Text style={{ color: '#439AB7', fontSize: 50, fontWeight: 700 }}>BIENVENIDO</Text>
                    </View>
                    <View style={{ backgroundColor: "#042c50", height: '100%', borderTopRightRadius: 30, borderTopLeftRadius: 30, marginTop: 20, padding: 30 }}>
                        <Text style={{ color: '#ffffff', textAlign: 'center', fontSize: 35, fontWeight: 700, paddingLeft: 40, paddingRight: 40 }}>Hola Leo Velasco Arias</Text>
                        <View style={[styles.centrado, styles.avatar]}>
                            <Avatar style={{ width: 200, height: 200 }}>
                                <AvatarFallbackText size="2xl">Leo Velasco Arias</AvatarFallbackText>
                                <AvatarImage
                                    source={{
                                        uri: Image.resolveAssetSource(require("../image/Leo.png")).uri
                                    }}
                                />
                            </Avatar>
                        </View>
                        <View style={styles.centrado}>
                            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Biometrico')}>
                                <Text style={styles.text}>Entrar con biometría</Text>
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
    avatar: {
        marginTop: 20,
        borderStyle:'solid',
        borderWidth: 108,
        borderRadius:200,
        width:200,
        height:200,
        justifyContent:'center',
        borderColor:'white',
        left:50
    }
});
