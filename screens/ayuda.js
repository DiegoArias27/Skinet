import React, { useContext, useState, useEffect } from "react";
import {
    View,
    Text,
    ScrollView,
    Linking,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    Pressable,
} from "react-native";
import { AddIcon, RemoveIcon } from "@/components/ui/icon";
import themeContext from "@/theme/themeContext";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Textarea, TextareaInput } from "@/components/ui/textarea";
import { getDatabase, ref, get } from "firebase/database";
import { LanguageContext } from "@/context/LanguageContext";

export default function Ayuda() {
    const [mensaje, setMensaje] = useState("");
    const [text, onChangeText] = useState("");
    const theme = useContext(themeContext);
    const { language } = useContext(LanguageContext); // 👈 idioma actual
    const fondo = theme.theme === "dark" ? "#1A1A1A" : "white";
    const titulos = theme.theme === "dark" ? "white" : "#042c50";
    const [openItem, setOpenItem] = useState("");
    const [items, setItems] = useState([]);

    useEffect(() => {
        const db = getDatabase();
        const helpRef = ref(db, "help");

        get(helpRef)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    const arr = Object.keys(data).map((key) => ({
                        id: key,
                        ...data[key],
                    }));
                    setItems(arr);
                }
            })
            .catch((error) => {
                console.error("Error al cargar ayuda:", error);
            });
    }, []);

    return (
        <KeyboardAvoidingView
            style={{ flex: 1, backgroundColor: fondo }}
            behavior={Platform.OS === "android" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "android" ? 80 : 0}
        >
            <ScrollView
                style={{ flex: 1, backgroundColor: fondo, paddingLeft: 30, paddingRight: 30 }}
                keyboardShouldPersistTaps="handled"
            >
                {/* Buscador */}
                <View>
                    <SafeAreaView style={{ position: "relative", top: 0, left: 0, right: 0, zIndex: 999 }}>
                        <View style={{ marginTop: 0 }}>
                            <Icon
                                name="magnify"
                                size={25}
                                color="#000"
                                style={{ position: "absolute", left: 20, zIndex: 2, top: 20 }}
                            />
                            <TouchableOpacity
                                onPress={() => onChangeText("")}
                                style={{ position: "absolute", right: 20, zIndex: 2, top: 20 }}
                            >
                                <Icon name="close" size={25} color="#000" />
                            </TouchableOpacity>
                            <TextInput
                                style={[styles.input, { paddingLeft: 60, paddingRight: 45 }]}
                                onChangeText={onChangeText}
                                value={text}
                                placeholder={language === "ES" ? "Buscar preguntas" : "Search questions"}
                            />
                        </View>
                    </SafeAreaView>
                </View>

                {/* Preguntas frecuentes */}
                {items.map((item, index) => {
                    const showSectionTitle =
                        index === 0 ||
                        (language === "ES"
                            ? items[index - 1].section_es !== item.section_es
                            : items[index - 1].section_eng !== item.section_eng);

                    const isExpanded = openItem === item.id;

                    // Filtro de búsqueda (según idioma)
                    const question = language === "ES" ? item.question_es : item.question_eng;
                    const answer = language === "ES" ? item.answer_es : item.answer_eng;
                    const section = language === "ES" ? item.section_es : item.section_eng;

                    if (text && !question.toLowerCase().includes(text.toLowerCase())) {
                        return null;
                    }

                    return (
                        <View key={item.id}>
                            {showSectionTitle && (
                                <Text
                                    style={{
                                        fontWeight: "700",
                                        fontSize: 16,
                                        color: titulos,
                                        marginTop: 20,
                                    }}
                                >
                                    {section}
                                </Text>
                            )}
                            <TouchableOpacity
                                onPress={() => setOpenItem((prev) => (prev === item.id ? "" : item.id))}
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    paddingVertical: 12,
                                    borderBottomWidth: 1,
                                    borderBottomColor: "#ccc",
                                }}
                            >
                                <View
                                    style={{
                                        flexDirection: "row",
                                        width: "100%",
                                        height: 40,
                                        justifyContent: "flex-start",
                                    }}
                                >
                                    <View>
                                        <Text
                                            style={{
                                                color: isExpanded ? titulos : theme.color,
                                                fontSize: 15,
                                                fontWeight: isExpanded ? "700" : "400",
                                                width: 290,
                                            }}
                                        >
                                            {question}
                                        </Text>
                                    </View>
                                    <View style={{ width: "5%", left: 0, position: "relative" }}>
                                        {isExpanded ? (
                                            <RemoveIcon color={theme.color ?? titulos} />
                                        ) : (
                                            <AddIcon color={theme.color ?? titulos} />
                                        )}
                                    </View>
                                </View>
                            </TouchableOpacity>
                            {isExpanded && (
                                <View style={{ paddingVertical: 10 }}>
                                    <Text style={{ color: theme.color ?? titulos }}>{answer}</Text>
                                </View>
                            )}
                        </View>
                    );
                })}

                {/* Footer */}
                <View style={{ marginTop: 30, alignItems: "center", marginBottom: 20 }}>
                    <Text style={{ color: titulos, fontWeight: "700" }}>
                        {language === "ES" ? "¿No encontraste lo que buscabas?" : "Didn't find what you were looking for?"}
                    </Text>
                    <Text style={{ color: theme.color }}>
                        {language === "ES" ? "Estamos aquí para ayudarte" : "We are here to help you"}
                    </Text>
                </View>

                <View style={{ marginBottom: 20, alignItems: "center" }}>
                    <Text style={{ color: theme.color }}>
                        {language === "ES" ? "Escribe tu duda aquí:" : "Write your question here:"}
                    </Text>
                    <Textarea size="xl" className="w-64" style={{ borderColor: theme.color }}>
                        <TextareaInput
                            value={mensaje}
                            onChangeText={setMensaje}
                            style={{ color: theme.color }}
                        />
                    </Textarea>
                </View>

                <Pressable
                    style={{ alignItems: "center" }}
                    onPress={() => {
                        const telefono = "5214491537528";
                        const texto = encodeURIComponent(mensaje);
                        Linking.openURL(`https://wa.me/${telefono}?text=${texto}`);
                    }}
                >
                    <View
                        style={{
                            backgroundColor: "#25D366",
                            padding: 10,
                            width: 200,
                            marginBottom: 50,
                        }}
                    >
                        <Text style={{ textAlign: "center" }}>
                            {language === "ES" ? "Enviar a WhatsApp" : "Send to WhatsApp"}
                        </Text>
                    </View>
                </Pressable>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        backgroundColor: "#F6F6F6",
        borderRadius: 20,
        padding: 10,
    },
});
