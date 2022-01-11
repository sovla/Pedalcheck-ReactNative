import {BetweenBox, Box, Container, RowBox, ScrollBox} from '@/assets/global/Container';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import CustomerSmileIcon from '@assets/image/menu07_top.png';
import CustomerCheckIcon from '@assets/image/ic_alluser.png';
import CustomerHeartIcon from '@assets/image/ic_heartuser.png';
import CustomerIcon from '@assets/image/ic_user.png';

import GradientHeader from '@/Component/Layout/GradientHeader';
import Theme from '@/assets/global/Theme';
import DefaultImage from '@/assets/global/Image';
import {DarkBoldText, DarkMediumText, IndigoText, MediumText} from '@/assets/global/Text';
import numberFormat from '@/Util/numberFormat';

export default function ({totalCustomer, likeShopCustomer, customer}) {
  return (
    <Box
      mg="20px 16px 40px"
      pd="20px 16px"
      borderRadius="10px"
      style={[{borderColor: Theme.borderColor.whiteLine, borderWidth: 1}, DefaultShadowStyle]}>
      <BetweenBox width={`${380 - 32}px`}>
        <RowBox>
          <DefaultImage source={CustomerCheckIcon} width="24px" height="24px" />
          <IndigoText
            mg="0px 0px 0px 10px"
            fontSize={Theme.fontSize.fs18}
            fontWeight={Theme.fontWeight.bold}>
            전체 고객
          </IndigoText>
        </RowBox>
        <IndigoText fontSize={Theme.fontSize.fs18} fontWeight={Theme.fontWeight.bold}>
          {numberFormat(totalCustomer)}
        </IndigoText>
      </BetweenBox>
      <BetweenBox width={`${380 - 32}px`}>
        <RowBox>
          <DefaultImage source={CustomerHeartIcon} width="24px" height="24px" />
          <DarkMediumText mg="0px 0px 0px 10px" fontSize={Theme.fontSize.fs15}>
            관심매장 고객
          </DarkMediumText>
        </RowBox>
        <DarkBoldText fontSize={Theme.fontSize.fs15} fontWeight>
          {numberFormat(likeShopCustomer)}
        </DarkBoldText>
      </BetweenBox>
      <BetweenBox width={`${380 - 32}px`}>
        <RowBox>
          <DefaultImage source={CustomerIcon} width="24px" height="24px" />
          <DarkMediumText mg="0px 0px 0px 10px" fontSize={Theme.fontSize.fs15}>
            일반 고객
          </DarkMediumText>
        </RowBox>
        <DarkBoldText fontSize={Theme.fontSize.fs15} fontWeight>
          {numberFormat(customer)}
        </DarkBoldText>
      </BetweenBox>
    </Box>
  );
}

const DefaultShadowStyle = {
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 1,
  },
  shadowOpacity: 0.7,
  shadowRadius: 1,
  elevation: 1,
};
