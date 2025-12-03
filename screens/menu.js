import React from "react";
import { View, Image, Pressable, Text } from "react-native";
import { useNavigation } from '@react-navigation/native';

export default function Menu() {
    const navigation = useNavigation();
    return (
        <View style={{ backgroundColor: 'red' }}>
            <View style={{ backgroundColor: '#E7E0EC', width: '90%', flexDirection: 'row', padding: 15, borderRadius: 20, borderColor: '#C4C4D0', borderStyle: 'solid', borderWidth: 1, marginTop: 20 }}>
                <View>
                    <Image source={require("../image/Leo.png")} style={{ width: 40, height: 40 }} resizeMode="contain" />
                </View>
                <View style={{ marginLeft: 20 }}>
                    <Text style={{ fontWeight: 700 }}>Leo Velasco Arias</Text>
                    <Pressable onPress={() => navigation.navigate("Perfil")}>
                        <Text style={{ color: "#0213AF" }}>{'Perfil > '}</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
}