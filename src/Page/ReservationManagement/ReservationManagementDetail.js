import {BorderButton, FooterButton} from '@/assets/global/Button';
import {Box, RowBox, ScrollBox} from '@/assets/global/Container';
import {bikeInfo, productStatus} from '@/assets/global/dummy';
import {DefaultInput} from '@/assets/global/Input';
import {DarkBoldText, DarkMediumText, DarkText, MoneyText} from '@/assets/global/Text';
import Theme from '@/assets/global/Theme';
import Badge from '@/Component/BikeManagement/Badge';
import BikeInformaitonBody from '@/Component/BikeManagement/BikeInformaitonBody';
import BikeInformationHeader from '@/Component/BikeManagement/BikeInformationHeader';
import {borderBottomWhiteGray} from '@/Component/BikeManagement/ShopRepairHistory';
import Header from '@/Component/Layout/Header';
import {modalOpen} from '@/Store/modalState';
import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

export default function ReservationManagementDetail({navigation}) {
  const {size} = useSelector(state => state);
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

  return (
    <>
      <Header title="상세보기" />
      <Box flex={1}>
        <ScrollBox flex={1} pd="0px 16px">
          <Box style={borderBottomWhiteGray}>
            <RowBox mg="20px 0px 0px" alignItems="center">
              <Badge badgeContent={productStatus.status} />
              <DarkBoldText mg="0px 0px 0px 10px">{productStatus.productName}</DarkBoldText>
            </RowBox>
            <RowBox mg="20px 0px 10px">
              <DarkMediumText width="110px">예약시간</DarkMediumText>
              <RowBox width="270px" alignItems="center">
                <DarkText mg="0px 10px 0px 0px">{productStatus.reservationDate} </DarkText>
                <TouchableOpacity onPress={onPressChangeDate}>
                  <BorderButton>변경</BorderButton>
                </TouchableOpacity>
              </RowBox>
            </RowBox>
            <RowBox mg="0px 0px 10px">
              <DarkMediumText width="110px">요청사항</DarkMediumText>
              <DarkText width="270px">{productStatus.request}</DarkText>
            </RowBox>
            <RowBox mg="0px 0px 20px">
              <DarkMediumText width="110px">승인거절 사유</DarkMediumText>
              <DarkText width="270px">{productStatus.rejection}</DarkText>
            </RowBox>
          </Box>
          <Box mg="20px 0px 0px">
            <DarkBoldText>정비 자전거 정보</DarkBoldText>
            <BikeInformationHeader item={bikeInfo} mg="10px 0px" />
            <BikeInformaitonBody bikeInfoDetail={bikeInfo.detail} />
          </Box>
          <Box mg="10px 0px 20px" style={borderBottomWhiteGray}>
            <DarkBoldText>결제정보</DarkBoldText>
            <RowBox mg="10px 0px 20px" justifyContent="space-between" width={size.minusPadding}>
              <DarkMediumText fontSize={Theme.fontSize.fs15}> 가격</DarkMediumText>
              <RowBox>
                <Badge badgeContent={productStatus.status} />
                <MoneyText
                  mg="0px 0px 0px 10px"
                  fontSize={Theme.fontSize.fs15}
                  fontWeight={Theme.fontWeight.bold}
                  color={Theme.color.black}
                  money={productStatus.totalPrice}
                />
              </RowBox>
            </RowBox>
          </Box>
          <Box style={borderBottomWhiteGray}>
            <DarkBoldText>고객정보</DarkBoldText>
            <Box width={size.minusPadding}>
              <RowBox mg="10px 0px 0px">
                <DarkMediumText width="65px">이름</DarkMediumText>

                <DarkText mg="0px 10px 0px 0px">{productStatus.customerName}</DarkText>
                <BorderButton
                  borderColor={Theme.borderColor.whiteGray}
                  color={Theme.color.black}
                  borderRadius="3px">
                  {productStatus.customerLevel}
                </BorderButton>
              </RowBox>
              <RowBox mg="10px 0px 0px">
                <DarkMediumText width="65px">이메일</DarkMediumText>

                <DarkText mg="0px 10px 0px 0px">{productStatus.customerEmail}</DarkText>
              </RowBox>
              <RowBox mg="10px 0px 20px">
                <DarkMediumText width="65px">연락처</DarkMediumText>

                <DarkText mg="0px 10px 0px 0px">{productStatus.customerTel}</DarkText>
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
              multilineasdasd
            />
          </Box>
          <Box mg="0px 0px 20px">
            <FooterButton
              isChange
              leftContent="승인"
              rightContent="거절"
              isRelative
              leftPress={onPressApprove}
              rightPress={onPressRejection}
            />
          </Box>
        </ScrollBox>
      </Box>
    </>
  );
}
