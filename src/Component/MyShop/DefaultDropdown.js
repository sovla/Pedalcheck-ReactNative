import Theme from '@/assets/global/Theme';
import {getPixel} from '@/Util/pixelChange';
import React from 'react';
import {Dropdown} from 'react-native-element-dropdown';
import {Box} from '@/assets/global/Container';
import {DarkText} from '@/assets/global/Text';

export default function DefaultDropdown({
  data,
  value,
  setValue,
  width = 65,
  height = 44,
  pdLeft = 20,
  isBorder = true,
  fontType = 'normal',
}) {
  const fontFamliy = fontType === 'normal' ? 'NotoSansKR-Regular' : `NotoSansKR-${fontType}`;
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
        fontSize: getPixel(15),
        fontFamily: fontFamliy,
        paddingLeft: getPixel(pdLeft),
      }}
      style={{
        width: getPixel(width),
        height: height,
        color: 'black',
        borderRadius: 10,
        alignItems: 'center',
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
    />
  );
}