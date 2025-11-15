import React, { useEffect, useState } from "react";
import { View, Image, ActivityIndicator } from "react-native";

export default function SplashScreen({ navigation }) {
  const [showSpinner, setShowSpinner] = useState(false);

  useEffect(() => {
    // Después de 1 segundo, mostrar el spinner
    const spinnerTimeout = setTimeout(() => {
      setShowSpinner(true);
    }, 1000);

    // Después de 3 segundos (1 + 2), ir a la pantalla principal
    const navigationTimeout = setTimeout(() => {
      navigation.replace("Home");
    }, 3000);

    // Limpiar timeouts al desmontar
    return () => {
      clearTimeout(spinnerTimeout);
      clearTimeout(navigationTimeout);
    };
  }, []);

  return (
    <View style={{
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#FFFFFF"
    }}>
      <Image
        source={require("../assets/skinet.png")}
        style={{ width: 350, height: 250, marginBottom: 10 }}
        resizeMode="contain"
      />

      {/* Mostrar spinner solo después de 1 segundo */}
      {showSpinner && <ActivityIndicator size="large" color="#042c50" />}
    </View>
  );
}
