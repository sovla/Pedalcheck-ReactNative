import {Box, PositionBox, RowBox} from '@/assets/global/Container';
import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import ModalTitleBox from '../../Modal/ModalTitleBox';
import {LinkWhiteButton} from '@/assets/global/Button';
import {modalClose} from '@/Store/modalState';
import DatePicker from 'react-native-date-picker';
import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import {parse} from '@babel/core';
import {useLayoutEffect} from 'react';
import {numberChangeFormat} from '@/Util/numberFormat';

export default function RepairDatePicker({birth, setBirth}) {
  const now = new Date();
  const size = useSelector(state => state.size);
  const dispatch = useDispatch();

  const [date, setDate] = useState(new Date());

  const onPressConfirm = () => {
    if (setBirth) {
      setBirth(date);
    }
    dispatch(modalClose());
  };

  return (
    <>
      <ModalTitleBox title="날짜 선택" padding={32} />
      <RowBox mg="15px 0px 30px" alignItems="center" justifyContent="center">
        <Box width="100px" />
        <DatePicker
          date={date}
          onDateChange={selectDate => {
            setDate(selectDate);
          }}
          mode="date"
          maximumDate={
            new Date(
              `${now.getFullYear() + 3}-${numberChangeFormat(now.getMonth() + 1)}-${numberChangeFormat(now.getDate())}`,
            )
          }
          minimumDate={
            new Date(
              `${now.getFullYear() - 3}-${numberChangeFormat(now.getMonth() + 1)}-${numberChangeFormat(now.getDate())}`,
            )
          }
          style={{
            maxWidth: 400,
          }}
        />
        <PositionBox top="0px" left="80px" width="60px" height="100%" backgroundColor="#fff" zIndex={1000} />
        <PositionBox top="0px" right="0px" width="120px" height="100%" backgroundColor="#fff" zIndex={1000} />
      </RowBox>
      <LinkWhiteButton content="확인" to={onPressConfirm} />
    </>
  );
}
