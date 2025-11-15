import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Pressable } from 'react-native';
import { Grid, GridItem } from '@/components/ui/grid';
import { Button, ButtonText } from '@/components/ui/button';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";

export default function tickets() {
    const navigation = useNavigation();
    const [pressed, setPressed] = useState(false);
    return (
        <KeyboardAvoidingView style={{ flex: 1, backgroundColor: "#042c50" }} behavior={Platform.OS === 'android' ? "padding" : "height"}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
                <View style={{ backgroundColor: 'white', flex: 1 }}>
                    <View style={{ alignItems: 'center' }}>
                        <View style={{ backgroundColor: '#E7E0EC', width: '90%', flexDirection: 'row', padding: 15, borderRadius: 20, borderColor: '#C4C4D0', borderStyle: 'solid', borderWidth: 1, marginTop: 20 }}>
                            <View>
                                <Image source={require("../image/Leo.png")} style={{ width: 40, height: 40 }} resizeMode="contain" />
                            </View>
                            <View style={{ marginLeft: 20 }}>
                                <Text style={{ fontWeight: 700 }}>Leo Velasco Arias</Text>
                                <Pressable onPress={() => navigation.navigate("Perfil")}>
                                <Text style={{ color: "#0213AF" }}>{'Perfil > '}</Text>
                                </Pressable>
                            </View>
                        </View>
                        <View style={{ alignItems: 'flex-start', alignSelf: 'flex-start', marginLeft: 20, marginTop: 20 }}>
                            <Text style={{ fontWeight: 700, fontSize: 20 }}>Técnico Asignado</Text>
                        </View>
                        <View style={{ backgroundColor: '#042c50', width: '90%', height: 'auto', marginTop: 10, borderRadius: 20, flexDirection: 'column', padding: 20 }}>
                            <View style={{ flexDirection: 'row', marginBottom: 15 }}>
                                <View style={{ marginRight: 20 }}>
                                    <Icon name="account-outline" size={25} color={"white"} />
                                </View>
                                <View style={{ marginRight: 5 }}>
                                    <Text style={{ fontSize: 18, color: 'white', fontWeight: 700 }}>Nombre:</Text>
                                </View>
                                <View>
                                    <Text style={{ fontSize: 18, color: 'white', fontWeight: 200 }}>Daniel Arias</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', marginBottom: 15 }}>
                                <View style={{ marginRight: 20 }}>
                                    <Icon name="phone-outline" size={25} color={"white"} />
                                </View>
                                <View style={{ marginRight: 5 }}>
                                    <Text style={{ fontSize: 18, color: 'white', fontWeight: 700 }}>Teléfono:</Text>
                                </View>
                                <View>
                                    <Text style={{ fontSize: 18, color: 'white', fontWeight: 200 }}>4492968568</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ marginRight: 20 }}>
                                    <Icon name="calendar-clock-outline" size={25} color={"white"} />
                                </View>
                                <View style={{ marginRight: 5 }}>
                                    <Text style={{ fontSize: 18, color: 'white', fontWeight: 700 }}>Llegada:</Text>
                                </View>
                                <View>
                                    <Text style={{ fontSize: 18, color: 'white', fontWeight: 200 }}>01-06-2025 - 12:45</Text>
                                </View>
                            </View>


                        </View>
                    </View>
                    <View style={{ marginTop: 20, marginLeft: 20, marginBottom: 20 }}>
                        <Text style={{ fontWeight: 700, fontSize: 18 }}>Historial de Tickets</Text>
                    </View>
                    <VStack>
                        <TouchableOpacity onPress={() => navigation.navigate('Infoticket')}>
                            <View style={{ backgroundColor: '#F6F6F6', width: '90%', marginLeft: 20, marginRight: 20, borderRadius: 10, paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 10, marginBottom: 10 }}>
                                <HStack style={{ justifyContent: 'space-between' }}>
                                    <VStack>
                                        <Text style={{ fontWeight: 900, fontSize: 12, textAlign: 'center' }}>Cable de fibra dañado</Text>
                                        <Text style={{ fontWeight: 900, fontSize: 10, textAlign: 'left', color: "#E19E00" }}>En proceso</Text>
                                    </VStack>
                                    <VStack style={{ justifyContent: 'center' }}>
                                        <Text style={{ fontWeight: 700, fontSize: 10 }}>01 de junio</Text>
                                    </VStack>
                                </HStack>
                            </View>
                        </TouchableOpacity>
                        <View style={{ backgroundColor: '#F6F6F6', width: '90%', marginLeft: 20, marginRight: 20, borderRadius: 10, paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 10, marginBottom: 10 }}>
                            <HStack style={{ justifyContent: 'space-between' }}>
                                <VStack>
                                    <Text style={{ fontWeight: 900, fontSize: 12, textAlign: 'center' }}>Cambio de modem</Text>
                                    <Text style={{ fontWeight: 900, fontSize: 10, textAlign: 'left', color: "#00D24D" }}>Cerrado</Text>
                                </VStack>
                                <VStack style={{ justifyContent: 'center' }}>
                                    <Text style={{ fontWeight: 700, fontSize: 10 }}>04 de mayo</Text>
                                </VStack>
                            </HStack>
                        </View>
                        <View style={{ backgroundColor: '#F6F6F6', width: '90%', marginLeft: 20, marginRight: 20, borderRadius: 10, paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 10, marginBottom: 10 }}>
                            <HStack style={{ justifyContent: 'space-between' }}>
                                <VStack>
                                    <Text style={{ fontWeight: 900, fontSize: 12, textAlign: 'center' }}>Cambio de eliminador</Text>
                                    <Text style={{ fontWeight: 900, fontSize: 10, textAlign: 'left', color: "#E20004" }}>Cancelado</Text>
                                </VStack>
                                <VStack style={{ justifyContent: 'center' }}>
                                    <Text style={{ fontWeight: 700, fontSize: 10 }}>20 de febrero</Text>
                                </VStack>
                            </HStack>
                        </View>
                        <View style={{ backgroundColor: '#F6F6F6', width: '90%', marginLeft: 20, marginRight: 20, borderRadius: 10, paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 10, marginBottom: 10 }}>
                            <HStack style={{ justifyContent: 'space-between' }}>
                                <VStack>
                                    <Text style={{ fontWeight: 900, fontSize: 12, textAlign: 'center' }}>Cambio de cable a fibra</Text>
                                    <Text style={{ fontWeight: 900, fontSize: 10, textAlign: 'left', color: "#00D24D" }}>Cerrado</Text>
                                </VStack>
                                <VStack style={{ justifyContent: 'center' }}>
                                    <Text style={{ fontWeight: 700, fontSize: 10 }}>15 de febrero</Text>
                                </VStack>
                            </HStack>
                        </View>
                        <View style={{ backgroundColor: '#F6F6F6', width: '90%', marginLeft: 20, marginRight: 20, borderRadius: 10, paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 10, marginBottom: 10 }}>
                            <HStack style={{ justifyContent: 'space-between' }}>
                                <VStack>
                                    <Text style={{ fontWeight: 900, fontSize: 12, textAlign: 'center' }}>Cambio de modem</Text>
                                    <Text style={{ fontWeight: 900, fontSize: 10, textAlign: 'left', color: "#E20004" }}>Cancelado</Text>
                                </VStack>
                                <VStack style={{ justifyContent: 'center' }}>
                                    <Text style={{ fontWeight: 700, fontSize: 10 }}>04 de enero</Text>
                                </VStack>
                            </HStack>
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
