import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Grid, GridItem } from '@/components/ui/grid';
import { Button, ButtonText } from '@/components/ui/button';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";

export default function infoticketVertical() {
    const navigation = useNavigation();
    return (
        <KeyboardAvoidingView style={{ flex: 1, backgroundColor: "#042c50" }} behavior={Platform.OS === 'android' ? "padding" : "height"}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
                <View style={{ backgroundColor: 'white', flex: 1 }}>
                    <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ borderRadius: 20, backgroundColor: "#E19E00", width: 100, marginLeft: 30, marginTop: 20 }}>
                            <Text style={{ color: 'white', padding: 10, textAlign: 'center' }}>En proceso</Text>
                        </View>
                        <View style={{ backgroundColor: '#F6F6F6', width: '30%', marginLeft: 30, height: 'auto', marginTop: 20, borderRadius: 20, flexDirection: 'column', paddingTop: 10, paddingBottom: 10, paddingLeft: 30, paddingRight: 30 }}>
                            <Text style={{ fontWeight: 700, fontSize: 16, marginBottom: 5 }}>Cable de fibra dañado</Text>
                            <Text style={{ fontWeight: 700, fontSize: 12, color: "#E20004", marginBottom: 10 }}>Prioridad - Alta</Text>
                            <Text style={{ fontWeight: 700, fontSize: 16 }}>Fecha de terminación:</Text>
                            <Text>01-06-2025 - 13:15</Text>
                        </View>
                        <View style={{ width: "40%" }}>
                            <View style={{ alignItems: 'flex-start', alignSelf: 'flex-start', marginLeft: 20, marginTop: 20 }}>
                                <Text style={{ fontWeight: 700, fontSize: 20 }}>Técnico Asignado</Text>
                            </View>
                            <View style={{ backgroundColor: '#E7E0EC', width: '90%', flexDirection: 'row', padding: 15, borderRadius: 20, borderColor: '#C4C4D0', borderStyle: 'solid', borderWidth: 1, marginTop: 10 }}>
                                <View>
                                    <Image source={require("../image/Leo.png")} style={{ width: 40, height: 40 }} resizeMode="contain" />
                                </View>
                                <View style={{ marginLeft: 20 }}>
                                    <Text style={{ fontWeight: 700 }}>Daniel Arias</Text>
                                    <Text style={{ color: "#0213AF" }}>Teléfono: 4494968568</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{ marginTop: 20, marginLeft: 30, marginBottom: 20 }}>
                        <Text style={{ fontWeight: 700, fontSize: 18 }}>Seguimiento</Text>
                    </View>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        <HStack>
                            <View style={{ borderColor: '#d8d8d8ff', borderWidth: 1, width:200,height:70, marginLeft: 30, marginRight: 5, borderRadius: 10, paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 10, marginBottom: 10 }}>
                                <HStack>

                                    <VStack style={{ justifyContent: 'center', marginRight: 10 }}>
                                        <Icon name="check-circle-outline" size={25} color={"#00b40cff"} />
                                    </VStack>
                                    <VStack>
                                        <Text style={{ fontWeight: 900, fontSize: 14, textAlign: 'center' }}>01/06/2025 - 13:15</Text>
                                        <Text style={{ fontWeight: 400, fontSize: 12, textAlign: 'left', color: "black" }}>Ticket atendido</Text>
                                    </VStack>
                                </HStack>
                            </View>

                            <View style={{ borderColor: '#d8d8d8ff', borderWidth: 1, width: 200,height:70, marginRight: 5, borderRadius: 10, paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 10, marginBottom: 10 }}>
                                <HStack>
                                    <VStack style={{ justifyContent: 'center', marginRight: 10 }}>
                                        <Icon name="home" size={25} color={"#c64500ff"} />
                                    </VStack>
                                    <VStack>
                                        <Text style={{ fontWeight: 900, fontSize: 14, textAlign: 'center' }}>01/06/2025 - 12:45</Text>
                                        <Text style={{ fontWeight: 400, fontSize: 12, textAlign: 'left', color: "black" }}>Llegó al sitio</Text>
                                    </VStack>
                                </HStack>
                            </View>
                            <View style={{ borderColor: '#d8d8d8ff', borderWidth: 1, width: 200,height:70, marginRight: 5, borderRadius: 10, paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 10, marginBottom: 10 }}>
                                <HStack>

                                    <VStack style={{ justifyContent: 'center', marginRight: 10 }}>
                                        <Icon name="car-sports" size={25} color={"#ebb800ff"} />
                                    </VStack>
                                    <VStack>
                                        <Text style={{ fontWeight: 900, fontSize: 14, textAlign: 'center' }}>01/06/2025 - 12:20</Text>
                                        <Text style={{ fontWeight: 400, fontSize: 12, textAlign: 'left', color: "black" }}>Técnico en camino</Text>
                                    </VStack>
                                </HStack>
                            </View>
                            <View style={{ borderColor: '#d8d8d8ff', borderWidth: 1, width: 200,height:70, marginRight: 5, borderRadius: 10, paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 10, marginBottom: 10 }}>
                                <HStack>
                                    <VStack style={{ justifyContent: 'center', marginRight: 10 }}>
                                        <Icon name="ticket-account" size={25} color={"#62009bff"} />
                                    </VStack>
                                    <VStack>
                                        <Text style={{ fontWeight: 900, fontSize: 14, textAlign: 'center' }}>31/05/2025 - 8:45</Text>
                                        <Text style={{ fontWeight: 400, fontSize: 12, textAlign: 'left', color: "black" }}>Técnico Asignado</Text>
                                    </VStack>
                                </HStack>
                            </View>
                            <View style={{ borderColor: '#d8d8d8ff', borderWidth: 1, width: 200,height:70, marginRight: 20, borderRadius: 10, paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 10, marginBottom: 10 }}>
                                <HStack>

                                    <VStack style={{ justifyContent: 'center', marginRight: 10 }}>
                                        <Icon name="timelapse" size={25} color={"#430056ff"} />
                                    </VStack>
                                    <VStack>
                                        <Text style={{ fontWeight: 900, fontSize: 14, textAlign: 'center' }}>30/05/2025 - 16:18</Text>
                                        <Text style={{ fontWeight: 400, fontSize: 12, textAlign: 'left', color: "black" }}>Reporte creado</Text>
                                    </VStack>
                                </HStack>
                            </View>
                        </HStack>
                    </ScrollView>
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
