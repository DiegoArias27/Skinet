import { View, Pressable, Clipboard } from "react-native";
import React from "react";
import { Text } from "@/components/ui/text";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

function transferencia() {
    const navigation = useNavigation();
    const Beneficiario = "Skinet";
    const CLABE = "646010320511763535"
    const banco = "STP"

    const copybeneficiario = () => {
        Clipboard.setString(Beneficiario);
    };
    const copyCLABE = () => {
        Clipboard.setString(CLABE);
    };
    const copybanco = () => {
        Clipboard.setString(banco);
    };
    return (
        <View style={{ flex: 1, padding: 20, backgroundColor: '#062b4a' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start', alignContent: 'space-between', marginLeft: 10, marginTop: 20 }}>
                <Pressable onPress={() => navigation.goBack()}>
                    <Icon name="close" size={28} color="white" />
                </Pressable>
                <Text style={{ textTransform: 'uppercase', color: 'white', fontSize: 28, fontWeight: 700, marginTop: 20, paddingLeft: 30, paddingRight: 70, lineHeight: 32, textAlign: 'center' }}>transferencia</Text>
            </View>
            <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 12, alignItems: 'center', marginTop: 40 }}>
                <Text style={{ color: 'black', fontSize: 16, textAlign: 'center', paddingBottom: 20, fontWeight: 700 }}>
                    Datos para transferencia </Text>
                <View style={{ backgroundColor: 'white', flexDirection: 'row', padding: 10 }}>
                    <Text style={{ flex: 1, textAlign: 'left' }}>Total a pagar</Text>
                    <Text style={{ flex: 1, textAlign: 'right', fontWeight: 'bold' }}>$350</Text>
                </View>
                <View style={{ padding: 20, alignItems: 'center' }}>
                    <Text style={{ textAlign: 'center' }}>Para transferir debes ingresar a tu banco y agregar como destinatario a <Text style={{ fontWeight: 700 }}>Skinet</Text></Text>
                </View>
                <View style={{ alignItems: 'center', borderWidth: 3, borderColor: '#cccccc42', borderRadius: 10 }}>
                    <View style={{ backgroundColor: 'white', flexDirection: 'row', padding: 10 }}>
                        <Text style={{ flex: 1, textAlign: 'left' }}>Beneficiario</Text>
                        <Text style={{ flex: 1, textAlign: 'right', fontWeight: 'bold', marginRight: 10 }}>Skinet</Text>
                        <Pressable onPress={copybeneficiario}>
                            <Icon name="content-copy" size={18} color="#2f2f2fff" />
                        </Pressable>
                    </View>
                    <View
                        style={{ backgroundColor: '#cccccc51', width: 280, height: 2 }}
                    />
                    <View style={{ backgroundColor: 'white', flexDirection: 'row', padding: 10 }}>
                        <Text style={{ flex: 1, textAlign: 'left' }}>Cuenta CLABE</Text>
                        <Text style={{ textAlign: 'right', fontWeight: 'bold', fontSize: 12, marginRight: 10 }}>646010320511763535</Text>
                        <Pressable onPress={copyCLABE}>
                            <Icon name="content-copy" size={18} color="#2f2f2fff" />
                        </Pressable>
                    </View>
                    <View
                        style={{ backgroundColor: '#cccccc51', width: 280, height: 2 }}
                    />
                    <View style={{ backgroundColor: 'white', flexDirection: 'row', padding: 10 }}>
                        <Text style={{ flex: 1, textAlign: 'left' }}>Banco</Text>
                        <Text style={{ flex: 1, textAlign: 'right', fontWeight: 'bold', marginRight: 10 }}>STP</Text>
                        <Pressable onPress={copybanco}>
                            <Icon name="content-copy" size={18} color="#2f2f2fff" />
                        </Pressable>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', backgroundColor: '#fbe4d1ff', width: "100%", borderColor: 'orange', borderWidth: 1, borderRadius: 20, paddingTop: 20, paddingBottom: 20, paddingLeft: 30, paddingRight: 30, justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                    <Icon name="alert-circle" size={24} color="orange" />
                    <Text style={{ color: 'orange', fontWeight: 'bold', marginLeft: 15, textAlign: 'justify' }}>No debes compartir la cuenta CLABE:<Text style={{ color: 'orange', fontWeight: 300 }}> es exclusivo para ti. Skinet no se hara responsable de pagos externos realizados a esta cuenta</Text></Text>
                </View>
            </View>
        </View>
    );
};

export default transferencia;
