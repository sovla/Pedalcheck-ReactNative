import Theme from '@/assets/global/Theme';
import {getPixel} from '@/Util/pixelChange';
import React from 'react';
import {Dropdown} from 'react-native-element-dropdown';
import {Box} from '@/assets/global/Container';
import {DarkText} from '@/assets/global/Text';
import DefaultImage from '@/assets/global/Image';
import ArrowDownIcon from '@assets/image/arr_down.png';
import { Platform } from 'react-native';

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
}) {
  let fontFamily = '';
  if(Platform.OS === "android"){
    fontFamliy = fontType === 'normal' ? 'NotoSansKR-Regular' : `NotoSansKR-${fontType}`;
  }else{
    fontFamliy = fontType === 'normal' ? 'NotoSansCJKkr-RegularTTF' : `NotoSansCJKkr-${fontType}TTF`;
  }
  return (
    <Dropdown
      data={data}
      value={value}
      onChange={item => {
        setValue(item.value);
      }}
      labelField="label"
      valueField="value"
      selectedTextStyle={{
        width: getPixel(width),
        height: height,
        color: Theme.color.black,
        fontSize: fontSize,
        fontFamily: fontFamliy,
        letterSpacing: -0.45,
        justifyContent:'center',
        paddingLeft: getPixel(pdLeft),
      }}
      style={{
        width: getPixel(width),
        height: height,
        color: 'black',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent:'center', 
        borderWidth: isBorder ? 1 : 0,
        borderColor: isBorder ? Theme.borderColor.gray : Theme.color.white,
      }}
      maxHeight={data.length * height}
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
            style={
              isEqual && {
                backgroundColor: '#F6F7F8',
              }
            }>
            <DarkText>{item?.label}</DarkText>
          </Box>
        );
      }}
      renderRightIcon={() => {
        return (
          <Box>
            <DefaultImage width="24px" height="24px" source={ArrowDownIcon} />
          </Box>
        );
      }}
    />
  );
}
