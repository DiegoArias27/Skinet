import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, TouchableHighlight, Pressable } from 'react-native';
import { Grid, GridItem } from '@/components/ui/grid';
import { Button, ButtonText } from '@/components/ui/button';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";

export default function Pagos() {
    const navigation = useNavigation();
    const [pressed, setPressed] = useState(false);
    return (
        <KeyboardAvoidingView style={{ flex: 1, backgroundColor: "#042c50" }} behavior={Platform.OS === 'android' ? "padding" : "height"}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
                <View style={{ backgroundColor: 'white', flex: 1 }}>
                    <View style={{ alignItems: 'center' }}>
                        <View style={{ backgroundColor: '#042c50', width: '90%', height: 200, marginTop: 20, padding: 0, borderRadius: 20 }}>
                            <View>
                                <Text style={{ color: 'white', fontWeight: 700, fontSize: 20, paddingLeft: 20, paddingTop: 20 }}>Saldo pendiente</Text>
                            </View>
                            <View>
                                <Text style={{ fontSize: 54, color: 'white', textAlign: 'center', fontWeight: 700, marginTop: 10 }}>$300.00</Text>
                            </View>
                            <View style={{ position: 'absolute', alignItems: 'center', width: '100%', bottom: 30 }}>
                                <Text style={{ color: 'white', fontWeight: 700, fontSize: 18 }}>tu cuenta tiene adeudo</Text>
                            </View>
                        </View>
                        <Grid
                            className="gap-4"
                            _extra={{
                                className: 'grid-cols-9',
                            }}
                            style={{ width: "90%", marginTop: 30 }}
                        >
                            <TouchableHighlight onPress={() => navigation.navigate("Tarjetas")} style={{ width: 105, borderRadius: 20 }}>
                                <GridItem
                                    className="bg-background-50 p-3 rounded-md text-center"
                                    _extra={{
                                        className: 'col-span-3',
                                    }}
                                    style={{ alignItems: 'center', backgroundColor: '#F6F6F6' }}
                                >
                                    <Icon name="currency-usd" size={50} color={"black"} />
                                    <Text style={{ textAlign: 'center', paddingLeft: 18, paddingRight: 18, fontSize: 14 }}>OXXO o BARA</Text>
                                </GridItem>
                            </TouchableHighlight>
                            <TouchableHighlight onPress={() => navigation.navigate("Deposito")} style={{ width: 105, borderRadius: 20 }}>
                                <GridItem
                                    className="bg-background-50 p-3 rounded-md text-center"
                                    _extra={{
                                        className: 'col-span-3',
                                    }}
                                    style={{ alignItems: 'center', backgroundColor: '#F6F6F6' }}
                                >
                                    <Icon name="barcode" size={50} color={"black"} />
                                    <Text style={{ textAlign: 'center', fontSize: 14 }}>Deposito en efectivo</Text>
                                </GridItem>
                            </TouchableHighlight>
                            <TouchableHighlight onPress={() => navigation.navigate("Transferencia")} style={{ width: 105, borderRadius: 20 }}>
                                <GridItem
                                    className="bg-background-50 p-3 rounded-md text-center"
                                    _extra={{
                                        className: 'col-span-3',
                                    }}
                                    style={{ alignItems: 'center', backgroundColor: '#F6F6F6' }}
                                >
                                    <Icon name="credit-card-outline" size={50} color={"black"} />
                                    <Text style={{ textAlign: 'center', fontSize: 14 }}>Trasferencia o tarjeta</Text>
                                </GridItem>
                            </TouchableHighlight>
                        </Grid>
                    </View>
                    <View style={{ marginTop: 20, marginLeft: 20, marginBottom: 20 }}>
                        <Text style={{ fontWeight: 700, fontSize: 18 }}>Historial de pagos</Text>
                    </View>
                    <VStack>
                        <View style={{ backgroundColor: '#F6F6F6', width: '90%', marginLeft: 20, marginRight: 20, borderRadius: 10, paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 10, marginBottom: 10 }}>
                            <Pressable onPress={() => navigation.navigate("Movimiento")}>
                                <HStack style={{ justifyContent: 'space-between' }}>
                                    <Text style={{ fontWeight: 700, fontSize: 18 }}>Julio</Text>
                                    <Text style={{ fontWeight: 700, fontSize: 18, color: '#00A79D' }}>Pagado</Text>
                                    <VStack>
                                        <Text style={{ fontWeight: 900, fontSize: 10, textAlign: 'center' }}>$300</Text>
                                        <Text style={{ fontWeight: 900, fontSize: 10, textAlign: 'center' }}>05 de julio</Text>
                                    </VStack>
                                </HStack>
                            </Pressable>
                        </View>
                        <View style={{ backgroundColor: '#F6F6F6', width: '90%', marginLeft: 20, marginRight: 20, borderRadius: 10, paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 10, marginBottom: 10 }}>
                            <Pressable onPress={() => navigation.navigate("Movimiento")}>
                            <HStack style={{ justifyContent: 'space-between' }}>
                                <Text style={{ fontWeight: 700, fontSize: 18 }}>Junio</Text>
                                <Text style={{ fontWeight: 700, fontSize: 18, color: '#00A79D' }}>Pagado</Text>
                                <VStack>
                                    <Text style={{ fontWeight: 900, fontSize: 10, textAlign: 'center' }}>$300</Text>
                                    <Text style={{ fontWeight: 900, fontSize: 10, textAlign: 'center' }}>05 de junio</Text>
                                </VStack>
                            </HStack>
                            </Pressable>
                        </View>
                        <View style={{ backgroundColor: '#F6F6F6', width: '90%', marginLeft: 20, marginRight: 20, borderRadius: 10, paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 10, marginBottom: 10 }}>
                            <Pressable onPress={() => navigation.navigate("Movimiento")}>
                            <HStack style={{ justifyContent: 'space-between' }}>
                                <Text style={{ fontWeight: 700, fontSize: 18 }}>Mayo</Text>
                                <Text style={{ fontWeight: 700, fontSize: 18, color: '#00A79D' }}>Pagado</Text>
                                <VStack>
                                    <Text style={{ fontWeight: 900, fontSize: 10, textAlign: 'center' }}>$300</Text>
                                    <Text style={{ fontWeight: 900, fontSize: 10, textAlign: 'center' }}>05 de mayo</Text>
                                </VStack>
                            </HStack>
                            </Pressable>
                        </View>
                        <View style={{ backgroundColor: '#F6F6F6', width: '90%', marginLeft: 20, marginRight: 20, borderRadius: 10, paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 10, marginBottom: 10 }}>
                            <Pressable onPress={() => navigation.navigate("Movimiento")}>
                            <HStack style={{ justifyContent: 'space-between' }}>
                                <Text style={{ fontWeight: 700, fontSize: 18 }}>Abril</Text>
                                <Text style={{ fontWeight: 700, fontSize: 18, color: '#00A79D' }}>Pagado</Text>
                                <VStack>
                                    <Text style={{ fontWeight: 900, fontSize: 10, textAlign: 'center' }}>$300</Text>
                                    <Text style={{ fontWeight: 900, fontSize: 10, textAlign: 'center' }}>05 de abril</Text>
                                </VStack>
                            </HStack>
                            </Pressable>
                        </View>



                    </VStack>
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
