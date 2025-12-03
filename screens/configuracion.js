import React, { useState, useContext, useRef, useEffect } from "react";
import {
    View, Image, Pressable, Text, Linking, KeyboardAvoidingView, TouchableOpacity, Platform,
    Modal as RNModal, Animated, Easing, TextInput, TouchableWithoutFeedback, StyleSheet
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Link } from "@/components/ui/link";
import { EventRegister } from "react-native-event-listeners";
import themeContext from "@/theme/themeContext";
import { useUserContext } from "@/context/UserContext";
import { getDatabase, ref, set, get } from "firebase/database";
import { ScrollView } from "react-native";
import { LanguageContext } from "@/context/LanguageContext";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

const TAGS = {
    ES: ["Rápida", "Útil", "Bonita", "Fácil", "Inestable"],
    ENG: ["Fast", "Useful", "Beautiful", "Easy", "Unstable"],
};

const traducirTag = (tag, targetLang) => {
    const sourceLang = targetLang === "ES" ? "ENG" : "ES";
    const index = TAGS[sourceLang].indexOf(tag);
    return index !== -1 ? TAGS[targetLang][index] : tag;
};

const formatearFecha = (iso) => {
    const fecha = new Date(iso);
    const opciones = {
        day: "2-digit", month: "long", year: "numeric",
        hour: "2-digit", minute: "2-digit", hour12: true,
    };
    return fecha.toLocaleString("es-MX", opciones);
};

const t = {
    ES: {
        menuTitle: "Menú",
        profile: "Perfil >",
        language: "Idioma",
        service: "Servicio",
        perMonth: "/ mes",
        otherActions: "Otras acciones",
        help: "Ayuda",
        callUs: "Llámanos",
        offices: "Oficinas",
        website: "Sitio Web",
        facebook: "Facebook",
        legal: "Aspectos \nlegales",
        darkMode: "Modo oscuro",
        rateApp: "Valorar app",
        rateTitle: "Valorar App",
        rateSub: "Tu opinión nos ayuda a mejorar",
        describe: "Describe tu experiencia",
        send: "Enviar",
        lang_es: "Español",
        lang_eng: "Inglés",
    },
    ENG: {
        menuTitle: "Menu",
        profile: "Profile >",
        language: "Language",
        service: "Service",
        perMonth: "/ month",
        otherActions: "Other actions",
        help: "Help",
        callUs: "Call us",
        offices: "Offices",
        website: "Website",
        facebook: "Facebook",
        legal: "Legal \naspects",
        darkMode: "Dark mode",
        rateApp: "Rate app",
        rateTitle: "Rate App",
        rateSub: "Your feedback helps us improve",
        describe: "Describe your experience",
        send: "Send",
        lang_es: "Spanish",
        lang_eng: "English",
    },
};

export default function Configuracion() {
    const navigation = useNavigation();
    const theme = useContext(themeContext);
    const darkmode = theme.theme === "dark";
    const { user } = useUserContext();
    const { language, setLanguage } = useContext(LanguageContext);

    const [valorar, setValorar] = useState(false);
    const [rating, setRating] = useState(0);
    const [selectedTags, setSelectedTags] = useState([]);
    const [comentario, setComentario] = useState("");
    const [valoraciones, setValoraciones] = useState([]);
    const [yaValoro, setYaValoro] = useState(false);

    const [langOpen, setLangOpen] = useState(false);

    const cardBg = darkmode ? "#1E1E1E" : theme.morado;

    const llamar = () => Linking.openURL("tel:4491537528");

    const toggleTag = (tag) => {
        if (selectedTags.includes(tag)) {
            setSelectedTags(selectedTags.filter((t) => t !== tag));
        } else {
            setSelectedTags([...selectedTags, tag]);
        }
    };

    const enviarValoracion = () => {
        if (!user?.id) return;
        const db = getDatabase();
        const userRef = ref(db, `valoraciones/${user.id}`);

        const etiquetas_es = selectedTags.map(tag => traducirTag(tag, "ES"));
        const etiquetas_en = selectedTags.map(tag => traducirTag(tag, "ENG"));

        set(userRef, {
            estrellas: rating,
            etiquetas: {
                es: etiquetas_es,
                en: etiquetas_en,
            },
            comentario,
            fecha: new Date().toISOString()
        }).then(() => {
            setRating(0);
            setSelectedTags([]);
            setComentario("");
            setValorar(false);
            setYaValoro(true);
        });
    };
    const anim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(anim, {
            toValue: valorar ? 1 : 0,
            duration: valorar ? 320 : 220,
            easing: valorar ? Easing.out(Easing.poly(4)) : Easing.in(Easing.poly(4)),
            useNativeDriver: true,
        }).start();
    }, [valorar]);

    useEffect(() => {
        if (!user?.id) return;
        const db = getDatabase();
        const valoracionesRef = ref(db, "valoraciones");
        const usuariosRef = ref(db, "users");

        get(valoracionesRef).then((snapshot) => {
            if (!snapshot.exists()) return;
            const valoracionesData = snapshot.val();
            const valoracionesList = Object.keys(valoracionesData).map((uid) => ({
                id: uid,
                ...valoracionesData[uid],
            }));

            get(usuariosRef).then((userSnap) => {
                const usuariosData = userSnap.exists() ? userSnap.val() : {};
                const valoracionesConNombre = valoracionesList.map((v) => ({
                    ...v,
                    nombre: usuariosData[v.id]?.name || "Usuario",
                }));
                setValoraciones(valoracionesConNombre);
                setYaValoro(!!valoracionesData[user.id]);
            });
        });
    }, [valorar, user?.id]);

    const backdropOpacity = anim.interpolate({ inputRange: [0, 1], outputRange: [0, 0.5] });
    const scale = anim.interpolate({ inputRange: [0, 1], outputRange: [0.92, 1] });
    const idiomaFirebase = language === "ENG" ? "en" : "es";

    const text = t[language];

    return (
        <View style={{ padding: 20, flex: 1, backgroundColor: theme.backgroundColor }}>
            {/* Header con perfil y selector de idioma */}
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                <View
                    style={{
                        backgroundColor: cardBg,
                        width: "50%",
                        flexDirection: "row",
                        padding: 15,
                        borderRadius: 10,
                        borderWidth: 1,
                        borderColor: darkmode ? "#333" : "#C4C4D0",
                        marginTop: 20,
                    }}
                >
                    <Avatar size="md">
                        <AvatarImage
                            source={
                                user?.avatar
                                    ? { uri: user.avatar }
                                    : {
                                        uri:
                                            "https://ui-avatars.com/api/?name=" +
                                            encodeURIComponent(user?.name || "Usuario") +
                                            "&background=random"
                                    }
                            }
                        />
                    </Avatar>                    <View style={{ marginLeft: 20 }}>
                        <Text style={{ fontWeight: "700", paddingRight: 30, color: theme.color }}>
                            {user?.name || "Usuario"}
                        </Text>
                        <Pressable onPress={() => navigation.navigate("Perfil")}>
                            <Text style={{ color: "#3A8BFF", fontWeight: "600" }}>{text.profile}</Text>
                        </Pressable>
                    </View>
                </View>

                {/* Dropdown de idioma personalizado */}
                <View style={{ marginTop: 20, minWidth: 150 }}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => setLangOpen((o) => !o)}
                        style={{
                            backgroundColor: cardBg,
                            borderRadius: 10,
                            borderWidth: 1,
                            borderColor: darkmode ? "#333" : "#C4C4D0",
                            paddingVertical: 12,
                            paddingHorizontal: 14,
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        <Text style={{ color: theme.color, fontWeight: "700" }}>{text.language}</Text>
                        <Icon name={langOpen ? "chevron-up" : "chevron-down"} size={20} color={theme.color} />
                    </TouchableOpacity>

                    {langOpen && (
                        <>
                            <TouchableWithoutFeedback onPress={() => setLangOpen(false)}>
                                <View style={StyleSheet.absoluteFill} />
                            </TouchableWithoutFeedback>

                            <View
                                style={{
                                    position: "absolute",
                                    top: 58,
                                    left: 0,
                                    right: 0,
                                    backgroundColor: cardBg,
                                    borderRadius: 10,
                                    borderWidth: 1,
                                    borderColor: darkmode ? "#333" : "#C4C4D0",
                                    overflow: "hidden",
                                    zIndex: 20,
                                }}
                            >
                                <TouchableOpacity
                                    onPress={() => { setLanguage("ES"); setLangOpen(false); }}
                                    style={{ paddingVertical: 12, paddingHorizontal: 14, flexDirection: "row", justifyContent: "space-between" }}
                                >
                                    <Text style={{ color: theme.color }}>{text.lang_es}</Text>
                                    {language === "ES" && <Icon name="check" size={18} color="#3A8BFF" />}
                                </TouchableOpacity>
                                <View style={{ height: 1, backgroundColor: darkmode ? "#333" : "#E5E7EB" }} />
                                <TouchableOpacity
                                    onPress={() => { setLanguage("ENG"); setLangOpen(false); }}
                                    style={{ paddingVertical: 12, paddingHorizontal: 14, flexDirection: "row", justifyContent: "space-between" }}
                                >
                                    <Text style={{ color: theme.color }}>{text.lang_eng}</Text>
                                    {language === "ENG" && <Icon name="check" size={18} color="#3A8BFF" />}
                                </TouchableOpacity>
                            </View>
                        </>
                    )}
                </View>
            </View>

            {/* Servicio */}
            <View style={{ marginTop: 20 }}>
                <Text style={{ fontWeight: "700", color: theme.color }}>{text.service}</Text>
            </View>

            <View
                style={{
                    backgroundColor: cardBg,
                    width: "45%",
                    padding: 20,
                    borderRadius: 10,
                    marginTop: 10,
                }}
            >
                <Text style={{ fontWeight: "700", fontSize: 18, textAlign: "center", color: theme.color }}>
                    10 MB
                </Text>
                <Text style={{ fontSize: 16, textAlign: "center", color: theme.color }}>
                    $300.00 {text.perMonth}
                </Text>
            </View>

            {/* Otras acciones */}
            <View style={{ marginTop: 20 }}>
                <Text style={{ fontWeight: "700", color: theme.color }}>{text.otherActions}</Text>
            </View>

            <VStack style={{ marginTop: 10, height: "45%", justifyContent: "space-between" }}>
                <HStack style={{ justifyContent: "space-between" }}>
                    <Pressable onPress={() => navigation.navigate("Ayuda")}>
                        <View style={[styles.actionBox, { backgroundColor: cardBg }]}>
                            <Icon name="help-circle-outline" size={25} color={theme.color} />
                            <Text style={{ marginLeft: 10, color: theme.color }}>{text.help}</Text>
                        </View>
                    </Pressable>

                    <Pressable onPress={llamar}>
                        <View style={[styles.actionBox, { backgroundColor: cardBg }]}>
                            <Icon name="phone-in-talk-outline" size={25} color={theme.color} />
                            <Text style={{ marginLeft: 10, color: theme.color }}>{text.callUs}</Text>
                        </View>
                    </Pressable>
                </HStack>

                <HStack style={{ justifyContent: "space-between" }}>
                    <Link href="https://maps.app.goo.gl/PxsyZz5aTAUa1d4t6">
                        <View style={[styles.actionBox, { backgroundColor: cardBg }]}>
                            <Icon name="map-marker-outline" size={25} color={theme.color} />
                            <Text style={{ marginLeft: 10, color: theme.color }}>{text.offices}</Text>
                        </View>
                    </Link>

                    <Link href="https://www.skinetinternet.com.mx/">
                        <View style={[styles.actionBox, { backgroundColor: cardBg }]}>
                            <Icon name="web" size={25} color={theme.color} />
                            <Text style={{ marginLeft: 10, color: theme.color }}>{text.website}</Text>
                        </View>
                    </Link>
                </HStack>

                <HStack style={{ justifyContent: "space-between" }}>
                    <Link href="https://www.facebook.com/skinet.ags">
                        <View style={[styles.actionBox, { backgroundColor: cardBg }]}>
                            <Icon name="facebook" size={25} color={theme.color} />
                            <Text style={{ marginLeft: 10, color: theme.color }}>{text.facebook}</Text>
                        </View>
                    </Link>

                    <Pressable onPress={() => navigation.navigate("Aspectos")}>
                        <View style={[styles.actionBox, { backgroundColor: cardBg }]}>
                            <Icon name="bank-outline" size={25} color={theme.color} />
                            <Text style={{ marginLeft: 10, color: theme.color }}>{text.legal}</Text>
                        </View>
                    </Pressable>
                </HStack>

                <HStack style={{ justifyContent: "space-between" }}>
                    <Pressable onPress={() => EventRegister.emit("changeTheme", !darkmode)}>
                        <View style={[styles.actionBox, { backgroundColor: cardBg, justifyContent: "space-between" }]}>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <Icon name="theme-light-dark" size={25} color={theme.color} />
                                <Text style={{ marginLeft: 10, color: theme.color }}>{text.darkMode}</Text>
                            </View>
                        </View>
                    </Pressable>

                    <TouchableOpacity activeOpacity={1} onPress={() => setValorar(true)}>
                        <View style={[styles.actionBox, { backgroundColor: cardBg }]}>
                            <Icon name="star-outline" size={25} color={theme.color} />
                            <Text style={{ marginLeft: 10, color: theme.color }}>{text.rateApp}</Text>
                        </View>
                    </TouchableOpacity>
                </HStack>
            </VStack>

            {/* Modal valoración */}
            <RNModal transparent visible={valorar} animationType="none" onRequestClose={() => setValorar(false)}>
                <TouchableWithoutFeedback>
                    <Animated.View style={[styles.backdrop, { opacity: backdropOpacity }]} />
                </TouchableWithoutFeedback>

                <View style={styles.modalCenter}>
                    <Animated.View style={[styles.modalCard, { transform: [{ scale }], backgroundColor: darkmode ? "#0f1720" : "#ffffff" }]}>
                        <View style={styles.modalHeader}>
                            <Text style={[styles.modalTitle, { color: darkmode ? "#fff" : "#0b1220" }]}>
                                {text.rateTitle}
                            </Text>
                            <TouchableOpacity onPress={() => setValorar(false)} style={styles.closeBtn}>
                                <Icon name="close" size={20} color={darkmode ? "#ddd" : "#333"} />
                            </TouchableOpacity>
                        </View>

                        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
                            <View style={{ paddingHorizontal: 18, paddingBottom: 8 }}>
                                {!yaValoro ? (
                                    <>
                                        <Text style={{ textAlign: "center", marginBottom: 12, color: darkmode ? "#cbd5e1" : "#374151" }}>
                                            {text.rateSub}
                                        </Text>

                                        <View style={{ flexDirection: "row", justifyContent: "center", marginBottom: 14 }}>
                                            {[1, 2, 3, 4, 5].map((i) => (
                                                <TouchableOpacity key={i} onPress={() => setRating(i)}>
                                                    <Icon
                                                        name={i <= rating ? "star" : "star-outline"}
                                                        size={34}
                                                        color={i <= rating ? "#FFD700" : darkmode ? "#6b7280" : "#d1d5db"}
                                                        style={{ marginHorizontal: 6 }}
                                                    />
                                                </TouchableOpacity>
                                            ))}
                                        </View>

                                        <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center", marginBottom: 12 }}>
                                            {TAGS[language].map((tag) => {
                                                const selected = selectedTags.includes(tag);
                                                return (
                                                    <TouchableOpacity
                                                        key={tag}
                                                        onPress={() => toggleTag(tag)}
                                                        style={[
                                                            styles.chip,
                                                            {
                                                                backgroundColor: selected ? "#2563eb" : darkmode ? "#111827" : "#f3f4f6",
                                                                borderColor: selected ? "transparent" : darkmode ? "#374151" : "#d1d5db",
                                                            },
                                                        ]}
                                                    >
                                                        <Text
                                                            style={{
                                                                color: selected ? "#fff" : darkmode ? "#fff" : "#333",
                                                                fontSize: 14,
                                                                fontWeight: "600",
                                                            }}
                                                        >
                                                            {tag}
                                                        </Text>
                                                    </TouchableOpacity>
                                                );
                                            })}
                                        </View>


                                        <Text style={{ fontWeight: "600", marginBottom: 6, color: darkmode ? "#fff" : "#0b1220" }}>
                                            {text.describe}
                                        </Text>

                                        <TextInput
                                            value={comentario}
                                            onChangeText={(t) => t.length <= 150 && setComentario(t)}
                                            placeholder={language === "ES" ? "Escribe aquí..." : "Write here..."}
                                            placeholderTextColor={darkmode ? "#6b7280" : "#9ca3af"}
                                            multiline
                                            style={[
                                                styles.textarea,
                                                {
                                                    backgroundColor: darkmode ? "#0b1220" : "#f8fafc",
                                                    color: darkmode ? "#fff" : "#0b1220",
                                                    borderColor: darkmode ? "#1f2937" : "#e6e7eb",
                                                },
                                            ]}
                                        />
                                        <Text style={{ textAlign: "right", marginTop: 6, color: darkmode ? "#9ca3af" : "#6b7280" }}>
                                            {comentario.length}/150
                                        </Text>

                                        <View style={{ marginTop: 16, alignItems: "center" }}>
                                            <TouchableOpacity onPress={enviarValoracion} style={[styles.sendButton, { backgroundColor: "#2563eb" }]}>
                                                <Text style={{ color: "#fff", fontWeight: "700", fontSize: 16 }}>{text.send}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </>
                                ) : (
                                    <ScrollView style={{ maxHeight: 400 }}>
                                        {valoraciones.map((v) => (
                                            <View
                                                key={v.id}
                                                style={{
                                                    borderWidth: 1,
                                                    borderColor: darkmode ? "#374151" : "#ccc",
                                                    borderRadius: 12,
                                                    padding: 12,
                                                    marginBottom: 12,
                                                    backgroundColor: darkmode ? "#1f2937" : "#f9fafb",
                                                }}
                                            >
                                                <Text style={{ fontWeight: "700", fontSize: 16, color: darkmode ? "#fff" : "#111" }}>
                                                    {v.nombre}
                                                </Text>

                                                <Text style={{ fontSize: 12, color: darkmode ? "#94a3b8" : "#555", marginBottom: 4 }}>
                                                    {formatearFecha(v.fecha)}
                                                </Text>

                                                <View style={{ flexDirection: "row", marginVertical: 6 }}>
                                                    {[1, 2, 3, 4, 5].map((i) => (
                                                        <Icon key={i} name={i <= v.estrellas ? "star" : "star-outline"} size={20} color="#FFD700" style={{ marginRight: 4 }} />
                                                    ))}
                                                </View>

                                                {v.etiquetas && Array.isArray(v.etiquetas[idiomaFirebase]) && v.etiquetas[idiomaFirebase].length > 0 ? (
                                                    <View style={{ flexDirection: "row", flexWrap: "wrap", marginBottom: 6 }}>
                                                        {v.etiquetas[idiomaFirebase].map((tag) => (
                                                            <View
                                                                key={tag}
                                                                style={{
                                                                    backgroundColor: "#2563eb",
                                                                    paddingHorizontal: 14,
                                                                    paddingVertical: 8,
                                                                    borderRadius: 24,
                                                                    marginRight: 6,
                                                                    marginBottom: 6,
                                                                    alignSelf: "flex-start",
                                                                    maxWidth: "100%",
                                                                }}
                                                            >
                                                                <Text
                                                                    style={{
                                                                        color: "white",
                                                                        fontSize: 12,
                                                                        fontWeight: "600",
                                                                        flexShrink: 1,
                                                                        overflow: "hidden",
                                                                    }}
                                                                >
                                                                    {tag}
                                                                </Text>
                                                            </View>
                                                        ))}
                                                    </View>
                                                ) : (
                                                    <Text style={{ fontStyle: "italic", color: darkmode ? "#94a3b8" : "#999", marginBottom: 6 }}>
                                                        {language === "ES" ? "Sin etiquetas" : "No tags"}
                                                    </Text>
                                                )}

                                                <Text style={{ color: darkmode ? "#cbd5e1" : "#333" }}>{v.comentario}</Text>
                                            </View>
                                        ))}
                                    </ScrollView>
                                )}
                            </View>
                        </KeyboardAvoidingView>
                    </Animated.View>
                </View>
            </RNModal>
        </View>
    );
}

const styles = StyleSheet.create({
    actionBox: {
        width: 160,
        flexDirection: "row",
        paddingVertical: 20,
        paddingHorizontal: 20,
        borderRadius: 10,
        alignItems: "center",
    },
    backdrop: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "#000",
    },
    modalCenter: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
    },
    modalCard: {
        width: "100%",
        maxWidth: 520,
        borderRadius: 18,
        overflow: "hidden",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.12,
        shadowRadius: 20,
        elevation: 12,
    },
    modalHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 14,
        paddingHorizontal: 18,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "700",
    },
    closeBtn: {
        position: "absolute",
        right: 12,
        top: 12,
        padding: 8,
        borderRadius: 10,
    },
    chip: {
        paddingVertical: 8,
        paddingHorizontal: 14,
        borderRadius: 24,
        borderWidth: 1,
        margin: 6,
        alignSelf: "flex-start",
        maxWidth: "100%",
    },
    textarea: {
        minHeight: 100,
        borderRadius: 12,
        padding: 12,
        borderWidth: 1,
        textAlignVertical: "top",
        fontSize: 14,
    },
    sendButton: {
        paddingVertical: 12,
        paddingHorizontal: 36,
        borderRadius: 10,
        elevation: 3,
    },
});
