import React from "react";
import { View, Text } from "react-native";
import {
    Accordion,
    AccordionItem,
    AccordionHeader,
    AccordionTrigger,
    AccordionTitleText,
    AccordionContent,
    AccordionContentText,
    AccordionIcon,
} from '@/components/ui/accordion';
import { Divider } from '@/components/ui/divider';
import { AddIcon, RemoveIcon } from '@/components/ui/icon';

export default function ayuda() {
    return (
        <View style={{ marginTop: 20, padding: 20 }}>
            <View style={{marginTop:30}}>
                <Text style={{fontWeight:700, fontSize:16, color:'#042C50'}}>Acerca de Skinet</Text>
            </View>
            <Accordion
                variant="unfilled"
                type="single"
                defaultValue="item-3"
                className="w-[90%] m-5"
            >
                <AccordionItem value="item-1" className="rounded-lg">
                    <AccordionHeader>
                        <AccordionTrigger>
                            {({ isExpanded }) => {
                                return (
                                    <>
                                        <AccordionTitleText>
                                            ¿Quiénes somos?
                                        </AccordionTitleText>
                                        {!isExpanded ? (
                                            <AccordionIcon as={RemoveIcon} />
                                        ) : (
                                            <AccordionIcon as={AddIcon} />
                                        )}
                                    </>
                                );
                            }}
                        </AccordionTrigger>
                    </AccordionHeader>
                    <AccordionContent>
                        <AccordionContentText>
                            The defaultValue prop of the Accordion component is used to define
                            the open item by default. It is used when the Accordion component is
                            uncontrolled.
                        </AccordionContentText>
                    </AccordionContent>
                </AccordionItem>
                <Divider />
            </Accordion>
            <Accordion
                variant="unfilled"
                type="single"
                defaultValue="item-3"
                className="w-[90%] m-5"
            >
                <AccordionItem value="item-2" className="rounded-lg">
                    <AccordionHeader>
                        <AccordionTrigger>
                            {({ isExpanded }) => {
                                return (
                                    <>
                                        <AccordionTitleText>
                                            ¿Qué es Skinet app?
                                        </AccordionTitleText>
                                        {!isExpanded ? (
                                            <AccordionIcon as={RemoveIcon} />
                                        ) : (
                                            <AccordionIcon as={AddIcon} />
                                        )}
                                    </>
                                );
                            }}
                        </AccordionTrigger>
                    </AccordionHeader>
                    <AccordionContent>
                        <AccordionContentText>
                            The defaultValue prop of the Accordion component is used to define
                            the open item by default. It is used when the Accordion component is
                            uncontrolled.
                        </AccordionContentText>
                    </AccordionContent>
                </AccordionItem>
                <Divider />
            </Accordion>
            <View style={{marginTop:30}}>
                <Text style={{fontWeight:700, fontSize:16, color:'#042C50'}}>Pagos y facturación</Text>
            </View>

            <Accordion
                variant="unfilled"
                type="single"
                defaultValue="item-3"
                className="w-[90%] m-5"
            >
                <AccordionItem value="item-3" className="rounded-lg">
                    <AccordionHeader>
                        <AccordionTrigger>
                            {({ isExpanded }) => {
                                return (
                                    <>
                                        <AccordionTitleText>
                                            ¿Cómo puedo pagar mi recibo desde la app?
                                        </AccordionTitleText>
                                        {!isExpanded ? (
                                            <AccordionIcon as={RemoveIcon} />
                                        ) : (
                                            <AccordionIcon as={AddIcon} />
                                        )}
                                    </>
                                );
                            }}
                        </AccordionTrigger>
                    </AccordionHeader>
                    <AccordionContent>
                        <AccordionContentText>
                            The defaultValue prop of the Accordion component is used to define
                            the open item by default. It is used when the Accordion component is
                            uncontrolled.
                        </AccordionContentText>
                    </AccordionContent>
                </AccordionItem>
                <Divider />
            </Accordion>
            <Accordion
                variant="unfilled"
                type="single"
                defaultValue="item-3"
                className="w-[90%] m-5"
            >
                <AccordionItem value="item-2" className="rounded-lg">
                    <AccordionHeader>
                        <AccordionTrigger>
                            {({ isExpanded }) => {
                                return (
                                    <>
                                        <AccordionTitleText>
                                            ¿Dónde descargo mi factura o comprobante de pago?
                                        </AccordionTitleText>
                                        {!isExpanded ? (
                                            <AccordionIcon as={RemoveIcon} />
                                        ) : (
                                            <AccordionIcon as={AddIcon} />
                                        )}
                                    </>
                                );
                            }}
                        </AccordionTrigger>
                    </AccordionHeader>
                    <AccordionContent>
                        <AccordionContentText>
                            The defaultValue prop of the Accordion component is used to define
                            the open item by default. It is used when the Accordion component is
                            uncontrolled.
                        </AccordionContentText>
                    </AccordionContent>
                </AccordionItem>
                <Divider />
            </Accordion>

            <View style={{marginTop:30}}>
                <Text style={{fontWeight:700, fontSize:16, color:'#042C50'}}>Soporte técnico</Text>
            </View>

            <Accordion
                variant="unfilled"
                type="single"
                defaultValue="item-3"
                className="w-[90%] m-5"
            >
                <AccordionItem value="item-2" className="rounded-lg">
                    <AccordionHeader>
                        <AccordionTrigger>
                            {({ isExpanded }) => {
                                return (
                                    <>
                                        <AccordionTitleText>
                                            ¿Qué hago si mi internet está lento o no funciona?
                                        </AccordionTitleText>
                                        {!isExpanded ? (
                                            <AccordionIcon as={RemoveIcon} />
                                        ) : (
                                            <AccordionIcon as={AddIcon} />
                                        )}
                                    </>
                                );
                            }}
                        </AccordionTrigger>
                    </AccordionHeader>
                    <AccordionContent>
                        <AccordionContentText>
                            The defaultValue prop of the Accordion component is used to define
                            the open item by default. It is used when the Accordion component is
                            uncontrolled.
                        </AccordionContentText>
                    </AccordionContent>
                </AccordionItem>
                <Divider />
            </Accordion>

            <Accordion
                variant="unfilled"
                type="single"
                defaultValue="item-3"
                className="w-[90%] m-5"
            >
                <AccordionItem value="item-2" className="rounded-lg">
                    <AccordionHeader>
                        <AccordionTrigger>
                            {({ isExpanded }) => {
                                return (
                                    <>
                                        <AccordionTitleText>
                                            ¿Puedo agendar una visita técnica desde la aplicación?
                                        </AccordionTitleText>
                                        {!isExpanded ? (
                                            <AccordionIcon as={RemoveIcon} />
                                        ) : (
                                            <AccordionIcon as={AddIcon} />
                                        )}
                                    </>
                                );
                            }}
                        </AccordionTrigger>
                    </AccordionHeader>
                    <AccordionContent>
                        <AccordionContentText>
                            The defaultValue prop of the Accordion component is used to define
                            the open item by default. It is used when the Accordion component is
                            uncontrolled.
                        </AccordionContentText>
                    </AccordionContent>
                </AccordionItem>
                <Divider />
            </Accordion>

        </View>
    );
}