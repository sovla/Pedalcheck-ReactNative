import {PositionBox, RowBox} from '@/assets/global/Container';
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import ModalTitleBox from '../../Modal/ModalTitleBox';
import {LinkWhiteButton} from '@/assets/global/Button';
import {modalClose} from '@/Store/modalState';

import {SetBirthDate} from '@/Store/birthDateState';
import {useLayoutEffect} from 'react';
import DatePicker from 'react-native-date-picker';
import useUpdateEffect from '@/Hooks/useUpdateEffect';
import {numberChangeFormat} from '@Util/numberFormat';
export default function BirthDatePicker({birth, setBirth}) {
  const now = new Date();

  const [birthDate, setBirthDate] = useState({
    year: now.getFullYear,
    month: now.getMonth() + 1,
    day: now.getDate(),
  });
  const [dateDummy, setDateDummy] = useState(new Date());
  const size = useSelector(state => state.size);
  const dispatch = useDispatch();

  const onPressConfirm = () => {
    if (setBirth) {
      setBirth(birthDate);
    }
    dispatch(SetBirthDate({year: birthDate.year, month: birthDate.month, day: birthDate.day}));
    dispatch(modalClose());
  };

  useUpdateEffect(() => {
    setBirthDate({
      year: dateDummy.getFullYear(),
      month: dateDummy.getMonth() + 1,
      day: dateDummy.getDate(),
    });
  }, [dateDummy]);

  useLayoutEffect(() => {
    if (birth) {
      setDateDummy(new Date(`${birth.year}-${numberChangeFormat(birth.month)}-${numberChangeFormat(birth.day)}`));
      setBirthDate({
        year: birth.year,
        month: birth.month,
        day: birth.day,
      });
    }
  }, []);

  return (
    <>
      <ModalTitleBox size={size} title="날짜 선택" padding={32} />
      <RowBox>
        <DatePicker
          date={dateDummy}
          onDateChange={date => {
            setDateDummy(date);
          }}
          mode="date"
          locale="ko"
          maximumDate={new Date()}
          minimumDate={new Date('1900-01-01')}
        />
      </RowBox>
      <LinkWhiteButton content="확인" to={onPressConfirm} />
    </>
  );
}
