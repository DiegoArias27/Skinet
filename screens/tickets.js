import React, { useContext } from "react";
import { View, Text, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform, Pressable, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import themeContext from "@/theme/themeContext";
import { useUserContext } from "@/context/UserContext";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";

export default function Tickets() {
    const navigation = useNavigation();
    const theme = useContext(themeContext);

    const { tickets, selectedUserId, user } = useUserContext();

    const cardBg = theme.theme === "dark" ? "#1E1E1E" : theme.morado;
    const listBg = theme.theme === "dark" ? "#1A1A1A" : "#F6F6F6";
    const azul = theme.theme === "dark" ? "#1E1E1E" : theme.azul;

    //Acceder a la propiedad anidada "tickets"
    const userTicketsRaw = selectedUserId ? tickets[selectedUserId]?.tickets || {} : {};

    // Convertir a arreglo para mapear
    const ticketsArray = Object.entries(userTicketsRaw).map(([id, ticket]) => ({
        id,
        ...ticket
    }));

    return (
        <KeyboardAvoidingView
            style={{ flex: 1, backgroundColor: theme.backgroundColor }}
            behavior={Platform.OS === "android" ? "padding" : "height"}
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
                <View style={{ flex: 1, backgroundColor: theme.backgroundColor, alignItems: "center" }}>

                    {/* Usuario */}
                    <View style={{ backgroundColor: cardBg, width: '90%', flexDirection: 'row', padding: 15, borderRadius: 20, borderColor: theme.theme === "dark" ? "#333" : "#C4C4D0", borderWidth: 1, marginTop: 20 }}>
                        <Image source={require("../image/Leo.png")} style={{ width: 40, height: 40 }} resizeMode="contain" />
                        <View style={{ marginLeft: 20 }}>
                            <Text style={{ fontWeight: 700, color: theme.color }}>{user.name}</Text>
                            <Pressable onPress={() => navigation.navigate("Perfil")}>
                                <Text style={{ color: "#3A8BFF" }}>Perfil &gt;</Text>
                            </Pressable>
                        </View>
                    </View>

                    {/* Técnico Asignado */}
                    <View style={{ alignSelf: 'flex-start', marginLeft: 20, marginTop: 20 }}>
                        <Text style={{ fontWeight: 700, fontSize: 20, color: theme.color }}>Técnico Asignado</Text>
                    </View>

                    {ticketsArray.length > 0 ? (
                        <VStack style={{ backgroundColor: azul, width: '90%', marginTop: 10, borderRadius: 20, flexDirection: 'column', padding: 20 }}>
                            {/* Tomamos el primer ticket como técnico asignado */}
                            <View style={{ flexDirection: 'row', marginBottom: 15 }}>
                                <Text style={{ fontWeight: 700, color: "white", marginRight: 10 }}>Nombre:</Text>
                                <Text style={{ fontWeight: 200, color: "white" }}>{ticketsArray[0].tecnico?.nombre || "Sin técnico"}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginBottom: 15 }}>
                                <Text style={{ fontWeight: 700, color: "white", marginRight: 10 }}>Teléfono:</Text>
                                <Text style={{ fontWeight: 200, color: "white" }}>{ticketsArray[0].tecnico?.telefono || "Sin teléfono"}</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontWeight: 700, color: "white", marginRight: 10 }}>Llegada:</Text>
                                {/* Usamos 'fecha' del primer elemento del historial */}
                                <Text style={{ fontWeight: 200, color: "white" }}>{ticketsArray[0].historial?.[0]?.fecha || "Sin fecha"}</Text>
                            </View>
                        </VStack>
                    ) : (
                        <Text style={{ color: theme.color, marginTop: 20 }}>No hay tickets disponibles</Text>
                    )}

                    {/* Historial de tickets */}
                    <View style={{ alignSelf: 'flex-start', marginLeft: 20, marginTop: 20, marginBottom: 20 }}>
                        <Text style={{ fontWeight: 700, fontSize: 18, color: theme.color }}>Historial de Tickets</Text>
                    </View>

                    <VStack style={{ width: '100%', alignItems: 'center' }}>
                        {ticketsArray.length === 0 && (
                            <Text style={{ color: theme.color }}>No hay tickets disponibles</Text>
                        )}

                        {ticketsArray.map((ticket) => (
                            <TouchableOpacity
                                key={ticket.id}
                                onPress={() => navigation.navigate("Infoticket", { ticketId: ticket.id })}
                                style={{ width: '90%', marginBottom: 10 }}
                            >
                                <View style={{ backgroundColor: listBg, borderRadius: 10, padding: 10 }}>
                                    <HStack style={{ justifyContent: 'space-between' }}>
                                        <VStack>
                                            <Text style={{ fontWeight: 900, fontSize: 12, color: theme.color }}>{ticket.motivo || "Motivo no especificado"}</Text>
                                            <Text style={{ fontWeight: 900, fontSize: 10, color: ticket.status === "Pendiente" ? "#E19E00" : ticket.status === "Cerrado" || ticket.status === "Finalizado" ? "#00D24D" : "#E20004" }}>{ticket.status || "Sin Estado"}</Text>
                                        </VStack>
                                        <VStack style={{ justifyContent: 'center' }}>
                                            <Text style={{ fontWeight: 700, fontSize: 10, color: theme.color }}>
                                                {/* Usamos 'fecha' del primer elemento del historial */}
                                                {ticket.historial?.[0]?.fecha ? new Date(ticket.historial[0].fecha).toLocaleDateString("es-ES", { day: '2-digit', month: 'long' }) : ""}
                                            </Text>
                                        </VStack>
                                    </HStack>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </VStack>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}