import React, { useState, useContext, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { ChevronDown, ChevronUp } from "lucide-react-native";
import themeContext from "@/theme/themeContext";
import { getDatabase, ref, get } from "firebase/database";
import { LanguageContext } from "@/context/LanguageContext";

// Diccionario de traducciones para textos fijos
const t = {
    ES: {
        titulo: "Aspectos legales",
        ultimaAct: "Última actualización",
    },
    ENG: {
        titulo: "Legal Aspects",
        ultimaAct: "Last updated",
    },
};

export default function AspectosLegales() {
    const theme = useContext(themeContext);
    const { language } = useContext(LanguageContext);
    const text = t[language];

    const fondo = theme.theme === "dark" ? "#1A1A1A" : "white";
    const cardBg = theme.theme === "dark" ? "#2A2A2A" : "#F6F6F6";
    const textColor = theme.color;

    const [openSections, setOpenSections] = useState([]);
    const [sections, setSections] = useState([]);
    const [lastUpdated, setLastUpdated] = useState("");

    const toggleSection = (key) => {
        setOpenSections((prev) =>
            prev.includes(key) ? prev.filter((s) => s !== key) : [...prev, key]
        );
    };

    useEffect(() => {
        const db = getDatabase();
        const legalRef = ref(db, "legal");

        get(legalRef)
            .then((snapshot) => {
                if (!snapshot.exists()) return;

                const data = snapshot.val();
                const items = data.items || {};
                const list = Object.keys(items)
                    .map((k) => items[k])
                    .sort((a, b) => (a.order ?? 999) - (b.order ?? 999));

                setSections(list);
                setLastUpdated(data._meta?.lastUpdated || "");
            })
            .catch((err) => {
                console.error("Error al cargar aspectos legales:", err);
            });
    }, []);

    return (
        <View style={{ flex: 1, backgroundColor: fondo, padding: 20 }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Título traducido */}
                <Text
                    style={{
                        fontSize: 22,
                        fontWeight: "700",
                        textAlign: "center",
                        marginBottom: 8,
                        color: textColor,
                    }}
                >
                    {text.titulo}
                </Text>

                {/* Última actualización traducida */}
                <Text
                    style={{
                        fontSize: 14,
                        textAlign: "center",
                        marginBottom: 20,
                        color: theme.theme === "dark" ? "#aaa" : "#555",
                    }}
                >
                    {lastUpdated ? `${text.ultimaAct}: ${lastUpdated}` : " "}
                </Text>

                {sections.map(({ key, title_es, title_eng, content_es, content_eng }) => {
                    const isOpen = openSections.includes(key);
                    const title = language === "ES" ? title_es : title_eng;
                    const content = language === "ES" ? content_es : content_eng;

                    return (
                        <View
                            key={key}
                            style={{
                                borderWidth: 1,
                                borderColor: theme.theme === "dark" ? "#444" : "#ccc",
                                borderRadius: 10,
                                backgroundColor: cardBg,
                                marginBottom: 12,
                            }}
                        >
                            <TouchableOpacity
                                onPress={() => toggleSection(key)}
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    paddingVertical: 12,
                                    paddingHorizontal: 16,
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 16,
                                        fontWeight: isOpen ? "400" : "700",
                                        color: textColor,
                                    }}
                                >
                                    {title}
                                </Text>
                                {isOpen ? (
                                    <ChevronUp size={20} color={textColor} />
                                ) : (
                                    <ChevronDown size={20} color={textColor} />
                                )}
                            </TouchableOpacity>

                            {isOpen && (
                                <View style={{ paddingHorizontal: 16, paddingBottom: 12 }}>
                                    <Text
                                        style={{
                                            fontSize: 14,
                                            color: theme.theme === "dark" ? "#ccc" : "#333",
                                            lineHeight: 20,
                                        }}
                                    >
                                        {content}
                                    </Text>
                                </View>
                            )}
                        </View>
                    );
                })}
            </ScrollView>
        </View>
    );
}
