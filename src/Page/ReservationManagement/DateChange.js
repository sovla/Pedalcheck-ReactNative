import {getdisabledReservationDayList, getReservationTimeList} from '@/API/Shop/Shop';
import {LinkButton} from '@/assets/global/Button';
import {Box, ScrollBox} from '@/assets/global/Container';
import {timeList} from '@/assets/global/dummy';
import Header from '@/Component/Layout/Header';
import ReservationCalendar from '@/Component/Repair/ReservationCalendar';
import TimeList from '@/Component/Repair/TimeList';
import useUpdateEffect from '@/Hooks/useUpdateEffect';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import React from 'react';
import {useEffect} from 'react';
import {useState} from 'react';
import {useSelector} from 'react-redux';
import moment from 'moment';
import 'moment/locale/ko';
import Loading from '@/Component/Layout/Loading';
import {reservationDatetimeEdit} from '@/API/ReservationManagement/ReservationManagement';
import {showToastMessage} from '@/Util/Toast';
import {AlertButton} from '@/Util/Alert';

export default function DateChange({route: {params}}) {
  const navigation = useNavigation();
  const {login} = useSelector(state => state);
  const isFocused = useIsFocused();
  const [selectItem, setSelectItem] = useState('');
  const [selectDate, setSelectDate] = useState(null);

  const [disabledDayList, setDisabledDayList] = useState([]); // 선택불가 날짜
  const [disabledTimeList, setDisabledTimeList] = useState([]); // 선택불가 시간
  const [timeList, setTimeList] = useState([]); // 선택가능한 시간
  const [isLoading, setIsLoading] = useState(true);

  const now = new Date(moment().format('YYYY-MM-DD HH:mm:ss'));

  const onPressSave = async () => {
    if (!selectItem) {
      AlertButton('시간을 선택해주세요.');
      return null;
    }
    if (!selectDate) {
      AlertButton('날짜를 선택해주세요.');
      return null;
    }
    const response = await reservationDatetimeEdit({
      od_idx: params?.od_idx,
      _mt_idx: login.idx,
      ot_pt_date: selectDate,
      ot_pt_time: selectItem,
    });
    if (response.data?.result === 'true') {
      showToastMessage('예약 시간이 변경되었습니다.');
      navigation.goBack();
    } else {
      AlertButton(`네트워크 오류 발생 다시 시도해주세요.\n${response.data.msg}`);
    }
  };
  useUpdateEffect(() => {
    if (selectDate) {
      getReservationTimeListHandle();
    }
    setSelectItem('');
  }, [selectDate]);

  useEffect(() => {
    if (isFocused) {
      onChangeMonth(
        selectDate?.substr(0, 7) ??
          `${now.getFullYear()}-${now.getMonth() + 1 < 10 ? '0' + (now.getMonth() + 1) : now.getMonth() + 1}`,
      );
    }
  }, [isFocused]);
  const getReservationTimeListHandle = async () => {
    setIsLoading(true);
    const data = await getReservationTimeList({
      ot_pt_date: selectDate,
      mt_idx: login.idx,
    }).then(res => res.data?.result === 'true' && res.data.data.data);
    if (data) {
      setDisabledTimeList(data?.order_time);
      if (Array.isArray(data?.store_time)) {
        const result = data.store_time
          .filter(item => item.flag === 'Y')
          .reduce((prev, curr) => {
            if (!prev?.ot_time) {
              return [...prev, curr.ot_time];
            } else {
              return [prev.ot_time, curr.ot_time];
            }
          });

        setTimeList(result);
      }
    }
    setIsLoading(false);
  };

  const onChangeMonth = day => {
    setSelectDate(null);
    setIsLoading(true);
    getdisabledReservationDayList({
      ot_pt_month: day,
      mt_idx: login?.idx,
    })
      .then(res => res.data.result === 'true' && res.data.data.data)
      .then(data => setDisabledDayList(data.disabled_date));
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && <Loading isAbsolute backgroundColor="#0004" />}
      <Header title="예약시간 변경" />
      <Box flex={1}>
        <ScrollBox flex={1}>
          <Box mg="0px 16px">
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
          <Box mg="40px 16px 20px">
            <LinkButton to={onPressSave} content="저장하기" />
          </Box>
        </ScrollBox>
      </Box>
    </>
  );
}
