import {Button} from '@/assets/global/Button';
import {DefaultText} from '@/assets/global/Text';
import Theme from '@/assets/global/Theme';
import React from 'react';

export default function Badge({badgeContent}) {
  let backgroundColor = Theme.color.skyBlue;
  switch (badgeContent) {
    case '예약':
    case '결제대기':
      backgroundColor = Theme.color.indigo;
      break;
    case '처리완료':
    case '환불':
      backgroundColor = Theme.color.black;
      break;
    case '승인취소':
    case '결제취소':
      backgroundColor = Theme.color.red;
      break;
    case '예약취소':
    case '미사용':
      backgroundColor = Theme.color.yellow;
      break;
  }

  return (
    <Button
      width="66px"
      height="25px"
      borderRadius="5px"
      backgroundColor={backgroundColor}
      borderColor={backgroundColor}>
      <DefaultText fontSize={Theme.fontSize.fs13} fontWeight={Theme.fontWeight.medium} color={Theme.color.white}>
        {badgeContent}
      </DefaultText>
    </Button>
  );
}
