import {BorderButton} from '@/assets/global/Button';
import {Box, RowBox} from '@/assets/global/Container';
import Theme from '@/assets/global/Theme';
import withNthMap from '@/Util/nthMap';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';

export default function TimeList({timeList, disabled, selectItem, setSelectItem}) {
  const TimeBoxWithNthChild = withNthMap(mapInnerItem);
  const {size} = useSelector(state => state);
  return (
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
