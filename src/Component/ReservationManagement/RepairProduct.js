import {Box, RowBox} from '@/assets/global/Container';
import React from 'react';
import Theme from '@/assets/global/Theme';
import {DarkBoldText, DarkText, GrayText, IndigoText, MoneyText} from '@/assets/global/Text';
import Badge from '@/Component/BikeManagement/Badge';
import {useSelector} from 'react-redux';

export default function RepairProduct({
  productName = ['기본값'],
  customerName = '기본값',
  reservationCancleCount = '0',
  reservationDate = new Date().toString(),
  status = '승인',
  totalPrice = 30000,
}) {
  const {size} = useSelector(state => state);
  return (
    <Box style={{borderTopWidth: 1, borderTopColor: Theme.borderColor.whiteGray}}>
      <RowBox width={size.minusPadding} justifyContent="space-between" pd="16px 10px">
        <Box>
          {productName.map(item => (
            <DarkBoldText key={item + reservationDate}>{item}</DarkBoldText>
          ))}
          <RowBox>
            <DarkText fontSize={Theme.fontSize.fs13}>{customerName}</DarkText>
            {reservationCancleCount && (
              <>
                <IndigoText mg="0px 0px 0px 8px" fontSize={Theme.fontSize.fs13}>
                  예약취소{' '}
                </IndigoText>
                <IndigoText fontWeight={Theme.fontWeight.bold} fontSize={Theme.fontSize.fs13}>
                  {reservationCancleCount}
                </IndigoText>
              </>
            )}
          </RowBox>
          <GrayText fontSize={Theme.fontSize.fs12}>{reservationDate}</GrayText>
        </Box>
        <Box>
          <Badge badgeContent={status} />
          <MoneyText
            mg="13px 0px 0px"
            money={totalPrice}
            color={Theme.color.black}
            fontSize={Theme.fontSize.fs18}
            fontWeight={Theme.fontWeight.bold}
          />
        </Box>
      </RowBox>
    </Box>
  );
}
