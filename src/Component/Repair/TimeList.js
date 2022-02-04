import {BorderButton} from '@/assets/global/Button';
import {Box, RowBox} from '@/assets/global/Container';
import Theme from '@/assets/global/Theme';
import withNthMap from '@/Util/nthMap';
import React from 'react';
import {Alert, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import 'moment/locale/ko';
import EqualsDay from '@/Util/EqualsDay';

export default function TimeList({timeList = [], disabled = [], selectItem, setSelectItem, selectDate, isMultiple}) {
  const TimeBoxWithNthChild = withNthMap(mapInnerItem);
  const {size} = useSelector(state => state);

  const now = new Date();

  const newSelectDate = new Date(selectDate);

  const onPressTime = time => {
    setSelectItem(time);
  };
  if (!Array.isArray(timeList) || timeList.length === 0) {
    return null;
  }

  return (
    <Box mg="0px 16px">
      <RowBox width={size.minusPadding} flexWrap="wrap">
        {timeList.map((item, index) => {
          if (!item) {
            return null;
          }
          const time = item ? item.split(':') : '';
          return (
            <TimeBoxWithNthChild
              key={index}
              rowNum={4}
              index={index}
              time={item}
              isDisabled={
                (!isMultiple && disabled?.find(findItem => item === findItem)) ||
                (!isMultiple &&
                  EqualsDay(now, newSelectDate) && // 날짜가 같고
                  newSelectDate.setHours(time[0], time[1]) < now.getTime()) // 현재보다 이전인 시간은 disabled
              }
              isSelect={!isMultiple ? selectItem === item : selectItem.find(findItem => findItem === item)}
              betweenMargin="0px 10px 10px 0px"
              onPress={() => onPressTime(item)}
              isMultiple={isMultiple}
            />
          );
        })}
      </RowBox>
    </Box>
  );
}

const mapInnerItem = ({time, mg, isSelect, isDisabled, onPress, isMultiple}) => {
  function threeCond(firstCond, secondCond, type) {
    //  색상 선택
    if (firstCond) {
      const color = isMultiple ? Theme.color.darkGray : Theme.color.white;
      const backgroundColor = isMultiple ? Theme.color.backgroundDisabled : Theme.color.skyBlue;
      return type === 'color' ? color : backgroundColor;
    } else if (secondCond) {
      return type === 'color' ? Theme.color.darkGray : Theme.color.backgroundDisabled;
    } else {
      return type === 'color' ? Theme.color.black : Theme.color.white;
    }
  }
  const color = threeCond(isSelect, isDisabled, 'color');
  const backgroundColor = threeCond(isSelect, isDisabled, 'backgroundColor');

  const isMultipleBorderColor = isMultiple ? Theme.borderColor.gray : Theme.borderColor.skyBlue;
  const borderColor = isSelect ? isMultipleBorderColor : Theme.borderColor.gray;
  return (
    <Box width="87.5px" mg={mg}>
      <TouchableOpacity disabled={isDisabled} onPress={onPress}>
        <BorderButton color={color} backgroundColor={backgroundColor} borderColor={borderColor} width="87.5px">
          {time}
        </BorderButton>
      </TouchableOpacity>
    </Box>
  );
};
