import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import { View } from 'react-native';
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Divider } from '@/components/ui/divider';
import '@/global.css';
import { LanguageProvider, LanguageContext } from "@/context/LanguageContext";
import { UserProvider } from "@/context/UserContext";
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
import { EventRegister } from 'react-native-event-listeners';
import theme from './theme/theme';
import themeContext from './theme/themeContext';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const t = {
  ES: {
    inicio: "Inicio",
    pagos: "Pagos",
    tickets: "Tickets",
    menu: "Menú",
    infoTicket: "Información de Ticket",
    cobertura: "Consultar cobertura",
    formulario: "Formulario de instalación",
    movimiento: "Detalle de movimientos",
    aspectos: "Aspectos legales",
    ayuda: "Preguntas frecuentes",
    perfil: "Perfil",
  },
  ENG: {
    inicio: "Home",
    pagos: "Payments",
    tickets: "Tickets",
    menu: "Menu",
    infoTicket: "Ticket Information",
    cobertura: "Check Coverage",
    formulario: "Installation Form",
    movimiento: "Transaction Details",
    aspectos: "Legal Aspects",
    ayuda: "FAQ",
    perfil: "Profile",
  },
};

/* ------------------------------------------
   COMPONENTE QUE EVITA VIOLAR REGLAS DE HOOKS
---------------------------------------------*/
function ScreenWithTitle({ titleKey, children }) {
  const { language } = useContext(LanguageContext);
  return {
    headerShown: true,
    title: t[language][titleKey],
    headerTitleAlign: 'center',
    headerTitleStyle: { fontWeight: "700" }
  };
}

export default function App() {
  const [darkmode, setDark] = useState(false);

  useEffect(() => {
    const listener = EventRegister.addEventListener('changeTheme', (data) => {
      setDark(data);
    });
    return () => {
      EventRegister.removeEventListener(listener);
    };
  }, []);

  return (
    <UserProvider>
      <LanguageProvider>
        <GluestackUIProvider>
          <themeContext.Provider value={darkmode ? theme.dark : theme.light}>
            <NavigationContainer theme={darkmode ? DarkTheme : DefaultTheme}>
              <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='Splash'>
                <Stack.Screen name="Splash" component={SplashScreen} />
                <Stack.Screen name="Home" component={login} />
                <Stack.Screen name="Logueado" component={logueado} />
                <Stack.Screen name="Biometrico" component={biometrico} />
                <Stack.Screen name="Principal" component={MyTabs} />

                {/* Pantallas con títulos traducidos usando wrapper */}
                <Stack.Screen
                  name="Infoticket"
                  component={infoticket}
                  options={() => {
                    const { language } = useContext(LanguageContext);
                    return {
                      headerShown: true,
                      title: t[language].infoTicket,
                      headerTitleAlign: 'center',
                      headerTitleStyle: { fontWeight: "700" }
                    };
                  }}

                />

                <Stack.Screen
                  name="Cobertura"
                  component={mapa}
                  options={() => ScreenWithTitle({ titleKey: "cobertura" })}
                />

                <Stack.Screen
                  name="Formulario"
                  component={formulario}
                  options={() => ScreenWithTitle({ titleKey: "formulario" })}
                />

                <Stack.Screen name="Tarjetas" component={tarjetas} />
                <Stack.Screen name="Deposito" component={deposito} />
                <Stack.Screen name="P" component={prueba} />

                <Stack.Screen name="Referencia" component={referencia} />
                <Stack.Screen name="Transferencia" component={transferencia} />

                <Stack.Screen
                  name="Movimiento"
                  component={movimiento}
                  options={() => ScreenWithTitle({ titleKey: "movimiento" })}
                />

                <Stack.Screen
                  name="Aspectos"
                  component={aspectoslegales}
                  options={() => ScreenWithTitle({ titleKey: "aspectos" })}
                />

                <Stack.Screen
                  name="Ayuda"
                  component={ayuda}
                  options={() => ScreenWithTitle({ titleKey: "ayuda" })}
                />

                <Stack.Screen
                  name="Perfil"
                  component={perfil}
                  options={() => ScreenWithTitle({ titleKey: "perfil" })}
                />
              </Stack.Navigator>
            </NavigationContainer>
          </themeContext.Provider>
        </GluestackUIProvider>
      </LanguageProvider>
    </UserProvider>
  );
}

/* ------------------
   STACKS
-------------------*/

function PagosStack({ navigation }) {
  const themeApp = useContext(themeContext);
  const { language } = useContext(LanguageContext);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="PagosScreen"
        component={Pagos}
        options={{
          title: t[language].pagos,
          headerTitleAlign: 'center',
          headerTitleStyle: { fontWeight: "700" },
          headerLeft: () => (
            <Icon
              name="arrow-left"
              size={25}
              color={themeApp.theme === "dark" ? "white" : '#1D1B20'}
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
  const themeApp = useContext(themeContext);
  const { language } = useContext(LanguageContext);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ConfiguracionScreen"
        component={configuracion}
        options={{
          title: t[language].menu,
          headerTitleAlign: 'center',
          headerTitleStyle: { fontWeight: "700" },
          headerLeft: () => (
            <Icon name="arrow-left" size={25}
              color={themeApp.theme === "dark" ? "white" : '#1D1B20'}
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
  const themeApp = useContext(themeContext);
  const { language } = useContext(LanguageContext);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TicketsScreen"
        component={tickets}
        options={{
          title: t[language].tickets,
          headerTitleAlign: 'center',
          headerTitleStyle: { fontWeight: "700" },
          headerLeft: () => (
            <Icon name="arrow-left" size={25}
              color={themeApp.theme === "dark" ? "white" : '#1D1B20'}
              onPress={() => navigation.navigate('Inicio')}
              style={{ marginLeft: 10 }}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

/* ------------------
   TABS
-------------------*/

function MyTabs() {
  const themeApp = useContext(themeContext);
  const { language } = useContext(LanguageContext);

  const activeColor = themeApp.theme === "dark" ? "#fff" : "#002E5D";
  const inactiveColor = themeApp.theme === "dark" ? "#888" : "#999";

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarStyle: {
          backgroundColor: themeApp.theme === "dark"
            ? theme.dark.fuerte
            : theme.light.blanco,
          height: 70,
          position: "absolute",
          bottom: 30,
          width: "90%",
          marginLeft: "5%",
          borderRadius: 20,
        },
        tabBarLabelStyle: {
          fontWeight: "700",
          fontSize: 14,
          marginTop: 10,
        },
      })}
    >

      <Tab.Screen
        name="Inicio"
        component={Inicio}
        options={{
          tabBarLabel: t[language].inicio,
          tabBarIcon: ({ focused }) => {
            const color = focused ? activeColor : inactiveColor;
            return (
              <View style={{ alignItems: "center", paddingTop: 6 }}>
                <Divider
                  style={{
                    width: 30,
                    marginBottom: 2,
                    marginTop: 6,
                    backgroundColor: color,
                    height: 2,
                  }}
                />
                <Icon name="home-variant-outline" size={28} color={color} />
              </View>
            );
          },
        }}
      />

      <Tab.Screen
        name="Pagos"
        component={PagosStack}
        options={{
          tabBarLabel: t[language].pagos,
          tabBarIcon: ({ focused }) => {
            const color = focused ? activeColor : inactiveColor;
            return (
              <View style={{ alignItems: "center", paddingTop: 6 }}>
                <Divider
                  style={{
                    width: 30,
                    marginBottom: 2,
                    marginTop: 6,
                    backgroundColor: color,
                    height: 2,
                  }}
                />
                <Icon name="credit-card-outline" size={28} color={color} />
              </View>
            );
          },
        }}
      />

      <Tab.Screen
        name="Tickets"
        component={TiketsStack}
        options={{
          tabBarLabel: t[language].tickets,
          tabBarIcon: ({ focused }) => {
            const color = focused ? activeColor : inactiveColor;
            return (
              <View style={{ alignItems: "center", paddingTop: 6 }}>
                <Divider
                  style={{
                    width: 30,
                    marginBottom: 2,
                    marginTop: 6,
                    backgroundColor: color,
                    height: 2,
                  }}
                />
                <Icon name="ticket-confirmation-outline" size={28} color={color} />
              </View>
            );
          },
        }}
      />

      <Tab.Screen
        name="Menu"
        component={configuracionStack}
        options={{
          tabBarLabel: t[language].menu,
          tabBarIcon: ({ focused }) => {
            const color = focused ? activeColor : inactiveColor;
            return (
              <View style={{ alignItems: "center", paddingTop: 6 }}>
                <Divider
                  style={{
                    width: 30,
                    marginBottom: 2,
                    marginTop: 6,
                    backgroundColor: color,
                    height: 2,
                  }}
                />
                <Icon name="menu" size={28} color={color} />
              </View>
            );
          },
        }}
      />

    </Tab.Navigator>
  );
}
