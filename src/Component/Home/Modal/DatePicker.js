import {RowBox} from '@/assets/global/Container';
import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import ModalTitleBox from '../../Modal/ModalTitleBox';
import {LinkWhiteButton} from '@/assets/global/Button';
import {modalClose} from '@/Store/modalState';
// import {Picker} from 'react-native-wheel-pick';
import {SetBirthDate} from '@/Store/birthDateState';

export default function BirthDatePicker() {
  const now = new Date();
  const [birthDate, setBirthDate] = useState({
    year,
    month,
    day,
  });
  const [day, setDay] = useState(
    getBetweenNumber(1, new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate()),
  );
  const size = useSelector(state => state.size);
  const dispatch = useDispatch();

  const year = getBetweenNumber(1900, new Date().getFullYear());
  const month = getBetweenNumber(1, 12);

  const ChangeYear = (value, key) => {
    setBirthDate(prev => {
      return {...prev, [key]: value};
    });
  };

  const pickerWidth = (size.screenWidth - 100) / 4;
  const onPressConfirm = () => {
    dispatch(SetBirthDate({year: birthDate.year, month: birthDate.month, day: birthDate.day}));
    dispatch(modalClose());
  };
  useEffect(() => {
    if (birthDate?.year > 1900)
      setDay(getBetweenNumber(1, new Date(birthDate?.year, birthDate?.month, 0).getDate()));
  }, [birthDate.month]);

  // const DayPicker = useCallback(() => {
  //   return (
  //     <Picker
  //       style={{backgroundColor: 'white', width: pickerWidth, height: 120}}
  //       value={birthDate.day}
  //       onValueChange={value => ChangeYear(value, 'day')}
  //       pickerData={day}
  //       itemSpace={40}
  //       selectedValue={1}
  //     />
  //   );
  // }, [birthDate.month, day]);
  if (day.length === 0) {
    return null;
  }
  return (
    <>
      <ModalTitleBox size={size} title="날짜 선택" padding={32} />
      <RowBox mg="15px 0px 30px">
        {/* <Picker
          style={{backgroundColor: 'white', width: pickerWidth, height: 120}}
          value={birthDate.year}
          onValueChange={value => ChangeYear(value, 'year')}
          pickerData={year}
          itemSpace={40}
          selectedValue={now.getFullYear()}
        />
        <Picker
          style={{backgroundColor: 'white', width: pickerWidth, height: 120}}
          value={birthDate.month}
          onValueChange={value => ChangeYear(value, 'month')}
          pickerData={month}
          itemSpace={40}
          selectedValue={now.getMonth() + 1}
        />
        <Picker
          style={{backgroundColor: 'white', width: pickerWidth, height: 120}}
          value={birthDate.day}
          onValueChange={value => ChangeYear(value, 'day')}
          pickerData={day}
          itemSpace={40}
          selectedValue={1}
        />
        <Picker
          style={{backgroundColor: 'white', width: pickerWidth, height: 120}}
          value={birthDate}
          onValueChange={() => {}}
          pickerData={['양력', '음력']}
          itemSpace={40}
          selectedValue={now.getFullYear()}
        /> */}
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
