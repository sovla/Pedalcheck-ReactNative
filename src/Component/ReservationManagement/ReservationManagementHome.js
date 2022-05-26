import {Container} from '@/assets/global/Container';
import React from 'react';
import {useState} from 'react';
import {View, Text} from 'react-native';
import MenuNav from '../Layout/MenuNav';
import CouponReservation from './CouponReservation';
import RepairReservation from './RepairReservation';

export default function ReservationManagementHome() {
  const [subSelect, setSubSelect] = useState('정비 예약');
  const subMenu = ['정비 예약', '쿠폰 예약'];

  return (
    <Container>
      <RepairReservation key={'RepairReservation'} type="repair" />
    </Container>
  );
}
