import React from "react";
import { Grid, GridItem } from '@/components/ui/grid';
import { Image } from "react-native";
import bancoazteca from "../image/lugarpago/bancoazteca.png";
import banorte from "../image/lugarpago/banorte.png";
import bbva from "../image/lugarpago/bbva.png";
import bodegaaurrera from "../image/lugarpago/bodegaaurrera.png";
import cajacerano from "../image/lugarpago/cajacerano.png";
import cajaoblatos from "../image/lugarpago/cajaoblatos.png";
import cajatamazula from "../image/lugarpago/cajatamazula.png";
import calimax from "../image/lugarpago/calimax.png";
import circlek from "../image/lugarpago/circlek.png";
import cityclub from "../image/lugarpago/cityclub.png";
import elektra from "../image/lugarpago/elektra.png";
import extra from "../image/lugarpago/extra.png";
import farmaciadelahorro from "../image/lugarpago/farmaciadelahorro.png";
import farmapronto from "../image/lugarpago/farmapronto.png";
import financierabienestar from "../image/lugarpago/financierabienestar.png";
import italika from "../image/lugarpago/italika.png";
import kiosko from "../image/lugarpago/kiosko.png";
import lamasbarata from "../image/lugarpago/lamasbarata.png";
import merza from "../image/lugarpago/merza.png";
import mtc from "../image/lugarpago/mtc.png";
import pagaqui from "../image/lugarpago/pagaqui.png";
import roma from "../image/lugarpago/roma.png";
import samsclub from "../image/lugarpago/samsclub.png";
import santander from "../image/lugarpago/santander.png";
import seveneleven from "../image/lugarpago/seveneleven.png";
import soriana from "../image/lugarpago/soriana.png";
import supercity from "../image/lugarpago/supercity.png";
import systienda from "../image/lugarpago/systienda.png";
import viaservicios from "../image/lugarpago/viaservicios.png";
import walmart from "../image/lugarpago/walmart.png";
import walmartexpress from "../image/lugarpago/walmartexpress.png";


const image = {
    bancoazteca,
    banorte,
    bbva,
    bodegaaurrera,
    cajacerano,
    cajaoblatos,
    cajatamazula,
    calimax,
    circlek,
    cityclub,
    elektra,
    extra,
    farmaciadelahorro,
    farmapronto,
    financierabienestar,
    italika,
    kiosko,
    lamasbarata,
    merza,
    mtc,
    pagaqui,
    roma,
    samsclub,
    santander,
    seveneleven,
    soriana,
    supercity,
    systienda,
    viaservicios,
    walmart,
    walmartexpress,
};

export default function GridCustom({nombre, width}) {
    return (
        <GridItem
            className="bg-background-50 p-4 rounded-md text-center"
            _extra={{
                className: 'col-span-2',
            }}
            style={{backgroundColor:'transparent', width: 70, height: 40, borderColor: '#b8b8b8ff', borderWidth: 1, position: 'relative', justifyContent: 'center', alignItems: 'center' }}
        >
            <Image source={image[nombre]} style={{ width: width, height: 40, position: 'absolute' }} resizeMode="contain" />
        </GridItem>
    );
}