import {RowBox} from '@/assets/global/Container';
import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import ModalTitleBox from '../../Modal/ModalTitleBox';
import {LinkWhiteButton} from '@/assets/global/Button';
import {modalClose} from '@/Store/modalState';
import {DatePicker, Picker} from 'react-native-wheel-pick';
import {SetBirthDate} from '@/Store/birthDateState';
import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import {parse} from '@babel/core';
import {useLayoutEffect} from 'react';

export default function RepairDatePicker({birth, setBirth}) {
  const now = new Date();
  const [birthDate, setBirthDate] = useState({
    year,
    month,
    day,
  });
  const [day, setDay] = useState(getBetweenNumber(1, new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate()));
  const [isRender, setIsRender] = useState(false);
  const size = useSelector(state => state.size);
  const dispatch = useDispatch();

  const year = getBetweenNumber(1900, new Date().getFullYear());
  const month = getBetweenNumber(1, 12);

  const ChangeYear = (value, key) => {
    if (isRender) {
      console.log(birthDate, 'changeYear');

      setBirthDate(prev => {
        return {...prev, [key]: value};
      });
    }
  };

  const pickerWidth = getPixel((size.designWidth - 100) / 4);
  const onPressConfirm = () => {
    if (setBirth) {
      setBirth(new Date(birthDate.year, birthDate.month - 1));
    }
    dispatch(modalClose());
  };
  useEffect(() => {
    if (birthDate?.year > 1900) setDay(getBetweenNumber(1, new Date(birthDate?.year, birthDate?.month, 0).getDate()));
  }, [birthDate.month]);

  useLayoutEffect(() => {
    if (birth) {
      setBirthDate({
        year: parseInt(birth.year),
        month: parseInt(birth.month),
      });
    }
    setIsRender(true);
  }, []);

  if (day.length === 0) {
    return null;
  }
  console.log(birthDate);
  return (
    <>
      <ModalTitleBox size={size} title="날짜 선택" padding={32} />
      <RowBox mg="15px 0px 30px">
        <Picker
          style={{backgroundColor: 'white', width: pickerWidth, height: getHeightPixel(120)}}
          value={birthDate.year}
          onValueChange={value => ChangeYear(value, 'year')}
          pickerData={year}
          itemSpace={getPixel(40)}
          selectedValue={birthDate?.year ?? now.getFullYear()}
        />
        <Picker
          style={{backgroundColor: 'white', width: pickerWidth, height: getHeightPixel(120)}}
          value={birthDate.month}
          onValueChange={value => ChangeYear(value, 'month')}
          pickerData={month}
          itemSpace={getPixel(40)}
          selectedValue={birthDate?.month ?? now.getMonth() + 1}
        />
      </RowBox>
      <LinkWhiteButton content="확인" to={onPressConfirm} />
    </>
  );
}

const getBetweenNumber = (startNum, endNum) => {
  let result = [];
  for (let index = 0; startNum + index <= endNum; index++) {
    result.push(startNum + index);
  }
  return result;
};
