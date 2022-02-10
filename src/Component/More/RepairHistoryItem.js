import {BorderButton} from '@/assets/global/Button';
import {BetweenBox, Box, RowBox} from '@/assets/global/Container';
import {DarkBoldText, DarkText, GrayText, IndigoText} from '@/assets/global/Text';
import Theme from '@/assets/global/Theme';
import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import Badge from '../BikeManagement/Badge';
import {borderBottomWhiteGray} from '../BikeManagement/ShopRepairHistory';

export default function RepairHistoryItem({
  shopName = '인천신스',
  productNames = ['정비-오버홀'],
  bikeName = '따릉이',
  date = '2021-10-07 16:00',
  status = '예약',
  isReview = false,
  onPressReview = () => {},
}) {
  const {size} = useSelector(state => state);
  const navigation = useNavigation();
  return (
    <BetweenBox width={size.minusPadding} pd="16px 10px" style={borderBottomWhiteGray}>
      <Box width="300px">
        <RowBox alignItems="flex-end">
          <Box>
            {productNames.map((item, index) => (
              <DarkBoldText key={index}>{item}</DarkBoldText>
            ))}
          </Box>
          <IndigoText fontSize={Theme.fontSize.fs13} mg="0px 0px 0px 5px">
            {shopName}
          </IndigoText>
        </RowBox>
        {bikeName && (
          <RowBox>
            <DarkText fontSize={Theme.fontSize.fs13}>{bikeName}</DarkText>
          </RowBox>
        )}
        <RowBox>
          <GrayText letterSpacing="0px" fontSize={Theme.fontSize.fs12}>
            {date}
          </GrayText>
        </RowBox>
      </Box>
      <Box height="100%" alignItems="center">
        <Badge badgeContent={status} />
        {status === '처리완료' && (
          <TouchableOpacity onPress={onPressReview} style={{marginTop: 10}}>
            <BorderButton
              borderRadius="5px"
              fontSize={Theme.fontSize.fs13}
              fontWeight={Theme.fontWeight.medium}
              width="66px"
              height="25px"
              alignItems="center"
              justifyContent="center"
              borderColor={Theme.borderColor.gray}
              color={Theme.color.black}>
              {!isReview ? '리뷰작성' : '리뷰확인'}
            </BorderButton>
          </TouchableOpacity>
        )}
      </Box>
    </BetweenBox>
  );
}
