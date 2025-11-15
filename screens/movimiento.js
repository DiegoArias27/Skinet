import { View, Image, ScrollView } from "react-native";
import React from "react";
import { Text } from "@/components/ui/text";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import {
    Table,
    TableBody,
    TableHeader,
    TableRow,
    TableHead,
    TableData,
} from '@/components/ui/table';
import { Box } from '@/components/ui/box';

function movimiento() {
    return (
        <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{padding:20}}>
                <View style={{ width: '100%', alignItems: 'center', backgroundColor: 'white' }}>
                    <View style={{ flexDirection: 'row', backgroundColor: '#062b4a', width: '90%', height: 100, borderRadius: 40, justifyContent: 'center', alignItems: 'center' }}>
                        <MaterialIcons name="currency-exchange" size={24} color="white" />
                        <Text style={{ color: 'white', fontWeight: 'bold', marginLeft: 15, lineHeight: 38, fontSize: 32 }}> $301.72</Text>
                    </View>
                </View>

                <View style={{ width: '100%', alignItems: 'center', padding: 10, backgroundColor: 'white' }}>
                    <View style={{ flexDirection: 'row', backgroundColor: '#eeececff', width: '90%', height: 60, borderRadius: 40, justifyContent: 'center', alignItems: 'center' }}>
                        <AntDesign name="check-circle" size={24} color="green" />
                        <Text style={{ color: 'black', lineHeight: 28, fontSize: 22 }}> Aprobado</Text>
                    </View>
                </View>

                <View style={{ backgroundColor: '#cccccc51', width: 280, height: 2 }} />

                <View style={{ width: '100%', backgroundColor: 'white', alignItems: 'center' }}>
                    <Image
                        style={{ width: 300, height: 100 }}
                        source={require('../image/skinet.png')}
                        alt="image"
                    />
                </View>

                <View style={{ backgroundColor: '#cccccc51', width: 280, height: 2 }} />

                <View style={{ backgroundColor: 'white', padding: 10 }}>
                    <Text style={{ color: 'black', textAlign: 'center' }}>
                        CALLE MORELOS 413D, ZONA CENTRO, CP 20400,{"\n"}
                        RINCON DE ROMOS, AGS {"\n"}
                        Tel y Whatsapp: 4491537528{"\n"}
                        pagos@skinetinternet.com.mx{"\n"}
                        Horarios de atencion: Lunes a Viernes de 10 a 18hrs
                    </Text>
                </View>

                <View style={{ backgroundColor: '#cccccc51', width: 280, height: 2 }} />

                <View style={{ backgroundColor: 'white', padding: 10 }}>
                    <Text style={{ color: 'black', textAlign: 'center', fontWeight: 'bold' }}>
                        Nombre del cliente: CECILIA ELIZABETH MARMOLEJO CASTORENA{"\n"}
                        <Text>{"\n"}ID del clienta: 5218{"\n"}</Text>
                    </Text>

                    <Text style={{ color: 'black', textAlign: 'left', fontWeight: 'bold' }}>
                        Domicilio: 
                        <Text style={{ fontWeight: 400 }}> MOTOLINEA 809 EMBAJADORES{"\n"}116638 EMBAJADORES{"\n"} RINCON DE ROMOS</Text>
                    </Text>

                    <Text style={{ fontWeight: 'bold' }}>
                        Télefono(s):
                        <Text style={{ fontWeight: 400 }}> 3342855140</Text>
                    </Text>
                </View>

                <View style={{ backgroundColor: '#cccccc51', width: 280, height: 2 }} />

                <View style={{ backgroundColor: 'white', flexDirection: 'row', padding: 10 }}>
                    <Text style={{ flex: 1, textAlign: 'left' }}>Referencia</Text>
                    <Text style={{ flex: 1, textAlign: 'right', fontWeight: 'bold', fontSize: 11 }}>
                        10004992287803241317
                    </Text>
                </View>

                <View style={{ backgroundColor: '#cccccc51', width: 280, height: 2 }} />

                <View style={{ backgroundColor: 'white', flexDirection: 'row', padding: 10 }}>
                    <Text style={{ flex: 1, textAlign: 'left' }}>Comisión por pago</Text>
                    <Text style={{ flex: 1, textAlign: 'right', fontWeight: 'bold' }}>$25</Text>
                </View>

                <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 10 }}>
                    <View>
                        <Text style={{ fontWeight: "bold" }}>Fecha de pago:</Text>
                        <Text>05/09/2025</Text>
                        <Text>11:31</Text>
                        <Text><Text style={{fontWeight:700}}>Le atendió:</Text> Cecilia SR</Text>
                    </View>

                    <View style={{ alignItems: "flex-end" }}>
                        <Text style={{ fontWeight: "bold" }}>RECIBO # 142466</Text>
                        <Text style={{ fontWeight: "bold" }}>ESTATUS</Text>
                        <Text style={{ color: "green" }}>Pagada</Text>
                    </View>
                </View>

                <View style={{ backgroundColor: "#cccccc51", width: "100%", height: 2, marginVertical: 10 }} />


                <Box className="border border-solid border-outline-200 rounded-lg overflow-hidden w-full">
                    <Table className="w-full">

                        <TableHeader>
                            <TableRow className="bg-background-50">
                                <TableHead style={{ fontSize: 10, textAlign: "center" }} className="border-0 border-r border-solid border-outline-200">
                                    PLAN
                                </TableHead>
                                <TableHead style={{ fontSize: 10, textAlign: "center" }} className="border-r border-solid border-outline-200">
                                    MENS PAGADAS
                                </TableHead>
                                <TableHead style={{ fontSize: 10, textAlign: "center" }} className="border-r border-solid border-outline-200">
                                    PRECIO SIN IVA
                                </TableHead>
                                <TableHead style={{ fontSize: 10, textAlign: "center" }}>
                                    TOTAL
                                </TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            <TableRow>
                                <TableData style={{ fontSize: 10, textAlign: "center" }} className="border-r border-solid border-outline-200">
                                    BASIC
                                </TableData>
                                <TableData style={{ fontSize: 10, textAlign: "center" }} className="border-r border-solid border-outline-200">
                                    2
                                </TableData>
                                <TableData style={{ fontSize: 10, textAlign: "center" }} className="border-r border-solid border-outline-200">
                                    $336
                                </TableData>
                                <TableData style={{ fontSize: 10, textAlign: "center", fontWeight:900 }}>
                                    $400
                                </TableData>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Box>
            </View>
        </ScrollView>
    );
}

export default movimiento;
