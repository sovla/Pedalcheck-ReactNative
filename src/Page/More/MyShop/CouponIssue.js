import {couponIssue, getCouponIssueList} from '@/API/More/Coupon';
import {LinkButton} from '@/assets/global/Button';
import {BetweenBox, Box, Container, RowBox} from '@/assets/global/Container';
import {couponDummy} from '@/assets/global/dummy';
import {DefaultInput} from '@/assets/global/Input';
import {DarkMediumText} from '@/assets/global/Text';
import Theme from '@/assets/global/Theme';
import Header from '@/Component/Layout/Header';
import {modalOpenAndProp} from '@/Store/modalState';
import {AlertButton} from '@/Util/Alert';
import {showToastMessage} from '@/Util/Toast';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {useLayoutEffect} from 'react';
import {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

export default function CouponIssue() {
  const [selectCoupon, setSelectCoupon] = useState('');
  const [id, setId] = useState('');
  const [issueCouponList, setIssueCouponList] = useState([]);
  const [issueCount, setIssueCount] = useState(0);

  const login = useSelector(state => state.login);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    getCouponIssueList({
      _mt_idx: login.idx,
    }).then(res => {
      if (res.data?.result === 'true') {
        setIssueCouponList(res.data.data.data);
      } else {
        showToastMessage(res.data?.msg);
      }
    });
  }, []);

  const onPressIssue = async () => {
    if (id === '') {
      AlertButton('아이디를 입력해주세요.');
      return null;
    }
    if (selectCoupon === '') {
      AlertButton('쿠폰을 선택해주세요.');
      return null;
    }
    const response = await couponIssue({
      _mt_idx: login.idx,
      ct_idx: selectCoupon.ct_idx,
      cst_num: issueCount,
      mt_idx: id.mt_idx,
      mt_id: id.mt_id,
      cst_sdate: selectCoupon.ct_sdate,
      cst_edate: selectCoupon.ct_edate,
    });

    if (response.data?.result === 'true') {
      showToastMessage('쿠폰 발급이 완료되었습니다.');
      navigation.navigate('Coupon');
    } else {
      showToastMessage(response.data.msg);
    }
  };
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
            dropdownItem={issueCouponList.map(item => ({
              label: item.ct_title,
              value: item,
            }))}
            placeHolder={'쿠폰을 선택해주세요'}
          />
        </Box>
        <Box mg="20px 0px 0px">
          <DarkMediumText mg="0px 0px 10px">발급 쿠폰 갯수</DarkMediumText>
          <RowBox alignItems="center">
            <DefaultInput
              width="355px"
              placeHolder={'쿠폰 갯수를 입력해주세요'}
              value={issueCount}
              changeFn={setIssueCount}
              keyboardType={'numeric'}
            />
            <DarkMediumText mg="0px 0px 0px 10px">개</DarkMediumText>
          </RowBox>
        </Box>
        <Box mg="20px 0px 0px">
          <DarkMediumText mg="0px 0px 10px">사용 시작일</DarkMediumText>
          <DefaultInput value={selectCoupon?.ct_sdate} width="380px" disabled />
        </Box>
        <Box mg="20px 0px 0px">
          <DarkMediumText mg="0px 0px 10px">사용 종료일</DarkMediumText>
          <DefaultInput value={selectCoupon?.ct_edate} width="380px" disabled />
        </Box>
        <Box mg="20px 0px 0px">
          <DarkMediumText mg="0px 0px 10px">아이디</DarkMediumText>
          <DefaultInput
            value={id?.mt_id ?? ''}
            fontSize={Theme.fontSize.fs15}
            width="380px"
            placeHolder={'아이디를 입력해주세요'}
            isText
            PressText={() => {
              dispatch(
                modalOpenAndProp({
                  modalComponent: 'searchId',
                  setUser: setId,
                }),
              );
            }}
          />
        </Box>
      </Container>
      <LinkButton mg="0px 16px 20px" content={'확인'} to={onPressIssue} />
    </>
  );
}
