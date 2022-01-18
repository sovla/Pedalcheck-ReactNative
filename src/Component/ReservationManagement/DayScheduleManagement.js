import {LinkButton} from '@/assets/global/Button';
import {BetweenBox, Box, RowBox} from '@/assets/global/Container';
import {DefaultInput} from '@/assets/global/Input';
import {DarkBoldText, DarkText} from '@/assets/global/Text';
import Theme from '@/assets/global/Theme';
import {AlertButtons} from '@/Util/Alert';
import React from 'react';
import {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import {DefaultCheckBox} from '../Home/CheckBox';
import TimeList from '../Repair/TimeList';

export default function DayScheduleManagement({
  allOff,
  setAllOff,
  repeat,
  setRepeat,
  memo,
  setMemo,
  daySelect,
  timeList,
  selectTime,
  setSelectTime,
  onPressSave,
}) {
  const {size} = useSelector(state => state);
  const isTimeListArray = Array.isArray(timeList);
  const storeTimeList = isTimeListArray && timeList?.map(item => item.st_time);
  const storeTimeDisabledList =
    isTimeListArray &&
    timeList?.map(item => {
      if (item?.flag === 'N') {
        return item.st_time;
      }
    });

  const onPressTime = time => {
    if (selectTime.find(findItem => findItem === time)) {
      setSelectTime(selectTime.filter(filterItem => filterItem !== time));
    } else {
      setSelectTime(prev => [...prev, time]);
    }
  };

  const onPressRepeat = () => {
    if (!repeat) {
      AlertButtons('일정을 주간반복 하시겠습니까?', '확인', '취소', () => setRepeat(!repeat));
    } else {
      setRepeat(!repeat);
    }
  };
  return (
    <>
      <Box mg="0px 16px 20px">
        <BetweenBox width={size.minusPadding}>
          <DarkBoldText>일정 리스트</DarkBoldText>

          <TouchableOpacity onPress={() => setAllOff(!allOff)}>
            <RowBox alignItems="center">
              <DefaultCheckBox isDisabled isCheck={allOff} />
              <DarkText mg="0px 0px 0px 5px" fontSize={Theme.fontSize.fs14}>
                전체 Off
              </DarkText>
            </RowBox>
          </TouchableOpacity>
        </BetweenBox>
      </Box>
      <TimeList
        timeList={storeTimeList ?? []}
        disabled={storeTimeDisabledList ?? []}
        selectItem={selectTime}
        setSelectItem={onPressTime}
        selectDate={daySelect}
        isMultiple
      />
      <Box mg="0px 16px 20px">
        <TouchableOpacity onPress={onPressRepeat}>
          <RowBox alignItems="center">
            <DefaultCheckBox isCheck={repeat} isDisabled />
            <DarkText mg="0px 0px 0px 5px" fontSize={Theme.fontSize.fs14}>
              주간반복 설정
            </DarkText>
          </RowBox>
        </TouchableOpacity>
      </Box>
      <Box mg="0px 16px 10px">
        <DarkBoldText mg="0px 0px 10px">메모</DarkBoldText>
        <DefaultInput
          width={size.minusPadding}
          height="100px"
          placeHolder="메모를 입력해주세요"
          isAlignTop
          multiline
          value={memo}
          changeFn={setMemo}
        />
      </Box>
      <Box mg="10px 16px 20px">
        <LinkButton content="저장하기" to={onPressSave} />
      </Box>
    </>
  );
}
