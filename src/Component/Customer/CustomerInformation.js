import {
  BetweenBox,
  Box,
  Container,
  PositionBox,
  RowBox,
  ScrollBox,
} from '@/assets/global/Container';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import CustomerSmileIcon from '@assets/image/menu07_top.png';
import CustomerCheckIcon from '@assets/image/ic_alluser.png';
import CustomerHeartIcon from '@assets/image/ic_heartuser.png';
import CustomerIcon from '@assets/image/ic_user.png';

import GradientHeader from '@/Component/Layout/GradientHeader';
import Theme from '@/assets/global/Theme';
import DefaultImage from '@/assets/global/Image';
import {
  BoldText,
  DarkBoldText,
  DarkMediumText,
  DarkText,
  GrayText,
  IndigoText,
  MediumText,
} from '@/assets/global/Text';
import numberFormat, {numberChangeFormat} from '@/Util/numberFormat';
import CustomerHeader from '@/Component/Customer/CustomerHeader';
import {DefaultInput} from '@/assets/global/Input';
import CheckIcon from '@assets/image/ic_search.png';
import {useSelector} from 'react-redux';
import {BorderButton} from '@/assets/global/Button';
import {size} from 'lodash';
import {borderBottomWhiteGray} from '@/Component/BikeManagement/ShopRepairHistory';

export default function CustomerInformation({
  name,
  repairCount,
  reservationCancleCount,
  firstVisitDate,
  lastRepairDate,
  level,
}) {
  const {size} = useSelector(state => state);
  return (
    <Box style={borderBottomWhiteGray} pd="0px 10px" width={size.minusPadding}>
      <BetweenBox width={`${380 - 20}px`} mg="16px 0px 7px">
        <RowBox>
          <DarkBoldText mg="0px 5px 0px 0px">{name}</DarkBoldText>
          <IndigoText mg="0px 3px 0px 0px" fontSize={Theme.fontSize.fs13}>
            정비횟수
          </IndigoText>
          <BoldText mg="0px 5px 0px 0px" fontSize={Theme.fontSize.fs13} color={Theme.color.indigo}>
            {numberChangeFormat(repairCount)}
          </BoldText>
          <IndigoText mg="0px 3px 0px 0px" fontSize={Theme.fontSize.fs13}>
            예약취소
          </IndigoText>
          <BoldText fontSize={Theme.fontSize.fs13} color={Theme.color.indigo}>
            {numberChangeFormat(reservationCancleCount)}
          </BoldText>
        </RowBox>
        <BorderButton
          height="25px"
          width="auto"
          borderColor={Theme.borderColor.gray}
          color={Theme.color.black}
          fontSize={Theme.fontSize.fs12}>
          {level}
        </BorderButton>
      </BetweenBox>
      <RowBox>
        <DarkText mg="0px 5px 0px 0px" fontSize={Theme.fontSize.fs12}>
          최초방문일
        </DarkText>
        <GrayText fontSize={Theme.fontSize.fs12} letterSpacing="0px">
          {firstVisitDate}
        </GrayText>
      </RowBox>
      <RowBox mg="4px 0px 17px">
        <DarkText mg="0px 5px 0px 0px" fontSize={Theme.fontSize.fs12}>
          최근정비일
        </DarkText>
        <GrayText fontSize={Theme.fontSize.fs12} letterSpacing="0px">
          {lastRepairDate}
        </GrayText>
      </RowBox>
    </Box>
  );
}
