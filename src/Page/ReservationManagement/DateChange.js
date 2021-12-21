import {LinkButton} from '@/assets/global/Button';
import {Box, ScrollBox} from '@/assets/global/Container';
import {timeList} from '@/assets/global/dummy';
import Header from '@/Component/Layout/Header';
import ReservationCalendar from '@/Component/Repair/ReservationCalendar';
import TimeList from '@/Component/Repair/TimeList';
import React from 'react';
import {useState} from 'react';

export default function DateChange({navigation}) {
  const [selectItem, setSelectItem] = useState('');
  const [selectDate, setSelectDate] = useState(null);

  const disabled = ['09:00', '09:30'];

  const onPressSave = () => {
    navigation.navigate('ReservationManagementDetail');
  };
  return (
    <>
      <Header title="예약시간 변경" />
      <Box flex={1}>
        <ScrollBox flex={1}>
          <Box mg="0px 16px">
            <ReservationCalendar selectDate={selectDate} setSelectDate={setSelectDate} />
          </Box>
          <TimeList
            timeList={timeList}
            disabled={disabled}
            selectItem={selectItem}
            setSelectItem={setSelectItem}
          />
          <Box mg="40px 16px 20px">
            <LinkButton to={onPressSave} content="저장하기" />
          </Box>
        </ScrollBox>
      </Box>
    </>
  );
}
