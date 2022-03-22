import {BetweenBox, Box, RowBox} from '@/assets/global/Container';
import {DarkBoldText, DarkText, DefaultText, GrayText, MediumText} from '@/assets/global/Text';
import Theme from '@/assets/global/Theme';
import {borderBottomWhiteGray} from '@/Component/BikeManagement/ShopRepairHistory';
import React from 'react';
import Badge from '@/Component/BikeManagement/Badge';

const UseCouponItem = ({
  couponName = '쿠폰이름',
  shopName = '매장명',
  bikeNickName = '',
  useCouponDate = '',
  badgeContent,
  rejectionContent = '',
  useCouponShopName,
  couponDate,
}) => {
  // const height = badgeContent === '미사용' ? '120px' : '100px';
  return (
    <Box style={borderBottomWhiteGray} width="380px" mg="0px 16px">
      <BetweenBox alignItems="center" pd="16px 10px" width="100%" height={'auto'}>
        <Box>
          <RowBox alignItems="center">
            <DarkBoldText mg="0px 0px 3px">{couponName}</DarkBoldText>
          </RowBox>
          <RowBox alignItems="center">
            <DarkText fontSize={Theme.fontSize.fs14} mg="0px 5px 0px 0px">
              발행
            </DarkText>
            <MediumText mg="0px 0px 0px 5px" color={Theme.color.indigo} fontSize={Theme.fontSize.fs14}>
              {shopName}
            </MediumText>
          </RowBox>
          <RowBox alignItems="center">
            <GrayText fontSize={Theme.fontSize.fs14} mg="0px 5px 0px 0px">
              쿠폰 유효기간
            </GrayText>
            <GrayText fontSize={Theme.fontSize.fs14}>{couponDate}</GrayText>
          </RowBox>
          <RowBox alignItems="center">
            <DarkText fontSize={Theme.fontSize.fs14} mg="0px 5px 0px 0px">
              사용
            </DarkText>
            <MediumText mg="0px 0px 0px 5px" color={Theme.color.indigo} fontSize={Theme.fontSize.fs14}>
              {useCouponShopName}
            </MediumText>
          </RowBox>

          <RowBox alignItems="center">
            <DarkText fontSize={Theme.fontSize.fs13} mg="0px 5px 0px 0px">
              예약일시
            </DarkText>
            <GrayText fontSize={Theme.fontSize.fs13}>{useCouponDate}</GrayText>
          </RowBox>
          {badgeContent === '승인취소' && (
            <DefaultText color={Theme.color.red} fontSize={Theme.fontSize.fs13}>
              {rejectionContent}
            </DefaultText>
          )}
        </Box>
        <Box height="100%">
          <Badge badgeContent={badgeContent} />
        </Box>
      </BetweenBox>
    </Box>
  );
};

export default UseCouponItem;
