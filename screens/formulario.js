import React, { useRef } from "react";
import { Text, View, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as DocumentPicker from 'expo-document-picker';

export default function formulario() {
    const [text, onChangeText] = React.useState("");
    const inputRef = React.useRef();

    const subirDocumento = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: "*/*", // todos los tipos
                copyToCacheDirectory: true,
            });

            if (result.assets) {
                const archivo = result.assets[0];
                console.log("Documento seleccionado:", result.assets[0]);
                setNombreArchivoCom(archivo.name);
            }
        } catch (error) {
            console.log(error);
        }

    };
    const subirIne = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: "*/*", // todos los tipos
                copyToCacheDirectory: true,
            });

            if (result.assets) {
                const archivo = result.assets[0];
                console.log("Documento seleccionado:", result.assets[0]);
                setNombreIne(archivo.name);
            }
        } catch (error) {
            console.log(error);
        }

    };
    const [comprobante, setNombreArchivoCom] = React.useState("");
    const [ine, setNombreIne] = React.useState("");


    return (
        <KeyboardAvoidingView style={{ flex: 1, backgroundColor: "#ffffffff" }} behavior={Platform.OS === 'android' ? "padding" : "height"} keyboardVerticalOffset={Platform.OS === "android" ? 80 : 0}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
                <SafeAreaProvider>
                    <SafeAreaView>
                        <View style={{ marginLeft: 30, marginTop: 20, marginRight: 30, flex: 1 }}>
                            <View>
                                <View style={{ marginBottom: 10 }}>
                                    <Text style={{ fontWeight: 700 }}>Detalles del contacto</Text>
                                </View>
                                <View>
                                    <View style={{ position: 'relative', justifyContent: 'center', borderColor: '#042c50', borderWidth: 2, borderRadius: 10, height: 50, marginBottom: 20 }}>
                                        <TouchableOpacity onPress={() => inputRef.current.focus()}>
                                            <Text style={{ position: 'absolute', top: -12, left: 10, backgroundColor: 'white', paddingHorizontal: 5, fontSize: 12, color: '#042c50', backgroundColor: '#F6F6F6' }}>Nombre</Text>
                                        </TouchableOpacity>
                                        <TextInput ref={inputRef} style={{ height: '100%', fontSize: 16, paddingLeft: 20 }} onChangeText={onChangeText} value={text} />
                                    </View>
                                    <View style={{ position: 'relative', justifyContent: 'center', borderColor: '#042c50', borderWidth: 2, borderRadius: 10, height: 50, marginBottom: 20 }}>
                                        <TouchableOpacity onPress={() => inputRef.current.focus()}>
                                            <Text style={{ position: 'absolute', top: -12, left: 10, backgroundColor: 'white', paddingHorizontal: 5, fontSize: 12, color: '#042c50', backgroundColor: '#F6F6F6' }}>Apellidos</Text>
                                        </TouchableOpacity>
                                        <TextInput ref={inputRef} style={{ height: '100%', fontSize: 16, paddingLeft: 20 }} onChangeText={onChangeText} value={text} />
                                    </View>

                                </View>

                                <View style={{ marginBottom: 10 }}>
                                    <Text style={{ fontWeight: 700 }}>Dirección</Text>
                                </View>
                                <View>
                                    <View style={{ position: 'relative', justifyContent: 'center', borderColor: '#042c50', borderWidth: 2, borderRadius: 10, height: 50, marginBottom: 20 }}>
                                        <TouchableOpacity onPress={() => inputRef.current.focus()}>
                                            <Text style={{ position: 'absolute', top: -12, left: 10, backgroundColor: 'white', paddingHorizontal: 5, fontSize: 12, color: '#042c50', backgroundColor: '#F6F6F6' }}>Calle y Número</Text>
                                        </TouchableOpacity>
                                        <TextInput ref={inputRef} style={{ height: '100%', fontSize: 16, paddingLeft: 20 }} onChangeText={onChangeText} value={text} />
                                    </View>
                                    <View style={{ position: 'relative', justifyContent: 'center', borderColor: '#042c50', borderWidth: 2, borderRadius: 10, height: 50, marginBottom: 20 }}>
                                        <TouchableOpacity onPress={() => inputRef.current.focus()}>
                                            <Text style={{ position: 'absolute', top: -12, left: 10, backgroundColor: 'white', paddingHorizontal: 5, fontSize: 12, color: '#042c50', backgroundColor: '#F6F6F6' }}>Colonia y C.P.</Text>
                                        </TouchableOpacity>
                                        <TextInput ref={inputRef} style={{ height: '100%', fontSize: 16, paddingLeft: 20 }} onChangeText={onChangeText} value={text} />
                                    </View>

                                </View>

                                <View style={{ marginBottom: 10 }}>
                                    <Text style={{ fontWeight: 700 }}>Detalles del contacto</Text>
                                </View>
                                <View>
                                    <View style={{ position: 'relative', justifyContent: 'center', borderColor: '#042c50', borderWidth: 2, borderRadius: 10, height: 50, marginBottom: 20 }}>
                                        <Text style={{ position: 'absolute', top: -12, left: 10, backgroundColor: 'white', paddingHorizontal: 5, fontSize: 12, color: '#042c50', backgroundColor: '#F6F6F6' }}>INE</Text>
                                        <TouchableOpacity onPress={subirIne} style={{ position: 'absolute', right: 10 }}>
                                            <Icon name="paperclip" size={28} color="#042c50" />
                                        </TouchableOpacity>

                                        <TextInput
                                            style={{ height: '100%', fontSize: 16, paddingLeft: 20, paddingRight: 50 }}
                                            value={ine}
                                            editable={false}
                                            placeholder="Selecciona un archivo"
                                        />
                                    </View>
                                    <View style={{ position: 'relative', justifyContent: 'center', borderColor: '#042c50', borderWidth: 2, borderRadius: 10, height: 50, marginBottom: 30 }}>
                                        <Text style={{ position: 'absolute', top: -12, left: 10, backgroundColor: 'white', paddingHorizontal: 5, fontSize: 12, color: '#042c50', backgroundColor: '#F6F6F6' }}>COMPROBANTE DE DOMICILIO</Text>
                                        <TouchableOpacity onPress={subirDocumento} style={{ position: 'absolute', right: 10 }}>
                                            <Icon name="paperclip" size={28} color="#042c50" />
                                        </TouchableOpacity>

                                        <TextInput
                                            style={{ height: '100%', fontSize: 16, paddingLeft: 20, paddingRight: 50 }}
                                            value={comprobante}
                                            editable={false}
                                            placeholder="Selecciona un archivo"
                                        />
                                    </View>

                                </View>

                                <TouchableOpacity onPress={() => alert('Enviado')}>
                                    <Text style={{ fontSize: 16, fontWeight: 700, color: '#ffffffff', backgroundColor: '#042c50', padding: 10, textAlign: 'center', borderRadius: 10 }}>Enviar</Text>
                                </TouchableOpacity>

                            </View>

                        </View>
                    </SafeAreaView>
                </SafeAreaProvider>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}