import { View, Pressable, Clipboard } from "react-native";
import React, { useContext } from "react";
import { Text } from "@/components/ui/text";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import themeContext from "@/theme/themeContext";

import { useUserContext } from "@/context/UserContext";


function transferencia() {
    const navigation = useNavigation();
    const theme = useContext(themeContext);

    const Beneficiario = "Skinet";
    const CLABE = "646010320511763535";
    const banco = "STP";

    const fondo = theme.theme === "dark" ? "#1A1A1A" : "#042c50";
    const cardBg = theme.theme === "dark" ? "#1E1E1E" : "#F6F6F6";
    const textColor = theme.theme === "dark" ? "#FFFFFF" : "#042c50";
    const borderColor = theme.theme === "dark" ? "#333" : "#C4C4D0";
    const copyIconColor = theme.theme === "dark" ? "#FFFFFF" : "#2f2f2fff";
    const alertBg = theme.theme === "dark" ? "#3a2e1d" : "#fbe4d1ff";
    const alertText = theme.theme === "dark" ? "#ffa500" : "orange";

    const copybeneficiario = () => {
        Clipboard.setString(Beneficiario);
    };
    const copyCLABE = () => {
        Clipboard.setString(CLABE);
    };
    const copybanco = () => {
        Clipboard.setString(banco);
    };

    const { payments, selectedUserId } = useUserContext();
    const userPayments = payments[selectedUserId] || {};


    //Convertir pagos a arreglo
    const pagosArray = Object.entries(userPayments).map(([id, pago]) => ({
        id,
        ...pago
    }));

    // Filtrar solo pagos pendientes (case-insensitive)
    const pagosPendientes = pagosArray.filter(
        p => p.status?.toLowerCase() === "pendiente"
    );

    // Sumar únicamente los pagos pendientes
    const totalPendiente = pagosPendientes.reduce(
        (sum, p) => sum + (p.total || 0),
        0
    );

    return (
        <View style={{ flex: 1, padding: 20, backgroundColor: fondo }}>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start', alignContent: 'space-between', marginLeft: 10, marginTop: 20 }}>
                <Pressable onPress={() => navigation.goBack()}>
                    <Icon name="close" size={28} color={textColor} />
                </Pressable>
                <Text style={{ textTransform: 'uppercase', color: textColor, fontSize: 28, fontWeight: 700, marginTop: 20, paddingLeft: 30, paddingRight: 70, lineHeight: 32, textAlign: 'center' }}>
                    transferencia
                </Text>
            </View>

            <View style={{ backgroundColor: cardBg, padding: 20, borderRadius: 20, alignItems: 'center', marginTop: 40, borderWidth: 1, borderColor: borderColor }}>
                <Text style={{ color: textColor, fontSize: 16, textAlign: 'center', paddingBottom: 20, fontWeight: 700 }}>
                    Datos para transferencia
                </Text>

                <View style={{ backgroundColor: cardBg, flexDirection: 'row', padding: 10, width: '100%', borderRadius: 12, borderWidth: 1, borderColor: borderColor }}>
                    <Text style={{ flex: 1, textAlign: 'left', color: textColor, fontWeight: 500 }}>Total a pagar</Text>
                    <Text style={{ flex: 1, textAlign: 'right', fontWeight: 'bold', color: textColor }}>${totalPendiente}</Text>
                </View>

                <View style={{ padding: 20, alignItems: 'center' }}>
                    <Text style={{ textAlign: 'center', color: textColor }}>
                        Para transferir debes ingresar a tu banco y agregar como destinatario a <Text style={{ fontWeight: 700, color: theme.color }}>{Beneficiario}</Text>
                    </Text>
                </View>

                <View style={{ alignItems: 'center', borderWidth: 3, borderColor: '#cccccc42', borderRadius: 10, width: '100%' }}>
                    <View style={{ backgroundColor: cardBg, flexDirection: 'row', padding: 10 }}>
                        <Text style={{ flex: 1, textAlign: 'left', color: textColor }}>Beneficiario</Text>
                        <Text style={{ flex: 1, textAlign: 'right', fontWeight: 'bold', marginRight: 10, color: textColor }}>{Beneficiario}</Text>
                        <Pressable onPress={copybeneficiario}>
                            <Icon name="content-copy" size={18} color={copyIconColor} />
                        </Pressable>
                    </View>

                    <View style={{ backgroundColor: '#cccccc51', width: '100%', height: 2 }} />

                    <View style={{ backgroundColor: cardBg, flexDirection: 'row', padding: 10 }}>
                        <Text style={{ flex: 1, textAlign: 'left', color: textColor }}>Cuenta CLABE</Text>
                        <Text style={{ textAlign: 'right', fontWeight: 'bold', fontSize: 12, marginRight: 10, color: textColor }}>{CLABE}</Text>
                        <Pressable onPress={copyCLABE}>
                            <Icon name="content-copy" size={18} color={copyIconColor} />
                        </Pressable>
                    </View>

                    <View style={{ backgroundColor: '#cccccc51', width: '100%', height: 2 }} />

                    <View style={{ backgroundColor: cardBg, flexDirection: 'row', padding: 10 }}>
                        <Text style={{ flex: 1, textAlign: 'left', color: textColor }}>Banco</Text>
                        <Text style={{ flex: 1, textAlign: 'right', fontWeight: 'bold', marginRight: 10, color: textColor }}>{banco}</Text>
                        <Pressable onPress={copybanco}>
                            <Icon name="content-copy" size={18} color={copyIconColor} />
                        </Pressable>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', backgroundColor: alertBg, width: "100%", borderColor: alertText, borderWidth: 1, borderRadius: 20, paddingTop: 20, paddingBottom: 20, paddingLeft: 30, paddingRight: 30, justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                    <Icon name="alert-circle" size={24} color={alertText} />
                    <Text style={{ color: alertText, fontWeight: 'bold', marginLeft: 15, textAlign: 'justify' }}>
                        No debes compartir la cuenta CLABE:<Text style={{ color: alertText, fontWeight: '300' }}> es exclusivo para ti. Skinet no se hara responsable de pagos externos realizados a esta cuenta</Text>
                    </Text>
                </View>
            </View>
        </View>
    );
};

export default transferencia;
