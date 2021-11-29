import {Box, RowBox} from '@/assets/global/Container';
import {DarkBoldText} from '@/assets/global/Text';
import React from 'react';
import Bike from './Bike';

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
