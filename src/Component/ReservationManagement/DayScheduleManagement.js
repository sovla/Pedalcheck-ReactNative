import {BetweenBox, Box, RowBox} from '@/assets/global/Container';
import {disabled, timeList} from '@/assets/global/dummy';
import {DefaultInput} from '@/assets/global/Input';
import {DarkBoldText, DarkText} from '@/assets/global/Text';
import Theme from '@/assets/global/Theme';
import React from 'react';
import {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import {DefaultCheckBox} from '../Home/CheckBox';
import TimeList from '../Repair/TimeList';

export default function DayScheduleManagement() {
  const {size} = useSelector(state => state);
  const [selectItem, setSelectItem] = useState('');
  const [allOff, setAllOff] = useState(false);
  const [weeklyRepeat, setWeeklyRepeat] = useState(false);
  return (
    <>
      <Box mg="0px 16px 20px">
        <BetweenBox width={size.minusPadding}>
          <DarkBoldText>일정 리스트</DarkBoldText>

          <TouchableOpacity onPress={() => setAllOff(!allOff)}>
            <RowBox>
              <DefaultCheckBox isDisabled isCheck={allOff} />
              <DarkText mg="0px 0px 0px 5px" fontSize={Theme.fontSize.fs14}>
                전체 Off
              </DarkText>
            </RowBox>
          </TouchableOpacity>
        </BetweenBox>
      </Box>
      <TimeList
        timeList={timeList}
        disabled={disabled}
        selectItem={selectItem}
        setSelectItem={setSelectItem}
      />
      <Box mg="0px 16px 20px">
        <TouchableOpacity onPress={() => setWeeklyRepeat(!weeklyRepeat)}>
          <RowBox>
            <DefaultCheckBox isCheck={weeklyRepeat} isDisabled />
            <DarkText mg="0px 0px 0px 5px" fontSize={Theme.fontSize.fs14}>
              주간반복 설정
            </DarkText>
          </RowBox>
        </TouchableOpacity>
      </Box>
      <Box mg="0px 16px 30px">
        <DarkBoldText mg="0px 0px 10px">메모</DarkBoldText>
        <DefaultInput
          width={size.minusPadding}
          height="100px"
          placeHolder="메모를 입력해주세요"
          isAlignTop
          multiline
        />
      </Box>
    </>
  );
}
