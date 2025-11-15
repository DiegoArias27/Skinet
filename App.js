import * as React from 'react';
import { View, Image, Text, TextInput, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Divider } from '@/components/ui/divider';
import '@/global.css';
import logueado from './screens/logueado';
import login from './screens/login';
import biometrico from './screens/biometrico';
import Inicio from './screens/Inicio';
import Pagos from './screens/pagos';
import tickets from './screens/tickets';
import infoticket from './screens/infoticket';
import mapa from './screens/mapa';
import formulario from './screens/formulario';
import SplashScreen from './screens/SplashScreen';
import deposito from './screens/deposito';
import tarjetas from './screens/tarjetas';
import referencia from './screens/referencia';
import transferencia from './screens/trasferencia';
import movimiento from './screens/movimiento';
import perfil from './screens/perfil';
import prueba from './screens/prueba';
import configuracion from './screens/configuracion';
import aspectoslegales from './screens/aspectoslegales';
import ayuda from './screens/ayuda';


const Tab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <GluestackUIProvider>
        <NavigationContainer>
          
          <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='Splash'>
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="Home" component={login} />
            <Stack.Screen name="Logueado" component={logueado} />
            <Stack.Screen name="Biometrico" component={biometrico} />
            <Stack.Screen name="Principal" component={MyTabs} />
            <Stack.Screen name="Infoticket" component={infoticket} options={{ headerShown: true, title: 'Información de Ticket', headerTitleAlign: 'center', headerTitleStyle: { fontWeight: 700 } }} />
            <Stack.Screen name="Cobertura" component={mapa} options={{ headerShown: true, title: 'Consultar cobertura', headerTitleAlign: 'center', headerTitleStyle: { fontWeight: 700 } }} />
            <Stack.Screen name="Formulario" component={formulario} options={{ headerShown: true, title: 'Formulario de instalación', headerTitleAlign: 'center', headerTitleStyle: { fontWeight: 700 } }} />
            <Stack.Screen name="Tarjetas" component={tarjetas} />
            <Stack.Screen name="Deposito" component={deposito} />
            <Stack.Screen name="P" component={prueba} />
            <Stack.Screen name="Referencia" component={referencia} />
            <Stack.Screen name="Transferencia" component={transferencia} />
            <Stack.Screen name="Movimiento" component={movimiento} options={{ headerShown: true, title: 'Detalle de movimientos', headerTitleAlign: 'center', headerTitleStyle: { fontWeight: 700 } }} />
            <Stack.Screen name="Aspectos" component={aspectoslegales} options={{ headerShown: true, title: 'Aspectos legales', headerTitleAlign: 'center', headerTitleStyle: { fontWeight: 700 } }} />
            <Stack.Screen name="Ayuda" component={ayuda} options={{ headerShown: true, title: 'Preguntas frecuentes', headerTitleAlign: 'center', headerTitleStyle: { fontWeight: 700 } }} />
            <Stack.Screen name="Perfil" component={perfil} options={{ headerShown: true, title: 'Perfil', headerTitleAlign: 'center', headerTitleStyle: { fontWeight: 700 } }} />
          </Stack.Navigator>
        </NavigationContainer>
    </GluestackUIProvider>


  );
}



function PagosStack({ navigation }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="PagosScreen"
        component={Pagos}
        options={{
          title: 'Pagos',
          headerTitleAlign: 'center',
          headerTitleStyle: { fontWeight: 700 },
          headerLeft: () => (
            <Icon
              name="arrow-left"
              size={25}
              color="#1D1B20"
              onPress={() => navigation.navigate('Inicio')}
              style={{ marginLeft: 10 }}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function configuracionStack({ navigation }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ConfiguracionScreen"
        component={configuracion}
        options={{
          title: 'Menú',
          headerTitleAlign: 'center',
          headerTitleStyle: { fontWeight: 700 },
          headerLeft: () => (
            <Icon
              name="arrow-left"
              size={25}
              color="#1D1B20"
              onPress={() => navigation.navigate('Inicio')}
              style={{ marginLeft: 10 }}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function TiketsStack({ navigation }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TicketsScreen"
        component={tickets}
        options={{
          title: 'Tickets',
          headerTitleAlign: 'center',
          headerTitleStyle: { fontWeight: 700 },
          headerLeft: () => (
            <Icon
              name="arrow-left"
              size={25}
              color="#1D1B20"
              onPress={() => navigation.navigate('Inicio')}
              style={{ marginLeft: 10 }}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}



function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#F6F6F6',
          bottom: 30,
          height: 70,
          width: "90%",
          position: 'absolute',
          borderRadius: 20,
          marginLeft: "5%",
        },
        tabBarActiveTintColor: '#1E1E1E',
        tabBarInactiveTintColor: '#042c50',
        tabBarIndicatorStyle: { display: 'none' },
        tabBarLabelStyle: { fontWeight: 700, margin: -5 }
      }}
    >
      <Tab.Screen
        name="Inicio"
        component={Inicio}
        options={{
          tabBarIcon: ({ color }) => (
            <View style={{ alignItems: 'center' }}>
              <Divider
                style={{
                  width: 30,
                  marginBottom: 1,
                  backgroundColor: color,
                  height: 2
                }}
              />
              <Icon
                name="home-variant-outline"
                size={30}
                color={color}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Pagos"
        component={PagosStack}
        options={{
          tabBarIcon: ({ color }) => (
            <View style={{ alignItems: 'center' }}>
              <Divider
                style={{
                  width: 30,
                  marginBottom: 1,
                  backgroundColor: color,
                  height: 2
                }}
              />
              <Icon
                name="credit-card-outline"
                size={30}
                color={color}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Tickets"
        component={TiketsStack}
        options={{
          tabBarIcon: ({ color }) => (
            <View style={{ alignItems: 'center' }}>
              <Divider
                style={{
                  width: 30,
                  marginBottom: 1,
                  backgroundColor: color,
                  height: 2
                }}
              />
              <Icon
                name="ticket-confirmation-outline"
                size={30}
                color={color}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Menu"
        component={configuracionStack}
        options={{
          tabBarIcon: ({ color }) => (
            <View style={{ alignItems: 'center' }}>
              <Divider
                style={{
                  width: 30,
                  marginBottom: 1,
                  backgroundColor: color,
                  height: 2
                }}
              />
              <Icon
                name="menu"
                size={30}
                color={color}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}



