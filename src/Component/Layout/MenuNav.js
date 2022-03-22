import {Box, RowBox} from '@/assets/global/Container';
import {DefaultText} from '@/assets/global/Text';
import Theme from '@/assets/global/Theme';
import {getPixel} from '@/Util/pixelChange';
import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';

export default function MenuNav({menuItem, setSelect, select}) {
  const {size} = useSelector(state => state);
  return (
    <RowBox pd="16px 16px 0px" height="46px" width={412}>
      {menuItem.map(item => {
        const isSelect = select === item;
        return (
          <TouchableOpacity
            key={item}
            style={{flex: 1}}
            onPress={() => {
              setSelect(item);
            }}>
            <Box
              height="30px"
              justifyContent="center"
              alignItems="center"
              style={isSelect ? styles.menuSelectBorder : styles.menuBorder}>
              <DefaultText
                fontSize={Theme.fontSize.fs15}
                color={isSelect ? Theme.color.indigo : Theme.color.gray}
                fontWeight={isSelect && Theme.fontWeight.bold}>
                {item}
              </DefaultText>
            </Box>
          </TouchableOpacity>
        );
      })}
    </RowBox>
  );
}

const styles = StyleSheet.create({
  menuBorder: {
    borderBottomColor: Theme.borderColor.gray,
    borderBottomWidth: getPixel(1),
  },
  menuSelectBorder: {
    borderBottomColor: Theme.color.indigo,
    borderBottomWidth: getPixel(2),
  },
});
