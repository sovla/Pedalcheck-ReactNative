import {Box, PositionBox, RowBox, ScrollBox} from '@/assets/global/Container';
import DefaultLine from '@/assets/global/Line';
import {DarkBoldText, DarkText} from '@/assets/global/Text';
import Theme from '@/assets/global/Theme';
import Header from '@/Component/Layout/Header';
import {paymentInfo} from '@/Component/Repair/Modal/PaymentInformationCheck';
import React from 'react';
import {useSelector} from 'react-redux';
import RepairReservationHeader from './RepairReservationHeader';
import BorderCheckIcon from '@assets/image/ic_complete.png';
import DefaultImage from '@assets/global/Image';
import {LinkButton, LinkWhiteButton} from '@/assets/global/Button';

export default function ReservationPayment({navigation}) {
  const {size} = useSelector(state => state);
  return (
    <>
      <Header title="정비예약" />
      <Box style={{flex: 1}}>
        <ScrollBox>
          <RepairReservationHeader step={5} content="결제완료" />
          <DefaultLine height="10px" backgroundColor={Theme.borderColor.whiteLine} />
          <RowBox justifyContent="center" alignItems="center" mg="33px 0px">
            <DefaultImage source={BorderCheckIcon} width="20px" height="20px" />
            <DarkBoldText mg="0px 0px 0px 7px">예약이 접수되었습니다.</DarkBoldText>
          </RowBox>
          <Box mg="0px 16px">
            {paymentInfo.map(item => {
              return (
                <RowBox key={item.title} justifyContent="space-between" mg="0px 0px 10px">
                  <DarkBoldText width="100px">{item.title}</DarkBoldText>
                  <DarkText>{item.content}</DarkText>
                </RowBox>
              );
            })}
          </Box>
        </ScrollBox>
      </Box>
      <Box mg="0px 16px 20px">
        <LinkWhiteButton content="장비 신청 확인하기"></LinkWhiteButton>
        <LinkButton
          mg="10px 0px 0px 0px"
          to={() => navigation.navigate('RepairHome')}
          content="홈으로 돌아가기"
        />
      </Box>
    </>
  );
}
