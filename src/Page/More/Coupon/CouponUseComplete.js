import {LinkButton, LinkWhiteButton} from '@/assets/global/Button';
import {Box, RowBox} from '@/assets/global/Container';
import DefaultLine from '@/assets/global/Line';
import {DarkBoldText, DarkMediumText, DarkText} from '@/assets/global/Text';
import Theme from '@/assets/global/Theme';
import Header from '@/Component/Layout/Header';
import RepairReservationHeader from '@/Page/Repair/RepairReservationHeader';
import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {useState} from 'react';
import {useSelector} from 'react-redux';
import BorderCheckIcon from '@assets/image/ic_complete.png';
import DefaultImage from '@/assets/global/Image';
import Loading from '@/Component/Layout/Loading';
import {useLayoutEffect} from 'react';
import {couponReservation} from '@/API/More/More';

export default function CouponUseComplete({route: {params}, route}) {
  const {item: coupon, selectBike, selectDate, shopInfo} = params;
  const {size, login} = useSelector(state => state);
  const navigation = useNavigation();
  const dummy = {
    cst_title: '무료세차',
    mst_name: '제일정비',
    od_idx: 7,
    ot_code: 'P220117093554E14',
    ot_datetime: '2022-01-18',
    ot_email: null,
    ot_hp: '010-6464-6464',
    ot_name: '신혜수',
  };
  console.log(selectBike, 'selectBike');
  const [isDone, setIsDone] = useState(true);
  const [reservationInfo, setReservationInfo] = useState(dummy);
  useLayoutEffect(() => {
    couponReservation({
      _mt_idx: login.idx,
      cst_idx: coupon.cst_idx,
      mbt_idx: selectBike?.mbt_idx,
      ot_bike_nick: selectBike?.mbt_nick,
      ot_bike_brand: selectBike?.ot_bike_brand ?? selectBike?.mbt_brand,
      ot_bike_model: selectBike?.ot_bike_model ?? selectBike?.mbt_model,
      mst_idx: shopInfo.mst_idx,
      ot_pt_date: selectDate.date,
      ot_pt_time: selectDate.time,
    })
      .then(res => res?.data?.result === 'true' && res.data.data.data)
      .then(data => {
        setReservationInfo(data);
        setIsDone(true);
      });
  }, []);
  return (
    <>
      {isDone ? (
        <>
          <Header title="쿠폰 사용" />
          <Box flex={1} backgroundColor="#0000">
            <RepairReservationHeader step={3} array={[1, 2, 3]} content="예약완료" />
            <DefaultLine height="10px" backgroundColor={Theme.borderColor.whiteLine} />
            <Box>
              <RowBox mg="30px 0px" justifyContent="center" alignItems="center" width={size.designWidth}>
                <DefaultImage source={BorderCheckIcon} width="20px" height="20px" />
                <DarkBoldText fontSize={Theme.fontSize.fs18}>예약이 접수 되었습니다.</DarkBoldText>
              </RowBox>
              <CouponCompleteComponent
                shopName={reservationInfo?.mst_name}
                couponName={reservationInfo?.cst_title}
                reservationDate={reservationInfo?.ot_datetime}
                reservationName={reservationInfo?.ot_name}
                email={reservationInfo?.ot_email}
                tel={reservationInfo?.ot_hp}
              />
            </Box>
          </Box>
          <Box mg="0px 16px">
            <LinkWhiteButton
              to={() => navigation.navigate('CouponManagement', {menu: '쿠폰 사용 현황'})}
              content="쿠폰 신청 확인하기"
              mg="0px 0px 10px"
            />
            <LinkButton to={() => navigation.navigate('RepairHome')} content="홈으로 돌아가기" mg="0px 0px 10px" />
          </Box>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
}

const CouponCompleteComponent = ({
  shopName = '',
  couponName = '',
  reservationDate = '',
  reservationName = '',
  email = '',
  tel = '',
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
