import {Box, RowBox} from '@/assets/global/Container';
import React from 'react';
import {DarkText, DefaultText} from '@/assets/global/Text';
import Theme from '@/assets/global/Theme';
import {BorderButton} from '@/assets/global/Button';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import {dateFormat} from '@/Util/DateFormat';
import CalendarIcon from '@assets/image/calendar.png';
import DefaultImage from '@/assets/global/Image';
import pixelChange, {getPixel} from '@/Util/pixelChange';
import {useLayoutEffect} from 'react';

export default function DatePickerComponent({onPressStart, onPressEnd, selectDate, onPressSearch, setSelectDate}) {
  const storeInfo = useSelector(state => state.storeInfo);
  useLayoutEffect(() => {
    setSelectDate({
      start: storeInfo.mst_wdate.substring(0, 10),
      end: dateFormat(new Date()),
    });
  }, []);

  return (
    <RowBox alignItems="center">
      <TouchableOpacity style={styles.rowBoxTouch} onPress={onPressStart}>
        <DarkText fontSize={Theme.fontSize.fs14}>{selectDate.start}</DarkText>
        <Box width="10px" />
        <DefaultImage source={CalendarIcon} width="15.5px" height="15.5px" />
      </TouchableOpacity>
      <DarkText mg="0px 6.5px">~</DarkText>

      <TouchableOpacity style={styles.rowBoxTouch} onPress={onPressEnd}>
        <DarkText fontSize={Theme.fontSize.fs14}>{selectDate.end}</DarkText>
        <Box width="10px" />
        <DefaultImage source={CalendarIcon} width="15.5px" height="15.5px" />
      </TouchableOpacity>

      <TouchableOpacity onPress={onPressSearch}>
        <Box mg="0px 0px 0px 10px">
          <Box
            justifyContent="center"
            alignItems="center"
            width="78px"
            height="36px"
            borderColor={Theme.color.skyBlue}
            borderRadius={pixelChange('3px')}>
            <DefaultText color={Theme.color.skyBlue}>조회</DefaultText>
          </Box>
        </Box>
      </TouchableOpacity>
    </RowBox>
  );
}

const styles = StyleSheet.create({
  rowBoxTouch: {
    width: getPixel(135),
    height: 36,
    alignItems: 'center',
    borderColor: '#E5E5E5',
    borderWidth: 1,
    borderRadius: getPixel(3),
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 7,
    paddingVertical: 3,
  },
});
