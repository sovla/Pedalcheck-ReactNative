import {
  couponReservationEdit,
  getCouponReservationDetail,
  getReservationDetail,
  reservationEdit,
} from '@/API/ReservationManagement/ReservationManagement';
import {BorderButton, FooterButton, LinkWhiteButton} from '@/assets/global/Button';
import {Box, RowBox, ScrollBox} from '@/assets/global/Container';
import {DefaultInput} from '@/assets/global/Input';
import {DarkBoldText, DarkMediumText, DarkText, MoneyText} from '@/assets/global/Text';
import Theme from '@/assets/global/Theme';
import Badge from '@/Component/BikeManagement/Badge';
import BikeInformaitonBody from '@/Component/BikeManagement/BikeInformaitonBody';
import BikeInformationHeader from '@/Component/BikeManagement/BikeInformationHeader';
import {borderBottomWhiteGray} from '@/Component/BikeManagement/ShopRepairHistory';
import Header from '@/Component/Layout/Header';
import useUpdateEffect from '@/Hooks/useUpdateEffect';
import {modalOpen, modalOpenAndProp} from '@/Store/modalState';
import {getPixel} from '@/Util/pixelChange';
import React from 'react';
import {useState} from 'react';
import {useEffect} from 'react';
import {TouchableOpacity} from 'react-native';
import 'moment/locale/ko';
import {useDispatch, useSelector} from 'react-redux';
import {showToastMessage} from '@/Util/Toast';
import {imageAddress} from '@assets/global/config';
import {useIsFocused} from '@react-navigation/native';

export default function ReservationManagementDetail({navigation, route: {params}}) {
  const type = params?.type;

  const initData = {
    ot_status: '',
    pt_title: '',
    ot_pt_date: '',
    ot_pt_time: '',
    ot_price: '',
    ot_memo: '',
    ot_cmemo: '',
    ot_adm_memo: null,
    mbt_serial: '',
    mbt_year: '',
    mbt_type: '',
    mbt_drive: null,
    mbt_size: '',
    mbt_color: '',
    mbt_model_detail: null,
    ot_bike_image: null,
    ot_bike_nick: '',
    ot_bike_brand: null,
    ot_bike_model: null,
    mt_name: '',
    mt_email: '',
    mt_hp: '',
    //  결제대기
    //  고객 레벨 일반 관심매장 고객 여부
    //  거절일 경우 거절에 대한 메모 값
  };
  const [reservationInfo, setReservationInfo] = useState(initData);
  const [memo, setMemo] = useState('');
  const [isChange, setIsChange] = useState(false);

  const {size, login} = useSelector(state => state);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const onPressApprove = async () => {
    // 승인 누를시
    const result = await editApiHandle(3);

    if (result) {
      // 승인 완료시 푸시 알림  정비요청이 승인되었습니다 전송 API 추가
      showToastMessage('정비요청이 승인되었습니다.');
    } else {
    }
  };
  const onPressRejection = async () => {
    // 거절 누를시

    dispatch(
      modalOpenAndProp({
        modalComponent: 'repairRejection',
        onPressReject: async content => {
          const result = await editApiHandle(4, content);
          if (result) {
            showToastMessage('승인거부되었습니다.');
          }
        },
      }),
    );
  };
  const onPressChangeDate = () => {
    // 예약 시간 옆 변경 누를시
    navigation.navigate('DateChange', params);
  };
  const onPressComplete = async () => {
    // 처리 완료 누를시
    if (type === 'coupon') {
      //  쿠폰 -  처리완료처리
      const result = await editApiHandle(5);
      if (result) {
        showToastMessage('처리 완료되었습니다.');
      }
    } else {
      navigation.navigate('Approval', {...params, ...reservationInfo});
    }
  };
  const editApiHandle = async (ot_status, content) => {
    // 승인 거절 처리완료 api
    // ot_status 3이면 승인 4 거절 5 처리완료
    // 5 처리완료는 쿠폰일때만 존재
    // content 거절 사유

    const approveFunction = type === 'coupon' ? couponReservationEdit : reservationEdit;
    const response = await approveFunction({
      _mt_idx: login?.idx,
      od_idx: params?.od_idx,
      ot_cmemo: ot_status === 4 && content,
      ot_adm_memo: memo,
      ot_status,
    });
    if (response.data?.result === 'true') {
      setIsChange(prev => !prev);
      return true;
    } else {
      showToastMessage(response.data?.msg);
      return false;
    }
  };

  const getReservationInfoHandle = async () => {
    // 예약 정보 API
    const detailApiFunction = type === 'coupon' ? getCouponReservationDetail : getReservationDetail;
    await detailApiFunction({
      _mt_idx: login?.idx,
      od_idx: params?.od_idx,
    })
      .then(res => res.data?.result === 'true' && res.data.data.data)
      .then(data => setReservationInfo(data));
  };

  useEffect(() => {
    // 초기, 값 변경시 예약정보 API
    if (isFocused) getReservationInfoHandle();
  }, [isChange, isFocused]);

  useUpdateEffect(() => {
    // 예약정보 바뀔 경우 메모 데이터 불러오기
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

  const reservationTime = new Date(reservationInfo.ot_pt_date + ' ' + reservationInfo.ot_pt_time);
  const now = new Date();
  // 예약시간 <= 현재시간 인경우 true
  const isPrevTime = reservationTime <= now;
  return (
    <>
      <Header title="상세보기" />
      <Box style={{flex: 1}}>
        <ScrollBox pd="0px 16px">
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
                {(reservationInfo?.ot_status === '예약' || reservationInfo?.ot_status === '승인') && !isPrevTime && (
                  <TouchableOpacity onPress={onPressChangeDate}>
                    <BorderButton width="auto">변경</BorderButton>
                  </TouchableOpacity>
                )}
              </RowBox>
            </RowBox>
            {reservationInfo?.ot_memo?.length > 0 && (
              <RowBox mg="0px 0px 10px">
                <DarkMediumText width="110px">요청사항</DarkMediumText>
                <DarkText width="270px">{reservationInfo.ot_memo}</DarkText>
              </RowBox>
            )}

            {reservationInfo?.ot_cmemo?.length > 0 && (
              <RowBox mg="0px 0px 20px">
                <DarkMediumText width="110px">승인거절 사유</DarkMediumText>
                <DarkText width="270px">{reservationInfo.ot_cmemo}</DarkText>
              </RowBox>
            )}
          </Box>
          <Box mg="20px 0px 0px">
            <DarkBoldText>정비 자전거 정보</DarkBoldText>
            <BikeInformationHeader item={bikeInfo} mg="10px 0px" />
            <BikeInformaitonBody bikeInfoDetail={bikeInfoDetail} />
          </Box>
          {type !== 'coupon' && (
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
          )}

          <Box style={borderBottomWhiteGray}>
            <DarkBoldText>고객정보</DarkBoldText>
            <Box width={size.minusPadding}>
              <RowBox mg="10px 0px 0px" alignItems="center">
                <DarkMediumText width="65px">이름</DarkMediumText>

                <DarkText mg="0px 10px 0px 0px">{reservationInfo?.mt_name}</DarkText>
                <BorderButton borderColor={Theme.borderColor.whiteGray} color={Theme.color.black} borderRadius="3px">
                  {reservationInfo?.mt_badge}
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

          {type !== 'coupon' && ( // 쿠폰 아닌경우엔 줄이 길어 스크롤 뷰 안에서
            <>
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
                  disabled={reservationInfo.ot_status === '승인거부' || reservationInfo.ot_status === '처리완료'}
                />
              </Box>
              <Box mg="0px 0px 20px">
                {reservationInfo.ot_status === '예약' && !isPrevTime && (
                  <FooterButton
                    isChange
                    leftContent="승인"
                    rightContent="거절"
                    isRelative
                    leftPress={onPressApprove}
                    rightPress={onPressRejection}
                  />
                )}
                {reservationInfo.ot_status === '예약' && isPrevTime && (
                  <RowBox justifyContent="flex-end" width="380px">
                    <LinkWhiteButton width="175px" content="거절" to={onPressRejection} />
                  </RowBox>
                )}
                {reservationInfo.ot_status === '승인' && ( // 수정필요 결제 완료 여부 조건문에 추가 필요
                  <RowBox justifyContent="flex-end" width="380px">
                    <LinkWhiteButton width="175px" content="처리완료" to={onPressComplete} />
                  </RowBox>
                )}
              </Box>
            </>
          )}
        </ScrollBox>
        {type === 'coupon' && ( // 쿠폰인 경우 줄이 짧아서 스크롤 뷰 밖에서
          <Box mg="0px 0px 20px">
            {reservationInfo.ot_status === '예약' && !isPrevTime && (
              <FooterButton
                isChange
                leftContent="승인"
                rightContent="거절"
                isRelative={type !== 'coupon'}
                leftPress={onPressApprove}
                rightPress={onPressRejection}
                position={type === 'coupon' && {left: getPixel(16)}}
              />
            )}
            {reservationInfo.ot_status === '예약' && isPrevTime && (
              <RowBox justifyContent="flex-end" width="380px" mg="0px 16px">
                <LinkWhiteButton width="175px" content="거절" to={onPressRejection} />
              </RowBox>
            )}
            {reservationInfo.ot_status === '승인' && (
              <RowBox justifyContent="flex-end" width="380px" mg="0px 16px">
                <LinkWhiteButton width="175px" content="처리완료" to={onPressComplete} />
              </RowBox>
            )}
          </Box>
        )}
      </Box>
    </>
  );
}
