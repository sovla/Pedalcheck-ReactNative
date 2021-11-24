import {BorderButton, Button} from '@/assets/global/Button';
import {DefaultText} from '@/assets/global/Text';
import Theme from '@/assets/global/Theme';
import React from 'react';
import {View, Text} from 'react-native';

export default function Badge({badgeContent}) {
  let backgroundColor = Theme.color.skyBlue;
  if (badgeContent === '예약') {
    backgroundColor = Theme.color.indigo;
  } else if (badgeContent === '처리완료') {
    backgroundColor = Theme.color.black;
  } else if (badgeContent === '승인거부') {
    backgroundColor = Theme.color.red;
  }

  return (
    <Button
      width="66px"
      height="25px"
      borderRadius="5px"
      backgroundColor={backgroundColor}
      borderColor={backgroundColor}>
      <DefaultText
        fontSize={Theme.fontSize.fs13}
        fontWeight={Theme.fontWeight.medium}
        color={Theme.color.white}>
        {badgeContent}
      </DefaultText>
    </Button>
  );
}
