import {BorderButton} from '@/assets/global/Button';
import {Box, RowBox} from '@/assets/global/Container';
import Theme from '@/assets/global/Theme';
import withNthMap from '@/Util/nthMap';
import React from 'react';
import {Alert, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import 'moment/locale/ko';
import EqualsDay from '@/Util/EqualsDay';

export default function TimeList({timeList, disabled, selectItem, setSelectItem, selectDate}) {
  const TimeBoxWithNthChild = withNthMap(mapInnerItem);
  const {size} = useSelector(state => state);

  const now = new Date();

  const newSelectDate = new Date(selectDate);

  const onPressTime = time => {
    setSelectItem(time);
  };

  return (
    <Box mg="0px 16px">
      <RowBox width={size.minusPadding} flexWrap="wrap">
        {timeList.map((item, index) => {
          const time = item.split(':');
          return (
            <TimeBoxWithNthChild
              key={index}
              rowNum={4}
              index={index}
              time={item}
              isDisabled={
                disabled?.find(findItem => item === findItem) ||
                (EqualsDay(now, newSelectDate) &&
                  newSelectDate.setHours(time[0], time[1]) < now.getTime())
              }
              isSelect={selectItem === item}
              betweenMargin="0px 10px 10px 0px"
              onPress={() => onPressTime(item)}
            />
          );
        })}
      </RowBox>
    </Box>
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
