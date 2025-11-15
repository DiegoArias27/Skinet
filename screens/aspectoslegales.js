import React from "react";
import { Text, View } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


export default function aspectoslegales(){
    return(
        <View style={{padding:20, marginTop:20}}>
            <View style={{flexDirection:'row', backgroundColor:'#E7E0EC', padding:20, alignItems:'center', borderRadius:10, marginBottom:10}}>
                <Icon name="file-document-outline" size={28} color={"black"} />
                <Text style={{fontWeight:700, marginLeft:20, fontSize:18}}>Términos y condiciones</Text>
            </View>
            <View style={{flexDirection:'row', backgroundColor:'#E7E0EC', padding:20, alignItems:'center', borderRadius:10, marginBottom:10}}>
                <Icon name="lock-outline" size={28} color={"black"} />
                <Text style={{fontWeight:700, marginLeft:20, fontSize:18}}>Políticas de privacidad</Text>
            </View>
            <View style={{flexDirection:'row', backgroundColor:'#E7E0EC', padding:20, alignItems:'center', borderRadius:10, marginBottom:10}}>
                <Icon name="alert-circle-outline" size={28} color={"black"} />
                <Text style={{fontWeight:700, marginLeft:20, fontSize:18}}>Aviso legal</Text>
            </View>
            <View style={{flexDirection:'row', backgroundColor:'#E7E0EC', padding:20, alignItems:'center', borderRadius:10, marginBottom:10}}>
                <Icon name="checkbox-marked-circle-outline" size={28} color={"black"} />
                <Text style={{fontWeight:700, marginLeft:20, fontSize:18}}>Derechos del cliente</Text>
            </View>
            <View>
                <Text style={{textAlign:'center', fontWeight:700, marginTop:40, fontSize:16}}>Última actualización 20/06/2025</Text>
            </View>
        </View>
    );
}