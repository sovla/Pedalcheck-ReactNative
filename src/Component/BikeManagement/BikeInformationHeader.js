import {Box, RowBox} from '@/assets/global/Container';
import React from 'react';
import DefaultImage from '@assets/global/Image';
import Theme from '@/assets/global/Theme';
import DummyIcon from '@assets/image/default_5.png';
import {DarkText, GrayText} from '@/assets/global/Text';

export default function BikeInformationHeader({item, mg = '20px 0px'}) {
  return (
    <RowBox mg={mg} alignItems="center">
      <DefaultImage source={DummyIcon} width="74px" height="74px" />
      <Box mg="0px 0px 0px 20px">
        <RowBox>
          <DarkText fontSize={Theme.fontSize.fs15} fontWeight={Theme.fontWeight.medium}>
            {item.brand}
          </DarkText>
          <DarkText
            mg="0px 0px 0px 10px"
            fontSize={Theme.fontSize.fs15}
            fontWeight={Theme.fontWeight.medium}>
            {item.modelName}
          </DarkText>
        </RowBox>
        <GrayText fontSize={Theme.fontSize.fs15}>{item.bikeName}</GrayText>
      </Box>
    </RowBox>
  );
}
