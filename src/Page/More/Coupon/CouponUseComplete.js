import {LinkButton, LinkWhiteButton} from '@/assets/global/Button';
import {Box, RowBox, ScrollBox} from '@/assets/global/Container';
import {timeList} from '@/assets/global/dummy';
import DefaultLine from '@/assets/global/Line';
import {DarkBoldText, DarkMediumText, DarkText} from '@/assets/global/Text';
import Theme from '@/assets/global/Theme';
import Header from '@/Component/Layout/Header';
import ReservationCalendar from '@/Component/Repair/ReservationCalendar';
import TimeList from '@/Component/Repair/TimeList';
import RepairReservationHeader from '@/Page/Repair/RepairReservationHeader';
import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {useState} from 'react';
import {View, Text} from 'react-native';
import {useSelector} from 'react-redux';
import BorderCheckIcon from '@assets/image/ic_complete.png';
import DefaultImage from '@/assets/global/Image';

export default function CouponUseComplete() {
  const {size} = useSelector(state => state);
  const navigation = useNavigation();
  return (
    <>
      <Header title="쿠폰 사용" />

      <Box flex={1} backgroundColor="#0000">
        <RepairReservationHeader step={3} array={[1, 2, 3]} content="예약완료" />
        <DefaultLine height="10px" backgroundColor={Theme.borderColor.whiteLine} />
        <Box>
          <RowBox
            mg="30px 0px"
            justifyContent="center"
            alignItems="center"
            width={size.designWidth}>
            <DefaultImage source={BorderCheckIcon} width="20px" height="20px" />
            <DarkBoldText fontSize={Theme.fontSize.fs18}>예약이 접수 되었습니다.</DarkBoldText>
          </RowBox>
          <CouponCompleteComponent />
        </Box>
      </Box>
      <Box mg="0px 16px">
        <LinkWhiteButton
          to={() => navigation.navigate('CouponManagement')}
          content="쿠폰 신청 확인하기"
          mg="0px 0px 10px"
        />
        <LinkButton
          to={() => navigation.navigate('RepairHome')}
          content="홈으로 돌아가기"
          mg="0px 0px 10px"
        />
      </Box>
    </>
  );
}

const CouponCompleteComponent = ({
  shopName = '인천신스',
  couponName = '세차 무료 쿠폰',
  reservationDate = '2021-10-14 10-:58',
  reservationName = '홍길동',
  email = 'pedalee@pedalcheck.co.kr',
  tel = '010-1234-1234',
}) => {
  const {size} = useSelector(state => state);
  return (
    <Box mg="0px 16px">
      <RowBox width={size.minusPadding} mg="0px 0px 10px">
        <DarkMediumText width="100px">매장명</DarkMediumText>
        <DarkText>{shopName}</DarkText>
      </RowBox>
      <RowBox width={size.minusPadding} mg="0px 0px 10px">
        <DarkMediumText width="100px">쿠폰이름</DarkMediumText>
        <DarkText>{couponName}</DarkText>
      </RowBox>
      <RowBox width={size.minusPadding} mg="0px 0px 10px">
        <DarkMediumText width="100px">예약시간</DarkMediumText>
        <DarkText>{reservationDate}</DarkText>
      </RowBox>
      <RowBox width={size.minusPadding} mg="0px 0px 10px">
        <DarkMediumText width="100px">예약자 이름</DarkMediumText>
        <DarkText>{reservationName}</DarkText>
      </RowBox>
      <RowBox width={size.minusPadding} mg="0px 0px 10px">
        <DarkMediumText width="100px">이메일</DarkMediumText>
        <DarkText>{email}</DarkText>
      </RowBox>
      <RowBox width={size.minusPadding} mg="0px 0px 10px">
        <DarkMediumText width="100px">전화번호</DarkMediumText>
        <DarkText>{tel}</DarkText>
      </RowBox>
    </Box>
  );
};
