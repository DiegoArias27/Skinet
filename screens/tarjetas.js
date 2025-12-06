import React, { useContext } from 'react';
import { View, ScrollView, Image, Pressable } from 'react-native';
import { Text } from '@/components/ui/text';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import themeContext from "@/theme/themeContext";

function tarjetas() {
    const navigation = useNavigation();
    const theme = useContext(themeContext);

    const fondo = theme.theme === "dark" ? "#1A1A1A" : "#042c50";
    const listBg = theme.theme === "dark" ? "#1E1E1E" : theme.morado;
    const cardBg = theme.theme === "dark" ? "#1A1A1A" : "#F6F6F6";

    return (
        <View style={{ backgroundColor: fondo , width: "100%", height: '100%', padding: 20 }}>

            {/* HEADER */}
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
                <Pressable onPress={() => navigation.goBack()}>
                    <Icon name="close" size={28} color={"white"} />
                </Pressable>

                <Text style={{
                    textTransform: 'uppercase',
                    color: "white",
                    fontSize: 22,
                    fontWeight: 700,
                    textAlign: 'center',
                    marginRight: 20,
                    flex: 1
                }}>
                    Tarjetas en {"\n"}efectivo
                </Text>
            </View>

            {/* TARJETA PRINCIPAL */}
            <View style={{
                backgroundColor: cardBg,
                borderRadius: 20,
                padding: 20,
                width: "100%",
                marginTop: 30,
                borderWidth: 1,
                borderColor: theme.theme === "dark" ? "#333" : "#C4C4D0",
            }}>

                {/* ICONOS */}
                <View style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    columnGap: 10,
                    rowGap: 15
                }}>
                    <Image source={require('../image/lugarpago/circlek.png')} style={{ width: 80, height: 90 }} resizeMode='contain' />
                    <Image source={require('../image/lugarpago/farmaciadelahorro.png')} style={{ width: 70, height: 90 }} resizeMode='contain' />
                    <Image source={require('../image/lugarpago/oxxo.png')} style={{ width: 60, height: 80 }} resizeMode='contain' />
                    <Image source={require('../image/lugarpago/misuperbara.png')} style={{ width: 60, height: 70 }} resizeMode='contain' />
                    <Image source={require('../image/lugarpago/Fag.png')} style={{ width: 90, height: 50 }} resizeMode='contain' />
                    <Image source={require('../image/lugarpago/extra.png')} style={{ width: 90, height: 50 }} resizeMode='contain' />
                    <Image source={require('../image/lugarpago/seveneleven.png')} style={{ width: 60, height: 40 }} resizeMode='contain' />
                </View>

                {/* TARJETA - BBVA */}
                <View style={{
                    backgroundColor: listBg,
                    borderRadius: 15,
                    padding: 15,
                    width: '100%',
                    marginBottom: 10,
                    marginTop: 20,
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderWidth: 1,
                    borderColor: theme.theme === "dark" ? "#333" : "#DDD"
                }}>
                    <Image source={require('../image/lugarpago/bbva.png')} style={{ width: 70, height: 50, resizeMode: 'contain', marginRight: 15 }} />
                    <View>
                        <Text style={{ fontSize: 18, fontWeight: 700, color: theme.color }}>4152 3142 0254 3552</Text>
                        <Text style={{ fontSize: 15, color: theme.color, marginTop: 4 }}>BBVA</Text>
                    </View>
                </View>

                {/* TARJETA - SANTANDER */}
                <View style={{
                    backgroundColor: listBg,
                    borderRadius: 15,
                    padding: 15,
                    width: '100%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderWidth: 1,
                    borderColor: theme.theme === "dark" ? "#333" : "#DDD"
                }}>
                    <Image source={require('../image/lugarpago/santander.png')} style={{ width: 80, height: 50, resizeMode: 'contain', marginRight: 15 }} />
                    <View>
                        <Text style={{ fontSize: 18, fontWeight: 700, color: theme.color }}>5579 1004 4139 3939</Text>
                        <Text style={{ fontSize: 15, color: theme.color, marginTop: 4 }}>SANTANDER</Text>
                    </View>
                </View>

            </View>

            {/* IMPORTANTE */}
            <View style={{
                backgroundColor: theme.theme === "dark" ? "#1E1E1E" : theme.azul,
                marginTop: 30,
                borderRadius: 20,
                width: '100%',
                padding: 20
            }}>
                <Text style={{
                    color: "white",
                    fontWeight: 700,
                    fontSize: 18,
                    marginBottom: 10,
                    textAlign: 'center'
                }}>
                    Importante:
                </Text>

                <Text style={{
                    color: "white",
                    fontSize: 15,
                    textAlign: 'center'
                }}>
                    Anotar en el ticket nombre o ID del cliente y mes de pago.{"\n"}
                    Ejemplo: <Text style={{ fontWeight: 700, color:"white" }}>ID 1234 NOV</Text>{"\n"}
                    Compartir una foto del ticket vía Whatsapp al{" "}
                    <Text style={{ fontWeight: 700, color:'white' }}>4491537528</Text>.
                </Text>
            </View>

        </View>
    );
}

export default tarjetas;
