import {ScrollBox} from '@/assets/global/Container';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {getPixel} from '@/Util/pixelChange';
import Card from '@/Component/ReservationManagement/Card';
import getDateList from '@/Util/getDateList';

export default function ScrollDays({setDaySelect, daySelect}) {
  const now = new Date();

  const dateList = getDateList(
    now.getTime() - 7 * 24 * 60 * 60 * 1000,
    now.getTime() + 7 * 24 * 60 * 60 * 1000,
  );
  const dayList = ['일', '월', '화', '수', '목', '금', '토'];
  return (
    <ScrollBox horizontal style={{width: getPixel(412)}} mg="20px 0px 10px">
      {dateList.map((item, index) => {
        const itemDate = new Date(item);
        return (
          <TouchableOpacity
            key={itemDate}
            onPress={() => setDaySelect(itemDate)}
            style={
              // 0 또는 마지막 아이템 양측에 마진값
              (index === 0 && {marginLeft: getPixel(16)}) ||
              (index + 1 === dateList.length && {marginRight: getPixel(16)})
            }>
            <Card
              dateDay={itemDate.getDate()}
              day={dayList.find((item, index) => index === itemDate.getDay())}
              count={'00'}
              isSelect={daySelect.toLocaleDateString() === itemDate.toLocaleDateString()}
            />
          </TouchableOpacity>
        );
      })}
    </ScrollBox>
  );
}
