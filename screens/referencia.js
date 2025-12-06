import React, { useContext, useState, useEffect } from "react";
import { View, Image, Pressable, ScrollView, ActivityIndicator } from "react-native";
import { Text } from "@/components/ui/text";
import { Button, ButtonText } from '@/components/ui/button';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import themeContext from "@/theme/themeContext";
import { useUserContext } from "@/context/UserContext";
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';

function Referencia() {
    const navigation = useNavigation();
    const route = useRoute();
    const lugardepago = route.params?.nombreLugar || "Comercio no especificado";
    const theme = useContext(themeContext);

    const fondo = theme?.theme === "dark" ? "#1A1A1A" : "#042c50";
    const cardBg = theme?.theme === "dark" ? "#1E1E1E" : "#F6F6F6";
    const textColor = theme?.theme === "dark" ? "#FFFFFF" : "#042c50";
    const borderColor = theme?.theme === "dark" ? "#333" : "#C4C4D0";

    const { payments, selectedUserId, user } = useUserContext();
    const userPayments = payments?.[selectedUserId] || {};

    const pagosArray = Object.entries(userPayments).map(([id, pago]) => ({
        id,
        ...pago
    }));

    const pagosPendientes = pagosArray.filter(
        p => p.status?.toLowerCase() === "pendiente"
    );

    const totalPendiente = pagosPendientes.reduce(
        (sum, p) => sum + (p.total || 0),
        0
    );

    // Referencia dinámica
    const referenciaPago = pagosPendientes[0]?.referencia || '10004992287803241317';

    // Estado para la imagen del código de barras
    const [barcodeImage, setBarcodeImage] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const generateBarcodeImage = async () => {
            try {
                setLoading(true);

                // API de TEC-IT para generar código de barras CODE128
                // Parámetros:
                // - data: el texto a codificar
                // - code: tipo de código (Code128, Code39, etc.)
                // - dpi: resolución (96, 150, 300)
                // - modulewidth: ancho de los módulos
                // - height: altura en pixels
                const barcodeUrl = `https://barcode.tec-it.com/barcode.ashx?data=${encodeURIComponent(referenciaPago)}&code=Code128&dpi=96&modulewidth=2&height=50&text=${encodeURIComponent(referenciaPago)}`;

                // Verificamos que la URL sea válida
                console.log("Generando código de barras para:", referenciaPago);

                setBarcodeImage(barcodeUrl);
            } catch (error) {
                console.error("Error generando código de barras:", error);
            } finally {
                setLoading(false);
            }
        };

        if (referenciaPago) {
            generateBarcodeImage();
        }
    }, [referenciaPago]);

    // Función para regenerar si hay problemas
    const regenerateBarcode = () => {
        setLoading(true);
        const newBarcodeUrl = `https://barcode.tec-it.com/barcode.ashx?data=${encodeURIComponent(referenciaPago)}&code=Code128&dpi=96&modulewidth=2&height=50&text=${encodeURIComponent(referenciaPago)}&t=${Date.now()}`;
        setBarcodeImage(newBarcodeUrl);
        setTimeout(() => setLoading(false), 500);
    };

    const generarYCompartirPDF = async () => {
        try {
            const fechaActual = new Date();
            const fechaFormateada = fechaActual.toLocaleDateString('es-MX', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            const horaFormateada = fechaActual.toLocaleTimeString('es-MX', {
                hour: '2-digit',
                minute: '2-digit'
            });

            // Crear ID de transacción único basado en fecha y referencia
            const transaccionId = `DOP-${fechaActual.getFullYear()}${(fechaActual.getMonth() + 1).toString().padStart(2, '0')}${fechaActual.getDate().toString().padStart(2, '0')}-${referenciaPago.slice(-8)}`;

            const html = `
        <html>
        <head>
            <meta charset="UTF-8">
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
                
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                    -webkit-print-color-adjust: exact !important;
                    print-color-adjust: exact !important;
                }
                
                body {
                    font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
                    padding: 30px 20px;
                    background-color: ${fondo};
                    color: ${textColor};
                    line-height: 1.5;
                }
                
                .recibo-container {
                    max-width: 400px;
                    margin: 0 auto;
                    background-color: ${cardBg};
                    border-radius: 16px;
                    overflow: hidden;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                }
                
                /* Encabezado con gradiente */
                .recibo-header {
                    background: linear-gradient(135deg, #062b4a 0%, #041e35 100%);
                    color: white;
                    padding: 25px 30px;
                    text-align: center;
                    border-bottom: 2px solid rgba(255, 255, 255, 0.1);
                }
                
                .logo {
                    font-size: 28px;
                    font-weight: 700;
                    letter-spacing: 1px;
                    margin-bottom: 8px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 10px;
                }
                
                .logo-dot {
                    color: #4CAF50;
                }
                
                .recibo-title {
                    font-size: 20px;
                    font-weight: 500;
                    opacity: 0.9;
                    margin-bottom: 5px;
                }
                
                .recibo-subtitle {
                    font-size: 14px;
                    opacity: 0.7;
                    font-weight: 300;
                }
                
                /* Sección de monto */
                .monto-section {
                    padding: 30px;
                    text-align: center;
                    background: ${theme?.theme === "dark" ? "rgba(255, 255, 255, 0.03)" : "rgba(4, 44, 80, 0.03)"};
                    border-bottom: 1px dashed ${borderColor};
                }
                
                .monto-label {
                    font-size: 16px;
                    color: ${textColor};
                    opacity: 0.8;
                    margin-bottom: 15px;
                    font-weight: 500;
                }
                
                .monto-valor {
                    font-size: 48px;
                    font-weight: 700;
                    color: #062b4a;
                    background: linear-gradient(135deg, #062b4a 0%, #4CAF50 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    margin: 10px 0;
                    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                }
                
                /* Sección de detalles */
                .detalles-section {
                    padding: 25px 30px;
                }
                
                .detalle-item {
                    display: flex;
                    justify-content: space-between;
                    padding: 12px 0;
                    border-bottom: 1px solid ${borderColor}40;
                }
                
                .detalle-item:last-child {
                    border-bottom: none;
                }
                
                .detalle-label {
                    font-weight: 500;
                    color: ${textColor};
                    opacity: 0.8;
                    font-size: 14px;
                }
                
                .detalle-valor {
                    font-weight: 600;
                    color: ${textColor};
                    font-size: 14px;
                    text-align: right;
                    max-width: 60%;
                    word-break: break-word;
                }
                
                /* Código de barras */
                .barcode-section {
                    padding: 20px 30px;
                    background: ${theme?.theme === "dark" ? "rgba(255, 255, 255, 0.02)" : "rgba(4, 44, 80, 0.02)"};
                    border-top: 1px dashed ${borderColor};
                    border-bottom: 1px dashed ${borderColor};
                    text-align: center;
                }
                
                .barcode-container {
                    margin: 15px 0;
                }
                
                .barcode-container img {
                    width: 280px;
                    height: 60px;
                    object-fit: contain;
                    filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
                }
                
                .referencia-text {
                    font-family: 'Courier New', monospace;
                    font-size: 13px;
                    letter-spacing: 1px;
                    color: ${textColor};
                    opacity: 0.9;
                    margin-top: 10px;
                    padding: 8px 15px;
                    background: ${theme?.theme === "dark" ? "rgba(255, 255, 255, 0.05)" : "rgba(4, 44, 80, 0.05)"};
                    border-radius: 8px;
                    display: inline-block;
                }
                
                /* Footer */
                .recibo-footer {
                    padding: 25px 30px;
                    text-align: center;
                    background: ${theme?.theme === "dark" ? "rgba(255, 255, 255, 0.03)" : "rgba(4, 44, 80, 0.03)"};
                }
                
                .info-transaccion {
                    font-size: 12px;
                    color: ${textColor};
                    opacity: 0.7;
                    margin-bottom: 15px;
                }
                
                .transaccion-id {
                    font-family: 'Courier New', monospace;
                    font-weight: 600;
                    color: ${textColor};
                    background: ${theme?.theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(4, 44, 80, 0.1)"};
                    padding: 6px 12px;
                    border-radius: 6px;
                    display: inline-block;
                    margin: 10px 0;
                    font-size: 13px;
                }
                
                .leyenda {
                    font-size: 11px;
                    color: ${textColor};
                    opacity: 0.6;
                    margin-top: 20px;
                    padding-top: 15px;
                    border-top: 1px solid ${borderColor}40;
                    line-height: 1.6;
                }
                
                .qr-code {
                    margin: 20px auto;
                    width: 120px;
                    height: 120px;
                    opacity: 0.9;
                }
                
                /* Estilos para impresión */
                @media print {
                    body {
                        padding: 0;
                        background: white !important;
                    }
                    
                    .recibo-container {
                        box-shadow: none;
                        border-radius: 0;
                        max-width: 100%;
                        border: 1px solid #ddd;
                    }
                    
                    .no-print {
                        display: none;
                    }
                }
                
                /* Elementos decorativos */
                .watermark {
                    position: absolute;
                    opacity: 0.03;
                    font-size: 120px;
                    font-weight: 900;
                    color: #062b4a;
                    transform: rotate(-45deg);
                    pointer-events: none;
                    z-index: 0;
                    top: 30%;
                    left: -50px;
                    white-space: nowrap;
                }
                
                .sello {
                    position: absolute;
                    top: 20px;
                    right: 20px;
                    opacity: 0.1;
                    font-size: 40px;
                    transform: rotate(15deg);
                }
            </style>
        </head>
        <body>
            <div class="recibo-container">
                <!-- Encabezado -->
                <div class="recibo-header">
                    <div class="logo">
                        DOP<span class="logo-dot">•</span>PAY
                    </div>
                    <div class="recibo-title">Referencia de Pago en Efectivo</div>
                    <div class="recibo-subtitle">Comprobante Oficial • No. ${transaccionId}</div>
                </div>
                
                <!-- Sección del Monto -->
                <div class="monto-section">
                    <div class="monto-label">TOTAL A PAGAR</div>
                    <div class="monto-valor">$${totalPendiente.toFixed(2)}</div>
                    <div style="font-size: 14px; opacity: 0.8; margin-top: 5px;">
                        ${fechaFormateada} • ${horaFormateada}
                    </div>
                </div>
                
                <!-- Detalles de la Transacción -->
                <div class="detalles-section">
                    <div class="detalle-item">
                        <div class="detalle-label">Comercio Autorizado</div>
                        <div class="detalle-valor">${lugardepago}</div>
                    </div>
                    
                    <div class="detalle-item">
                        <div class="detalle-label">Servicio</div>
                        <div class="detalle-valor">Servicios Doppay</div>
                    </div>
                    
                    <div class="detalle-item">
                        <div class="detalle-label">Referencia Bancaria</div>
                        <div class="detalle-valor">${referenciaPago}</div>
                    </div>
                    
                    <div class="detalle-item">
                        <div class="detalle-label">Comisión por Transacción</div>
                        <div class="detalle-valor">$25.00 MXN</div>
                    </div>
                    
                    <div class="detalle-item">
                        <div class="detalle-label">Estado</div>
                        <div class="detalle-valor" style="color: #FF9800; font-weight: 700;">● PENDIENTE</div>
                    </div>
                    
                    <div class="detalle-item">
                        <div class="detalle-label">Método de Pago</div>
                        <div class="detalle-valor">Depósito en Efectivo</div>
                    </div>
                </div>
                
                <!-- Código de Barras -->
                <div class="barcode-section">
                    <div style="font-size: 14px; font-weight: 500; margin-bottom: 10px; opacity: 0.9;">
                        CÓDIGO DE BARRAS PARA PAGO
                    </div>
                    <div class="barcode-container">
                        <img src="https://barcode.tec-it.com/barcode.ashx?data=${encodeURIComponent(referenciaPago)}&code=Code128&dpi=150&modulewidth=1.8&height=50&text=${encodeURIComponent(referenciaPago)}&format=png&textfont=Helvetica&textsize=12" 
                             alt="Código de Barras"
                             onerror="this.src='https://bwipjs-api.metafloor.com/?bcid=code128&text=${encodeURIComponent(referenciaPago)}&scale=3&height=10&includetext'">
                    </div>
                    <div class="referencia-text">${referenciaPago}</div>
                    
                    <!-- QR Code adicional -->
                    <div style="margin-top: 25px;">
                        <div style="font-size: 13px; font-weight: 500; margin-bottom: 10px; opacity: 0.8;">
                            ESCANEA CON TU APLICACIÓN BANCARIA
                        </div>
                        <img class="qr-code" 
                             src="https://quickchart.io/qr?text=${encodeURIComponent(referenciaPago)}&size=120&margin=1&dark=${encodeURIComponent(textColor.replace('#', ''))}&light=${encodeURIComponent(cardBg.replace('#', ''))}" 
                             alt="Código QR">
                    </div>
                </div>
                
                <!-- Footer -->
                <div class="recibo-footer">
                    <div class="info-transaccion">
                        Transacción generada el ${fechaFormateada} a las ${horaFormateada}
                    </div>
                    
                    <div class="transaccion-id">
                        ID: ${transaccionId}
                    </div>
                    
                    <div class="leyenda">
                        <strong>INSTRUCCIONES:</strong> Presente este comprobante en cualquier sucursal de ${lugardepago} para realizar su pago.<br>
                        <strong>VALIDEZ:</strong> Esta referencia es válida por 72 horas a partir de su generación.<br>
                        <strong>CONSERVAR:</strong> Guarde este comprobante como constancia de su transacción.<br><br>
                        
                        <div style="text-align: center; font-size: 10px; opacity: 0.5; margin-top: 10px;">
                            © ${new Date().getFullYear()} Doppay • Sistema de Pagos Electrónicos • www.doppay.com<br>
                            Este documento es generado automáticamente y no requiere firma.
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Watermark decorativo -->
            <div class="watermark no-print">
                DOPPAY
            </div>
            
            <!-- Sello decorativo -->
            <div class="sello no-print" style="color: #4CAF50;">
                ✓
            </div>
        </body>
        </html>
        `;

            const { uri: pdfUri } = await Print.printToFileAsync({
                html,
                base64: false
            });

            if (await Sharing.isAvailableAsync()) {
                await Sharing.shareAsync(pdfUri, {
                    mimeType: 'application/pdf',
                    dialogTitle: 'Compartir Comprobante de Pago',
                    UTI: 'com.adobe.pdf'
                });
            } else {
                alert('La función de compartir no está disponible');
            }
        } catch (error) {
            console.error('Error al generar PDF:', error);
            alert('Error al generar el PDF: ' + error.message);
        }
    };

    return (
        <ScrollView style={{ flex: 1, padding: 20, backgroundColor: fondo }}>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start', marginBottom: 20 }}>
                <Pressable onPress={() => navigation.goBack()}>
                    <Icon name="close" size={28} color={textColor} />
                </Pressable>
                <Text style={{ color: textColor, fontSize: 28, fontWeight: '700', marginLeft: 20 }}>Depósito en efectivo</Text>
            </View>

            <View style={{ backgroundColor: cardBg, padding: 20, borderRadius: 20, alignItems: 'center' }}>
                <Text style={{ color: textColor, fontSize: 16, fontWeight: '700', marginBottom: 20 }}>Referencia pago en efectivo</Text>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: 20 }}>
                    <Text style={{ color: textColor }}>Total a pagar</Text>
                    <Text style={{ color: textColor, fontWeight: '700' }}>${totalPendiente}</Text>
                </View>

                <View style={{ borderWidth: 1, borderColor: borderColor, borderRadius: 15, width: '100%', padding: 10, alignItems: 'center' }}>

                    {/* Código de barras generado por API */}
                    <View style={{ width: 280, height: 70, alignItems: 'center', justifyContent: 'center', marginVertical: 10 }}>
                        {loading ? (
                            <ActivityIndicator size="small" color={textColor} />
                        ) : barcodeImage ? (
                            <>
                                <Image
                                    source={{ uri: barcodeImage }}
                                    style={{
                                        width: 280,
                                        height: 50,
                                        resizeMode: 'contain'
                                    }}
                                    onError={() => {
                                        console.log("Error cargando imagen, regenerando...");
                                        regenerateBarcode();
                                    }}
                                />
                                <Pressable onPress={regenerateBarcode} style={{ marginTop: 5 }}>
                                    <Text style={{ fontSize: 10, color: textColor, opacity: 0.7 }}>
                                        Toca para actualizar
                                    </Text>
                                </Pressable>
                            </>
                        ) : (
                            <View style={{ alignItems: 'center' }}>
                                <Text style={{ color: textColor, marginBottom: 10 }}>No se pudo generar el código</Text>
                                <Button onPress={regenerateBarcode} style={{ paddingHorizontal: 20, paddingVertical: 5 }}>
                                    <ButtonText style={{ fontSize: 12 }}>Reintentar</ButtonText>
                                </Button>
                            </View>
                        )}
                    </View>

                    <View style={{ backgroundColor: '#cccccc51', width: '100%', height: 2, marginVertical: 5 }} />

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', padding: 10 }}>
                        <Text style={{ color: textColor }}>Comercio</Text>
                        <Text style={{ fontWeight: 'bold', color: textColor }}>{lugardepago}</Text>
                    </View>

                    <View style={{ backgroundColor: '#cccccc51', width: '100%', height: 2, marginVertical: 5 }} />

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', padding: 10 }}>
                        <Text style={{ color: textColor }}>Tipo de pago</Text>
                        <Text style={{ fontWeight: 'bold', color: textColor }}>Servicios Doppay</Text>
                    </View>

                    <View style={{ backgroundColor: '#cccccc51', width: '100%', height: 2, marginVertical: 5 }} />

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', padding: 10 }}>
                        <Text style={{ color: textColor }}>Referencia</Text>
                        <Text style={{ fontWeight: 'bold', color: textColor }}>{referenciaPago}</Text>
                    </View>

                    <View style={{ backgroundColor: '#cccccc51', width: '100%', height: 2, marginVertical: 5 }} />

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', padding: 10 }}>
                        <Text style={{ color: textColor }}>Comisión por pago</Text>
                        <Text style={{ fontWeight: 'bold', color: textColor }}>$25</Text>
                    </View>
                </View>

                <Button style={{ marginTop: 20 }} onPress={generarYCompartirPDF}>
                    <ButtonText>📄 Descargar / Compartir PDF</ButtonText>
                </Button>

                <Pressable onPress={regenerateBarcode} style={{ marginTop: 10 }}>
                    <Text style={{ color: textColor, fontSize: 12, opacity: 0.7 }}>
                        🔄 Regenerar código de barras
                    </Text>
                </Pressable>
            </View>
        </ScrollView>
    );
}

export default Referencia;