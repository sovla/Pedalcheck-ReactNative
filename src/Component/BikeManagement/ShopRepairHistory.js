import {Box, RowBox} from '@/assets/global/Container';
import {DarkBoldText, GrayText, IndigoText} from '@/assets/global/Text';
import Theme from '@/assets/global/Theme';
import React from 'react';
import {View, Text} from 'react-native';
import {useSelector} from 'react-redux';
import Badge from './Badge';

export default function ShopRepairHistory({item}) {
  const {size} = useSelector(state => state);
  return (
    <RowBox
      width={size.minusPadding}
      justifyContent="space-between"
      pd="16px 10px"
      backgroundColor="#0000"
      style={borderBottomWhiteGray}>
      <Box>
        <RowBox>
          <DarkBoldText fontSize={Theme.fontSize.fs15}>{item.product}</DarkBoldText>
          <IndigoText fontSize={Theme.fontSize.fs14}>{item.shopName}</IndigoText>
        </RowBox>
        <RowBox>
          <GrayText letterSpacing="0px" fontSize={Theme.fontSize.fs12}>
            {item.date}
          </GrayText>
        </RowBox>
      </Box>
      <Box>
        <Badge badgeContent={item.status} />
      </Box>
    </RowBox>
  );
}

export const borderBottomWhiteGray = {
  borderBottomWidth: 1,
  borderBottomColor: Theme.borderColor.whiteGray,
};
