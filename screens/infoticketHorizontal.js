import React, { useContext, useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Button, ButtonText } from '@/components/ui/button';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import themeContext from "@/theme/themeContext";
import { useUserContext } from "@/context/UserContext";

export default function InfoticketHorizontal() {
    const navigation = useNavigation();
    const route = useRoute();
    const theme = useContext(themeContext);
    const { tickets, selectedUserId } = useUserContext();
    const [currentTicket, setCurrentTicket] = useState(null);

    const mainBg = theme.theme === "dark" ? "#1A1A1A" : "#042c50";
    const insideBg = theme.theme === "dark" ? "#1A1A1A" : "white";
    const boxBg = theme.theme === "dark" ? "#1E1E1E" : "#F6F6F6";
    const cardBg = theme.theme === "dark" ? "#1E1E1E" : theme.morado;
    const textColor = theme.color;
    const tel = theme.theme === "dark" ? "white" : "#0213AF";

    // Obtener el ticketId de los parámetros de navegación
    const { ticketId } = route.params;

    useEffect(() => {
        if (ticketId && selectedUserId && tickets[selectedUserId]?.tickets) {
            const userTickets = tickets[selectedUserId].tickets;
            if (userTickets[ticketId]) {
                setCurrentTicket({
                    id: ticketId,
                    ...userTickets[ticketId]
                });
            }
        }
    }, [ticketId, selectedUserId, tickets]);

    // Función para obtener el color del estado
    const getStatusColor = (status) => {
        switch (status) {
            case "Pendiente": return "#E19E00";
            case "En proceso": return "#E19E00";
            case "Finalizado": return "#00D24D";
            case "Cerrado": return "#00D24D";
            default: return "#E20004";
        }
    };

    // Función para obtener el texto del estado
    const getStatusText = (status) => {
        return status || "En proceso";
    };

    // Función para obtener el icono según el tipo de evento del historial
    const getEventIcon = (evento) => {
        const eventLower = evento.toLowerCase();

        if (eventLower.includes('creado') || eventLower.includes('reporte')) {
            return { name: "timelapse", color: "#430056ff" };
        } else if (eventLower.includes('asignado')) {
            return { name: "ticket-account", color: "#62009bff" };
        } else if (eventLower.includes('camino')) {
            return { name: "car-sports", color: "#ebb800ff" };
        } else if (eventLower.includes('llegó') || eventLower.includes('sitio')) {
            return { name: "home", color: "#c64500ff" };
        } else if (eventLower.includes('finalizado') || eventLower.includes('completado') || eventLower.includes('atendido')) {
            return { name: "check-circle-outline", color: "#00b40cff" };
        } else {
            return { name: "information", color: "#439AB7" };
        }
    };

    // Función para obtener la prioridad (basada en el motivo o estado)
    const getPriority = (ticket) => {
        const motivo = ticket.motivo?.toLowerCase() || "";
        if (motivo.includes('dañado') || motivo.includes('cortada') || motivo.includes('cortado') || motivo.includes('fibra')) {
            return "Alta";
        } else if (motivo.includes('intermitencia') || motivo.includes('lentitud')) {
            return "Media";
        } else {
            return "Normal";
        }
    };

    // Función para formatear la fecha
    const formatDate = (dateString) => {
        if (!dateString) return "Por definir";
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString("es-ES", {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            }) + " - " + date.toLocaleTimeString("es-ES", {
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch (error) {
            return dateString;
        }
    };

    // Función para formatear fecha corta para el historial horizontal
    const formatShortDate = (dateString) => {
        if (!dateString) return "";
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString("es-ES", {
                day: '2-digit',
                month: '2-digit'
            }) + " - " + date.toLocaleTimeString("es-ES", {
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch (error) {
            return dateString;
        }
    };

    // Función para obtener la fecha de terminación
    const getTerminationDate = (ticket) => {
        return ticket.fechas?.terminacion ||
            (ticket.historial && ticket.historial.find(event =>
                event.evento.toLowerCase().includes('finalizado'))?.fecha);
    };

    if (!currentTicket) {
        return (
            <View style={{ flex: 1, backgroundColor: mainBg, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: textColor }}>Cargando ticket...</Text>
            </View>
        );
    }

    const terminationDate = getTerminationDate(currentTicket);
    const priority = getPriority(currentTicket);

    return (
        <KeyboardAvoidingView
            style={{ flex: 1, backgroundColor: mainBg }}
            behavior={Platform.OS === 'android' ? "padding" : "height"}
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
                <View style={{ backgroundColor: insideBg, flex: 1 }}>
                    {/* Header con diseño horizontal */}
                    <View style={{
                        alignItems: 'center',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingHorizontal: 10
                    }}>
                        {/* Estado */}
                        <View style={{
                            borderRadius: 20,
                            backgroundColor: getStatusColor(currentTicket.status),
                            width: 100,
                            marginLeft: 20,
                            marginTop: 20
                        }}>
                            <Text style={{ color: 'white', padding: 10, textAlign: 'center' }}>
                                {getStatusText(currentTicket.status)}
                            </Text>
                        </View>

                        {/* Información del Ticket */}
                        <View style={{
                            backgroundColor: boxBg,
                            width: '30%',
                            height: 'auto',
                            marginTop: 20,
                            borderRadius: 20,
                            flexDirection: 'column',
                            paddingTop: 10,
                            paddingBottom: 10,
                            paddingLeft: 15,
                            paddingRight: 15
                        }}>
                            <Text style={{ fontWeight: 700, fontSize: 14, marginBottom: 5, color: textColor }}>
                                {currentTicket.motivo || "Motivo no especificado"}
                            </Text>
                            <Text style={{
                                fontWeight: 700,
                                fontSize: 11,
                                color: priority === "Alta" ? "#E20004" : priority === "Media" ? "#E19E00" : "#00D24D",
                                marginBottom: 8
                            }}>
                                Prioridad - {priority}
                            </Text>
                            <Text style={{ fontWeight: 700, fontSize: 12, color: textColor }}>
                                Fecha de terminación:
                            </Text>
                            <Text style={{ fontSize: 11, color: textColor }}>
                                {terminationDate ? formatDate(terminationDate) : "Por definir"}
                            </Text>
                        </View>

                        {/* Técnico Asignado */}
                        <View style={{ width: "40%", marginRight: 10 }}>
                            <View style={{ alignItems: 'flex-start', alignSelf: 'flex-start', marginLeft: 10, marginTop: 20 }}>
                                <Text style={{ fontWeight: 700, fontSize: 16, color: textColor }}>Técnico Asignado</Text>
                            </View>
                            <View style={{
                                backgroundColor: cardBg,
                                width: '90%',
                                flexDirection: 'row',
                                padding: 12,
                                borderRadius: 20,
                                borderColor: boxBg,
                                borderWidth: 1,
                                marginTop: 10
                            }}>
                                <View>
                                    <Image
                                        source={require("../image/Leo.png")}
                                        style={{ width: 35, height: 35 }}
                                        resizeMode="contain"
                                    />
                                </View>
                                <View style={{ marginLeft: 15 }}>
                                    <Text style={{ fontWeight: 700, fontSize: 12, color: textColor }}>
                                        {currentTicket.tecnico?.nombre || "Técnico no asignado"}
                                    </Text>
                                    <Text style={{ fontSize: 11, color: tel }}>
                                        Tel: {currentTicket.tecnico?.telefono || "No disponible"}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    {/* Seguimiento Horizontal */}
                    <View style={{ marginTop: 25, marginLeft: 30, marginBottom: 15 }}>
                        <Text style={{ fontWeight: 700, fontSize: 18, color: textColor }}>Seguimiento</Text>
                    </View>

                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ paddingHorizontal: 10 }}
                    >
                        <HStack style={{ paddingBottom: 10 }}>
                            {currentTicket.historial && currentTicket.historial.length > 0 ? (
                                currentTicket.historial.map((evento, index) => {
                                    const iconInfo = getEventIcon(evento.evento);
                                    return (
                                        <View
                                            key={index}
                                            style={{
                                                borderColor: '#d8d8d8ff',
                                                borderWidth: 1,
                                                width: 180,
                                                height: 70,
                                                marginLeft: index === 0 ? 20 : 5,
                                                marginRight: 5,
                                                borderRadius: 10,
                                                paddingLeft: 15,
                                                paddingRight: 15,
                                                paddingTop: 10,
                                                paddingBottom: 10,
                                                backgroundColor: insideBg
                                            }}
                                        >
                                            <HStack>
                                                <VStack style={{ justifyContent: 'center', marginRight: 8 }}>
                                                    <Icon name={iconInfo.name} size={22} color={iconInfo.color} />
                                                </VStack>
                                                <VStack style={{ flex: 1 }}>
                                                    <Text style={{ fontWeight: 900, fontSize: 12, color: textColor }}>
                                                        {formatShortDate(evento.fecha)}
                                                    </Text>
                                                    <Text style={{
                                                        fontWeight: 400,
                                                        fontSize: 11,
                                                        textAlign: 'left',
                                                        color: textColor,
                                                        flexWrap: 'wrap'
                                                    }}>
                                                        {evento.evento}
                                                    </Text>
                                                </VStack>
                                            </HStack>
                                        </View>
                                    );
                                })
                            ) : (
                                <View style={{
                                    padding: 20,
                                    alignItems: 'center',
                                    width: 180,
                                    marginLeft: 20
                                }}>
                                    <Text style={{ color: textColor }}>No hay historial disponible</Text>
                                </View>
                            )}
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
        borderRadius: 10,
        backgroundColor: '#439AB7',
        height: 40,
        justifyContent: 'center',
        width: '80%',
        alignItems: 'center',
        display: 'flex'
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
        borderRadius: 100,
        width: 90,
        height: 100,
        justifyContent: 'center',
        marginTop: 40,
        alignItems: 'center'
    }
});  