import {FooterButton} from '@/assets/global/Button';
import {Box, RowBox} from '@/assets/global/Container';
import {DarkBoldText, DarkText} from '@/assets/global/Text';
import ModalTitleBox from '@/Component/Modal/ModalTitleBox';
import React from 'react';
import {View, Text} from 'react-native';
import {useSelector} from 'react-redux';

export default function PaymentInformationCheck() {
  const {size} = useSelector(state => state);
  return (
    <>
      <ModalTitleBox size={size} title="결제정보 확인" padding={32} />
      <Box width={size.designWidth - 32 - 32}>
        {paymentInfo.map(item => {
          return (
            <RowBox key={item.title} justifyContent="space-between" mg="0px 0px 10px">
              <DarkBoldText width="100px">{item.title}</DarkBoldText>
              <DarkText>{item.content}</DarkText>
            </RowBox>
          );
        })}
        <Box mg="10px 0px" height="50px" />
        <FooterButton
          width={size.designWidth - 64}
          buttonWidth={(size.designWidth - 74) / 2}></FooterButton>
      </Box>
    </>
  );
}

const paymentInfo = [
  {title: '매장명', content: '인천신스'},
  {title: '정비상품', content: '정비 - 오버홀'},
  {title: '결제금액', content: '20,000원'},
  {title: '예약시간', content: '2021-10-14 10:58'},
  {title: '예약자 이름', content: '홍길동'},
  {title: '이메일', content: 'pedalee@pedalcheck.co.kr'},
  {title: '전화번호', content: '010-1234-5678'},
  {title: '요청사항', content: '요청사항 입력 내용'},
];
