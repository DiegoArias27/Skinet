import React from "react";
import { View, Image, Pressable, Text, Linking } from "react-native";
import { useNavigation } from '@react-navigation/native';
import {
    Select,
    SelectTrigger,
    SelectInput,
    SelectIcon,
    SelectPortal,
    SelectBackdrop,
    SelectContent,
    SelectDragIndicator,
    SelectDragIndicatorWrapper,
    SelectItem,
} from '@/components/ui/select';
import { ChevronDownIcon } from '@/components/ui/icon';
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Link } from "@/components/ui/link";

export default function configuracion() {
    const navigation = useNavigation();
    const llamar = () => {
        const numero = "tel:4491537528";
        Linking.openURL(numero);
    };
    return (
        <View style={{ padding: 20, flex: 1 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <View style={{ backgroundColor: '#E7E0EC', width: '50%', flexDirection: 'row', padding: 15, borderRadius: 10, borderColor: '#C4C4D0', borderStyle: 'solid', borderWidth: 1, marginTop: 20 }}>
                    <View>
                        <Image source={require("../image/Leo.png")} style={{ width: 40, height: 40 }} resizeMode="contain" />
                    </View>
                    <View style={{ marginLeft: 20 }}>
                        <Text style={{ fontWeight: 700, paddingRight: 30 }}>Leo Velasco Arias</Text>
                        <Pressable onPress={() => navigation.navigate("Perfil")}>
                            <Text style={{ color: "#0213AF" }}>{'Perfil > '}</Text>
                        </Pressable>
                    </View>
                </View>
                <View>
                    <Select style={{ backgroundColor: '#E7E0EC', borderRadius: 10 }}>
                        <SelectTrigger variant="outline" size="xl" borderColor="#E7E0EC">
                            <SelectInput placeholder="Idioma" />
                            <SelectIcon className="mr-3" as={ChevronDownIcon} />
                        </SelectTrigger>
                        <SelectPortal>
                            <SelectBackdrop />
                            <SelectContent>
                                <SelectDragIndicatorWrapper>
                                    <SelectDragIndicator />
                                </SelectDragIndicatorWrapper>
                                <SelectItem label="Español" value="ES" />
                                <SelectItem label="Inglés" value="ENG" />
                            </SelectContent>
                        </SelectPortal>
                    </Select>
                </View>
            </View>
            <View style={{ marginTop: 20 }}>
                <Text style={{ fontWeight: 700 }}>Servicio</Text>
            </View>
            <View style={{ backgroundColor: '#042c50', width: "45%", padding: 20, borderRadius: 10, marginTop: 10 }}>
                <Text style={{ fontWeight: 700, fontSize: 18, textAlign: 'center', color: 'white' }}>10 MB</Text>
                <Text style={{ fontSize: 16, textAlign: 'center', color: 'white' }}>$300.00 / mes</Text>
            </View>
            <View style={{ marginTop: 20 }}>
                <Text style={{ fontWeight: 700 }}>Otras acciones</Text>
            </View>
            <VStack style={{ marginTop: 10, height: "45%", justifyContent: 'space-between' }}>
                <HStack style={{ justifyContent: 'space-between' }}>
                    <Pressable onPress={() => navigation.navigate("Ayuda")}>
                        <View style={{ backgroundColor: '#E7E0EC', flexDirection: 'row', paddingTop: 20, paddingBottom: 20, width: 160, paddingLeft: 20, paddingRight: 20, alignItems: 'center', borderRadius: 10 }}>
                            <Icon name="help-circle-outline" size={25} color={"black"} />
                            <Text style={{ marginLeft: 10 }}>Ayuda</Text>
                        </View>
                    </Pressable>
                    <Pressable onPress={llamar}>
                        <View style={{ backgroundColor: '#E7E0EC', flexDirection: 'row', paddingTop: 20, paddingBottom: 20, width: 160, paddingLeft: 20, paddingRight: 20, alignItems: 'center', borderRadius: 10 }}>
                            <Icon name="phone-in-talk-outline" size={25} color={"black"} />
                            <Text style={{ marginLeft: 10 }}>Llamanos</Text>
                        </View>
                    </Pressable>
                </HStack>
                <HStack style={{ justifyContent: 'space-between' }}>
                    <Link href="https://maps.app.goo.gl/PxsyZz5aTAUa1d4t6">
                        <View style={{ backgroundColor: '#E7E0EC', flexDirection: 'row', paddingTop: 20, paddingBottom: 20, width: 160, paddingLeft: 20, paddingRight: 20, alignItems: 'center', borderRadius: 10 }}>
                            <Icon name="map-marker-outline" size={25} color={"black"} />
                            <Text style={{ marginLeft: 10 }}>Oficinas</Text>
                        </View>
                    </Link>
                    <Link href="https://www.skinetinternet.com.mx/">
                        <View style={{ backgroundColor: '#E7E0EC', flexDirection: 'row', paddingTop: 20, paddingBottom: 20, width: 160, paddingLeft: 20, paddingRight: 20, alignItems: 'center', borderRadius: 10 }}>
                            <Icon name="web" size={25} color={"black"} />
                            <Text style={{ marginLeft: 10 }}>Sitio Web</Text>
                        </View>
                    </Link>
                </HStack>
                <HStack style={{ justifyContent: 'space-between' }}>
                    <Link href="https://www.facebook.com/skinet.ags">
                        <View style={{ backgroundColor: '#E7E0EC', flexDirection: 'row', paddingTop: 20, paddingBottom: 20, width: 160, paddingLeft: 20, paddingRight: 20, alignItems: 'center', borderRadius: 10 }}>
                            <Icon name="facebook" size={25} color={"black"} />
                            <Text style={{ marginLeft: 10 }}>Facebook</Text>
                        </View>
                    </Link>
                    <Pressable onPress={() => navigation.navigate("Aspectos")}>
                        <View style={{ backgroundColor: '#E7E0EC', flexDirection: 'row', paddingTop: 20, paddingBottom: 20, width: 160, paddingLeft: 20, paddingRight: 20, alignItems: 'center', borderRadius: 10 }}>
                            <Icon name="bank-outline" size={25} color={"black"} />
                            <Text style={{ marginLeft: 10 }}>Aspectos {'\n'}legales</Text>
                        </View>
                    </Pressable>
                </HStack>
                <HStack style={{ justifyContent: 'space-between' }}>
                    <View style={{ backgroundColor: '#E7E0EC', flexDirection: 'row', paddingTop: 20, paddingBottom: 20, width: 160, paddingLeft: 20, paddingRight: 20, alignItems: 'center', borderRadius: 10 }}>
                        <Icon name="toggle-switch-off-outline" size={25} color={"black"} />
                        <Text style={{ marginLeft: 10 }}>Modo oscuro</Text>
                    </View>
                    <View style={{ backgroundColor: '#E7E0EC', flexDirection: 'row', paddingTop: 20, paddingBottom: 20, width: 160, paddingLeft: 20, paddingRight: 20, alignItems: 'center', borderRadius: 10 }}>
                        <Icon name="star-outline" size={25} color={"black"} />
                        <Text style={{ marginLeft: 10 }}>Valorar app</Text>
                    </View>
                </HStack>
            </VStack>
        </View>
    );
}