import React, { useRef, useContext } from "react";
import { Text, View, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as DocumentPicker from 'expo-document-picker';
import themeContext from "@/theme/themeContext";

export default function formulario() {

    const theme = useContext(themeContext);

    const bg = theme.theme === "dark" ? "#1A1A1A" : "#ffffffff";
    const boxBorder = theme.theme === "dark" ? theme.bajo : "#042c50";
    const floatingBg = theme.theme === "dark" ? theme.backgroundColor : "#F6F6F6";
    const textColor = theme.color;
    const primary = theme.theme === "dark" ? "white" : "#042c50";
    const secundary = theme.theme ==="dark" ? "black" : "white"

    const [nombre, setNombre] = React.useState("");
    const [apellidos, setApellidos] = React.useState("");
    const [calle, setCalle] = React.useState("");
    const [colonia, setColonia] = React.useState("");
    const [comprobante, setNombreArchivoCom] = React.useState("");
    const [ine, setNombreIne] = React.useState("");

    const inputRef = useRef();

    const subirDocumento = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({ type: "*/*", copyToCacheDirectory: true });
            if (result.assets) setNombreArchivoCom(result.assets[0].name);
        } catch (error) { console.log(error); }
    };

    const subirIne = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({ type: "*/*", copyToCacheDirectory: true });
            if (result.assets) setNombreIne(result.assets[0].name);
        } catch (error) { console.log(error); }
    };

    return (
        <KeyboardAvoidingView 
            style={{ flex: 1, backgroundColor: bg }} 
            behavior={Platform.OS === 'android' ? "padding" : "height"} 
            keyboardVerticalOffset={Platform.OS === "android" ? 80 : 0}
        >

            <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
                <SafeAreaProvider>
                    <SafeAreaView>

                        <View style={{ marginLeft: 30, marginTop: 20, marginRight: 30, flex: 1 }}>

                            <View>
                                <View style={{ marginBottom: 10 }}>
                                    <Text style={{ fontWeight: 700, color: textColor }}>Detalles del contacto</Text>
                                </View>

                                <View>
                                    <View style={{ position: 'relative', justifyContent: 'center', borderColor: boxBorder, borderWidth: 2, borderRadius: 10, height: 50, marginBottom: 20 }}>
                                        <TouchableOpacity onPress={() => inputRef.current.focus()}>
                                            <Text style={{ position: 'absolute', top: -12, left: 10, paddingHorizontal: 5, fontSize: 12, color: primary, backgroundColor: floatingBg }}>Nombre</Text>
                                        </TouchableOpacity>
                                        <TextInput ref={inputRef} style={{ height: '100%', fontSize: 16, paddingLeft: 20, color: textColor }} onChangeText={setNombre} value={nombre} />
                                    </View>

                                    <View style={{ position: 'relative', justifyContent: 'center', borderColor: boxBorder, borderWidth: 2, borderRadius: 10, height: 50, marginBottom: 20 }}>
                                        <TouchableOpacity onPress={() => inputRef.current.focus()}>
                                            <Text style={{ position: 'absolute', top: -12, left: 10, paddingHorizontal: 5, fontSize: 12, color: primary, backgroundColor: floatingBg }}>Apellidos</Text>
                                        </TouchableOpacity>
                                        <TextInput ref={inputRef} style={{ height: '100%', fontSize: 16, paddingLeft: 20, color: textColor }} onChangeText={setApellidos} value={apellidos} />
                                    </View>
                                </View>

                                <View style={{ marginBottom: 10 }}>
                                    <Text style={{ fontWeight: 700, color: textColor }}>Dirección</Text>
                                </View>

                                <View>
                                    <View style={{ position: 'relative', justifyContent: 'center', borderColor: boxBorder, borderWidth: 2, borderRadius: 10, height: 50, marginBottom: 20 }}>
                                        <TouchableOpacity onPress={() => inputRef.current.focus()}>
                                            <Text style={{ position: 'absolute', top: -12, left: 10, paddingHorizontal: 5, fontSize: 12, color: primary, backgroundColor: floatingBg }}>Calle y Número</Text>
                                        </TouchableOpacity>
                                        <TextInput ref={inputRef} style={{ height: '100%', fontSize: 16, paddingLeft: 20, color: textColor }} onChangeText={setCalle} value={calle} />
                                    </View>

                                    <View style={{ position: 'relative', justifyContent: 'center', borderColor: boxBorder, borderWidth: 2, borderRadius: 10, height: 50, marginBottom: 20 }}>
                                        <TouchableOpacity onPress={() => inputRef.current.focus()}>
                                            <Text style={{ position: 'absolute', top: -12, left: 10, paddingHorizontal: 5, fontSize: 12, color: primary, backgroundColor: floatingBg }}>Colonia y C.P.</Text>
                                        </TouchableOpacity>
                                        <TextInput ref={inputRef} style={{ height: '100%', fontSize: 16, paddingLeft: 20, color: textColor }} onChangeText={setColonia} value={colonia} />
                                    </View>
                                </View>

                                <View style={{ marginBottom: 10 }}>
                                    <Text style={{ fontWeight: 700, color: textColor }}>Detalles del contacto</Text>
                                </View>

                                <View style={{ position: 'relative', justifyContent: 'center', borderColor: boxBorder, borderWidth: 2, borderRadius: 10, height: 50, marginBottom: 20 }}>
                                    <Text style={{ position: 'absolute', top: -12, left: 10, paddingHorizontal: 5, fontSize: 12, color: primary, backgroundColor: floatingBg }}>INE</Text>

                                    <TouchableOpacity onPress={subirIne} style={{ position: 'absolute', right: 10 }}>
                                        <Icon name="paperclip" size={28} color={primary} />
                                    </TouchableOpacity>

                                    <TextInput
                                        style={{ height: '100%', fontSize: 16, paddingLeft: 20, paddingRight: 50, color: textColor }}
                                        value={ine}
                                        editable={false}
                                        placeholder="Selecciona un archivo"
                                        placeholderTextColor={theme.theme === "dark" ? "#999" : "#666"}
                                    />
                                </View>

                                <View style={{ position: 'relative', justifyContent: 'center', borderColor: boxBorder, borderWidth: 2, borderRadius: 10, height: 50, marginBottom: 30 }}>
                                    <Text style={{ position: 'absolute', top: -12, left: 10, paddingHorizontal: 5, fontSize: 12, color: primary, backgroundColor: floatingBg }}>COMPROBANTE DE DOMICILIO</Text>

                                    <TouchableOpacity onPress={subirDocumento} style={{ position: 'absolute', right: 10 }}>
                                        <Icon name="paperclip" size={28} color={primary} />
                                    </TouchableOpacity>

                                    <TextInput
                                        style={{ height: '100%', fontSize: 16, paddingLeft: 20, paddingRight: 50, color: textColor }}
                                        value={comprobante}
                                        editable={false}
                                        placeholder="Selecciona un archivo"
                                        placeholderTextColor={theme.theme === "dark" ? "#999" : "#666"}
                                    />
                                </View>

                                <TouchableOpacity onPress={() => alert('Enviado')}>
                                    <Text style={{ fontSize: 16, fontWeight: 700, color: secundary , backgroundColor: primary, padding: 10, textAlign: 'center', borderRadius: 10 }}>
                                        Enviar
                                    </Text>
                                </TouchableOpacity>

                            </View>

                        </View>

                    </SafeAreaView>
                </SafeAreaProvider>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
