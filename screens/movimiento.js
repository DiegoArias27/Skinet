import { View, Image, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { Text } from "@/components/ui/text";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Box } from '@/components/ui/box';
import { useUserContext } from "@/context/UserContext";
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';

function Movimiento({ route }) {

    const pago = route.params?.pago;

    if (!pago) {
        return (
            <View>
                <Text>No se encontró información del pago.</Text>
            </View>
        );
    }

    const { user } = useUserContext();

    // Función para generar y compartir PDF desde HTML
    const generarYCompartirPDF = async () => {
        try {
            const html = `
            <html>
            <head>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        padding: 20px;
                        background-color: #ffffff;
                    }
                    .section {
                        margin-bottom: 15px;
                    }
                    .center {
                        text-align: center;
                    }
                    .monto {
                        background-color: #062b4a;
                        color: white;
                        font-size: 32px;
                        font-weight: bold;
                        padding: 20px;
                        border-radius: 40px;
                        display: inline-block;
                        margin-bottom: 15px;
                    }
                    .status {
                        font-weight: bold;
                        color: ${pago.status === "Pagado" ? "green" : "red"};
                        background-color: #eeececff;
                        padding: 10px 20px;
                        border-radius: 40px;
                        display: inline-block;
                        font-size: 22px;
                        margin-bottom: 15px;
                    }
                    .divider {
                        width: 80%;
                        height: 2px;
                        background-color: #cccccc51;
                        margin: 10px auto;
                    }
                    .logo {
                        display: block;
                        margin: 10px auto;
                        width: 300px;
                        height: 100px;
                    }
                    table {
                        width: 100%;
                        border-collapse: collapse;
                        margin-top: 10px;
                        margin-bottom: 20px;
                    }
                    th, td {
                        border: 1px solid #ccc;
                        padding: 5px;
                        text-align: center;
                        font-size: 12px;
                    }
                    th {
                        background-color: #f0f0f0;
                        font-weight: bold;
                    }
                    .bold {
                        font-weight: bold;
                    }
                </style>
            </head>
            <body>

                <div class="center monto">
                    $${pago.total}
                </div>

                <div class="center status">
                    ${pago.status}
                </div>

                <div class="divider"></div>

                <img src="https://skinetinternet.com.mx/assets/img/logo1.png" class="logo" />

                <div class="divider"></div>

                <div class="center section">
                    CALLE MORELOS 413D, ZONA CENTRO, CP 20400,<br/>
                    RINCON DE ROMOS, AGS<br/>
                    Tel y Whatsapp: 4491537528<br/>
                    pagos@skinetinternet.com.mx<br/>
                    Horarios de atención: Lunes a Viernes de 10 a 18hrs
                </div>

                <div class="divider"></div>

                <div class="section">
                    <div class="bold">Nombre del cliente:</div> ${user.name}<br/>
                    <div class="bold">ID del cliente:</div> ${user.id}<br/>
                    <div class="bold">Domicilio:</div> ${user.address}<br/>
                    <div class="bold">Teléfono:</div> ${user.phone}
                </div>

                <div class="divider"></div>  

                <div class="section">
                    <div>Referencia: <b>${pago.referencia}</b></div>
                    <div>Comisión por pago: <b>$${pago.comision}</b></div>
                    <div>Fecha: <b>${pago.fecha} ${pago.hora}</b></div>
                    <div>Método: <b>${pago.metodo}</b></div>
                    <div>Le atendió: <b>Cecilia SR</b></div>
                </div>

                <div class="divider"></div>

                <table>
                    <tr>
                        <th>PLAN</th>
                        <th>MENS PAGADAS</th>
                        <th>PRECIO SIN IVA</th>
                        <th>TOTAL</th>
                    </tr>
                    <tr>
                        <td>${pago.plan}</td>
                        <td>${pago.mensualidadesPagadas}</td>
                        <td>$${pago.precioSinIVA}</td>
                        <td>$${pago.total}</td>
                    </tr>
                </table>

            </body>
            </html>
            `;

            const { uri: pdfUri } = await Print.printToFileAsync({ html });

            if (await Sharing.isAvailableAsync()) {
                await Sharing.shareAsync(pdfUri, {
                    mimeType: 'application/pdf',
                    dialogTitle: 'Compartir Recibo',
                    UTI: 'com.adobe.pdf'
                });
            } else {
                alert('La función de compartir no está disponible');
            }
        } catch (error) {
            console.error('Error al generar PDF:', error);
            alert('Error al generar el PDF');
        }
    };

    return (
        <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ padding: 20 }}>
                {/* MONTO PAGADO */}
                <View style={{ width: '100%', alignItems: 'center' }}>
                    <View style={{
                        flexDirection: 'row',
                        backgroundColor: '#062b4a',
                        width: '90%',
                        height: 100,
                        borderRadius: 40,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <MaterialIcons name="currency-exchange" size={24} color="white" />
                        <Text style={{
                            color: 'white',
                            fontWeight: 'bold',
                            marginLeft: 15,
                            lineHeight: 38,
                            fontSize: 32
                        }}>
                            ${pago.total}
                        </Text>
                    </View>
                </View>

                {/* ESTADO */}
                <View style={{ width: '100%', alignItems: 'center', padding: 10 }}>
                    <View style={{
                        flexDirection: 'row',
                        backgroundColor: '#eeececff',
                        width: '90%',
                        height: 60,
                        borderRadius: 40,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <AntDesign
                            name="check-circle"
                            size={24}
                            color={pago.status === "Pagado" ? "green" : "red"}
                            style={{ padding: 10 }}
                        />
                        <Text style={{
                            color: pago.status === "Pagado" ? "green" : "red",
                            lineHeight: 28,
                            fontSize: 22,
                        }}>
                            {pago.status}
                        </Text>
                    </View>
                </View>

                {/* SEPARADOR */}
                <View style={{ backgroundColor: '#cccccc51', width: 280, height: 2, alignSelf: 'center' }} />

                {/* LOGO */}
                <View style={{ width: '100%', alignItems: 'center' }}>
                    <Image
                        style={{ width: 300, height: 100 }}
                        source={require('../image/skinet.png')}
                    />
                </View>

                <View style={{ backgroundColor: '#cccccc51', width: 280, height: 2, alignSelf: 'center' }} />

                {/* INFO DEL NEGOCIO */}
                <View style={{ padding: 10 }}>
                    <Text style={{ textAlign: 'center', color: 'black' }}>
                        CALLE MORELOS 413D, ZONA CENTRO, CP 20400,{"\n"}
                        RINCON DE ROMOS, AGS {"\n"}
                        Tel y Whatsapp: 4491537528{"\n"}
                        pagos@skinetinternet.com.mx{"\n"}
                        Horarios de atención: Lunes a Viernes de 10 a 18hrs
                    </Text>
                </View>

                <View style={{ backgroundColor: '#cccccc51', width: 280, height: 2, alignSelf: 'center' }} />

                {/* DATOS DEL CLIENTE */}
                <View style={{ padding: 10 }}>
                    <Text style={{ color: 'black', textAlign: 'center', fontWeight: 'bold' }}>
                        Nombre del cliente: {user.name}{"\n"}
                        <Text>ID del cliente: {user.id}{"\n"}</Text>
                    </Text>
                    <Text style={{ fontWeight: 'bold', color: "black" }}>
                        Domicilio: {user.address}
                        <Text style={{ fontWeight: "400" }}>{pago.clienteDireccion}</Text>
                    </Text>
                    <Text style={{ fontWeight: "bold", color: "black" }}>
                        Teléfono(s): {user.phone}
                        <Text style={{ fontWeight: 400 }}>{pago.clienteTelefono}</Text>
                    </Text>
                </View>

                <View style={{ backgroundColor: '#cccccc51', width: 280, height: 2, alignSelf: 'center' }} />

                {/* REFERENCIA */}
                <View style={{ flexDirection: 'row', padding: 10 }}>
                    <Text style={{ flex: 1 }}>Referencia</Text>
                    <Text style={{ flex: 1, textAlign: 'right', fontWeight: 'bold', fontSize: 11 }}>
                        {pago.referencia}
                    </Text>
                </View>

                <View style={{ backgroundColor: '#cccccc51', width: 280, height: 2, alignSelf: 'center' }} />

                {/* COMISIÓN */}
                <View style={{ flexDirection: 'row', padding: 10 }}>
                    <Text style={{ flex: 1 }}>Comisión por pago</Text>
                    <Text style={{ flex: 1, textAlign: 'right', fontWeight: 'bold' }}>${pago.comision}</Text>
                </View>

                {/* FECHA / FOLIO */}
                <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 10 }}>
                    <View>
                        <Text style={{ fontWeight: "bold" }}>Fecha de pago:</Text>
                        <Text>{pago.fecha}</Text>
                        <Text>{pago.hora}</Text>
                        <Text><Text style={{ fontWeight: 700 }}>Método:</Text> {pago.metodo}</Text>
                        <Text><Text style={{ fontWeight: 700 }}>Le atendió:</Text> Cecilia SR</Text>
                    </View>
                    <View style={{ alignItems: "flex-end" }}>
                        <Text style={{ fontWeight: "bold" }}>RECIBO # {pago.folio}</Text>
                        <Text style={{ fontWeight: "bold" }}>ESTATUS</Text>
                        <Text style={{ color: pago.status === "Pagado" ? "green" : "red" }}>
                            {pago.status}
                        </Text>
                    </View>
                </View>

                <View style={{ backgroundColor: "#cccccc51", width: "100%", height: 2, marginVertical: 10 }} />

                {/* TABLA */}
                <Box style={{ width: "100%", padding: 10 }}>
                    <Box style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 10,
                        padding: 10,
                    }}>
                        <Box style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", gap: 10 }}>
                            <Box style={{ flex: 1, padding: 5, borderRight: '1px solid #ccc' }}>
                                <Text style={{ fontSize: 10, textAlign: "center", fontWeight: "bold" }}>PLAN</Text>
                                <Text style={{ fontSize: 10, textAlign: "center", marginTop: 5 }}>{pago.plan}</Text>
                            </Box>
                            <Box style={{ flex: 1, padding: 5 }}>
                                <Text style={{ fontSize: 10, textAlign: "center", fontWeight: "bold" }}>MENS PAGADAS</Text>
                                <Text style={{ fontSize: 10, textAlign: "center", marginTop: 5 }}>{pago.mensualidadesPagadas}</Text>
                            </Box>
                        </Box>

                        <Box style={{ height: 1, backgroundColor: '#e0e0e0', margin: '0 5px' }} />

                        <Box style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", gap: 10 }}>
                            <Box style={{ flex: 1, padding: 5, borderRight: '1px solid #ccc' }}>
                                <Text style={{ fontSize: 10, textAlign: "center", fontWeight: "bold" }}>PRECIO SIN IVA</Text>
                                <Text style={{ fontSize: 10, textAlign: "center", marginTop: 5 }}>${pago.precioSinIVA}</Text>
                            </Box>
                            <Box style={{ flex: 1, padding: 5 }}>
                                <Text style={{ fontSize: 10, textAlign: "center", fontWeight: "bold" }}>TOTAL</Text>
                                <Text style={{ fontSize: 10, textAlign: "center", fontWeight: 900, marginTop: 5 }}>${pago.total}</Text>
                            </Box>
                        </Box>
                    </Box>
                </Box>

                {/* BOTÓN PARA COMPARTIR PDF */}
                <TouchableOpacity
                    style={{
                        backgroundColor: '#062b4a',
                        padding: 15,
                        borderRadius: 10,
                        alignItems: 'center',
                        marginTop: 20,
                        marginBottom: 30,
                    }}
                    onPress={generarYCompartirPDF}
                >
                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>
                        📄 Compartir Recibo PDF
                    </Text>
                </TouchableOpacity>

            </View>
        </ScrollView>
    );
}

export default Movimiento;
