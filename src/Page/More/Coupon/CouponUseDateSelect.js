import {LinkButton} from '@/assets/global/Button';
import {Box, ScrollBox} from '@/assets/global/Container';
import DefaultLine from '@/assets/global/Line';
import Theme from '@/assets/global/Theme';
import Header from '@/Component/Layout/Header';
import React from 'react';
import {useState} from 'react';
import RepairReservationHeader from '@/Page/Repair/RepairReservationHeader';
import TimeList from '@/Component/Repair/TimeList';
import ReservationCalendar from '@/Component/Repair/ReservationCalendar';
import useUpdateEffect from '@/Hooks/useUpdateEffect';
import {getdisabledReservationDayList, getReservationTimeList} from '@/API/Shop/Shop';
import {useIsFocused, useNavigationState} from '@react-navigation/native';
import {useEffect} from 'react';
import moment from 'moment';
import 'moment/locale/ko';
import {AlertButton} from '@/Util/Alert';

export default function ReservationDate({navigation, route: {params}}) {
  const isFocused = useIsFocused();
  const now = new Date(moment().format('YYYY-MM-DD HH:mm:ss'));
  const [selectItem, setSelectItem] = useState(''); // 선택한 시간
  const [selectDate, setSelectDate] = useState(new Date().toISOString().substring(0, 7)); // 선택한 날짜
  const naviState = useNavigationState(state => state);
  const [disabledDayList, setDisabledDayList] = useState([]); // 선택불가 날짜
  const [disabledTimeList, setDisabledTimeList] = useState([]); // 선택불가 시간
  const [timeList, setTimeList] = useState([]); // 선택가능한 시간
  useUpdateEffect(() => {
    setDisabledTimeList([]);
    setTimeList([]);
    setSelectItem('');
    getReservationTimeList({
      ot_pt_date: selectDate,
      mt_idx: params.shopInfo.mst_idx,
    })
      .then(res => res.data?.result === 'true' && res.data.data?.data)
      .then(data => {
        setDisabledTimeList(data?.order_time ?? []);

        if (Array.isArray(data?.store_time)) {
          const {store_time} = data;
          const result = store_time
            .filter(item => item.flag === 'Y')
            .map(item => {
              return item?.ot_time ?? item.st_time;
            });
          setTimeList(result);
        }
      });
  }, [selectDate]);

  useEffect(() => {
    if (isFocused) {
      onChangeMonth(
        selectDate?.substr(0, 7) ??
          `${now.getFullYear()}-${now.getMonth() + 1 < 10 ? '0' + (now.getMonth() + 1) : now.getMonth() + 1}`,
      );
    }
  }, [isFocused]);

  const onChangeMonth = day => {
    getdisabledReservationDayList({
      ot_pt_month: day,
      mt_idx: params.shopInfo.mst_idx,
    })
      .then(res => res.data.result === 'true' && res.data.data.data)
      .then(data => setDisabledDayList(data.disabled_date));
  };

  const onPressNext = () => {
    if (selectDate && selectItem) {
      navigation.reset({
        index: naviState.index - 1,
        routes: [
          ...naviState.routes.filter((value, index) => index < naviState.index - 1),
          {
            name: 'CouponUseComplete',
            params: {
              ...params,
              selectDate: {
                date: selectDate,
                time: selectItem,
              },
            },
          },
        ],
      });
    } else {
      if (!selectDate) {
        AlertButton('정비 날짜를 선택해주세요.');
        return null;
      } else {
        AlertButton('정비 시간을 선택해주세요.');
        return null;
      }
    }
  };

  return (
    <>
      <Header title="정비예약" />
      <Box flex={1}>
        <ScrollBox flex={1} keyboardShouldPersistTaps="handled">
          <RepairReservationHeader step={2} array={[1, 2, 3]} content="쿠폰 사용날짜 선택" />
          <DefaultLine height="10px" backgroundColor={Theme.borderColor.whiteLine} />
          <Box mg="20px 16px">
            <ReservationCalendar
              selectDate={selectDate}
              setSelectDate={setSelectDate}
              onChangeMonth={onChangeMonth}
              disabledDayList={disabledDayList}
              lastDay={new Date(params.item.cst_edate).setDate(new Date(params.item.cst_edate).getDate() + 1)}
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
