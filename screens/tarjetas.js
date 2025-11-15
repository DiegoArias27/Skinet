import React from 'react';
import { View, ScrollView, Image, Pressable } from 'react-native';
import { Text } from '@/components/ui/text';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

function tarjetas() {
    const navigation = useNavigation();
    return (
        <View style={{ backgroundColor: '#042c50', width: "100%", height: '100%', padding: 20 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start', alignContent: 'space-between', marginLeft: 10, marginTop: 20 }}>
                <Pressable onPress={() => navigation.goBack()}>
                    <Icon name="close" size={28} color="white" />
                </Pressable>
                <Text style={{ textTransform: 'uppercase', color: 'white', fontSize: 28, fontWeight: 700, marginTop: 20, paddingLeft: 20, paddingRight: 50, lineHeight:32, textAlign: 'center' }}>Deposito en efectivo</Text>
            </View>


            <View style={{ backgroundColor: 'white', borderRadius: 40, padding: 20, width: "100%", marginBottom: 10, marginTop: 30 }}>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', columnGap: 4, rowGap: 2, justifyContent:'space-between' }}>
                    <Image source={require('../image/lugarpago/circlek.png')} style={{ width: 80, height: 90 }} resizeMode='contain' />
                    <Image source={require('../image/lugarpago/farmaciadelahorro.png')} style={{ width: 70, height: 90 }} resizeMode='contain' />
                    <Image source={require('../image/lugarpago/oxxo.png')} style={{ width: 60, height: 80 }} resizeMode='contain' />
                    <Image source={require('../image/lugarpago/misuperbara.png')} style={{ width: 60, height: 70 }} resizeMode='contain' />
                    <Image source={require('../image/lugarpago/Fag.png')} style={{ width: 90, height: 50 }} resizeMode='contain' />
                    <Image source={require('../image/lugarpago/extra.png')} style={{ width: 90, height: 50 }} resizeMode='contain' />
                    <Image source={require('../image/lugarpago/seveneleven.png')} style={{ width: 60, height: 40 }} resizeMode='contain' />
                </View>

                <View style={{ backgroundColor: '#E7E0EC', borderRadius: 12, padding: 15, width: '100%', marginBottom: 10, marginTop: 20, flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={require('../image/lugarpago/bbva.png')} style={{ width: 70, height: 50, resizeMode: 'contain', marginRight: 15 }} />
                    <View>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#000' }}>4152 3142 0254 3552</Text>
                        <Text style={{ fontSize: 15, color: '#000', marginTop: 4 }}>BBVA</Text>
                    </View>
                </View>

                <View style={{ backgroundColor: '#E7E0EC', borderRadius: 12, padding: 15, width: '100%', marginBottom: 10, flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={require('../image/lugarpago/santander.png')} style={{ width: 80, height: 50, resizeMode: 'contain', marginRight: 15 }} />
                    <View>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#000' }}>5579 1004 4139 3939</Text>
                        <Text style={{ fontSize: 15, color: '#000', marginTop: 4 }}>SANTANDER</Text>
                    </View>
                </View>
            </View>

            <View style={{ backgroundColor: '#062b4a', marginTop:30, borderRadius: 12, width: '100%' }}>
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16, marginBottom: 10, textAlign: 'center' }}>
                    Importante:
                </Text>
                <Text style={{ color: '#dfeffb', fontSize: 14, textAlign: 'center' }}>
                    Anotar en el ticket nombre o ID del cliente y mes de pago.{'\n'}
                    Ejemplo:{' '}
                    <Text style={{ fontWeight: 'bold', color: '#7ec8ff' }}>ID 1234 NOV</Text>
                    {'\n'}
                    Compartir una foto del ticket vía Whatsapp al{' '}
                    <Text style={{ fontWeight: 'bold', color: 'white' }}>4491537528</Text>.
                </Text>
            </View>
        </View>
    );
}

export default tarjetas;