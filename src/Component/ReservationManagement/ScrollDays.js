import {Box, ScrollBox} from '@/assets/global/Container';
import React from 'react';
import {FlatList, TouchableOpacity} from 'react-native';
import {getPixel} from '@/Util/pixelChange';
import Card from '@/Component/ReservationManagement/Card';
import getDateList from '@/Util/getDateList';
import {useEffect} from 'react';
import {useLayoutEffect} from 'react';
import {useRef} from 'react';
import moment from 'moment';
import 'moment/locale/ko';
import {numberChangeFormat} from '@/Util/numberFormat';
import {useState} from 'react';
import useUpdateEffect from '@/Hooks/useUpdateEffect';

export default function ScrollDays({setDaySelect, daySelect, isNotPrev, orderList = []}) {
  const now = new Date(moment().format('YYYY-MM-DD'));
  const flatListRef = useRef(null);

  const prevDay = isNotPrev ? 0 : 7;
  const nextDay = isNotPrev ? 13 : 7;

  const dateList = getDateList(
    now.getTime() - prevDay * 24 * 60 * 60 * 1000,
    now.getTime() + nextDay * 24 * 60 * 60 * 1000,
  ).map(item => {
    const orderItem = orderList.find(findItem => findItem.date === item);
    if (orderItem) {
      return {
        date: item,
        count: parseInt(orderItem.ot_cnt),
      };
    } else {
      return {
        date: item,
        count: 0,
      };
    }
  });
  const dayList = ['일', '월', '화', '수', '목', '금', '토'];

  useLayoutEffect(() => {
    if (flatListRef?.current?.props?.data?.length) {
      if (!isNotPrev)
        console.log(
          flatListRef.current.scrollToOffset({
            offset: getPixel(384),
            animated: true,
          }),
        );
    }
  }, []);

  return (
    <Box style={{height: 83}} mg="20px 0px 10px">
      <FlatList
        ref={flatListRef}
        horizontal
        removeClippedSubviews={false}
        initialNumToRender={20}
        getItemLayout={(data, index) => ({length: getPixel(50), offset: getPixel(50) * index, index})}
        data={dateList}
        renderItem={({item, index}) => {
          if (!item?.date) {
            return null;
          }

          const itemDate = new Date(item.date);
          const count = item?.count;

          return (
            <TouchableOpacity
              key={itemDate}
              onPress={() => setDaySelect(itemDate)}
              style={
                // 0 또는 마지막 아이템 양측에 마진값
                [
                  (index === 0 && {marginLeft: getPixel(16)}) ||
                    (index + 1 === dateList.length && {marginRight: getPixel(16)}),
                ]
              }>
              <Card
                dateDay={itemDate.getDate()}
                day={dayList.find((item, index) => index === itemDate.getDay())}
                count={numberChangeFormat(count)}
                isSelect={daySelect.toLocaleDateString() === itemDate.toLocaleDateString()}
              />
            </TouchableOpacity>
          );
        }}
      />
    </Box>
  );
}
