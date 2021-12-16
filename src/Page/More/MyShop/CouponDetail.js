import {Box, Container, RowBox} from '@/assets/global/Container';
import DefaultImage from '@/assets/global/Image';
import {DarkBoldText, DarkMediumText, DarkText, GrayText} from '@/assets/global/Text';
import Badge from '@/Component/BikeManagement/Badge';
import {borderBottomWhiteGray} from '@/Component/BikeManagement/ShopRepairHistory';
import Header from '@/Component/Layout/Header';
import React from 'react';
import DummyIcon from '@assets/image/default_4.png';
import Theme from '@/assets/global/Theme';
import {BlackBorderButton, BorderButton, LinkButton} from '@/assets/global/Button';
import {useNavigation} from '@react-navigation/native';

export default function CouponDetail() {
  const navigation = useNavigation();
  return (
    <>
      <Header title="상세보기" />
      <Container pd="0px 16px">
        <Box width="380px" style={borderBottomWhiteGray}>
          <RowBox mg="20px 0px">
            <Badge badgeContent="처리완료" />
            <Box mg="0px 0px 0px 10px">
              <DarkBoldText>세차 무료쿠폰</DarkBoldText>
              <GrayText>2021-10-13 ~ 2021-11-13</GrayText>
            </Box>
          </RowBox>
          <RowBox>
            <DarkMediumText>예약시간</DarkMediumText>
            <DarkText>2021-10-14 10:58</DarkText>
          </RowBox>
          <RowBox mg="10px 0px 20px">
            <DarkMediumText>완료시간</DarkMediumText>
            <DarkText>2021-10-14 10:58</DarkText>
          </RowBox>
        </Box>
        <Box style={borderBottomWhiteGray} width="380px">
          <DarkBoldText mg="20px 0px 0px">정비 자전거 정보</DarkBoldText>
          <RowBox alignItems="center" mg="10px 0px 20px">
            <DefaultImage source={DummyIcon} width="74px" height="74px" />
            <Box mg="0px 0px 0px 20px">
              <RowBox>
                <DarkMediumText fontSize={Theme.fontSize.fs15}>APPALANCHIA</DarkMediumText>
                <DarkMediumText mg="0px 0px 0px 10px" fontSize={Theme.fontSize.fs15}>
                  Momentum
                </DarkMediumText>
              </RowBox>

              <GrayText fontSize={Theme.fontSize.fs15}>따릉이</GrayText>
            </Box>
          </RowBox>
        </Box>
        <Box mg="20px 0px 0px">
          <DarkBoldText>고객정보</DarkBoldText>
          <RowBox mg="10px 0px 0px" alignItems="center">
            <DarkMediumText width="70px">이름</DarkMediumText>
            <DarkText mg="0px 10px 0px 0px">홍길동</DarkText>
            <BlackBorderButton width="auto">관심매장</BlackBorderButton>
          </RowBox>
          <RowBox mg="10px 0px 0px">
            <DarkMediumText width="70px">이메일</DarkMediumText>
            <DarkText>pedalee@pedalcheck.co.kr</DarkText>
          </RowBox>
          <RowBox mg="10px 0px 0px">
            <DarkMediumText width="70px">연락처</DarkMediumText>
            <DarkText>010-1234-5678</DarkText>
          </RowBox>
        </Box>
      </Container>
      <LinkButton content="확인" mg="0px 16px 20px" to={() => navigation.navigate('Coupon')} />
    </>
  );
}
