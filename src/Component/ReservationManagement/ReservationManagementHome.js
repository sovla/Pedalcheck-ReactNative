import {Container} from '@/assets/global/Container';
import React from 'react';
import {useState} from 'react';
import {View, Text} from 'react-native';
import MenuNav from '../Layout/MenuNav';
import CouponReservation from './CouponReservation';
import RapairReservation from './RapairReservation';

export default function ReservationManagementHome() {
  const [subSelect, setSubSelect] = useState('정비 예약');
  const subMenu = ['정비 예약', '쿠폰 예약'];

  return (
    <Container>
      <MenuNav
        menuItem={subMenu}
        select={subSelect}
        setSelect={item => {
          setSubSelect(item);
        }}
      />
      {subSelect === '정비 예약' ? <RapairReservation /> : <CouponReservation />}
    </Container>
  );
}
