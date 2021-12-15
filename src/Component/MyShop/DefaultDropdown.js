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
}) {
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
        height: getPixel(height),
        color: Theme.color.black,
        fontSize: getPixel(15),
        fontFamily: 'NotoSansKR-Regular',
        paddingLeft: getPixel(pdLeft),
      }}
      style={{
        width: getPixel(width),
        height: getPixel(height),
        color: 'black',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Theme.borderColor.gray,
      }}
      maxHeight={data.length * getPixel(height)}
      showsVerticalScrollIndicator={false}
      renderItem={item => {
        const isEqual = item?.value === value;
        return (
          <Box
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
