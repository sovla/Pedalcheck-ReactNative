import Theme from '@/assets/global/Theme';
import {getPixel} from '@/Util/pixelChange';
import React from 'react';
import {Dropdown} from 'react-native-element-dropdown';
import {Box} from '@/assets/global/Container';
import {DarkText} from '@/assets/global/Text';
import DefaultImage from '@/assets/global/Image';
import ArrowDownIcon from '@assets/image/arr_down.png';
import {Platform} from 'react-native';

export default function DefaultDropdown({
  data,
  value,
  setValue,
  width = 65,
  height = 44,
  pdLeft = 20,
  isBorder = true,
  fontType = 'normal',
  fontSize = 15,
  disabled,
  backgroundColor = '#fff0',
}) {
  const fontFamily = fontType === 'normal' ? 'NotoSansKR-Regular' : `NotoSansKR-${fontType}`;
  return (
    <Dropdown
      disable={disabled}
      data={data}
      value={value}
      onChange={item => {
        setValue(item.value);
      }}
      labelField="label"
      valueField="value"
      selectedTextStyle={{
        color: Theme.color.black,
        fontSize: fontSize,
        fontFamily: fontFamily,
        letterSpacing: -0.45,
        paddingLeft: getPixel(pdLeft),
        includeFontPadding: false,
      }}
      style={{
        width: getPixel(width),
        height: height,
        color: 'black',
        backgroundColor: backgroundColor,
        borderRadius: 10,
        borderWidth: isBorder ? 1 : 0,
        borderColor: isBorder ? Theme.borderColor.gray : Theme.color.white,
      }}
      maxHeight={data.length * height}
      autoScroll={false}
      showsVerticalScrollIndicator={false}
      renderItem={item => {
        const isEqual = item?.value === value;
        return (
          <Box
            key={item}
            width="auto"
            height={`${height}px`}
            alignItems="center"
            justifyContent="center"
            style={[
              isEqual && {
                backgroundColor: '#F6F7F8',
              },
              isBorder && {
                borderWidth: 1,
                borderColor: Theme.borderColor.gray,
              },
            ]}>
            <DarkText>{item?.label}</DarkText>
          </Box>
        );
      }}
      renderRightIcon={() => {
        return (
          <Box justifyContent="center" alignItems="center">
            <DefaultImage width="24px" height="24px" source={ArrowDownIcon} />
          </Box>
        );
      }}
    />
  );
}
