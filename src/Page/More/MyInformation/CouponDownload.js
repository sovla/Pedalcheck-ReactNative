import {View, Text, TouchableOpacity, FlatList, Dimensions} from 'react-native';
import React, {useLayoutEffect, useState} from 'react';
import Header from '@/Component/Layout/Header';
import {BetweenBox, Box, RowBox} from '@/assets/global/Container';
import Theme from '@/assets/global/Theme';
import {DarkBoldText, DarkMediumText, GrayText} from '@/assets/global/Text';
import DefaultImage from '@/assets/global/Image';
import {downloadCoupon, getCouponDownLoadList} from '@/API/More/Coupon';
import {useSelector} from 'react-redux';
import {showToastMessage} from '@/Util/Toast';

export default function CouponDownload() {
  const {login} = useSelector(state => state);
  const [couponList, setCouponList] = useState([]);

  useLayoutEffect(() => {
    getCouponDownLoadList({
      _mt_idx: login.idx,
    })
      .then(res => res.data.result === 'true' && res.data.data.data)
      .then(data => setCouponList(data));
  }, []);
  const _render = ({item}) => {
    return <Coupon item={item} login={login} />;
  };
  return (
    <>
      <Header title="쿠폰 다운로드" />
      <Box mg="0px 16px">
        <FlatList
          data={couponList}
          renderItem={_render}
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

function Coupon({item, login}) {
  const [isTouch, setIsTouch] = useState(false);
  const couponName = item?.ct_title;
  const issueDate = item?.ct_sdate;
  const issueEndDate = item?.ct_edate;

  const onPressCoupon = () => {
    if (!isTouch) {
      setIsTouch(true);
      downloadCoupon({
        _mt_idx: login?.idx,
        ct_idx: item.ct_idx,
      }).then(res => {
        if (res.data.result === 'true') {
          showToastMessage('쿠폰 다운로드 완료');
        }
      });
    }
  };

  return (
    <TouchableOpacity onPress={onPressCoupon} disabled={isTouch}>
      <BetweenBox
        width="380px"
        height="70px"
        borderColor={Theme.borderColor.gray}
        borderRadius="5px"
        backgroundColor={isTouch ? '#0002' : '#0000'}
        mg="10px 0px 10px"
        pd="10px 16px"
        alignItems="center">
        <Box backgroundColor="#0000">
          <DarkBoldText fontSize={Theme.fontSize.fs15}>{couponName}</DarkBoldText>
          <RowBox backgroundColor="#0000">
            <GrayText mg="0px 5px 0px 0px">발행일</GrayText>
            <GrayText>{issueDate}</GrayText>
            <GrayText mg="0px 5px">~</GrayText>
            <GrayText>{issueEndDate}</GrayText>
          </RowBox>
        </Box>
        <Box backgroundColor="#0000" alignItems="center" justifyContent="center">
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
