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

const CouponItem = ({
  couponName = '쿠폰이름',
  shopName = '매장명',
  issueDate = '발급날',
  startOfAvailability = '사용 기간 시작날',
  endOfAvailability = '사용 기간 끝날',
  status = '사용',
  badgeContent,
  rejectionContent = '거절사유가 입력됩니다. 거절사유가 입력됩니다.',
  onPressCouponUse = () => {},
}) => {
  const {size} = useSelector(state => state);
  const height = badgeContent === '미사용' ? '120px' : '100px';
  return (
    <Box style={borderBottomWhiteGray} width={size.minusPadding} mg="0px 16px">
      <BetweenBox alignItems="center" pd="16px 10px" width="100%" height={height}>
        <Box>
          <DarkBoldText>{couponName}</DarkBoldText>
          <RowBox>
            <MediumText color={Theme.color.indigo} fontSize={Theme.fontSize.fs14}>
              {shopName}
            </MediumText>
            <DarkText mg="0px 0px 0px 5px" fontSize={Theme.fontSize.fs13}>
              {issueDate}
            </DarkText>
          </RowBox>
          <RowBox>
            <GrayText fontSize={Theme.fontSize.fs13}>{startOfAvailability} ~ </GrayText>

            <GrayText fontSize={Theme.fontSize.fs13}>{endOfAvailability}</GrayText>
          </RowBox>
          {badgeContent === '승인거부' && (
            <DefaultText color={Theme.color.red} fontSize={Theme.fontSize.fs13}>
              {rejectionContent}
            </DefaultText>
          )}
        </Box>
        {!badgeContent ? (
          <Box height="100%" justifyContent="center">
            <TouchableOpacity onPress={onPressCouponUse}>
              <Button
                width="auto"
                height="auto"
                borderRadius="3px"
                pd="3px 7px"
                style={{flexDirection: 'row'}}>
                <DefaultImage source={CheckIcon} width="20px" height="20px" />
                <DefaultText>{status}</DefaultText>
              </Button>
            </TouchableOpacity>
          </Box>
        ) : (
          <Box height="100%">
            <Badge badgeContent={badgeContent} />
          </Box>
        )}
      </BetweenBox>
    </Box>
  );
};

export default CouponItem;
