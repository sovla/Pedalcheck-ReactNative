import Theme from '@/assets/global/Theme';
import {getPixel} from '@/Util/pixelChange';
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {Calendar} from 'react-native-calendars';
import CheckIcon from '@assets/image/ic_check_cal.png';
import DefaultImage from '@assets/global/Image';
import CalendarLocalConfig from '@Util/CalendarLocalConfig';
import 'moment/locale/ko';
import {AlertButton} from '@/Util/Alert';
CalendarLocalConfig;

export default function ReservationCalendar({selectDate, setSelectDate, onChangeMonth = () => {}, disabledDayList, lastDay}) {
    const onPressDate = day => {
        if (lastDay && day.timestamp > lastDay) {
            AlertButton('쿠폰 유효기간보다 지난 날짜 입니다.');
            return;
        }

        if (disabledDayList?.length > 0 && disabledDayList.find(item => item === day.dateString)) {
            return null;
        }
        const getDay = new Date(day.dateString); // 9시 기준으로 반환됨
        const now = new Date(new Date().setHours(9, 0, 0, 0)); // 9시 설정

        if (getDay < now) {
            return null;
        }

        const {dateString} = day;
        if (new Date().getFullYear() === day.year && new Date().getMonth() + 1 === day.month && new Date().getDate() === day.day) {
            AlertButton('당일 예약의 경우 대기시간이 발생할 수 있으니 매장으로 전화문의 해주세요.');
        }
        setSelectDate(dateString);
    };
    let markedDates = {};
    if (Array.isArray(disabledDayList)) {
        disabledDayList.map((v, i) => {
            Object.assign(markedDates, {
                [v]: {
                    disabled: true,
                },
            });
        });
    }
    return (
        <Calendar
            markingType={'custom'}
            markedDates={{
                ...markedDates,
                [selectDate]: {
                    selected: true,
                },
            }}
            // 캘린더 제목의 월 형식. 값 형식 지정: http://arshaw.com/xdate/#Formatting
            monthFormat={'yyyy년 MM월'}
            // 비활성화된 날의 모든 터치 이벤트를 비활성화합니다. MarkDates에서 disableTouchEvent로 재정의할 수 있습니다.
            disableAllTouchEventsForDisabledDays={true}
            onDayPress={day => {
                onPressDate(day);
            }}
            onMonthChange={day => onChangeMonth(day?.dateString?.substr(0, 7))}
            style={{
                width: getPixel(412 - 32),
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

                textDayFontWeight: '300',
                textMonthFontWeight: 'bold',
                textDayHeaderFontWeight: '300',
                textMonthFontSize: 18,
                textDayHeaderFontSize: 13,
            }}
            dayComponent={({date, state, marking}) => {
                const isSelect = marking?.selected;
                const isDisabled = state === 'disabled' || marking?.disabled;
                const isToday = state === 'today';
                return (
                    <TouchableOpacity key={date} disabled={isDisabled} onPress={() => onPressDate(date)}>
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
                                    color: isToday ? Theme.color.skyBlue : isDisabled ? Theme.color.darkGray : Theme.color.black,
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
    );
}
