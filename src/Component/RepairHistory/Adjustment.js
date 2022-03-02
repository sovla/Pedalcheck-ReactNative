import {Box, RowBox} from '@/assets/global/Container';
import {borderBottomWhiteGray} from '../BikeManagement/ShopRepairHistory';
import React from 'react';
import {DarkBoldText, DarkMediumText, DarkText} from '@/assets/global/Text';
import Theme from '@/assets/global/Theme';

const Adjustment = ({item, index}) => {
  const {mt_id, od_idx, ot_code, ot_name, ot_pay_type, ot_pdate, ot_price, ot_pt_date, ot_wdate} = item;

  return (
    <Box width="412px" pd="10px 16px" style={borderBottomWhiteGray}>
      <RowBox>
        <DarkBoldText fontSize={Theme.fontSize.fs21} mg="0px 7px 0px 0px">
          {index + 1}
        </DarkBoldText>
        <Box>
          <RowText title="주문번호">
            <DarkBoldText>{ot_code}</DarkBoldText>
          </RowText>
          <RowText title="이메일">
            <DarkText>{mt_id}</DarkText>
          </RowText>
          <RowText title="고객이름">
            <DarkText>{ot_name}</DarkText>
          </RowText>
          <RowText title="정비 예약 일시">
            <DarkText>{ot_pt_date}</DarkText>
          </RowText>
          <RowText title="결제수단">
            <DarkText>{ot_pay_type}</DarkText>
          </RowText>
          <RowText title="결제금액">
            <DarkText>{ot_price}</DarkText>
          </RowText>
          <RowText title="주문일시">
            <DarkText>{ot_wdate}</DarkText>
          </RowText>
          <RowText title="결제완료일시">
            <DarkText>{ot_pdate}</DarkText>
          </RowText>
        </Box>
      </RowBox>
    </Box>
  );
};

const RowText = ({title, children}) => {
  return (
    <RowBox>
      <DarkMediumText mg="0px 0px 10px" width="105px">
        {title}
      </DarkMediumText>
      <RowBox width="260px">{children}</RowBox>
    </RowBox>
  );
};

export default Adjustment;
