import React from "react";
import { View, Image,Pressable } from "react-native";
import { Text } from "@/components/ui/text";
import { Button, ButtonText } from '@/components/ui/button';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

function referencia() {
    const navigation = useNavigation();
    const route = useRoute();
    const lugardepago = route.params.nombreLugar;
    return (
        <View style={{ flex: 1, padding: 20, backgroundColor: '#062b4a' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start', alignContent: 'space-between', marginLeft: 10, marginTop: 20 }}>
                <Pressable onPress={() => navigation.goBack()}>
                    <Icon name="close" size={28} color="white" />
                </Pressable>
                <Text style={{ textTransform: 'uppercase', color: 'white', fontSize: 28, fontWeight: 700, marginTop: 20, paddingLeft: 20, paddingRight: 50, lineHeight: 32, textAlign: 'center' }}>Deposito en efectivo</Text>
            </View>
            <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 12, alignItems: 'center', marginTop:30 }}>
                <Text style={{ color: 'black', fontSize: 16, textAlign: 'center', paddingBottom: 20, fontWeight:700 }}>
                    Referencia pago en efectivo </Text>
                <View style={{ backgroundColor: 'white', flexDirection: 'row', padding: 10, marginBottom:20 }}>
                    <Text style={{ flex: 1, textAlign: 'left' }}>Total a pagar</Text>
                    <Text style={{ flex: 1, textAlign: 'right', fontWeight: '700', color:'black' }}>$350</Text>
                </View>
                <View style={{ alignItems: 'center', borderWidth: 1, borderColor: '#4e4e4e42', borderRadius: 10, padding:10 }}>
                    <View style={{ width: '100%', marginBottom:10 }}>
                        <Image
                            style={{ width: 280, height: 50 }}
                            source={require('../image/barras.png')}
                            alt="image"

                        />
                    </View>
                    <View
                        style={{ backgroundColor: '#cccccc51', width: 280, height: 2 }}
                    />
                    <View style={{ backgroundColor: 'white', flexDirection: 'row', padding: 10 }}>
                        <Text style={{ flex: 1, textAlign: 'left' }}>Comercio</Text>
                        <Text style={{ flex: 1, textAlign: 'right', fontWeight: 'bold' }}>{lugardepago}</Text>
                    </View>
                    <View
                        style={{ backgroundColor: '#cccccc51', width: 280, height: 2 }}
                    />
                    <View style={{ backgroundColor: 'white', flexDirection: 'row', padding: 10 }}>
                        <Text style={{ flex: 1, textAlign: 'left' }}>Tipo de pago</Text>
                        <Text style={{ flex: 1, textAlign: 'right', fontWeight: 'bold' }}>Servicios Doppay</Text>
                    </View>
                    <View
                        style={{ backgroundColor: '#cccccc51', width: 280, height: 2 }}
                    />
                    <View style={{ backgroundColor: 'white', flexDirection: 'row', padding: 10 }}>
                        <Text style={{ flex: 1, textAlign: 'left' }}>Referencia</Text>
                        <Text style={{ textAlign: 'right', fontWeight: 'bold', fontSize: 14 }}>10004992287803241317</Text>
                    </View>
                    <View
                        style={{ backgroundColor: '#cccccc51', width: 280, height: 2 }}
                    />
                    <View style={{ backgroundColor: 'white', flexDirection: 'row', padding: 10 }}>
                        <Text style={{ flex: 1, textAlign: 'left' }}>Comisión por pago</Text>
                        <Text style={{ flex: 1, textAlign: 'right', fontWeight: 'bold' }}>$25</Text>
                    </View>
                </View>
                <Button style={{ color: '#062b4a', size: "md", marginTop: 20 }}>
                    <ButtonText>Descargar PDF</ButtonText>
                </Button>
            </View>
        </View>
    );
};

export default referencia;
