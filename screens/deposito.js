import React from "react";
import { View, Text, Image, Button, Pressable, TouchableHighlight } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Grid, GridItem } from '@/components/ui/grid';
import { useNavigation } from '@react-navigation/native';
import GridCustom from "./GridCustom";

export default function deposito() {
    const navigation = useNavigation();
    return (
        <View style={{ backgroundColor: '#042c50', width: "100%", height: '100%', padding: 20 }}>
            <Pressable onPress={() => navigation.goBack()}>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start', alignContent: 'space-between', marginLeft: 10, marginTop: 20 }}>
                    <Icon name="close" size={28} color="white" />
                    <Text style={{ textTransform: 'uppercase', color: 'white', fontSize: 28, fontWeight: 700, marginTop: 20, paddingLeft: 20, paddingRight: 50, textAlign: 'center' }}>Deposito en efectivo</Text>
                </View>
            </Pressable>
            <View style={{ backgroundColor: '#f6f6f6', borderRadius: 30, marginTop: 20, padding: 20 }}>
                <View style={{ alignItems: 'center', marginBottom: 30 }}>
                    <Text style={{ fontWeight: 700 }}>Elige donde quieres pagar</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30 }}>
                    <Text>Total a pagar</Text>
                    <Text style={{ fontWeight: 700 }}>$350.00</Text>
                </View>
                <Grid
                    className="gap-y-2 gap-x-4"
                    _extra={{
                        className: 'grid-cols-8',
                    }}
                    style={{ width: "100%", height: 400, justifyContent: 'space-between', alignContent: 'space-between' }}
                >
                    <TouchableHighlight onPress={() => navigation.navigate("Referencia", { nombreLugar: "Banco Azteca" })} style={{ width: 70, height: 40 }} underlayColor="#DDDDDD">
                        <GridCustom nombre="bancoazteca" width={60} />
                    </TouchableHighlight>
                    <TouchableHighlight onPress={() => navigation.navigate("Referencia", { nombreLugar: "Banorte" })} style={{ width: 70, height: 40 }} underlayColor="#DDDDDD">
                        <GridCustom nombre="banorte" width={60} />
                    </TouchableHighlight>
                    <TouchableHighlight onPress={() => navigation.navigate("Referencia", { nombreLugar: "BBVA" })} style={{ width: 70, height: 40 }} underlayColor="#DDDDDD">
                        <GridCustom nombre="bbva" width={40} />
                    </TouchableHighlight>
                    <TouchableHighlight onPress={() => navigation.navigate("Referencia", { nombreLugar: "Bodega Aurrera" })} style={{ width: 70, height: 40 }} underlayColor="#DDDDDD">
                        <GridCustom nombre="bodegaaurrera" width={60} />
                    </TouchableHighlight>
                    <TouchableHighlight onPress={() => navigation.navigate("Referencia", { nombreLugar: "Caja Cerano" })} style={{ width: 70, height: 40 }} underlayColor="#DDDDDD">
                        <GridCustom nombre="cajacerano" width={60} />
                    </TouchableHighlight>
                    <TouchableHighlight onPress={() => navigation.navigate("Referencia", { nombreLugar: "Caja Oblatos" })} style={{ width: 70, height: 40 }} underlayColor="#DDDDDD">
                        <GridCustom nombre="cajaoblatos" width={60} />
                    </TouchableHighlight>
                    <TouchableHighlight onPress={() => navigation.navigate("Referencia", { nombreLugar: "Caja Tamazula" })} style={{ width: 70, height: 40 }} underlayColor="#DDDDDD">
                        <GridCustom nombre="cajatamazula" width={60} />
                    </TouchableHighlight>
                    <TouchableHighlight onPress={() => navigation.navigate("Referencia", { nombreLugar: "Calimax" })} style={{ width: 70, height: 40 }} underlayColor="#DDDDDD">
                        <GridCustom nombre="calimax" width={60} />
                    </TouchableHighlight>
                    <TouchableHighlight onPress={() => navigation.navigate("Referencia", { nombreLugar: "Circle K" })} style={{ width: 70, height: 40 }} underlayColor="#DDDDDD">
                        <GridCustom nombre="circlek" width={60} />
                    </TouchableHighlight>
                    <TouchableHighlight onPress={() => navigation.navigate("Referencia", { nombreLugar: "City Club" })} style={{ width: 70, height: 40 }} underlayColor="#DDDDDD">
                        <GridCustom nombre="cityclub" width={60} />
                    </TouchableHighlight>
                    <TouchableHighlight onPress={() => navigation.navigate("Referencia", { nombreLugar: "Elektra" })} style={{ width: 70, height: 40 }} underlayColor="#DDDDDD">
                        <GridCustom nombre="elektra" width={60} />
                    </TouchableHighlight>
                    <TouchableHighlight onPress={() => navigation.navigate("Referencia", { nombreLugar: "Extra" })} style={{ width: 70, height: 40 }} underlayColor="#DDDDDD">
                        <GridCustom nombre="extra" width={60} />
                    </TouchableHighlight>
                    <TouchableHighlight onPress={() => navigation.navigate("Referencia", { nombreLugar: "Farmacia del Ahorro" })} style={{ width: 70, height: 40 }} underlayColor="#DDDDDD">
                        <GridCustom nombre="farmaciadelahorro" width={60} />
                    </TouchableHighlight>
                    <TouchableHighlight onPress={() => navigation.navigate("Referencia", { nombreLugar: "Farmapronto" })} style={{ width: 70, height: 40 }} underlayColor="#DDDDDD">
                        <GridCustom nombre="farmapronto" width={60} />
                    </TouchableHighlight>
                    <TouchableHighlight onPress={() => navigation.navigate("Referencia", { nombreLugar: "Financiera Bienestar" })} style={{ width: 70, height: 40 }} underlayColor="#DDDDDD">
                        <GridCustom nombre="financierabienestar" width={60} />
                    </TouchableHighlight>
                    <TouchableHighlight onPress={() => navigation.navigate("Referencia", { nombreLugar: "Italika" })} style={{ width: 70, height: 40 }} underlayColor="#DDDDDD">
                        <GridCustom nombre="italika" width={30} />
                    </TouchableHighlight>
                    <TouchableHighlight onPress={() => navigation.navigate("Referencia", { nombreLugar: "Kiosko" })} style={{ width: 70, height: 40 }} underlayColor="#DDDDDD">
                        <GridCustom nombre="kiosko" width={60} />
                    </TouchableHighlight>
                    <TouchableHighlight onPress={() => navigation.navigate("Referencia", { nombreLugar: "La Más Barata" })} style={{ width: 70, height: 40 }} underlayColor="#DDDDDD">
                        <GridCustom nombre="lamasbarata" width={60} />
                    </TouchableHighlight>
                    <TouchableHighlight onPress={() => navigation.navigate("Referencia", { nombreLugar: "Merza" })} style={{ width: 70, height: 40 }} underlayColor="#DDDDDD">
                        <GridCustom nombre="merza" width={60} />
                    </TouchableHighlight>
                    <TouchableHighlight onPress={() => navigation.navigate("Referencia", { nombreLugar: "MTC" })} style={{ width: 70, height: 40 }} underlayColor="#DDDDDD">
                        <GridCustom nombre="mtc" width={60} />
                    </TouchableHighlight>
                    <TouchableHighlight onPress={() => navigation.navigate("Referencia", { nombreLugar: "Pagaqui" })} style={{ width: 70, height: 40 }} underlayColor="#DDDDDD">
                        <GridCustom nombre="pagaqui" width={60} />
                    </TouchableHighlight>
                    <TouchableHighlight onPress={() => navigation.navigate("Referencia", { nombreLugar: "Roma" })} style={{ width: 70, height: 40 }} underlayColor="#DDDDDD">
                        <GridCustom nombre="roma" width={60} />
                    </TouchableHighlight>
                    <TouchableHighlight onPress={() => navigation.navigate("Referencia", { nombreLugar: "Sam's Club" })} style={{ width: 70, height: 40 }} underlayColor="#DDDDDD">
                        <GridCustom nombre="samsclub" width={60} />
                    </TouchableHighlight>
                    <TouchableHighlight onPress={() => navigation.navigate("Referencia", { nombreLugar: "Santander" })} style={{ width: 70, height: 40 }} underlayColor="#DDDDDD">
                        <GridCustom nombre="santander" width={60} />
                    </TouchableHighlight>
                    <TouchableHighlight onPress={() => navigation.navigate("Referencia", { nombreLugar: "Seven Eleven" })} style={{ width: 70, height: 40 }} underlayColor="#DDDDDD">
                        <GridCustom nombre="seveneleven" width={30} />
                    </TouchableHighlight>
                    <TouchableHighlight onPress={() => navigation.navigate("Referencia", { nombreLugar: "Soriana" })} style={{ width: 70, height: 40 }} underlayColor="#DDDDDD">
                        <GridCustom nombre="soriana" width={60} />
                    </TouchableHighlight>
                    <TouchableHighlight onPress={() => navigation.navigate("Referencia", { nombreLugar: "SuperCity" })} style={{ width: 70, height: 40 }} underlayColor="#DDDDDD">
                        <GridCustom nombre="supercity" width={60} />
                    </TouchableHighlight>
                    <TouchableHighlight onPress={() => navigation.navigate("Referencia", { nombreLugar: "SysTienda" })} style={{ width: 70, height: 40 }} underlayColor="#DDDDDD">
                        <GridCustom nombre="systienda" width={60} />
                    </TouchableHighlight>
                    <TouchableHighlight onPress={() => navigation.navigate("Referencia", { nombreLugar: "Vía Servicios" })} style={{ width: 70, height: 40 }} underlayColor="#DDDDDD">
                        <GridCustom nombre="viaservicios" width={40} />
                    </TouchableHighlight>
                    <TouchableHighlight onPress={() => navigation.navigate("Referencia", { nombreLugar: "Walmart" })} style={{ width: 70, height: 40 }} underlayColor="#DDDDDD">
                        <GridCustom nombre="walmart" width={60} />
                    </TouchableHighlight>
                    <TouchableHighlight onPress={() => navigation.navigate("Referencia", { nombreLugar: "Walmart Express" })} style={{ width: 70, height: 40 }} underlayColor="#DDDDDD">
                        <GridCustom nombre="walmartexpress" width={60} />
                    </TouchableHighlight>


                </Grid>
            </View>
        </View>
    );
}