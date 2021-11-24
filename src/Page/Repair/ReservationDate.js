import {LinkButton} from '@/assets/global/Button';
import {Box, ScrollBox} from '@/assets/global/Container';
import DefaultLine from '@/assets/global/Line';
import Theme from '@/assets/global/Theme';
import Header from '@/Component/Layout/Header';
import React from 'react';
import {useState} from 'react';
import RepairReservationHeader from './RepairReservationHeader';
import TimeList from '@/Component/Repair/TimeList';
import ReservationCalendar from '@/Component/Repair/ReservationCalendar';
import {timeList} from '@assets/global/dummy';

export default function ReservationDate({navigation}) {
  const [selectItem, setSelectItem] = useState('');
  const [selectDate, setSelectDate] = useState(null);

  const disabled = ['09:00', '09:30'];
  return (
    <>
      <Header title="정비예약" />
      <Box flex={1}>
        <ScrollBox flex={1}>
          <RepairReservationHeader step={3} />
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
          <Box mg="20px 16px" height="44px">
            <LinkButton
              to={() => navigation.navigate('ReservationRequest')}
              content="다음"></LinkButton>
          </Box>
        </ScrollBox>
      </Box>
    </>
  );
}
