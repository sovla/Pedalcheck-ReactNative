import {LinkButton} from '@/assets/global/Button';
import {Box, Container, PositionBox, ScrollBox} from '@/assets/global/Container';
import DefaultLine from '@/assets/global/Line';
import Theme from '@/assets/global/Theme';
import Header from '@/Component/Layout/Header';
import ReservationBikeSelect from '@/Component/Repair/ReservationBikeSelect';
import RepairReservationHeader from '@/Page/Repair/RepairReservationHeader';
import {getPixel} from '@/Util/pixelChange';
import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {useState} from 'react';
import {ScrollView, View} from 'react-native';
import {useSelector} from 'react-redux';

export default function CouponUseBikeSelect() {
  const {size} = useSelector(state => state);
  const [selectItem, setSelectItem] = useState('');
  const navigation = useNavigation();
  console.log(size.screenHeight);
  return (
    <>
      <Header title="쿠폰 사용" />

      <Box backgroundColor="#0000" style={{height: size.screenHeight - 130}}>
        <ScrollBox backgroundColor="#0000">
          <RepairReservationHeader step={1} array={[1, 2, 3]} content="자전거 선택" />
          <DefaultLine height="10px" backgroundColor={Theme.borderColor.whiteLine} />
          <ReservationBikeSelect
            isButton={false}
            selectItem={selectItem}
            setSelectItem={setSelectItem}
          />
        </ScrollBox>
      </Box>
      <LinkButton
        mg="20px 16px"
        to={() => navigation.navigate('CouponUseDateSelect')}
        content="다음"
      />
    </>
  );
}
