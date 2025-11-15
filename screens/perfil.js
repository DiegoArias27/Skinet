import React, { useState } from "react";
import { View, ScrollView, Pressable } from "react-native";
import { Text } from "@/components/ui/text";
import { Button, ButtonText } from "@/components/ui/button";
import Feather from "@expo/vector-icons/Feather";
import { Input, InputField } from "@/components/ui/input";
import {
    Avatar,
    AvatarImage,
} from "@/components/ui/avatar";

function perfil() {
    const [telefono, setTelefono] = useState("4494968568");
    const [direccion, setDireccion] = useState("Av. Proceres");
    const [email, setEmail] = useState("leo.va@gmail.com");
    const [zona, setZona] = useState("FOROMOS2");
    const [editTel, setEditTel] = useState(false);
    const [editDir, setEditDir] = useState(false);
    const [editEm, setEditEm] = useState(false);

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ alignItems: "center", paddingBottom: 40 }}
        >
            <View style={{ marginTop: 20, alignItems: "center", padding: 20, width: "100%" }}>
                <Avatar size="2xl" style={{ marginBottom: 10 }}>
                    <AvatarImage
                        source={require('../image/Leo.png')}
                    />
                </Avatar>

                <Text
                    style={{ color: "black", fontSize: 20, fontWeight: "700", textAlign: "center", marginBottom: 20 }}>
                    Leo{"\n"}Velasco Arias
                </Text>

                <View
                    style={{ width: "100%", marginBottom: 18, borderWidth: 2, borderColor: "#002E5D", padding: 10, borderRadius: 12 }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Text style={{ color: "black", fontWeight: "600" }}>ID CLIENTE</Text>
                        <Text style={{ color: "black", fontWeight: "500" }}>1525</Text>
                    </View>
                </View>

                <View
                    style={{ width: "100%", marginBottom: 18, borderWidth: 2, borderColor: "#002E5D", padding: 10, borderRadius: 12 }} >
                    <Text style={{ color: "black", fontWeight: "600" }}>Teléfono</Text>

                    <View
                        style={{ marginTop: 8, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }} >
                        <Input variant="outline" borderWidth={0} width={200}>
                            <InputField
                                value={telefono}
                                onChangeText={setTelefono}
                                keyboardType="numeric"
                                style={{ color: "black" }}
                                editable={editTel}
                            />
                        </Input>

                        <Pressable onPress={() => setEditTel(true)}>
                            <Feather name="edit-3" size={24} color="black" />
                        </Pressable>
                    </View>
                </View>

                <View
                    style={{ width: "100%", marginBottom: 18, borderWidth: 2, borderColor: "#002E5D", padding: 10, borderRadius: 12 }}>
                    <Text style={{ color: "black", fontWeight: "600" }}>Dirección</Text>

                    <View
                        style={{ marginTop: 8, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }} >
                        <Input variant="outline" borderWidth={0} width={200}>
                            <InputField
                                value={direccion}
                                onChangeText={setDireccion}
                                style={{ color: "black" }}
                                editable={editDir}
                            />
                        </Input>

                        <Pressable onPress={() => setEditDir(true)}>
                            <Feather name="edit-3" size={24} color="black" />
                        </Pressable>
                    </View>
                </View>

                <View
                    style={{ width: "100%", marginBottom: 18, borderWidth: 2, borderColor: "#002E5D", padding: 10, borderRadius: 12 }}>
                    <Text style={{ color: "black", fontWeight: "600" }}>Email</Text>

                    <View
                        style={{ marginTop: 8, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <Input variant="outline" borderWidth={0} width={200}>
                            <InputField
                                value={email}
                                autoCapitalize="none"
                                onChangeText={setEmail}
                                style={{ color: "black", textDecorationLine: "underline" }} 
                                editable={editEm}
                                />
                        </Input>
                        <Pressable onPress={() => setEditEm(true)}>
                            <Feather name="edit-3" size={24} color="black" />
                        </Pressable>
                    </View>
                </View>

                <View
                    style={{ width: "100%", marginBottom: 18, borderWidth: 2, borderColor: "#002E5D", padding: 10, borderRadius: 12, }} >
                    <Text style={{ color: "black", fontWeight: "600" }}>Zona</Text>

                    <View
                        style={{ marginTop: 8, flexDirection: "row", justifyContent: "space-between" }} >
                        <Input variant="outline" borderWidth={0} width={200}>
                            <InputField
                                value={zona}
                                onChangeText={setZona}
                                style={{ color: "black" }}
                                editable={false}
                            />
                        </Input>
                    </View>
                </View>

                <Button
                    size="lg"
                    action="primary"
                    style={{ backgroundColor: "#002E5D", width: 200, borderRadius: 12 }}
                    onPress={()=> {setEditDir(false); setEditEm(false); setEditTel(false);}}
                    >
                    <ButtonText>Guardar cambio</ButtonText>
                </Button>
            </View>
        </ScrollView>
    );
}

export default perfil;
