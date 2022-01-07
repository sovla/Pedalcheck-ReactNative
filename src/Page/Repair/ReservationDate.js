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
import useUpdateEffect from '@/Hooks/useUpdateEffect';
import {getdisabledReservationDayList, getReservationTimeList} from '@/API/Shop/Shop';
import {useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import {ToastAndroid} from 'react-native';
import {useEffect} from 'react';
import {useCallback} from 'react';

export default function ReservationDate({navigation}) {
  const {shopInfo} = useSelector(state => state);
  const [selectItem, setSelectItem] = useState('');
  const [selectDate, setSelectDate] = useState(null);
  const [disabledTimeList, setDisabledTimeList] = useState([]);
  const [timeList, setTimeList] = useState([]);
  const now = new Date();

  useUpdateEffect(() => {
    setDisabledTimeList([]);
    setTimeList([]);
    getReservationTimeList({
      ot_pt_date: selectDate,
      mt_idx: shopInfo?.store_info?.mt_idx,
    })
      .then(res => res.data?.result === 'true' && res.data.data?.data)
      .then(data => {
        setDisabledTimeList(data?.order_time);
        if (Array.isArray(data?.store_time)) {
          const result = data.store_time
            .filter(item => item.flag === 'Y')
            .reduce((prev, curr) => {
              if (!prev?.st_time) {
                return [...prev, curr.st_time];
              } else {
                return [curr.st_time];
              }
            });
          setTimeList(result);
        }
      });
  }, [selectDate]);

  useFocusEffect(
    useCallback(() => {
      getdisabledReservationDayList({
        ot_pt_month:
          selectDate?.substr(0, 7) ??
          `${now.getFullYear()}-${
            now.getMonth() + 1 < 10 ? '0' + (now.getMonth() + 1) : now.getMonth() + 1
          }`,
        mt_idx: shopInfo?.store_info?.mt_idx,
      });
    }, []),
  );

  const onChangeMonth = day => {
    getdisabledReservationDayList({
      ot_pt_month: day,

      mt_idx: shopInfo?.store_info?.mt_idx,
    });
  };

  return (
    <>
      <Header title="정비예약" />
      <Box flex={1}>
        <ScrollBox flex={1}>
          <RepairReservationHeader step={3} />
          <DefaultLine height="10px" backgroundColor={Theme.borderColor.whiteLine} />
          <Box mg="20px 16px">
            <ReservationCalendar
              selectDate={selectDate}
              setSelectDate={setSelectDate}
              onChangeMonth={onChangeMonth}
            />
          </Box>
          <TimeList
            timeList={timeList}
            disabled={disabledTimeList}
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
