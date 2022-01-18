import {
  getCouponReservationDetail,
  getReservationDetail,
} from '@/API/ReservationManagement/ReservationManagement';
import {BorderButton, FooterButton, LinkButton, LinkWhiteButton} from '@/assets/global/Button';
import {BetweenBox, Box, RowBox, ScrollBox} from '@/assets/global/Container';
import {DefaultInput} from '@/assets/global/Input';
import {DarkBoldText, DarkMediumText, DarkText, MoneyText} from '@/assets/global/Text';
import Theme from '@/assets/global/Theme';
import Badge from '@/Component/BikeManagement/Badge';
import BikeInformaitonBody from '@/Component/BikeManagement/BikeInformaitonBody';
import BikeInformationHeader from '@/Component/BikeManagement/BikeInformationHeader';
import {borderBottomWhiteGray} from '@/Component/BikeManagement/ShopRepairHistory';
import Header from '@/Component/Layout/Header';
import useUpdateEffect from '@/Hooks/useUpdateEffect';
import {modalOpen} from '@/Store/modalState';
import React from 'react';
import {useState} from 'react';
import {useEffect} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

export default function ReservationManagementDetail({navigation, route: {params}, type}) {
  const initData = {
    ot_status: '예약',
    pt_title: '세차,종합정비',
    ot_pt_date: '2022-01-13',
    ot_pt_time: '13:00:00',
    ot_price: '42000',
    ot_memo: 'ㅎㅁㅎㅁ',
    ot_adm_memo: null,
    mbt_serial: 'EFW13548Et',
    mbt_year: '2020',
    mbt_type: '로드바이크',
    mbt_drive: null,
    mbt_size: '180',
    mbt_color: '검은색',
    mbt_model_detail: null,
    ot_bike_image: null,
    ot_bike_nick: '따르릉',
    ot_bike_brand: null,
    ot_bike_model: null,
    mt_name: '신혜수',
    mt_email: 'lotion_@naver.com',
    mt_hp: '010-6464-6464',
    //  결제대기
    //  고객 레벨 일반 관심매장 고객 여부
    //  거절일 경우 거절에 대한 메모 값
  };
  const [reservationInfo, setReservationInfo] = useState(initData);
  const [memo, setMemo] = useState('');
  const {size, login} = useSelector(state => state);
  const dispatch = useDispatch();
  const onPressApprove = () => {
    // 승인 누를시
    navigation.navigate('Approval');
  };
  const onPressRejection = () => {
    // 거절 누를시
    dispatch(modalOpen('repairRejection'));
  };
  const onPressChangeDate = () => {
    // 예약 시간 옆 변경 누를시
    navigation.navigate('DateChange');
  };

  useEffect(() => {
    const detailApiFunction = type === 'coupon' ? getCouponReservationDetail : getReservationDetail;
    detailApiFunction({
      _mt_idx: login.idx,
      od_idx: params?.od_idx,
    })
      .then(res => res.data?.result === 'true' && res.data.data.data)
      .then(data => setReservationInfo(data));
  }, []);
  useUpdateEffect(() => {
    setMemo(reservationInfo?.ot_adm_memo);
  }, [reservationInfo]);

  const bikeInfo = {
    bikeName: reservationInfo?.ot_bike_nick,
    brand: reservationInfo?.ot_bike_brand,
    modelName: reservationInfo?.ot_bike_model,
    bikeImage: reservationInfo?.ot_bike_image,
  };

  const bikeInfoDetail = [
    {
      title: '차대번호',
      value: reservationInfo?.mbt_serial,
    },
    {
      title: '연식',
      value: reservationInfo?.mbt_year ? reservationInfo?.mbt_year.substring(2) + '년식' : '',
    },
    {
      title: '타입',
      value: reservationInfo?.mbt_type,
    },
    {
      title: '구동계',
      value: reservationInfo?.mbt_drive,
    },
    {
      title: '사이즈',
      value: reservationInfo?.mbt_size ? reservationInfo?.mbt_size + 'cm' : '',
    },
    {
      title: '컬러',
      value: reservationInfo?.mbt_color,
    },
    {
      title: '모델상세',
      value: reservationInfo?.mbt_model_detail,
    },
  ];

  return (
    <>
      <Header title="상세보기" />
      <Box flex={1}>
        <ScrollBox flex={1} pd="0px 16px">
          <Box style={borderBottomWhiteGray}>
            <RowBox mg="20px 0px 0px" alignItems="center">
              <Badge badgeContent={reservationInfo?.ot_status} />
              <DarkBoldText mg="0px 0px 0px 10px">{reservationInfo?.pt_title}</DarkBoldText>
            </RowBox>
            <RowBox mg="20px 0px 10px">
              <DarkMediumText width="110px">예약시간</DarkMediumText>
              <RowBox width="270px" alignItems="center">
                <DarkText mg="0px 10px 0px 0px">
                  {`${reservationInfo?.ot_pt_date} ${reservationInfo?.ot_pt_time?.substring(0, 5)}`}{' '}
                </DarkText>
                {(reservationInfo?.ot_status === '변경' ||
                  reservationInfo?.ot_status === '승인') && (
                  <TouchableOpacity onPress={onPressChangeDate}>
                    <BorderButton>변경</BorderButton>
                  </TouchableOpacity>
                )}
              </RowBox>
            </RowBox>
            <RowBox mg="0px 0px 10px">
              <DarkMediumText width="110px">요청사항</DarkMediumText>
              <DarkText width="270px">{reservationInfo?.ot_memo}</DarkText>
            </RowBox>
            {reservationInfo?.rejection && (
              <RowBox mg="0px 0px 20px">
                <DarkMediumText width="110px">승인거절 사유</DarkMediumText>
                <DarkText width="270px">{reservationInfo?.rejection}</DarkText>
              </RowBox>
            )}
          </Box>
          <Box mg="20px 0px 0px">
            <DarkBoldText>정비 자전거 정보</DarkBoldText>
            <BikeInformationHeader item={bikeInfo} mg="10px 0px" />
            <BikeInformaitonBody bikeInfoDetail={bikeInfoDetail} />
          </Box>
          <Box mg="10px 0px 20px" style={borderBottomWhiteGray}>
            <DarkBoldText>결제정보</DarkBoldText>
            <RowBox mg="10px 0px 20px" justifyContent="space-between" width={size.minusPadding}>
              <DarkMediumText fontSize={Theme.fontSize.fs15}> 가격</DarkMediumText>
              <RowBox>
                <Badge badgeContent={reservationInfo.status} />
                <MoneyText
                  mg="0px 0px 0px 10px"
                  fontSize={Theme.fontSize.fs15}
                  fontWeight={Theme.fontWeight.bold}
                  color={Theme.color.black}
                  money={reservationInfo?.ot_price}
                />
              </RowBox>
            </RowBox>
          </Box>
          <Box style={borderBottomWhiteGray}>
            <DarkBoldText>고객정보</DarkBoldText>
            <Box width={size.minusPadding}>
              <RowBox mg="10px 0px 0px">
                <DarkMediumText width="65px">이름</DarkMediumText>

                <DarkText mg="0px 10px 0px 0px">{reservationInfo?.mt_name}</DarkText>
                <BorderButton
                  borderColor={Theme.borderColor.whiteGray}
                  color={Theme.color.black}
                  borderRadius="3px">
                  {reservationInfo?.customerLevel}
                </BorderButton>
              </RowBox>
              <RowBox mg="10px 0px 0px">
                <DarkMediumText width="65px">이메일</DarkMediumText>

                <DarkText mg="0px 10px 0px 0px">{reservationInfo?.mt_email}</DarkText>
              </RowBox>
              <RowBox mg="10px 0px 20px">
                <DarkMediumText width="65px">연락처</DarkMediumText>

                <DarkText mg="0px 10px 0px 0px">{reservationInfo?.mt_hp}</DarkText>
              </RowBox>
            </Box>
          </Box>
          <Box mg="0px 0px 20px">
            <DarkBoldText mg="20px 0px 10px">정비소 관리자 메모</DarkBoldText>
            <DefaultInput
              placeHolder="메모를 입력해주세요"
              width={size.minusPadding}
              height="100px"
              isAlignTop
              multiline
              value={memo}
              changeFn={setMemo}
            />
          </Box>
          <Box mg="0px 0px 20px">
            <RowBox width="380px">
              {reservationInfo.ot_status === '예약' && (
                <>
                  <LinkButton width="185px" content="승인" to={onPressApprove} />
                  <Box width="10px" />
                  <LinkWhiteButton width="185px" content="거절" to={onPressRejection} />
                </>
              )}
            </RowBox>
          </Box>
        </ScrollBox>
      </Box>
    </>
  );
}
