import {BetweenBox, Box, RowBox} from '@/assets/global/Container';
import React from 'react';
import DefaultImage from '@/assets/global/Image';
import {DarkBoldText, DarkText, GrayText} from '@/assets/global/Text';
import Theme from '@/assets/global/Theme';
import numberFormat from '@/Util/numberFormat';
import CustomerHeartIcon from '@assets/image/ic_heartuser.png';
import CustomerIcon from '@assets/image/ic_user.png';
import SpannerIcon from '@assets/image/menu01_on.png';
import LikeIcon from '@assets/image/good_b.png';

const ShopCustomerStats = ({likeCustomer = 123456, customer = 7890, repairCount = 10000, likeCount = 123456}) => {
  const date = new Date();
  return (
    <Box width="380px" pd="10px 16px 20px" borderRadius="10px" mg="26px 0px 0px">
      <BetweenBox width="348px" mg="10px 0px 0px" alignItems="center">
        <DarkBoldText fontSize={Theme.fontSize.fs15}>매장 현황 리뷰</DarkBoldText>
        <GrayText fontSize={Theme.fontSize.fs13}>업데이트 {date.toISOString().split('T')[0]}</GrayText>
      </BetweenBox>
      <RowBox width="348px" mg="10px 0px 0px" alignItems="center">
        <DefaultImage source={CustomerIcon} width="24px" height="24px" />
        <DarkBoldText mg="0px 5px 0px 10px" fontSize={Theme.fontSize.fs15}>
          {numberFormat(customer)}
        </DarkBoldText>
        <DarkText fontSize={Theme.fontSize.fs15}>일반고객</DarkText>
      </RowBox>
      <RowBox width="348px" mg="10px 0px 0px" alignItems="center">
        <DefaultImage source={SpannerIcon} width="24px" height="24px" />
        <DarkBoldText mg="0px 5px 0px 10px" fontSize={Theme.fontSize.fs15}>
          {numberFormat(repairCount)}
        </DarkBoldText>
        <DarkText fontSize={Theme.fontSize.fs15}>누적 정비 건수</DarkText>
      </RowBox>
      <RowBox width="348px" mg="10px 0px 0px" alignItems="center">
        <DefaultImage source={LikeIcon} width="24px" height="24px" />
        <DarkBoldText mg="0px 5px 0px 10px" fontSize={Theme.fontSize.fs15}>
          {numberFormat(likeCount)}
        </DarkBoldText>
        <DarkText fontSize={Theme.fontSize.fs15}>좋아요 수</DarkText>
      </RowBox>
    </Box>
  );
};

export default ShopCustomerStats;
