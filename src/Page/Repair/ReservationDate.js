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
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import {useEffect} from 'react';
import moment from 'moment';
import 'moment/locale/ko';
import {setReservationDate} from '@/Store/reservationState';
import {AlertButton} from '@/Util/Alert';
import Loading from '@/Component/Layout/Loading';

export default function ReservationDate({navigation, route: {params}}) {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const now = new Date(moment().format('YYYY-MM-DD HH:mm:ss'));

  const {shopInfo, reservationInfo} = useSelector(state => state);
  const [selectItem, setSelectItem] = useState(''); // 선택한 시간
  const [selectDate, setSelectDate] = useState(null); // 선택한 날짜

  const [disabledDayList, setDisabledDayList] = useState([]); // 선택불가 날짜
  const [disabledTimeList, setDisabledTimeList] = useState([]); // 선택불가 시간
  const [timeList, setTimeList] = useState([]); // 선택가능한 시간

  const [isLoading, setIsLoading] = useState(true);

  useUpdateEffect(() => {
    setDisabledTimeList([]);
    setTimeList([]);
    setSelectItem('');
    setIsLoading(true);
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
    setIsLoading(false);
  }, [selectDate]);

  useEffect(() => {
    if (isFocused) {
      setSelectDate(reservationInfo?.selectDate?.date ?? null);
      setSelectItem(reservationInfo?.selectDate?.time ?? '');
      onChangeMonth(
        selectDate?.substr(0, 7) ??
          `${now.getFullYear()}-${now.getMonth() + 1 < 10 ? '0' + (now.getMonth() + 1) : now.getMonth() + 1}`,
      );
    }
  }, [isFocused]);

  const onChangeMonth = day => {
    setIsLoading(true);
    getdisabledReservationDayList({
      ot_pt_month: day,
      mt_idx: shopInfo?.store_info?.mt_idx,
    })
      .then(res => res.data.result === 'true' && res.data.data.data)
      .then(data => setDisabledDayList(data.disabled_date));
    setIsLoading(false);
  };

  const onPressNext = () => {
    if (selectDate && selectItem) {
      dispatch(
        setReservationDate({
          date: selectDate,
          time: selectItem,
        }),
      );
      navigation.navigate('ReservationRequest');
    } else {
      AlertButton('예약 시간을 선택해주세요.');
    }
  };

  return (
    <>
      {isLoading && <Loading isAbsolute />}
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
              disabledDayList={disabledDayList}
            />
          </Box>
          <TimeList
            selectDate={selectDate}
            timeList={timeList}
            disabled={disabledTimeList}
            selectItem={selectItem}
            setSelectItem={setSelectItem}
          />
          <Box mg="20px 16px" height="44px">
            <LinkButton to={() => onPressNext()} content="다음"></LinkButton>
          </Box>
        </ScrollBox>
      </Box>
    </>
  );
}
