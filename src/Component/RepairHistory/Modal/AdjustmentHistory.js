import {BetweenBox, Box, RowBox} from '@/assets/global/Container';
import {DarkBoldText, DarkMediumText, DarkText, GrayText, IndigoText, MoneyText} from '@/assets/global/Text';
import Theme from '@/assets/global/Theme';
import {borderBottomWhiteGray} from '@/Component/BikeManagement/ShopRepairHistory';
import ModalTitleBox from '@/Component/Modal/ModalTitleBox';
import React from 'react';
import {View, Text} from 'react-native';

export default function AdjustmentHistory({item}) {
  return (
    <>
      <ModalTitleBox title="정산내역" />
      <Box width="328px" style={borderBottomWhiteGray}>
        <BetweenBox mg="10px 0px 0px" width="100%">
          <DarkMediumText>정산금액</DarkMediumText>
          <RowBox alignItems="center">
            <MoneyText color={Theme.color.indigo} fontWeight={Theme.fontWeight.bold} money={item.clt_tot_price} />
          </RowBox>
        </BetweenBox>
        <BetweenBox mg="10px 0px 0px" width="100%">
          <GrayText fontSize={Theme.fontSize.fs14}>PG사 수수료 차감({item.clt_pg_percent}%)</GrayText>
          <GrayText fontSize={Theme.fontSize.fs14}>
            -<MoneyText fontSize={Theme.fontSize.fs14} money={item.clt_pg_price} color={Theme.color.gray} />
          </GrayText>
        </BetweenBox>
        <BetweenBox mg="10px 0px 0px" width="100%">
          <GrayText fontSize={Theme.fontSize.fs14}>PG사 수수료 부가세</GrayText>
          <GrayText fontSize={Theme.fontSize.fs14}>
            -<MoneyText fontSize={Theme.fontSize.fs14} money={item.clt_pg_vat} color={Theme.color.gray} />
          </GrayText>
        </BetweenBox>
        <BetweenBox mg="10px 0px 0px" width="100%">
          <DarkBoldText>PG사 수수료 차감액</DarkBoldText>

          <RowBox alignItems="center">
            <MoneyText
              money={+item.clt_pg_vat + +item.clt_pg_price}
              color={Theme.color.black}
              fontWeight={Theme.fontWeight.bold}
            />
          </RowBox>
        </BetweenBox>
        <BetweenBox mg="10px 0px 0px" width="100%">
          <GrayText fontSize={Theme.fontSize.fs14}>
            페달체크 수수료 차감 {'\n'}(PG사 수수료 차감액에서 {item.clt_pc_percent}%)
          </GrayText>
          <GrayText fontSize={Theme.fontSize.fs14}>
            {' '}
            -<MoneyText fontSize={Theme.fontSize.fs14} money={item.clt_pc_price} color={Theme.color.gray} />
          </GrayText>
        </BetweenBox>

        <BetweenBox mg="10px 0px 0px" width="100%">
          <GrayText fontSize={Theme.fontSize.fs14}>페달체크 부가세</GrayText>
          <GrayText fontSize={Theme.fontSize.fs14}>
            {' '}
            -<MoneyText fontSize={Theme.fontSize.fs14} money={item.clt_pc_vat} color={Theme.color.gray} />
          </GrayText>
        </BetweenBox>

        <BetweenBox mg="10px 0px 20px" width="100%">
          <DarkBoldText>페달체크 수수료 차감액</DarkBoldText>

          <RowBox alignItems="center">
            <MoneyText
              money={+item.clt_pc_vat + +item.clt_pc_price}
              color={Theme.color.black}
              fontWeight={Theme.fontWeight.bold}
            />
          </RowBox>
        </BetweenBox>
        {/* <BetweenBox mg="10px 0px 20px" width="100%">
          <GrayText fontSize={Theme.fontSize.fs14}>
            원천세 차감{'\n'}
            (페달체크 수수료 차감액에서 3.3%)
          </GrayText>
          <GrayText fontSize={Theme.fontSize.fs14}>-3,130원</GrayText>
        </BetweenBox> */}
      </Box>
      <BetweenBox mg="20px 0px 0px" width="328px">
        <DarkMediumText>정산 실수령액</DarkMediumText>
        <RowBox alignItems="center">
          <MoneyText fontWeight={Theme.fontWeight.bold} color={Theme.color.indigo} money={item.clt_price} />
        </RowBox>
      </BetweenBox>
    </>
  );
}
