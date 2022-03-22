import {BetweenBox, Box, RowBox} from '@/assets/global/Container';
import React from 'react';

import Theme from '@/assets/global/Theme';
import {BoldText, DarkBoldText, DarkText, GrayText, IndigoText} from '@/assets/global/Text';
import {numberChangeFormat} from '@/Util/numberFormat';
import {useSelector} from 'react-redux';
import {BorderButton} from '@/assets/global/Button';
import {borderBottomWhiteGray} from '@/Component/BikeManagement/ShopRepairHistory';

export default function CustomerInformation({
  name,
  repairCount,
  reservationCancleCount,
  firstVisitDate,
  lastRepairDate,
  level,
}) {
  return (
    <Box style={borderBottomWhiteGray} pd="0px 10px" width="380px">
      <BetweenBox width={`${380 - 20}px`} mg="16px 0px 7px">
        <RowBox alignItems="center">
          <DarkBoldText mg="0px 5px 0px 0px">{name}</DarkBoldText>
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
      <RowBox alignItems="center" mg="0px 0px 7px">
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
