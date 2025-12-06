import React, { useContext } from "react";
import { View, Text, Pressable, TouchableHighlight } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Grid } from '@/components/ui/grid';
import { useNavigation } from '@react-navigation/native';
import GridCustom from "./GridCustom";
import themeContext from "@/theme/themeContext";

// importar el contexto
import { useUserContext } from "@/context/UserContext";

export default function deposito() {
    const navigation = useNavigation();
    const theme = useContext(themeContext);

    const fondo = theme.theme === "dark" ? "#1A1A1A" : "#042c50";
    const cardBg = theme.theme === "dark" ? "#1E1E1E" : "#F6F6F6";
    const listBg = theme.theme === "dark" ? "#1A1A1A" : "#F6F6F6";
    const textColor = theme.color;

    const { payments, selectedUserId } = useUserContext();
    const userPayments = payments[selectedUserId] || {};


    // 3. Convertir pagos a arreglo
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
        <View style={{ backgroundColor: fondo, width: "100%", height: '100%', padding: 20 }}>
            <Pressable onPress={() => navigation.goBack()}>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start', alignContent: 'space-between', marginLeft: 10, marginTop: 20 }}>
                    <Icon name="close" size={28} color={"white"} />
                    <Text style={{ textTransform: 'uppercase', color: "white", fontSize: 28, fontWeight: 700, marginTop: 20, paddingLeft: 20, paddingRight: 50, textAlign: 'center' }}>
                        Depósito en efectivo
                    </Text>
                </View>
            </Pressable>

            <View style={{ backgroundColor: cardBg, borderRadius: 30, marginTop: 20, padding: 20, borderWidth: 1, borderColor: theme.theme === "dark" ? "#333" : "#C4C4D0", shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 5, elevation: 3 }}>
                <View style={{ alignItems: 'center', marginBottom: 30 }}>
                    <Text style={{ fontWeight: 700, fontSize: 16, color: textColor }}>Elige donde quieres pagar</Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30 }}>
                    <Text style={{ color: textColor }}>Total a pagar</Text>
                    <Text style={{ fontWeight: 700, color: textColor }}>${totalPendiente}</Text>
                </View>

                <Grid
                    className="gap-y-2 gap-x-4"
                    _extra={{ className: 'grid-cols-8' }}
                    style={{ width: "100%", height: 400, justifyContent: 'space-between', alignContent: 'space-between' }}
                >
                    <TouchableHighlight onPress={() => navigation.navigate("Referencia", { nombreLugar: "Banco Azteca" })} style={{ width: 70, height: 40, borderRadius: 12, backgroundColor: listBg, justifyContent: 'center', alignItems: 'center' }} underlayColor={theme.theme === "dark" ? "#333" : "#DDD"}>
                        <GridCustom nombre="bancoazteca" width={60} />
                    </TouchableHighlight>

                    <TouchableHighlight onPress={() => navigation.navigate("Referencia", { nombreLugar: "Banorte" })} style={{ width: 70, height: 40, borderRadius: 12, backgroundColor: listBg, justifyContent: 'center', alignItems: 'center' }} underlayColor={theme.theme === "dark" ? "#333" : "#DDD"}>
                        <GridCustom nombre="banorte" width={60} />
                    </TouchableHighlight>

                    <TouchableHighlight onPress={() => navigation.navigate("Referencia", { nombreLugar: "BBVA" })} style={{ width: 70, height: 40, borderRadius: 12, backgroundColor: listBg, justifyContent: 'center', alignItems: 'center' }} underlayColor={theme.theme === "dark" ? "#333" : "#DDD"}>
                        <GridCustom nombre="bbva" width={40} />
                    </TouchableHighlight>

                    <TouchableHighlight onPress={() => navigation.navigate("Referencia", { nombreLugar: "Bodega Aurrera" })} style={{ width: 70, height: 40, borderRadius: 12, backgroundColor: listBg, justifyContent: 'center', alignItems: 'center' }} underlayColor={theme.theme === "dark" ? "#333" : "#DDD"}>
                        <GridCustom nombre="bodegaaurrera" width={60} />
                    </TouchableHighlight>

                    <TouchableHighlight onPress={() => navigation.navigate("Referencia", { nombreLugar: "Caja Cerano" })} style={{ width: 70, height: 40, borderRadius: 12, backgroundColor: listBg, justifyContent: 'center', alignItems: 'center' }} underlayColor={theme.theme === "dark" ? "#333" : "#DDD"}>
                        <GridCustom nombre="cajacerano" width={60} />
                    </TouchableHighlight>

                    <TouchableHighlight onPress={() => navigation.navigate("Referencia", { nombreLugar: "Caja Oblatos" })} style={{ width: 70, height: 40, borderRadius: 12, backgroundColor: listBg, justifyContent: 'center', alignItems: 'center' }} underlayColor={theme.theme === "dark" ? "#333" : "#DDD"}>
                        <GridCustom nombre="cajaoblatos" width={60} />
                    </TouchableHighlight>

                    <TouchableHighlight onPress={() => navigation.navigate("Referencia", { nombreLugar: "Caja Tamazula" })} style={{ width: 70, height: 40, borderRadius: 12, backgroundColor: listBg, justifyContent: 'center', alignItems: 'center' }} underlayColor={theme.theme === "dark" ? "#333" : "#DDD"}>
                        <GridCustom nombre="cajatamazula" width={60} />
                    </TouchableHighlight>

                    <TouchableHighlight onPress={() => navigation.navigate("Referencia", { nombreLugar: "Calimax" })} style={{ width: 70, height: 40, borderRadius: 12, backgroundColor: listBg, justifyContent: 'center', alignItems: 'center' }} underlayColor={theme.theme === "dark" ? "#333" : "#DDD"}>
                        <GridCustom nombre="calimax" width={60} />
                    </TouchableHighlight>

                    <TouchableHighlight onPress={() => navigation.navigate("Referencia", { nombreLugar: "Circle K" })} style={{ width: 70, height: 40, borderRadius: 12, backgroundColor: listBg, justifyContent: 'center', alignItems: 'center' }} underlayColor={theme.theme === "dark" ? "#333" : "#DDD"}>
                        <GridCustom nombre="circlek" width={60} />
                    </TouchableHighlight>

                    <TouchableHighlight onPress={() => navigation.navigate("Referencia", { nombreLugar: "City Club" })} style={{ width: 70, height: 40, borderRadius: 12, backgroundColor: listBg, justifyContent: 'center', alignItems: 'center' }} underlayColor={theme.theme === "dark" ? "#333" : "#DDD"}>
                        <GridCustom nombre="cityclub" width={60} />
                    </TouchableHighlight>

                    <TouchableHighlight onPress={() => navigation.navigate("Referencia", { nombreLugar: "Elektra" })} style={{ width: 70, height: 40, borderRadius: 12, backgroundColor: listBg, justifyContent: 'center', alignItems: 'center' }} underlayColor={theme.theme === "dark" ? "#333" : "#DDD"}>
                        <GridCustom nombre="elektra" width={60} />
                    </TouchableHighlight>

                    <TouchableHighlight onPress={() => navigation.navigate("Referencia", { nombreLugar: "Extra" })} style={{ width: 70, height: 40, borderRadius: 12, backgroundColor: listBg, justifyContent: 'center', alignItems: 'center' }} underlayColor={theme.theme === "dark" ? "#333" : "#DDD"}>
                        <GridCustom nombre="extra" width={60} />
                    </TouchableHighlight>

                    <TouchableHighlight onPress={() => navigation.navigate("Referencia", { nombreLugar: "Farmacia del Ahorro" })} style={{ width: 70, height: 40, borderRadius: 12, backgroundColor: listBg, justifyContent: 'center', alignItems: 'center' }} underlayColor={theme.theme === "dark" ? "#333" : "#DDD"}>
                        <GridCustom nombre="farmaciadelahorro" width={60} />
                    </TouchableHighlight>

                    <TouchableHighlight onPress={() => navigation.navigate("Referencia", { nombreLugar: "Farmapronto" })} style={{ width: 70, height: 40, borderRadius: 12, backgroundColor: listBg, justifyContent: 'center', alignItems: 'center' }} underlayColor={theme.theme === "dark" ? "#333" : "#DDD"}>
                        <GridCustom nombre="farmapronto" width={60} />
                    </TouchableHighlight>

                    <TouchableHighlight onPress={() => navigation.navigate("Referencia", { nombreLugar: "Financiera Bienestar" })} style={{ width: 70, height: 40, borderRadius: 12, backgroundColor: listBg, justifyContent: 'center', alignItems: 'center' }} underlayColor={theme.theme === "dark" ? "#333" : "#DDD"}>
                        <GridCustom nombre="financierabienestar" width={60} />
                    </TouchableHighlight>

                    <TouchableHighlight onPress={() => navigation.navigate("Referencia", { nombreLugar: "Italika" })} style={{ width: 70, height: 40, borderRadius: 12, backgroundColor: listBg, justifyContent: 'center', alignItems: 'center' }} underlayColor={theme.theme === "dark" ? "#333" : "#DDD"}>
                        <GridCustom nombre="italika" width={30} />
                    </TouchableHighlight>

                    <TouchableHighlight onPress={() => navigation.navigate("Referencia", { nombreLugar: "Kiosko" })} style={{ width: 70, height: 40, borderRadius: 12, backgroundColor: listBg, justifyContent: 'center', alignItems: 'center' }} underlayColor={theme.theme === "dark" ? "#333" : "#DDD"}>
                        <GridCustom nombre="kiosko" width={60} />
                    </TouchableHighlight>

                    <TouchableHighlight onPress={() => navigation.navigate("Referencia", { nombreLugar: "La Más Barata" })} style={{ width: 70, height: 40, borderRadius: 12, backgroundColor: listBg, justifyContent: 'center', alignItems: 'center' }} underlayColor={theme.theme === "dark" ? "#333" : "#DDD"}>
                        <GridCustom nombre="lamasbarata" width={60} />
                    </TouchableHighlight>

                    <TouchableHighlight onPress={() => navigation.navigate("Referencia", { nombreLugar: "Merza" })} style={{ width: 70, height: 40, borderRadius: 12, backgroundColor: listBg, justifyContent: 'center', alignItems: 'center' }} underlayColor={theme.theme === "dark" ? "#333" : "#DDD"}>
                        <GridCustom nombre="merza" width={60} />
                    </TouchableHighlight>

                    <TouchableHighlight onPress={() => navigation.navigate("Referencia", { nombreLugar: "MTC" })} style={{ width: 70, height: 40, borderRadius: 12, backgroundColor: listBg, justifyContent: 'center', alignItems: 'center' }} underlayColor={theme.theme === "dark" ? "#333" : "#DDD"}>
                        <GridCustom nombre="mtc" width={60} />
                    </TouchableHighlight>

                    <TouchableHighlight onPress={() => navigation.navigate("Referencia", { nombreLugar: "Pagaqui" })} style={{ width: 70, height: 40, borderRadius: 12, backgroundColor: listBg, justifyContent: 'center', alignItems: 'center' }} underlayColor={theme.theme === "dark" ? "#333" : "#DDD"}>
                        <GridCustom nombre="pagaqui" width={60} />
                    </TouchableHighlight>

                    <TouchableHighlight onPress={() => navigation.navigate("Referencia", { nombreLugar: "Roma" })} style={{ width: 70, height: 40, borderRadius: 12, backgroundColor: listBg, justifyContent: 'center', alignItems: 'center' }} underlayColor={theme.theme === "dark" ? "#333" : "#DDD"}>
                        <GridCustom nombre="roma" width={60} />
                    </TouchableHighlight>

                    <TouchableHighlight onPress={() => navigation.navigate("Referencia", { nombreLugar: "Sam's Club" })} style={{ width: 70, height: 40, borderRadius: 12, backgroundColor: listBg, justifyContent: 'center', alignItems: 'center' }} underlayColor={theme.theme === "dark" ? "#333" : "#DDD"}>
                        <GridCustom nombre="samsclub" width={60} />
                    </TouchableHighlight>

                    <TouchableHighlight onPress={() => navigation.navigate("Referencia", { nombreLugar: "Santander" })} style={{ width: 70, height: 40, borderRadius: 12, backgroundColor: listBg, justifyContent: 'center', alignItems: 'center' }} underlayColor={theme.theme === "dark" ? "#333" : "#DDD"}>
                        <GridCustom nombre="santander" width={60} />
                    </TouchableHighlight>

                    <TouchableHighlight onPress={() => navigation.navigate("Referencia", { nombreLugar: "Seven Eleven" })} style={{ width: 70, height: 40, borderRadius: 12, backgroundColor: listBg, justifyContent: 'center', alignItems: 'center' }} underlayColor={theme.theme === "dark" ? "#333" : "#DDD"}>
                        <GridCustom nombre="seveneleven" width={30} />
                    </TouchableHighlight>

                    <TouchableHighlight onPress={() => navigation.navigate("Referencia", { nombreLugar: "Soriana" })} style={{ width: 70, height: 40, borderRadius: 12, backgroundColor: listBg, justifyContent: 'center', alignItems: 'center' }} underlayColor={theme.theme === "dark" ? "#333" : "#DDD"}>
                        <GridCustom nombre="soriana" width={60} />
                    </TouchableHighlight>

                    <TouchableHighlight onPress={() => navigation.navigate("Referencia", { nombreLugar: "SuperCity" })} style={{ width: 70, height: 40, borderRadius: 12, backgroundColor: listBg, justifyContent: 'center', alignItems: 'center' }} underlayColor={theme.theme === "dark" ? "#333" : "#DDD"}>
                        <GridCustom nombre="supercity" width={60} />
                    </TouchableHighlight>

                    <TouchableHighlight onPress={() => navigation.navigate("Referencia", { nombreLugar: "SysTienda" })} style={{ width: 70, height: 40, borderRadius: 12, backgroundColor: listBg, justifyContent: 'center', alignItems: 'center' }} underlayColor={theme.theme === "dark" ? "#333" : "#DDD"}>
                        <GridCustom nombre="systienda" width={60} />
                    </TouchableHighlight>

                    <TouchableHighlight onPress={() => navigation.navigate("Referencia", { nombreLugar: "Vía Servicios" })} style={{ width: 70, height: 40, borderRadius: 12, backgroundColor: listBg, justifyContent: 'center', alignItems: 'center' }} underlayColor={theme.theme === "dark" ? "#333" : "#DDD"}>
                        <GridCustom nombre="viaservicios" width={40} />
                    </TouchableHighlight>

                    <TouchableHighlight onPress={() => navigation.navigate("Referencia", { nombreLugar: "Walmart" })} style={{ width: 70, height: 40, borderRadius: 12, backgroundColor: listBg, justifyContent: 'center', alignItems: 'center' }} underlayColor={theme.theme === "dark" ? "#333" : "#DDD"}>
                        <GridCustom nombre="walmart" width={60} />
                    </TouchableHighlight>

                    <TouchableHighlight onPress={() => navigation.navigate("Referencia", { nombreLugar: "Walmart Express" })} style={{ width: 70, height: 40, borderRadius: 12, backgroundColor: listBg, justifyContent: 'center', alignItems: 'center' }} underlayColor={theme.theme === "dark" ? "#333" : "#DDD"}>
                        <GridCustom nombre="walmartexpress" width={60} />
                    </TouchableHighlight>

                </Grid>
            </View>
        </View>
    );
}
