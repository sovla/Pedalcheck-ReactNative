import {BetweenBox, Box, RowBox} from '@/assets/global/Container';
import {DarkBoldText, DarkMediumText, DarkText, GrayText, IndigoText} from '@/assets/global/Text';
import Theme from '@/assets/global/Theme';
import {borderBottomWhiteGray} from '@/Component/BikeManagement/ShopRepairHistory';
import ModalTitleBox from '@/Component/Modal/ModalTitleBox';
import React from 'react';
import {View, Text} from 'react-native';

export default function AdjustmentHistory() {
  return (
    <>
      <ModalTitleBox title="정산내역" />
      <Box width="328px" style={borderBottomWhiteGray}>
        <BetweenBox mg="10px 0px 0px" width="100%">
          <DarkMediumText>정산금액</DarkMediumText>
          <RowBox alignItems="center">
            <IndigoText fontWeight={Theme.fontWeight.bold}>100,000</IndigoText>
            <DarkText>원</DarkText>
          </RowBox>
        </BetweenBox>
        <BetweenBox mg="10px 0px 0px" width="100%">
          <GrayText fontSize={Theme.fontSize.fs14}>PG사 수수료 차감(10%)</GrayText>
          <GrayText fontSize={Theme.fontSize.fs14}>-1,000원</GrayText>
        </BetweenBox>
        <BetweenBox mg="10px 0px 0px" width="100%">
          <DarkBoldText>PG사 수수료 차감액</DarkBoldText>

          <RowBox alignItems="center">
            <DarkBoldText>99,000</DarkBoldText>
            <DarkText>원</DarkText>
          </RowBox>
        </BetweenBox>
        <BetweenBox mg="10px 0px 0px" width="100%">
          <GrayText fontSize={Theme.fontSize.fs14}>
            페달체크 수수료 차감 {'\n'}(PG사 수수료 차감액에서 5%)
          </GrayText>
          <GrayText fontSize={Theme.fontSize.fs14}>-4,950원</GrayText>
        </BetweenBox>
        <BetweenBox mg="10px 0px 0px" width="100%">
          <DarkBoldText>페달체크 수수료 차감액</DarkBoldText>

          <RowBox alignItems="center">
            <DarkBoldText>94,050</DarkBoldText>
            <DarkText>원</DarkText>
          </RowBox>
        </BetweenBox>
        <BetweenBox mg="10px 0px 20px" width="100%">
          <GrayText fontSize={Theme.fontSize.fs14}>
            원천세 차감{'\n'}
            (페달체크 수수료 차감액에서 3.3%)
          </GrayText>
          <GrayText fontSize={Theme.fontSize.fs14}>-3,130원</GrayText>
        </BetweenBox>
      </Box>
      <BetweenBox mg="20px 0px 0px" width="328px">
        <DarkMediumText>정산 실수령액</DarkMediumText>
        <RowBox alignItems="center">
          <IndigoText fontWeight={Theme.fontWeight.bold}>90,947</IndigoText>
          <DarkText>원</DarkText>
        </RowBox>
      </BetweenBox>
    </>
  );
}
