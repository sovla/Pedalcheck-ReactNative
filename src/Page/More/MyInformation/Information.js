import {Box, Container, RowBox} from '@/assets/global/Container';
import DefaultImage from '@/assets/global/Image';
import Header from '@/Component/Layout/Header';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import DummyIcon from '@assets/image/default_5.png';
import {DarkBoldText, DarkMediumText, DarkText, GrayText} from '@/assets/global/Text';
import Theme from '@/assets/global/Theme';
import DefaultLine from '@/assets/global/Line';
import {borderBottomWhiteGray} from '@/Component/BikeManagement/ShopRepairHistory';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/core';
import {resetSnsInfo} from '@/Store/snsLoginState';
import {resetUserInfo} from '@/Store/loginState';

export default function Information() {
  const {size} = useSelector(state => state);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  return (
    <>
      <Header title="내 정보" />
      <Container>
        <Box mg="20px 0px" width={size.designWidth} alignItems="center">
          <DefaultImage source={DummyIcon} width="80px" height="80px" />
          <DarkBoldText fontSize={Theme.fontSize.fs18}>
            홍길동<DarkText fontSize={Theme.fontSize.fs18}>님</DarkText>
          </DarkBoldText>
          <GrayText fontSize={Theme.fontSize.fs15}>네이버 회원</GrayText>
          <DarkText fontSize={Theme.fontSize.fs15}>pedalee@pedalcheck.co.kr</DarkText>
        </Box>
        <DefaultLine height="10px" backgroundColor={Theme.borderColor.whiteLine} />
        <Box pd="10px 16px 0px">
          <TouchableOpacity onPress={() => navigation.navigate('BikeManagement')}>
            <RowBox
              style={borderBottomWhiteGray}
              alignItems="center"
              justifyContent="space-between"
              backgroundColor="#0000"
              width={size.minusPadding}>
              <DarkMediumText mg="16px 0px" fontSize={Theme.fontSize.fs15}>
                자전거 관리
              </DarkMediumText>
              <DarkText fontSize={Theme.fontSize.fs15}>0/5</DarkText>
            </RowBox>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('CouponManagement')}>
            <RowBox backgroundColor="#0000" style={borderBottomWhiteGray} width={size.minusPadding}>
              <DarkMediumText mg="16px 0px" fontSize={Theme.fontSize.fs15}>
                쿠폰 관리
              </DarkMediumText>
            </RowBox>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('UpdateHome')}>
            <RowBox backgroundColor="#0000" style={borderBottomWhiteGray} width={size.minusPadding}>
              <DarkMediumText mg="16px 0px" fontSize={Theme.fontSize.fs15}>
                내 정보 수정
              </DarkMediumText>
            </RowBox>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              dispatch(resetSnsInfo());
              dispatch(resetUserInfo());
              navigation.reset({routes: [{name: 'Home'}]});
            }}>
            <RowBox backgroundColor="#0000" style={borderBottomWhiteGray} width={size.minusPadding}>
              <DarkMediumText mg="16px 0px" fontSize={Theme.fontSize.fs15}>
                로그아웃
              </DarkMediumText>
            </RowBox>
          </TouchableOpacity>
        </Box>
      </Container>
    </>
  );
}

const styles = StyleSheet.create({});
