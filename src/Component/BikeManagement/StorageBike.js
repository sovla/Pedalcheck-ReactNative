import {Button} from '@/assets/global/Button';
import {Box, RowBox} from '@/assets/global/Container';
import {DarkBoldText, DefaultText} from '@/assets/global/Text';
import Theme from '@/assets/global/Theme';
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Bike from './Bike';
import PlusIcon from '@assets/image/ic_plus_w.png';
import DefaultImage from '@assets/global/Image';

export default function StorageBike({size, item}) {
  const bikeCount = 3;
  return (
    <Box alignItems="center" flex={1}>
      <RowBox pd="20px 16px" justifyContent="space-between" width={size.designWidth}>
        <DarkBoldText>보관 자전거</DarkBoldText>
        <DarkBoldText>{bikeCount} 대</DarkBoldText>
      </RowBox>

      <Bike item={item} isUse={false} />
      <Bike item={item} isUse={false} />
      <Bike item={item} isUse={false} />
    </Box>
  );
}
