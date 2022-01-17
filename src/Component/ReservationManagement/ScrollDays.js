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

export default function ScrollDays({setDaySelect, daySelect}) {
  const now = new Date();
  const flatListRef = useRef(null);
  const dateList = getDateList(
    now.getTime() - 7 * 24 * 60 * 60 * 1000,
    now.getTime() + 7 * 24 * 60 * 60 * 1000,
  );
  const dayList = ['일', '월', '화', '수', '목', '금', '토'];

  useEffect(() => {
    if (flatListRef?.current?.props?.data?.length) {
      flatListRef.current.scrollToEnd();
    }
  }, []);
  return (
    <Box style={{height: 83}} mg="20px 0px 10px">
      <FlatList
        ref={flatListRef}
        horizontal
        getItemLayout={(data, index) => ({length: 83, offset: 300, index})}
        data={dateList}
        renderItem={({item, index}) => {
          const itemDate = new Date(item);
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
                count={'00'}
                isSelect={daySelect.toLocaleDateString() === itemDate.toLocaleDateString()}
              />
            </TouchableOpacity>
          );
        }}
      />
    </Box>
  );
}
