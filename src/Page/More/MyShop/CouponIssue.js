import {LinkButton} from '@/assets/global/Button';
import {BetweenBox, Box, Container, RowBox} from '@/assets/global/Container';
import {couponDummy} from '@/assets/global/dummy';
import {DefaultInput} from '@/assets/global/Input';
import {DarkMediumText} from '@/assets/global/Text';
import Header from '@/Component/Layout/Header';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function CouponIssue() {
  const [selectCoupon, setSelectCoupon] = useState('');
  const [id, setId] = useState('');
  const navigation = useNavigation();
  return (
    <>
      <Header title="쿠폰 발급" />

      <Container pd="0px 16px">
        <Box mg="20px 0px 0px">
          <DarkMediumText mg="0px 0px 10px">쿠폰 선택</DarkMediumText>
          <DefaultInput
            changeFn={setSelectCoupon}
            value={selectCoupon}
            isDropdown
            dropdownItem={couponDummy}
            placeHolder={'쿠폰을 선택해주세요'}
          />
        </Box>
        <Box mg="20px 0px 0px">
          <DarkMediumText mg="0px 0px 10px">발급 쿠폰 갯수</DarkMediumText>
          <RowBox alignItems="center">
            <DefaultInput width="355px" placeHolder={'쿠폰 갯수를 입력해주세요'} />
            <DarkMediumText mg="0px 0px 0px 10px">개</DarkMediumText>
          </RowBox>
        </Box>
        <Box mg="20px 0px 0px">
          <DarkMediumText mg="0px 0px 10px">사용 시작일</DarkMediumText>
          <DefaultInput value="2021.09.30" width="380px" disabled />
        </Box>
        <Box mg="20px 0px 0px">
          <DarkMediumText mg="0px 0px 10px">사용 종료일</DarkMediumText>
          <DefaultInput value="2021.09.30" width="380px" disabled />
        </Box>
        <Box mg="20px 0px 0px">
          <DarkMediumText mg="0px 0px 10px">아이디</DarkMediumText>
          <DefaultInput
            changeFn={setId}
            value={id}
            width="380px"
            placeHolder={'아이디를 입력해주세요'}
          />
        </Box>
      </Container>
      <LinkButton mg="0px 16px 20px" content={'확인'} to={() => navigation.navigate('Coupon')} />
    </>
  );
}
