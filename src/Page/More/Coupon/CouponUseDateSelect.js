import {LinkButton} from '@/assets/global/Button';
import {Box, ScrollBox} from '@/assets/global/Container';
import {timeList} from '@/assets/global/dummy';
import DefaultLine from '@/assets/global/Line';
import Theme from '@/assets/global/Theme';
import Header from '@/Component/Layout/Header';
import ReservationCalendar from '@/Component/Repair/ReservationCalendar';
import TimeList from '@/Component/Repair/TimeList';
import RepairReservationHeader from '@/Page/Repair/RepairReservationHeader';
import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {useState} from 'react';
import {View, Text} from 'react-native';
import {useSelector} from 'react-redux';

export default function CouponUseDateSelect() {
  const {size} = useSelector(state => state);
  const navigation = useNavigation();
  const [selectItem, setSelectItem] = useState('');
  const [selectDate, setSelectDate] = useState(null);
  const disabled = ['09:00', '09:30'];
  return (
    <>
      <Header title="쿠폰 사용" />

      <Box flex={1} backgroundColor="#0000">
        <ScrollBox flex={1} backgroundColor="#0000">
          <RepairReservationHeader step={2} array={[1, 2, 3]} content="쿠폰 사용날짜 선택" />
          <DefaultLine height="10px" backgroundColor={Theme.borderColor.whiteLine} />
          <Box mg="20px 16px">
            <ReservationCalendar selectDate={selectDate} setSelectDate={setSelectDate} />
          </Box>
          <TimeList
            timeList={timeList}
            disabled={disabled}
            selectItem={selectItem}
            setSelectItem={setSelectItem}
          />
          <LinkButton
            mg="20px 16px"
            to={() => navigation.navigate('CouponUseComplete')}
            content="다음"
          />
        </ScrollBox>
      </Box>
    </>
  );
}
