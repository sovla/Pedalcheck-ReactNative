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

export default function CouponDetail() {
  return (
    <>
      <Header title="상세보기" />
      <Container pd="0px 16px">
        <Box width="380px" style={borderBottomWhiteGray}>
          <RowBox>
            <Badge badgeContent="처리완료" />
            <Box>
              <DarkBoldText>세차 무료쿠폰</DarkBoldText>
              <GrayText>2021-10-13 ~ 2021-11-13</GrayText>
            </Box>
          </RowBox>
          <RowBox>
            <DarkMediumText>예약시간</DarkMediumText>
            <DarkText>2021-10-14 10:58</DarkText>
          </RowBox>
          <RowBox>
            <DarkMediumText>완료시간</DarkMediumText>
            <DarkText>2021-10-14 10:58</DarkText>
          </RowBox>
        </Box>
        <Box style={borderBottomWhiteGray} width="380px">
          <DarkBoldText>정비 자전거 정보</DarkBoldText>
          <RowBox alignItems="center">
            <DefaultImage source={DummyIcon} width="74px" height="74px" />
            <Box>
              <RowBox>
                <DarkMediumText fontSize={Theme.fontSize.fs15}>APPALANCHIA</DarkMediumText>
                <DarkMediumText fontSize={Theme.fontSize.fs15}>Momentum</DarkMediumText>
              </RowBox>

              <GrayText fontSize={Theme.fontSize.fs15}>따릉이</GrayText>
            </Box>
          </RowBox>
        </Box>
        <Box>
          <DarkBoldText>고객정보</DarkBoldText>
          <RowBox>
            <DarkMediumText>이름</DarkMediumText>
            <DarkText>홍길동</DarkText>
            <BlackBorderButton width="auto">관심매장</BlackBorderButton>
          </RowBox>
          <RowBox>
            <DarkMediumText>이메일</DarkMediumText>
            <DarkText>pedalee@pedalcheck.co.kr</DarkText>
          </RowBox>
          <RowBox>
            <DarkMediumText>연락처</DarkMediumText>
            <DarkText>010-1234-5678</DarkText>
          </RowBox>
        </Box>
      </Container>
      <LinkButton content="확인" />
    </>
  );
}
