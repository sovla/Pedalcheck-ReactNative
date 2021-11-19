import {BorderButton, LinkButton} from '@/assets/global/Button';
import {Box, PositionBox, RowBox, ScrollBox} from '@/assets/global/Container';
import DefaultLine from '@/assets/global/Line';
import Theme from '@/assets/global/Theme';
import Header from '@/Component/Layout/Header';
import withNthMap from '@/Util/nthMap';
import {getPixel} from '@/Util/pixelChange';
import React from 'react';
import {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {Calendar} from 'react-native-calendars';
import {useSelector} from 'react-redux';
import RepairReservationHeader from './RepairReservationHeader';
import CalendarLocalConfig from '@Util/CalendarLocalConfig';
import {DefaultText} from '@/assets/global/Text';
import CheckIcon from '@assets/image/ic_check_cal.png';
import DefaultImage from '@assets/global/Image';

CalendarLocalConfig;
export default function ShopReservationDate({navigation}) {
  const [selectItem, setSelectItem] = useState('');
  const [selectDate, setSelectDate] = useState(null);
  const onPressDate = day => {
    const {dateString} = day;
    const select = {
      [dateString]: {
        selected: true,
      },
    };

    setSelectDate(select);
  };
  const TimeBoxWithNthChild = withNthMap(mapInnerItem);
  const {size} = useSelector(state => state);
  const disabled = ['09:00', '09:30'];
  return (
    <>
      <Header title="정비예약" />
      <Box height={`${size.screenHeight - 50}px`}>
        <ScrollBox>
          <RepairReservationHeader step={3} />
          <DefaultLine height="10px" backgroundColor={Theme.borderColor.whiteLine} />
          <Box mg="20px 16px">
            <Calendar
              markingType={'custom'}
              markedDates={{...selectDate}}
              // 캘린더 제목의 월 형식. 값 형식 지정: http://arshaw.com/xdate/#Formatting
              monthFormat={'yyyy년 MM월'}
              // 비활성화된 날의 모든 터치 이벤트를 비활성화합니다. MarkDates에서 disableTouchEvent로 재정의할 수 있습니다.
              disableAllTouchEventsForDisabledDays={true}
              onDayPress={day => onPressDate(day)}
              style={{
                width: getPixel(size.designWidth - 32),
              }}
              theme={{
                'stylesheet.calendar.header': {
                  dayTextAtIndex0: {
                    color: 'red',
                  },
                  dayTextAtIndex1: {
                    color: '#333333',
                  },
                  dayTextAtIndex2: {
                    color: '#333333',
                  },
                  dayTextAtIndex3: {
                    color: '#333333',
                  },
                  dayTextAtIndex4: {
                    color: '#333333',
                  },
                  dayTextAtIndex5: {
                    color: '#333333',
                  },

                  dayTextAtIndex6: {
                    color: 'blue',
                  },
                },
                backgroundColor: '#ffffff',
                calendarBackground: '#ffffff',
                textSectionTitleColor: '#b6c1cd',
                textSectionTitleDisabledColor: '#d9e1e8',
                selectedDayBackgroundColor: '#00adf5',
                selectedDayTextColor: '#ffffff',
                todayTextColor: '#00adf5',
                dayTextColor: '#333333',

                arrowColor: 'gray',
                monthTextColor: '#333333',
                textDayFontFamily: 'monospace',
                textMonthFontFamily: 'monospace',
                textDayHeaderFontFamily: 'monospace',
                textDayFontWeight: '300',
                textMonthFontWeight: 'bold',
                textDayHeaderFontWeight: '300',
                textMonthFontSize: 18,
                textDayHeaderFontSize: 13,
              }}
              dayComponent={({date, state, marking}) => {
                const isSelect = marking?.selected;
                const isDisabled = state === 'disabled';
                const isToday = state === 'today';
                return (
                  <TouchableOpacity
                    key={date}
                    disabled={isDisabled}
                    onPress={() => onPressDate(date)}>
                    <View
                      style={{
                        height: getPixel(54),
                        width: getPixel(54),
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        borderWidth: isSelect && 1,
                        borderColor: isSelect && Theme.color.indigo,
                        borderRadius: 5,
                      }}>
                      <Text
                        style={{
                          color: isDisabled
                            ? Theme.color.gray
                            : isToday
                            ? Theme.color.skyBlue
                            : Theme.color.black,
                          fontSize: 13,
                        }}>
                        {date.day}
                      </Text>
                      {isSelect && <DefaultImage source={CheckIcon} width="20px" height="20px" />}
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          </Box>
          <Box mg="0px 16px">
            <RowBox width={size.minusPadding} flexWrap="wrap">
              {timeList.map((item, index) => {
                return (
                  <TimeBoxWithNthChild
                    key={index}
                    rowNum={4}
                    index={index}
                    time={item}
                    isDisabled={disabled.find(findItem => item === findItem)}
                    isSelect={selectItem === item}
                    betweenMargin="0px 10px 10px 0px"
                    onPress={() => setSelectItem(item)}
                  />
                );
              })}
            </RowBox>
          </Box>
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
const mapInnerItem = ({time, mg, isSelect, isDisabled, onPress}) => {
  function threeCond(firstCond, secondCond, type) {
    if (firstCond) {
      return type === 'color' ? Theme.color.white : Theme.color.skyBlue;
    } else if (secondCond) {
      return type === 'color' ? Theme.color.darkGray : Theme.color.backgroundDisabled;
    } else {
      return type === 'color' ? Theme.color.black : Theme.color.white;
    }
  }
  const color = threeCond(isSelect, isDisabled, 'color');
  const backgroundColor = threeCond(isSelect, isDisabled, 'backgroundColor');
  const borderColor = isSelect ? Theme.borderColor.skyBlue : Theme.borderColor.gray;
  return (
    <Box width="87.5px" mg={mg}>
      <TouchableOpacity disabled={isDisabled} onPress={onPress}>
        <BorderButton
          color={color}
          backgroundColor={backgroundColor}
          borderColor={borderColor}
          width="87.5px">
          {time}
        </BorderButton>
      </TouchableOpacity>
    </Box>
  );
};
const timeList = [
  '09:00',
  '09:30',
  '10:00',
  '10:30',
  '11:00',
  '11:30',
  '12:00',
  '12:30',
  '13:00',
  '13:30',
  '14:00',
  '14:30',
  '15:00',
  '15:30',
  '16:00',
  '16:30',
  '17:00',
  '17:30',
  '18:00',
  '18:30',
  '19:00',
  '19:30',
  '20:00',
  '20:30',
];
