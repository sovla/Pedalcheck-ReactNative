import {Container} from '@/assets/global/Container';
import GradientHeader from '@/Component/Layout/GradientHeader';
import React from 'react';
import {ScrollView} from 'react-native';
import {useSelector} from 'react-redux';
import ReservationIcon from '@assets/image/menu06_top.png';
import FooterButtons from '@/Component/Layout/FooterButtons';
import HeaderButton from '@/Component/ReservationManagement/HeaderButton';
import {useState} from 'react';
import MenuNav from '@/Component/Layout/MenuNav';
import RepairReservation from '@Component/ReservationManagement/RapairReservation';
import CouponReservation from '@/Component/ReservationManagement/CouponReservation';
import ScheduleManagement from '@/Component/ReservationManagement/ScheduleManagement';
import ReservationTimeManagement from '@/Component/ReservationManagement/ReservationTimeManagement';
export default function ReservationManagement({navigation}) {
  const [select, setSelect] = useState('예약현황');
  const [subSelect, setSubSelect] = useState('정비 예약');
  const {size} = useSelector(state => state);
  const subMenu = ['정비 예약', '쿠폰 예약'];

  return (
    <Container>
      <ScrollView
        style={{
          height: size.screenHeight - 64,
          width: '100%',
        }}>
        <GradientHeader title="예약관리" imageSource={ReservationIcon}>
          <HeaderButton select={select} setSelect={setSelect} />
        </GradientHeader>
        {select === '예약현황' && (
          <>
            <MenuNav menuItem={subMenu} select={subSelect} setSelect={setSubSelect} />
            {subSelect === '정비 예약' && <RepairReservation />}
            {subSelect === '쿠폰 예약' && <CouponReservation />}
          </>
        )}

        {select === '일정관리' && <ScheduleManagement />}
        {select === '예약 시간 관리' && <ReservationTimeManagement />}
      </ScrollView>
      <FooterButtons selectMenu={2} isAdmin />
    </Container>
  );
}
