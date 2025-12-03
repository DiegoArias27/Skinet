import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, TouchableHighlight, Pressable, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Grid, GridItem } from '@/components/ui/grid';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import themeContext from "@/theme/themeContext";

// importar el contexto
import { useUserContext } from "@/context/UserContext";

export default function Pagos() {

    const navigation = useNavigation();
    const theme = useContext(themeContext);

    const { payments, selectedUserId } = useUserContext();

    const cardBg = theme.theme === "dark" ? "#1A1A1A" : "#042c50";
    const listBg = theme.theme === "dark" ? "#1A1A1A" : "#F6F6F6";

    // 1. Validar usuario 
    if (!selectedUserId) {
        return <Text style={{ color: theme.color, marginTop: 40, textAlign: "center" }}>Inicia sesión para ver los pagos.</Text>;
    }

    // 2. Obtener pagos del usuario
    const userPayments = payments[selectedUserId] || {};

    // 3. Convertir pagos a arreglo
    const pagosArray = Object.entries(userPayments).map(([id, pago]) => ({
        id,
        ...pago
    }));

    // 4. Calcular saldo pendiente
    const pagosPendientes = pagosArray.filter(
        p => p.status?.toLowerCase() === "pendiente"
    );
    const saldoPendiente = pagosPendientes.reduce((acc, pago) => acc + pago.total, 0);

    return (
        <KeyboardAvoidingView style={{ flex: 1, backgroundColor: theme.backgroundColor }} behavior={Platform.OS === 'android' ? "padding" : "height"}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
                <View style={{ backgroundColor: theme.backgroundColor, flex: 1 }}>

                    {/* Card de Saldo pendiente */}
                    <View style={{ alignItems: 'center' }}>
                        <View style={{ backgroundColor: cardBg, width: '90%', height: 200, marginTop: 20, borderRadius: 20 }}>

                            <Text style={{ color: "white", fontWeight: 700, fontSize: 20, paddingLeft: 20, paddingTop: 20 }}>
                                Saldo pendiente
                            </Text>

                            {/* Si tiene saldo pendiente */}
                            {saldoPendiente > 0 ? (
                                <>
                                    <Text style={{ fontSize: 54, color: "white", textAlign: 'center', fontWeight: 700, marginTop: 10 }}>
                                        ${saldoPendiente}.00
                                    </Text>

                                    <View style={{ position: 'absolute', alignItems: 'center', width: '100%', bottom: 30 }}>
                                        <Text style={{ color: "white", fontWeight: 700, fontSize: 18 }}>
                                            Tu cuenta tiene adeudo
                                        </Text>
                                    </View>
                                </>
                            ) : (
                                // Si no tiene adeudos
                                <View style={{ position: 'absolute', top: '45%', width: '100%', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 22, color: "white", fontWeight: 700 }}>
                                        No tiene adeudos
                                    </Text>
                                </View>
                            )}

                        </View>

                        {/* Métodos de pago */}
                        <Grid className="gap-4" _extra={{ className: 'grid-cols-9' }} style={{ width: "90%", marginTop: 30 }}>
                            <TouchableHighlight onPress={() => navigation.navigate("Tarjetas")} style={{ width: 105, borderRadius: 20 }}>
                                <GridItem style={{ alignItems: 'center', backgroundColor: listBg, padding: 10 }} _extra={{ className: 'col-span-3' }}>
                                    <Icon name="currency-usd" size={50} color={theme.color} />
                                    <Text style={{ textAlign: 'center', fontSize: 14, color: theme.color }}>OXXO o BARA</Text>
                                </GridItem>
                            </TouchableHighlight>

                            <TouchableHighlight onPress={() => navigation.navigate("Deposito")} style={{ width: 105, borderRadius: 20 }}>
                                <GridItem style={{ alignItems: 'center', backgroundColor: listBg, padding: 10 }} _extra={{ className: 'col-span-3' }}>
                                    <Icon name="barcode" size={50} color={theme.color} />
                                    <Text style={{ textAlign: 'center', fontSize: 14, color: theme.color }}>Deposito en efectivo</Text>
                                </GridItem>
                            </TouchableHighlight>

                            <TouchableHighlight onPress={() => navigation.navigate("Transferencia")} style={{ width: 105, borderRadius: 20 }}>
                                <GridItem style={{ alignItems: 'center', backgroundColor: listBg, padding: 10 }} _extra={{ className: 'col-span-3' }}>
                                    <Icon name="credit-card-outline" size={50} color={theme.color} />
                                    <Text style={{ textAlign: 'center', fontSize: 14, color: theme.color }}>Transferencia o tarjeta</Text>
                                </GridItem>
                            </TouchableHighlight>
                        </Grid>
                    </View>

                    {/* Historial */}
                    <View style={{ marginTop: 20, marginLeft: 20, marginBottom: 20 }}>
                        <Text style={{ fontWeight: 700, fontSize: 18, color: theme.color }}>
                            Historial de pagos
                        </Text>
                    </View>

                    <VStack>
                        {pagosArray.length === 0 && (
                            <Text
                                style={{ color: theme.color, textAlign: "center", marginBottom: 30 }}
                            >
                                No hay pagos registrados.
                            </Text>
                        )}

                        {pagosArray.map((pago) => (
                            <Pressable
                                key={pago.id}
                                onPress={() => navigation.navigate("Movimiento", { pago })}
                                style={({ pressed }) => ({
                                    backgroundColor: listBg, // diseño intacto
                                })}
                            >
                                {({ pressed }) => (
                                    <View
                                        style={{
                                            width: "90%",
                                            marginHorizontal: 20,
                                            borderRadius: 10,
                                            padding: 15,
                                            marginBottom: 10,
                                            backgroundColor: pressed
                                                ? theme.mode === "light"
                                                    ? "#b3b3b3ff"
                                                    : "#30303069"
                                                : listBg,
                                        }}
                                    >
                                        <HStack style={{ justifyContent: "space-between" }}>
                                            <Text style={{ fontWeight: 700, fontSize: 18, color: theme.color }}>
                                                {pago.mes}
                                            </Text>

                                            <Text
                                                style={{
                                                    fontWeight: 700,
                                                    fontSize: 18,
                                                    color:
                                                        pago.status?.toLowerCase() === "pendiente" ? "red" : "#00A79D",
                                                }}
                                            >
                                                {pago.status}
                                            </Text>

                                            <VStack>
                                                <Text style={{ fontWeight: 900, fontSize: 10, color: theme.color }}>
                                                    ${pago.total}
                                                </Text>
                                                <Text style={{ fontWeight: 900, fontSize: 10, color: theme.color }}>
                                                    {pago.fecha}
                                                </Text>
                                            </VStack>
                                        </HStack>
                                    </View>
                                )}
                            </Pressable>
                        ))}
                    </VStack>

                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
