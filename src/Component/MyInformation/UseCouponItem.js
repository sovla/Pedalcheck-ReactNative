import {Button} from '@/assets/global/Button';
import {BetweenBox, Box, RowBox} from '@/assets/global/Container';
import DefaultImage from '@/assets/global/Image';
import {DarkBoldText, DarkText, DefaultText, GrayText, MediumText} from '@/assets/global/Text';
import Theme from '@/assets/global/Theme';
import {borderBottomWhiteGray} from '@/Component/BikeManagement/ShopRepairHistory';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import CheckIcon from '@assets/image/ic_check_w.png';
import Badge from '@/Component/BikeManagement/Badge';

const UseCouponItem = ({
  couponName = '쿠폰이름',
  shopName = '매장명',
  bikeNickName = '',
  useCouponDate = '',
  badgeContent,
  rejectionContent = '',
  onPressCouponUse = () => {},
}) => {
  const {size} = useSelector(state => state);
  const height = badgeContent === '미사용' ? '120px' : '100px';
  return (
    <Box style={borderBottomWhiteGray} width={size.minusPadding} mg="0px 16px">
      <BetweenBox alignItems="center" pd="16px 10px" width="100%" height={height}>
        <Box>
          <RowBox alignItems="center">
            <DarkBoldText>{couponName}</DarkBoldText>
            <MediumText mg="0px 0px 0px 5px" color={Theme.color.indigo} fontSize={Theme.fontSize.fs14}>
              {shopName}
            </MediumText>
          </RowBox>
          <DarkText fontSize={Theme.fontSize.fs13}>{bikeNickName}</DarkText>
          <RowBox>
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
