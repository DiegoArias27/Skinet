import React, { useState, useContext } from "react";
import { View, Pressable, Alert, Image } from "react-native";
import { Text } from "@/components/ui/text";
import { Button, ButtonText } from "@/components/ui/button";
import Feather from "@expo/vector-icons/Feather";
import { Input, InputField } from "@/components/ui/input";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import themeContext from "@/theme/themeContext";
import { useUserContext } from "@/context/UserContext";
import { getDatabase, ref, get, update } from "firebase/database";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useFocusEffect } from "@react-navigation/native";
import { LanguageContext } from "@/context/LanguageContext";
import * as ImagePicker from "expo-image-picker";
import { PermissionsAndroid, Platform } from "react-native";
import * as FileSystem from "expo-file-system";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";

const t = {
    ES: {
        idCliente: "ID CLIENTE",
        sinId: "Sin ID",
        telefono: "Teléfono",
        direccion: "Dirección",
        email: "Email",
        zona: "Zona",
        sinZona: "Sin zona",
        guardar: "Guardar cambio",
        usuario: "Usuario",
    },
    ENG: {
        idCliente: "CLIENT ID",
        sinId: "No ID",
        telefono: "Phone",
        direccion: "Address",
        email: "Email",
        zona: "Zone",
        sinZona: "No zone",
        guardar: "Save changes",
        usuario: "User",
    },
};

function Perfil() {
    const [editTel, setEditTel] = useState(false);
    const [editDir, setEditDir] = useState(false);
    const [editEm, setEditEm] = useState(false);

    const theme = useContext(themeContext);
    const { user, setUser } = useUserContext();
    const { language } = useContext(LanguageContext);
    const text = t[language];

    const [telefono, setTelefono] = useState("");
    const [direccion, setDireccion] = useState("");
    const [email, setEmail] = useState("");
    const [zone, setZona] = useState("");

    const [datosOriginales, setDatosOriginales] = useState({
        telefono: "",
        direccion: "",
        email: "",
    });

    useFocusEffect(
        React.useCallback(() => {
            if (!user?.id) return;
            const db = getDatabase();
            const userRef = ref(db, `users/${user.id}`);
            get(userRef).then((snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    setTelefono(data.phone || "");
                    setDireccion(data.address || "");
                    setEmail(data.email || "");
                    setZona(data.zone || "");
                    setDatosOriginales({
                        telefono: data.phone || "",
                        direccion: data.address || "",
                        email: data.email || "",
                    });
                }
            });
        }, [user?.id])
    );

    const hayCambios =
        telefono !== datosOriginales.telefono ||
        direccion !== datosOriginales.direccion ||
        email !== datosOriginales.email;

    const textColor = theme.color;
    const boxBorder = theme.theme === "dark" ? "#4A4A4A" : "#002E5D";
    const boxBg = theme.theme === "dark" ? "#1E1E1E" : "white";
    const buttonBg = theme.theme === "dark" ? "white" : "#002E5D";
    const buttonText = theme.theme === "dark" ? "black" : "white";

    const guardarCambios = () => {
        if (!user?.id || !hayCambios) return;
        const db = getDatabase();
        const userRef = ref(db, `users/${user.id}`);
        update(userRef, {
            phone: telefono,
            address: direccion,
            email: email,
        })
            .then(() => {
                setEditDir(false);
                setEditEm(false);
                setEditTel(false);
                setDatosOriginales({ telefono, direccion, email });
                setUser({ ...user, phone: telefono, address: direccion, email });
            })
            .catch((error) => {
                console.error("Error al actualizar:", error);
            });
    };

    const cambiarAvatar = async () => {
        try {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

            if (status !== "granted") {
                Alert.alert("Permiso denegado", "No se puede acceder a la galería.");
                return;
            }

            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                quality: 0.8,
            });

            if (result.canceled) {
                return;
            }

            const uri = result.assets[0].uri;

            const response = await fetch(uri);
            const blob = await response.blob();

            const storage = getStorage();
            const avatarRef = storageRef(storage, `avatars/${user.id}.jpg`);

            await uploadBytes(avatarRef, blob);

            const url = await getDownloadURL(avatarRef);

            const db = getDatabase();
            await update(ref(db, `users/${user.id}`), { avatar: url });

            setUser({ ...user, avatar: url });

        } catch (error) {
            Alert.alert("Error", "No se pudo subir la imagen.");
        }
    };


    return (
        <KeyboardAwareScrollView
            enableOnAndroid={true}
            extraScrollHeight={20}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{
                alignItems: "center",
                paddingBottom: 40,
                backgroundColor: theme.backgroundColor,
            }}
        >
            <View
                style={{
                    backgroundColor: theme.backgroundColor,
                    marginTop: 20,
                    alignItems: "center",
                    padding: 20,
                    width: "100%",
                }}
            >
                <Pressable onPress={cambiarAvatar}>
                    <Avatar size="2xl" style={{ marginBottom: 10 }}>
                        <AvatarImage
                            source={
                                user?.avatar
                                    ? { uri: user.avatar }
                                    : { uri: "https://ui-avatars.com/api/?name=" + encodeURIComponent(user?.name || "Usuario") + "&background=random" }
                            }
                        />
                    </Avatar>
                </Pressable>

                <Text
                    style={{
                        color: textColor,
                        fontSize: 20,
                        fontWeight: "700",
                        textAlign: "center",
                        marginBottom: 20,
                    }}
                >
                    {user?.name || text.usuario}
                </Text>

                {/* ID CLIENTE */}
                <View
                    style={{
                        width: "100%",
                        marginBottom: 18,
                        borderWidth: 2,
                        borderColor: boxBorder,
                        padding: 10,
                        borderRadius: 12,
                        backgroundColor: boxBg,
                    }}
                >
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Text style={{ color: textColor, fontWeight: "600" }}>{text.idCliente}</Text>
                        <Text style={{ color: textColor, fontWeight: "500" }}>{user?.id || text.sinId}</Text>
                    </View>
                </View>

                {/* TELEFONO */}
                <View
                    style={{
                        width: "100%",
                        marginBottom: 18,
                        borderWidth: 2,
                        borderColor: boxBorder,
                        padding: 10,
                        borderRadius: 12,
                        backgroundColor: boxBg,
                    }}
                >
                    <Text style={{ color: textColor, fontWeight: "600" }}>{text.telefono}</Text>
                    <View style={{ marginTop: 8, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <Input variant="outline" borderWidth={0} style={{ flex: 1 }}>
                            <InputField
                                value={telefono}
                                onChangeText={setTelefono}
                                keyboardType="numeric"
                                style={{ color: textColor }}
                                editable={editTel}
                            />
                        </Input>
                        <Pressable onPress={() => setEditTel(true)}>
                            <Feather name="edit-3" size={24} color={textColor} />
                        </Pressable>
                    </View>
                </View>

                {/* DIRECCION */}
                <View
                    style={{
                        width: "100%",
                        marginBottom: 18,
                        borderWidth: 2,
                        borderColor: boxBorder,
                        padding: 10,
                        borderRadius: 12,
                        backgroundColor: boxBg,
                    }}
                >
                    <Text style={{ color: textColor, fontWeight: "600" }}>{text.direccion}</Text>
                    <View style={{ marginTop: 8, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <Input variant="outline" borderWidth={0} style={{ flex: 1 }}>
                            <InputField
                                value={direccion}
                                onChangeText={setDireccion}
                                style={{ color: textColor }}
                                editable={editDir}
                                multiline={true}
                                numberOfLines={2}
                            />
                        </Input>
                        <Pressable onPress={() => setEditDir(true)}>
                            <Feather name="edit-3" size={24} color={textColor} />
                        </Pressable>
                    </View>
                </View>

                {/* EMAIL */}
                <View
                    style={{
                        width: "100%",
                        marginBottom: 18,
                        borderWidth: 2,
                        borderColor: boxBorder,
                        padding: 10,
                        borderRadius: 12,
                        backgroundColor: boxBg,
                    }}
                >
                    <Text style={{ color: textColor, fontWeight: "600" }}>{text.email}</Text>
                    <View style={{ marginTop: 8, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <Input variant="outline" borderWidth={0} style={{ flex: 1 }}>
                            <InputField
                                value={email}
                                autoCapitalize="none"
                                onChangeText={setEmail}
                                style={{ color: textColor, textDecorationLine: "underline" }}
                                editable={editEm}
                                multiline={true}
                                numberOfLines={2}
                            />
                        </Input>
                        <Pressable onPress={() => setEditEm(true)}>
                            <Feather name="edit-3" size={24} color={textColor} />
                        </Pressable>
                    </View>
                </View>

                {/* ZONA */}
                <View
                    style={{
                        width: "100%",
                        marginBottom: 18,
                        borderWidth: 2,
                        borderColor: boxBorder,
                        padding: 10,
                        borderRadius: 12,
                        backgroundColor: boxBg,
                    }}
                >
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Text style={{ color: textColor, fontWeight: "600" }}>{text.zona}</Text>
                        <Text style={{ color: textColor, fontWeight: "500" }}>{zone || text.sinZona}</Text>
                    </View>
                </View>

                {/* BOTÓN GUARDAR */}
                <Button
                    size="lg"
                    action="primary"
                    style={{
                        backgroundColor: hayCambios ? buttonBg : "#999",
                        width: 200,
                        borderRadius: 12,
                    }}
                    onPress={guardarCambios}
                    disabled={!hayCambios}
                >
                    <ButtonText style={{ color: buttonText }}>{text.guardar}</ButtonText>
                </Button>
            </View>
        </KeyboardAwareScrollView>
    );
}

export default Perfil;
