import {Box, RowBox} from '@/assets/global/Container';
import React from 'react';
import {DarkText} from '@/assets/global/Text';
import Theme from '@/assets/global/Theme';
import {BorderButton} from '@/assets/global/Button';
import {TouchableOpacity} from 'react-native';

export default function DatePickerComponent({onPressStart, onPressEnd, selectDate, onPressSearch}) {
  return (
    <RowBox alignItems="center">
      <TouchableOpacity onPress={onPressStart}>
        <BorderButton
          width="135px"
          height="36px"
          borderColor={Theme.borderColor.gray}
          color={Theme.color.black}>
          {selectDate?.start}
        </BorderButton>
      </TouchableOpacity>
      <DarkText mg="0px 6.5px">~</DarkText>
      <TouchableOpacity onPress={onPressEnd}>
        <BorderButton
          width="135px"
          height="36px"
          borderColor={Theme.borderColor.gray}
          color={Theme.color.black}>
          {selectDate.end}
        </BorderButton>
      </TouchableOpacity>
      <TouchableOpacity onPress={onPressSearch}>
        <Box mg="0px 0px 0px 10px">
          <BorderButton width="78px" height="36px">
            조회
          </BorderButton>
        </Box>
      </TouchableOpacity>
    </RowBox>
  );
}
