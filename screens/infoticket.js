import React from 'react';
import { useWindowDimensions } from 'react-native';
import InfoTicketVertical from './infoticketVertical';
import InfoTicketHorizontal from './infoticketHorizontal';

export default function InfoTicket() {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  return isLandscape ? <InfoTicketHorizontal /> : <InfoTicketVertical />;
}