import {BorderButton} from '@/assets/global/Button';
import {Box, Container, RowBox} from '@/assets/global/Container';
import {DarkBoldText, DarkMediumText, DarkText} from '@/assets/global/Text';
import Theme from '@/assets/global/Theme';
import Header from '@/Component/Layout/Header';
import React from 'react';

export default function CustomerDetail() {
  return (
    <>
      <Header title="상세보기" />
      <Box backgroundColor={Theme.borderColor.whiteLine} height="100%">
        <Box pd="0px 16px" backgroundColot="black">
          <RowBox mg="20px 0px" alignItems="center">
            <BorderButton
              height="25px"
              width="auto"
              borderColor={Theme.borderColor.gray}
              color={Theme.color.black}
              fontSize={Theme.fontSize.fs12}>
              관심 매장
            </BorderButton>
            <DarkBoldText mg="0px 0px 0px 10px">홍길동</DarkBoldText>
          </RowBox>
          <Box>
            <RowBox mg="0px 0px 10px">
              <DarkMediumText width="110px">이메일</DarkMediumText>
              <DarkText width="270px">pedalee@pedalCheck.co.kr</DarkText>
            </RowBox>
            <RowBox mg="0px 0px 10px">
              <DarkMediumText width="110px">연락처</DarkMediumText>
              <DarkText width="270px">010-1234-5678</DarkText>
            </RowBox>
            <RowBox mg="0px 0px 10px">
              <DarkMediumText width="110px">지역</DarkMediumText>
              <DarkText width="270px">서울특별시 강남구</DarkText>
            </RowBox>
            <RowBox mg="0px 0px 10px">
              <DarkMediumText width="110px">최초 방문일</DarkMediumText>
              <DarkText width="270px">2021-10-07 16:00</DarkText>
            </RowBox>
            <RowBox mg="0px 0px 10px">
              <DarkMediumText width="110px">최근 정비일</DarkMediumText>
              <DarkText width="270px">2021-10-07 16:00</DarkText>
            </RowBox>
            <RowBox mg="0px 0px 10px">
              <DarkMediumText width="110px">정비횟수</DarkMediumText>
              <DarkText width="270px">12</DarkText>
            </RowBox>
            <RowBox mg="0px 0px 10px">
              <DarkMediumText width="110px">예약취소 횟수</DarkMediumText>
              <DarkText width="270px">1</DarkText>
            </RowBox>
          </Box>
        </Box>
      </Box>
    </>
  );
}
