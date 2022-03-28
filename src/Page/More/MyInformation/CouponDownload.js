import {View, Text, TouchableOpacity, FlatList, Dimensions} from 'react-native';
import React, {useState} from 'react';
import Header from '@/Component/Layout/Header';
import {BetweenBox, Box, RowBox} from '@/assets/global/Container';
import Theme from '@/assets/global/Theme';
import {DarkBoldText, DarkMediumText, GrayText} from '@/assets/global/Text';
import DefaultImage from '@/assets/global/Image';

export default function CouponDownload() {
  const [couponList, setCouponList] = useState([]);

  return (
    <>
      <Header title="쿠폰 다운로드" />
      <Box mg="0px 16px">
        <FlatList
          data={couponList}
          renderItem={Coupon}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={
            <Box width="380px" height="400px" mg="60px 0px" alignItems="center" justifyContent="center">
              <DarkMediumText>다운로드 가능한 쿠폰이 없습니다.</DarkMediumText>
            </Box>
          }
        />
      </Box>
    </>
  );
}

function Coupon({couponName = '[무료] 안전점검쿠폰', issueDate = '2022-03-01', issueEndDate = '2022-03-31'}) {
  return (
    <TouchableOpacity>
      <BetweenBox
        width="380px"
        height="70px"
        borderColor={Theme.borderColor.gray}
        borderRadius="5px"
        mg="10px 0px 10px"
        pd="10px 16px"
        alignItems="center">
        <Box>
          <DarkBoldText fontSize={Theme.fontSize.fs15}>{couponName}</DarkBoldText>
          <RowBox>
            <GrayText mg="0px 5px 0px 0px">발행일</GrayText>
            <GrayText>{issueDate}</GrayText>
            <GrayText mg="0px 5px">~</GrayText>
            <GrayText>{issueEndDate}</GrayText>
          </RowBox>
        </Box>
        <Box alignItems="center" justifyContent="center">
          <DefaultImage
            source={require('@assets/image/box_Indigo.png')}
            width="30px"
            height="30px"
            resizeMode="contain"
          />
        </Box>
      </BetweenBox>
    </TouchableOpacity>
  );
}
