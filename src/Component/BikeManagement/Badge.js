import {BorderButton} from '@/assets/global/Button';
import Theme from '@/assets/global/Theme';
import React from 'react';
import {View, Text} from 'react-native';

export default function Badge({badgeContent}) {
  let backgroundColor = Theme.color.skyBlue;
  if (badgeContent === '예약') {
    backgroundColor = Theme.color.indigo;
  } else if (badgeContent === '처리완료') {
    backgroundColor = Theme.color.black;
  }

  return (
    <BorderButton
      width="66px"
      height="25px"
      borderRadius="5px"
      fontSize={Theme.fontSize.fs13}
      fontWeight={Theme.fontWeight.medium}
      color={Theme.color.white}
      backgroundColor={backgroundColor}
      borderColor={backgroundColor}>
      {badgeContent}
    </BorderButton>
  );
}
