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
import {useEffect} from 'react';
import {getCouponDetail} from '@/API/More/Coupon';
import {useState} from 'react';
import Loading from '@Component/Layout/Loading';
import {imageAddress} from '@assets/global/config';
import {useLayoutEffect} from 'react';
import {useSelector} from 'react-redux';

// 처리완료시
// 완료시간 데이터
// 정비 자전거 정보 브랜드 모델명 추가
// Junhan
export default function CouponDetail({route: {params}}) {
  const [couponInfo, setCouponInfo] = useState({
    cst_status: '',
    cst_name: '',
    cst_sdate: '',
    cst_edate: '',
    mt_name: '',
    mt_email: '',
    mt_hp: '',
  });
  const [isDone, setIsDone] = useState(true);
  const navigation = useNavigation();

  const login = useSelector(state => state.login);
  useLayoutEffect(() => {
    setIsDone(true);
    getCouponDetail({
      _mt_idx: login.idx,
      cst_idx: params?.cst_idx,
    })
      .then(res => res.data?.result === 'true' && setCouponInfo(res.data.data.data))
      .finally(() => setIsDone(false));
  }, []);
  if (isDone) {
    return <Loading />;
  }
  return (
    <>
      <Header title="상세보기" />
      <Container pd="0px 16px">
        <Box width="380px" style={borderBottomWhiteGray}>
          <RowBox mg="20px 0px">
            <Badge badgeContent={couponInfo.cst_status} />
            <Box mg="0px 0px 0px 10px">
              <DarkBoldText>{couponInfo.cst_name}</DarkBoldText>
              <GrayText>
                {couponInfo.cst_sdate.substring(0, 10)} ~ {couponInfo.cst_edate.substring(0, 10)}
              </GrayText>
            </Box>
          </RowBox>
          {couponInfo?.cst_pt_date?.length > 0 && (
            <RowBox>
              <DarkMediumText width="75px">예약시간</DarkMediumText>
              <DarkText>
                {couponInfo.cst_pt_date} {couponInfo.cst_pt_time}
              </DarkText>
            </RowBox>
          )}
          <Box height="10px" />
          {couponInfo.cst_status === '처리완료' && (
            <RowBox>
              <DarkMediumText width="75px">완료시간</DarkMediumText>
              <DarkText>2021-10-14 10:58</DarkText>
            </RowBox>
          )}
          <Box height="10px" />
        </Box>
        {couponInfo.cst_status !== '미사용' && (
          <Box style={borderBottomWhiteGray} width="380px">
            <DarkBoldText mg="20px 0px 0px">정비 자전거 정보</DarkBoldText>
            <RowBox alignItems="center" mg="10px 0px 20px">
              <DefaultImage source={{uri: imageAddress + couponInfo?.mbt_image}} width="74px" height="74px" />
              <Box mg="0px 0px 0px 20px">
                <RowBox>
                  <DarkMediumText fontSize={Theme.fontSize.fs15}>APPALANCHIA</DarkMediumText>
                  <DarkMediumText mg="0px 0px 0px 10px" fontSize={Theme.fontSize.fs15}>
                    Momentum
                  </DarkMediumText>
                </RowBox>

                <GrayText fontSize={Theme.fontSize.fs15}>{couponInfo?.cst_bike_nick}</GrayText>
              </Box>
            </RowBox>
          </Box>
        )}

        <Box mg="20px 0px 0px">
          <DarkBoldText>고객정보</DarkBoldText>
          <RowBox mg="10px 0px 0px" alignItems="center">
            <DarkMediumText width="70px">이름</DarkMediumText>
            <DarkText mg="0px 10px 0px 0px">{couponInfo.mt_name}</DarkText>
            <BlackBorderButton width="auto">관심매장</BlackBorderButton>
          </RowBox>
          <RowBox mg="10px 0px 0px">
            <DarkMediumText width="70px">이메일</DarkMediumText>
            <DarkText>{couponInfo.mt_email}</DarkText>
          </RowBox>
          <RowBox mg="10px 0px 0px">
            <DarkMediumText width="70px">연락처</DarkMediumText>
            <DarkText>{phoneNumber(couponInfo.mt_hp)}</DarkText>
          </RowBox>
        </Box>
      </Container>
      <LinkButton content="확인" mg="0px 16px 20px" to={() => navigation.navigate('Coupon')} />
    </>
  );
}
function phoneNumber(value) {
  if (!value) {
    return '';
  }

  value = value.replace(/[^0-9]/g, '');

  let result = [];
  let restNumber = '';

  // 지역번호와 나머지 번호로 나누기
  if (value.startsWith('02')) {
    // 서울 02 지역번호
    result.push(value.substr(0, 2));
    restNumber = value.substring(2);
  } else if (value.startsWith('1')) {
    // 지역 번호가 없는 경우
    // 1xxx-yyyy
    restNumber = value;
  } else {
    // 나머지 3자리 지역번호
    // 0xx-yyyy-zzzz
    result.push(value.substr(0, 3));
    restNumber = value.substring(3);
  }

  if (restNumber.length === 7) {
    // 7자리만 남았을 때는 xxx-yyyy
    result.push(restNumber.substring(0, 3));
    result.push(restNumber.substring(3));
  } else {
    result.push(restNumber.substring(0, 4));
    result.push(restNumber.substring(4));
  }

  return result.filter(val => val).join('-');
}
