import React, { useState } from 'react';
import { View, Image, TextInput, StyleSheet, Modal, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { Radio, RadioGroup, RadioIcon, RadioIndicator, RadioLabel } from '@/components/ui/radio';
import { CircleIcon } from '@/components/ui/icon';
import { useNavigation } from '@react-navigation/native';
import { WebView } from 'react-native-webview';

export default function mapa() {
  const navigation = useNavigation();
  const [text, onChangeText] = React.useState("");
  const [cobertura, setCobertura] = React.useState(false);
  const [sinCobertura, setSinCobertura] = React.useState(false);
  const [values, setValues] = React.useState('LITE');
  return (
    <View style={{ flex: 1, backgroundColor: 'red' }}>
      <SafeAreaProvider>
        <WebView
          originWhitelist={['*']}
          source={{
            uri: "https://www.google.com/maps/d/u/0/edit?mid=1DAkFMTJ48gqy3Q4lODU2p-DDG4XrCJw&usp=sharing",
          }}
          style={{flex:1, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, height:"110%" }}
        />
        <SafeAreaView style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 999 }}>
          <View style={{marginTop:50}}>

            <Icon name="magnify" size={25} color="#000" style={{ position: 'absolute', left: 20, zIndex: 2, top:20 }} />

            <TouchableOpacity
              onPress={() => onChangeText('')}
              style={{ position: 'absolute', right: 20, zIndex: 2, top:20 }}
            >
              <Icon name="close" size={25} color="#000" />
            </TouchableOpacity>


            <TextInput
              style={[styles.input, { paddingLeft: 60, paddingRight: 45 }]}
              onChangeText={onChangeText}
              value={text}
              placeholder="Buscar o escribir dirección"
              onPress={() => setCobertura(true)}
              onChange={() => setSinCobertura(true)}
            />
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
      <Modal
        visible={cobertura}
        transparent={true}
        animationType="fade"
      >
        <View style={styles.oscuro}>
          <View style={{ backgroundColor: "#042c50", width: "85%", height: "auto", paddingTop: 20, paddingBottom: 40, borderRadius: 30 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginLeft: 30, marginRight: 50 }}>
              <View style={{ marginTop: 5 }}>
                <TouchableOpacity
                  onPress={() => setCobertura(false)}
                >
                  <Icon name="close" size={35} color="white" />
                </TouchableOpacity>
              </View>
              <View>
                <Text style={{ fontSize: 20, marginBottom: 20, color: 'white', fontWeight: 700, textAlign: 'center' }}>
                  SI CONTAMOS CON COBERTURA EN TU ZONA!!
                </Text>
              </View>

            </View>
            <View style={{ marginLeft: 30 }}>
              <Text style={{ color: 'white', fontSize: 14, fontWeight: 700, marginBottom: 20 }}>Selecciona tu plan:</Text>
            </View>
            <RadioGroup value={values} onChange={setValues}>
              <VStack style={{ alignItems: 'center' }}>
                <HStack style={{ marginBottom: 20 }}>
                  <Radio value="LITE">
                    <View style={{ backgroundColor: '#F6F6F6', padding: 20, borderRadius: 20, alignItems: 'center', marginRight: 20 }}>
                      <View style={{ flexDirection: 'row', position: 'relative', width: "100%" }}>
                        <View style={{ left: 0, position: 'absolute' }}>
                          <RadioIndicator>
                            <RadioIcon as={CircleIcon} />
                          </RadioIndicator>
                        </View>
                        <Text style={{ color: '#0F91AC', fontWeight: 700, fontSize: 14, marginBottom: 10, left: 30 }}>LITE</Text>
                      </View>
                      <Text style={{ fontWeight: 700 }}>1 a 3</Text>
                      <Text style={{ marginBottom: 10, fontWeight: 700 }}>dispositivos</Text>
                      <Text style={{ marginBottom: 10, fontSize: 20, fontWeight: 900 }}>$350/mes</Text>
                      <Text style={{ fontWeight: 700 }}>60Mbps</Text>
                    </View>
                  </Radio>
                  <Radio value="BASIC">
                    <View style={{ backgroundColor: '#F6F6F6', padding: 20, borderRadius: 20, alignItems: 'center' }}>
                      <View style={{ flexDirection: 'row', position: 'relative', width: "100%" }}>
                        <View style={{ left: 0, position: 'absolute' }}>
                          <RadioIndicator>
                            <RadioIcon as={CircleIcon} />
                          </RadioIndicator>
                        </View>
                        <Text style={{ color: '#0F91AC', fontWeight: 700, fontSize: 14, marginBottom: 10, left: 30 }}>BASIC</Text>
                      </View>
                      <Text style={{ fontWeight: 700 }}>3 a 5</Text>
                      <Text style={{ marginBottom: 10, fontWeight: 700 }}>dispositivos</Text>
                      <Text style={{ marginBottom: 10, fontSize: 20, fontWeight: 900 }}>$400/mes</Text>
                      <Text style={{ fontWeight: 700 }}>100Mbps</Text>
                    </View>
                  </Radio>
                </HStack>
                <HStack>
                  <Radio value="PRO">
                    <View style={{ backgroundColor: '#F6F6F6', padding: 20, borderRadius: 20, alignItems: 'center', marginRight: 20 }}>
                      <View style={{ flexDirection: 'row', position: 'relative', width: "100%" }}>
                        <View style={{ left: 0, position: 'absolute' }}>
                          <RadioIndicator>
                            <RadioIcon as={CircleIcon} />
                          </RadioIndicator>
                        </View>
                        <Text style={{ color: '#0F91AC', fontWeight: 700, fontSize: 14, marginBottom: 10, left: 30 }}>PRO</Text>
                      </View>
                      <Text style={{ fontWeight: 700 }}>5 a 7</Text>
                      <Text style={{ marginBottom: 10, fontWeight: 700 }}>dispositivos</Text>
                      <Text style={{ marginBottom: 10, fontSize: 20, fontWeight: 900 }}>$450/mes</Text>
                      <Text style={{ fontWeight: 700 }}>150Mbps</Text>
                    </View>
                  </Radio>
                  <Radio value="ULTRA">
                    <View style={{ backgroundColor: '#F6F6F6', padding: 20, borderRadius: 20, alignItems: 'center' }}>
                      <View style={{ flexDirection: 'row', position: 'relative', width: "100%" }}>
                        <View style={{ left: 0, position: 'absolute' }}>
                          <RadioIndicator>
                            <RadioIcon as={CircleIcon} />
                          </RadioIndicator>
                        </View>
                        <Text style={{ color: '#0F91AC', fontWeight: 700, fontSize: 14, marginBottom: 10, left: 30 }}>ULTRA</Text>
                      </View>
                      <Text style={{ fontWeight: 700 }}>7 a 10</Text>
                      <Text style={{ marginBottom: 10, fontWeight: 700 }}>dispositivos</Text>
                      <Text style={{ marginBottom: 10, fontSize: 20, fontWeight: 900 }}>$550/mes</Text>
                      <Text style={{ fontWeight: 700 }}>300Mbps</Text>
                    </View>
                  </Radio>
                </HStack>
              </VStack>
            </RadioGroup>
            <View style={{ alignItems: 'center', marginTop: 30 }}>
              <TouchableOpacity
                onPress={() => navigation.navigate('Formulario')}
                style={{ backgroundColor: '#439AB7', paddingLeft: 40, paddingRight: 40, paddingTop: 10, paddingBottom: 10, borderRadius: 12 }}
              >
                <Text style={{ textAlign: 'center', color: 'white', fontWeight: 700, fontSize: 16 }}>Agendar Instalación</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>


      <Modal
        visible={sinCobertura}
        transparent={true}
        animationType="fade"
      >
        <View style={styles.oscuro}>
          <View style={{ backgroundColor: "#042c50", width: "85%", height: "auto", paddingTop: 20, paddingBottom: 40, borderRadius: 30 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginLeft: 30, marginRight: 50 }}>
              <View style={{ marginTop: 5 }}>
                <TouchableOpacity
                  onPress={() => setSinCobertura(false)}
                >
                  <Icon name="close" size={35} color="white" />
                </TouchableOpacity>
              </View>
              <View>
                <Text style={{ fontSize: 20, marginBottom: 20, color: 'white', fontWeight: 700, textAlign: 'center' }}>
                  NO CONTAMOS CON COBERTURA EN TU ZONA!!
                </Text>
              </View>

            </View>
            <View style={{ marginLeft: 20, marginRight: 20, alignItems: 'center' }}>
              <Text style={{ color: 'white', fontSize: 16, fontWeight: 700, textAlign: 'justify' }}>Muchas gracias por considerar nuestro servicio. Revisando en sistema, lamentablemente por el momento aún no contamos con cobertura en su zona 📍.</Text>
              <Text style={{ color: 'white', fontSize: 16, fontWeight: 700, marginBottom: 10, textAlign: 'justify' }}>Estamos en constante crecimiento 🚀 y trabajamos para ampliar nuestra red a más colonias y municipios, por lo que esperamos poder llegar muy pronto a su domicilio 🙌.</Text>
              <Text style={{ color: 'white', fontSize: 16, fontWeight: 700, marginBottom: 20, textAlign: 'justify' }}>Agradecemos mucho su interés y confianza en nosotros, y ojalá pronto podamos brindarle el servicio que merece ✨.</Text>
              <Image source={require("../image/skinet.png")} style={{ width: "95%", height: 80, backgroundColor: 'white', borderRadius: 20 }} />
            </View>

          </View>
        </View>
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    backgroundColor: '#F6F6F6',
    borderRadius: 20,
    padding: 10,
  },

  oscuro: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: 'center',
    alignItems: 'center',
    width: "100%"
  }
});
