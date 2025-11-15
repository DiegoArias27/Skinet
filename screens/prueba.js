import React from "react";
import { View, Text, Pressable, StyleSheet, ScrollView } from "react-native";
import { Feather } from "@expo/vector-icons"; // Íconos de https://icons.expo.fyi

export default function prueba({ navigation }) {
  const items = [
    { label: "Términos y condiciones", icon: "file-text" },
    { label: "Políticas de privacidad", icon: "lock" },
    { label: "Aviso legal", icon: "alert-circle" },
    { label: "Derechos del cliente", icon: "check-circle" },
  ];

  return (
    <ScrollView style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => navigation?.goBack?.()}>
          <Feather name="chevron-left" size={28} color="#000" />
        </Pressable>

        <Text style={styles.headerTitle}>Aspectos legales</Text>

        {/* Placeholder para centrar el título */}
        <View style={{ width: 40 }} />
      </View>

      {/* LISTA */}
      <View style={styles.listWrapper}>
        {items.map((item, index) => (
          <Pressable
            key={index}
            style={({ pressed }) => [
              styles.card,
              pressed && styles.cardPressed,
            ]}
          >
            <View style={styles.cardLeft}>
              <Feather name={item.icon} size={22} color="#333" />
              <Text style={styles.cardText}>{item.label}</Text>
            </View>

            <Feather name="chevron-right" size={24} color="#555" />
          </Pressable>
        ))}
      </View>

      {/* FOOTER */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Última actualización 20/06/2025</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  // HEADER
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },

  backButton: {
    width: 40,
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
  },

  // LISTA
  listWrapper: {
    marginTop: 10,
    paddingHorizontal: 20,
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#E8E8E8",
    paddingVertical: 16,
    paddingHorizontal: 18,
    borderRadius: 14,
    marginBottom: 14,
  },

  cardPressed: {
    opacity: 0.85,
  },

  cardLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  cardText: {
    marginLeft: 12,
    fontSize: 16,
    fontWeight: "500",
    color: "#222",
  },

  // FOOTER
  footer: {
    marginTop: 60,
    marginBottom: 40,
    alignItems: "center",
  },

  footerText: {
    fontSize: 13,
    color: "#777",
  },
});