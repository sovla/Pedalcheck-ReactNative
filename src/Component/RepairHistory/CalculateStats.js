import {BetweenBox, Box} from '@/assets/global/Container';
import React from 'react';
import {DarkBoldText, DarkMediumText, IndigoText} from '@/assets/global/Text';
import Theme from '@/assets/global/Theme';
import numberFormat from '@/Util/numberFormat';
import {LinkWhiteButton} from '@/assets/global/Button';

const CalculateStats = ({totalIncome = 100000000, unSettled = 98000000}) => {
  return (
    <Box width="380px" pd="10px 16px 20px" borderRadius="10px" mg="26px 0px 0px">
      <BetweenBox width="348px" mg="10px 0px 0px" alignItems="center">
        <IndigoText fontWeight={Theme.fontWeight.bold}>전체수입</IndigoText>
        <IndigoText fontWeight={Theme.fontWeight.bold}>{`${numberFormat(
          totalIncome,
        )} 원`}</IndigoText>
      </BetweenBox>
      <BetweenBox width="348px" mg="10px 0px 0px" alignItems="center">
        <DarkMediumText fontSize={Theme.fontSize.fs15}>미정산</DarkMediumText>
        <DarkBoldText>{numberFormat(unSettled)} 원</DarkBoldText>
      </BetweenBox>
      <BetweenBox width="348px" mg="10px 0px 0px" alignItems="center">
        <DarkMediumText fontSize={Theme.fontSize.fs15}>정산완료</DarkMediumText>
        <DarkBoldText>{numberFormat(totalIncome - unSettled)} 원</DarkBoldText>
      </BetweenBox>
      <LinkWhiteButton mg="16px 0px 0px" content="정산 히스토리" width="348px" />
    </Box>
  );
};

export default CalculateStats;
