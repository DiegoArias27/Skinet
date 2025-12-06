import React, { useState, useEffect, useRef } from 'react';
import { View, Image, TextInput, StyleSheet, Modal, Text, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { Radio, RadioGroup, RadioIcon, RadioIndicator, RadioLabel } from '@/components/ui/radio';
import { CircleIcon } from '@/components/ui/icon';
import { useNavigation } from '@react-navigation/native';
import { GoogleMaps, useLocationPermissions } from "expo-maps";
import * as Location from "expo-location";
import { isPointInPolygon as isInPolygon } from 'geolib';

export default function Mapa() {
  const coverageZones = [
    [
      { latitude: 21.91727, longitude: -102.29668 },
      { latitude: 21.91709, longitude: -102.30058 },
      { latitude: 21.91656, longitude: -102.30444 },
      { latitude: 21.91568, longitude: -102.30822 },
      { latitude: 21.91446, longitude: -102.31189 },
      { latitude: 21.91291, longitude: -102.31541 },
      { latitude: 21.91105, longitude: -102.31876 },
      { latitude: 21.90890, longitude: -102.32189 },
      { latitude: 21.90647, longitude: -102.32477 },
      { latitude: 21.90379, longitude: -102.32739 },
      { latitude: 21.90088, longitude: -102.32971 },
      { latitude: 21.89778, longitude: -102.33172 },
      { latitude: 21.89451, longitude: -102.33338 },
      { latitude: 21.89111, longitude: -102.33470 },
      { latitude: 21.88760, longitude: -102.33564 },
      { latitude: 21.88402, longitude: -102.33621 },
      { latitude: 21.88041, longitude: -102.33640 },
      { latitude: 21.87679, longitude: -102.33621 },
      { latitude: 21.87322, longitude: -102.33564 },
      { latitude: 21.86971, longitude: -102.33469 },
      { latitude: 21.86630, longitude: -102.33338 },
      { latitude: 21.86303, longitude: -102.33171 },
      { latitude: 21.85993, longitude: -102.32970 },
      { latitude: 21.85703, longitude: -102.32738 },
      { latitude: 21.85435, longitude: -102.32476 },
      { latitude: 21.85192, longitude: -102.32188 },
      { latitude: 21.84976, longitude: -102.31875 },
      { latitude: 21.84790, longitude: -102.31540 },
      { latitude: 21.84636, longitude: -102.31188 },
      { latitude: 21.84514, longitude: -102.30821 },
      { latitude: 21.84426, longitude: -102.30443 },
      { latitude: 21.84373, longitude: -102.30058 },
      { latitude: 21.84355, longitude: -102.29668 },
      { latitude: 21.84373, longitude: -102.29279 },
      { latitude: 21.84426, longitude: -102.28894 },
      { latitude: 21.84514, longitude: -102.28516 },
      { latitude: 21.84636, longitude: -102.28149 },
      { latitude: 21.84790, longitude: -102.27797 },
      { latitude: 21.84976, longitude: -102.27462 },
      { latitude: 21.85192, longitude: -102.27149 },
      { latitude: 21.85435, longitude: -102.26860 },
      { latitude: 21.85703, longitude: -102.26599 },
      { latitude: 21.85993, longitude: -102.26366 },
      { latitude: 21.86303, longitude: -102.26166 },
      { latitude: 21.86630, longitude: -102.25999 },
      { latitude: 21.86971, longitude: -102.25868 },
      { latitude: 21.87322, longitude: -102.25773 },
      { latitude: 21.87679, longitude: -102.25716 },
      { latitude: 21.88041, longitude: -102.25697 },
      { latitude: 21.88402, longitude: -102.25716 },
      { latitude: 21.88760, longitude: -102.25773 },
      { latitude: 21.89111, longitude: -102.25867 },
      { latitude: 21.89451, longitude: -102.25999 },
      { latitude: 21.89778, longitude: -102.26165 },
      { latitude: 21.90088, longitude: -102.26366 },
      { latitude: 21.90379, longitude: -102.26598 },
      { latitude: 21.90647, longitude: -102.26859 },
      { latitude: 21.90890, longitude: -102.27148 },
      { latitude: 21.91105, longitude: -102.27461 },
      { latitude: 21.91291, longitude: -102.27796 },
      { latitude: 21.91446, longitude: -102.28148 },
      { latitude: 21.91568, longitude: -102.28515 },
      { latitude: 21.91656, longitude: -102.28893 },
      { latitude: 21.91709, longitude: -102.29279 },
      { latitude: 21.91727, longitude: -102.29668 },
    ],
  ];


  const noCoverageZones = [
    [
      { latitude: 21.89, longitude: -102.297 },
      { latitude: 21.888, longitude: -102.302 },
      { latitude: 21.885, longitude: -102.300 },
      { latitude: 21.886, longitude: -102.295 },
      { latitude: 21.89, longitude: -102.297 },
    ],
    [
      { latitude: 21.87, longitude: -102.31 },
      { latitude: 21.868, longitude: -102.315 },
      { latitude: 21.865, longitude: -102.312 },
      { latitude: 21.866, longitude: -102.307 },
      { latitude: 21.87, longitude: -102.31 },
    ],
    [
      { latitude: 21.88, longitude: -102.28 },
      { latitude: 21.877, longitude: -102.285 },
      { latitude: 21.874, longitude: -102.283 },
      { latitude: 21.875, longitude: -102.278 },
      { latitude: 21.88, longitude: -102.28 },
    ],
    [
      { latitude: 21.895, longitude: -102.305 },
      { latitude: 21.893, longitude: -102.308 },
      { latitude: 21.89, longitude: -102.306 },
      { latitude: 21.892, longitude: -102.303 },
      { latitude: 21.895, longitude: -102.305 },
    ],
  ];

  const createPolygons = (zones, fillColor, strokeColor) =>
    zones.map(coords => ({
      coordinates: coords,
      color: fillColor,
      lineColor: strokeColor,
      lineWidth: 2,
    }));



  const checkCoverage = (location) => {
  const point = { latitude: location.latitude, longitude: location.longitude };

  for (let zone of noCoverageZones) {
    if (isInPolygon(point, zone)) {
      setSinCobertura(true);
      setCobertura(false);
      return;
    }
  }


  for (let zone of coverageZones) {
    if (isInPolygon(point, zone)) {
      setCobertura(true);
      setSinCobertura(false);
      return;
    }
  }

  setCobertura(false);
  setSinCobertura(true);
};

  const navigation = useNavigation();
  const [text, setText] = useState('');
  const [markers, setMarkers] = useState([]);
  const [predictions, setPredictions] = useState([]);
  const [cobertura, setCobertura] = React.useState(false);
  const [sinCobertura, setSinCobertura] = React.useState(false);
  const [values, setValues] = React.useState('LITE');
  const [status, requestPermission] = useLocationPermissions();
  const [userLocation, setUserLocation] = useState(null);
  const [cameraPosition, setCameraPosition] = useState({
    coordinates: { latitude: 21.8853, longitude: -102.2916 },
    zoom: 12.5,
  });
  const mapRef = useRef(null);
  const GOOGLE_API_KEY = 'AIzaSyDVHsQ2hng_GbX6HVF5w1E_W_iaIX68VzI';

  useEffect(() => {
    if (!status || status.status !== 'granted') {
      requestPermission();
    }
  }, [status]);

  const goToUserLocation = async () => {
    try {
      const location = await Location.getCurrentPositionAsync({});
      const ubic = {
        coordinates: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        }
      };
      if (location) {
        setCameraPosition({
          coordinates: {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          },
          zoom: 15,
        });
      }
      

      setTimeout(() => {
        checkCoverage(ubic.coordinates);
      }, 500);

    } catch (error) {
      console.log("Error al obtener ubicación:", error);
    }
  };

  // Buscar sugerencias de lugares
  const fetchPlaces = async (input) => {
    if (!input) {
      setPredictions([]);
      return;
    }

    try {
      const AGUASCALIENTES_COORDS = { lat: 21.8853, lng: -102.2916 };
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
          input
        )}}&key=${GOOGLE_API_KEY}&language=es&location=${AGUASCALIENTES_COORDS.lat},${AGUASCALIENTES_COORDS.lng}&radius=30000`
      );
      const data = await response.json();
      if (data.predictions) {
        setPredictions(data.predictions);
      }
    } catch (error) {
      console.log('Error fetchPlaces:', error);
    }
  };

  // Seleccionar un lugar de la lista
  const selectPlace = async (placeId) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${GOOGLE_API_KEY}`
      );
      const data = await response.json();
      const location = data.result.geometry.location;

      const newMarker = {
        coordinates: {
          latitude: location.lat,
          longitude: location.lng,
        },
        title: data.result.name,
      };



      setMarkers([newMarker]);
      setCameraPosition({ coordinates: newMarker.coordinates, zoom: 15 });
      setTimeout(() => {
        checkCoverage(newMarker.coordinates);
      }, 500);
      setText(data.result.name);
      setPredictions([]);
      
    } catch (error) {
      console.log('Error selectPlace:', error);
    }
  };


  return (
    <View style={{ flex: 1, backgroundColor: 'red' }}>
      <SafeAreaProvider>
        <GoogleMaps.View
          ref={mapRef}
          style={{ flex: 1, zIndex: 100 }}
          cameraPosition={cameraPosition}
          properties={{
            isMyLocationEnabled: true,
            selectionEnabled: true,
            indoorLevelPickerEnabled: true

          }}

          uiSettings={{
            myLocationButtonEnabled: false,
            togglePitchEnabled: true,
            mapToolbarEnabled: true,
            compassEnabled: true,
            indoorLevelPickerEnabled: true,
            zoomControlsEnabled: false,
          }}

          userLocation={{
            followUserLocation: true
          }}

          markers={markers}

          polygons={[
            ...createPolygons(coverageZones, 'rgba(0, 242, 0, 0.3)', 'green'),
            ...createPolygons(noCoverageZones, 'rgba(255,0,0,0.4)', 'red'),
          ]}
          
        />

        <SafeAreaView style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 999 }}>
          <View style={{ marginTop: 50 }}>

            <Icon name="magnify" size={25} color="#000" style={{ position: 'absolute', left: 20, zIndex: 2, top: 20 }} />

            <TouchableOpacity
              onPress={() => setText('')}
              style={{ position: 'absolute', right: 20, zIndex: 2, top: 20 }}
            >
              <Icon name="close" size={25} color="#000" />
            </TouchableOpacity>


            <TextInput
              style={[styles.input, { paddingLeft: 60, paddingRight: 45 }]}
              onChangeText={(val) => {
                setText(val);
                fetchPlaces(val);
              }}
              value={text}
              placeholder="Buscar o escribir dirección"
              onPress={() => setCobertura(false)}
              onChange={() => setSinCobertura(false)}
            />
            {predictions.length > 0 && (
              <FlatList
                style={{
                  backgroundColor: '#fff',
                  marginTop: 2,
                  borderRadius: 8,
                  maxHeight: 200,
                }}
                data={predictions}
                keyExtractor={(item) => item.place_id}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={{
                      padding: 10,
                      borderBottomColor: '#ddd',
                      borderBottomWidth: 1,
                    }}
                    onPress={() => selectPlace(item.place_id)}
                  >
                    <Text>{item.description}</Text>
                  </TouchableOpacity>
                )}
              />
            )}
          </View>
        </SafeAreaView>
        <View style={{ position: 'relative', top: 0, left: 0, right: 0, bottom: 0, zIndex: 101 }}>
          <TouchableOpacity
            onPress={goToUserLocation}
            style={{
              position: 'absolute',
              bottom: 70,
              right: 20,
              backgroundColor: '#439AB7',
              padding: 12,
              borderRadius: 30,
            }}
          >
            <Icon name="crosshairs-gps" size={25} color="white" />
          </TouchableOpacity>
        </View>
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
                onPress={() => navigation.navigate('Formulario', { paquete: values })}
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
