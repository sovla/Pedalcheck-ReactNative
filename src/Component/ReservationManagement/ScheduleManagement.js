import {getReservationDayList, reservationDayListSave} from '@/API/ReservationManagement/ReservationManagement';
import {Box, Container} from '@/assets/global/Container';
import {GrayText} from '@/assets/global/Text';
import Theme from '@/assets/global/Theme';
import React from 'react';
import {useEffect} from 'react';
import {useLayoutEffect} from 'react';
import {useState} from 'react';
import {useSelector} from 'react-redux';
import DayScheduleManagement from './DayScheduleManagement';
import ScrollDays from './ScrollDays';
import {getDay} from '@Util/getDateList';
import {showToastMessage} from '@/Util/Toast';
import Loading from '@Component/Layout/Loading';

export default function ScheduleManagement() {
  const [daySelect, setDaySelect] = useState(new Date());
  const [orderList, setOrderList] = useState([]);
  const [timeList, setTimeList] = useState([]);
  const [allOff, setAllOff] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [memo, setMemo] = useState('');
  const [selectTime, setSelectTime] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const {login} = useSelector(state => state);
  useEffect(() => {
    setIsLoading(true);
    setSelectTime([]);
    getReservationDayList({
      _mt_idx: login.idx,
      date: getDay(daySelect),
    })
      .then(res => res.data?.result === 'true' && res.data.data.data)
      .then(data => {
        setTimeList(data.store_time);
        if (orderList.length === 0) {
          setOrderList(data.order_date);
        }

        setAllOff(data.st_off === 'Y');
        setRepeat(data.st_repeat === 'Y');
        setMemo(data.st_memo);
        setSelectTime(
          data.store_time.map(item => {
            if (item.flag === 'N') {
              return item.st_time;
            } else {
              return;
            }
          }),
        );
      });
    setIsLoading(false);
  }, [daySelect]);

  const onPressSave = () => {
    setIsLoading(true);
    if (!timeList?.length) {
      setIsLoading(false);
      return null;
    }
    let st_time = [];
    let flag = [];

    timeList.map((item, index) => {
      // {st_time1:시간,flag1:Y||N} 처럼 객체로 데이터 가공
      const findItem = selectTime.find(findItem => findItem === item.st_time);
      if (findItem) {
        st_time.push(item.st_time);
        flag.push('N');
      } else {
        st_time.push(item.st_time);
        flag.push(item.flag);
      }
    });

    reservationDayListSave({
      _mt_idx: login.idx,
      st_date: getDay(daySelect),
      st_repeat: repeat ? 'Y' : 'N',
      st_off: allOff ? 'Y' : 'N',
      st_memo: memo,
      st_time,
      flag,
    }).then(res => {
      if (res.data?.result === 'true') {
        showToastMessage(res.data.msg);
      } else {
        showToastMessage(res.data.msg);
      }
    });
    setIsLoading(false);
  };
  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <Container>
        <ScrollDays daySelect={daySelect} setDaySelect={setDaySelect} isNotPrev orderList={orderList} />
        <Box mg="0px 16px 40px">
          <GrayText fontSize={Theme.fontSize.fs13}>
            좌/우로 슬라이드하여 지난 주/다음 주 예약내역을 볼 수 있습니다.
          </GrayText>
        </Box>
        <DayScheduleManagement
          daySelect={daySelect}
          timeList={timeList}
          allOff={allOff}
          setAllOff={setAllOff}
          repeat={repeat}
          setRepeat={setRepeat}
          memo={memo}
          setMemo={setMemo}
          selectTime={selectTime}
          setSelectTime={setSelectTime}
          onPressSave={onPressSave}
        />
      </Container>
    </>
  );
}
