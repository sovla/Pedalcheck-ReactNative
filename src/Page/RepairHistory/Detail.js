import {BorderButton, FooterButton} from '@/assets/global/Button';
import {BetweenBox, Box, RowBox, ScrollBox} from '@/assets/global/Container';
import {bikeInfo, productStatus as changeItem} from '@/assets/global/dummy';
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

// rejection: item.ot_cmemo, // 수정 필요 API 값없음

export default function Detail({navigation, route}) {
  const {size} = useSelector(state => state);
  const dispatch = useDispatch();
  // const onPressApprove = () => {
  //   // 승인 누를시
  //   navigation.navigate('Approval');
  // };
  // const onPressRejection = () => {
  //   // 거절 누를시
  //   dispatch(modalOpen('repairRejection'));
  // };
  // const onPressChangeDate = () => {
  //   // 예약 시간 옆 변경 누를시
  //   navigation.navigate('DateChange');
  // };
  const item = route?.params?.item;
  const changeItem = {
    status: item.ot_status,
    productName: item.ot_title,
    reservationDate: item.ot_pt_date,
    request: item.ot_meme,
    rejection: item.ot_cmemo, // 수정 필요 API 값없음
    totalPrice: item.ot_price,
    customerName: item.mt_name,
    customerEmail: item.mt_email,
    customerTel: item.mt_hp,
    customerLevel: item.mt_status,
  };
  const changeBikeItem = {
    bikeImage: item.bike_img,
    brand: item.ot_bike_brand,
    modelName: item.ot_bike_model,
    bikeName: item.ot_bike_nick,
    detail: [
      {
        title: '차대번호',
        value: item.mbt_serial,
      },
      {
        title: '연식',
        value: item.mbt_year,
      },
      {
        title: '타입',
        value: item.mbt_type,
      },
      {
        title: '구동계',
        value: item.mbt_drive,
      },
      {
        title: '사이즈',
        value: item.mbt_size,
      },
      {
        title: '컬러',
        value: item.mbt_color,
      },
      {
        title: '모델상세',
        value: item.mbt_model_detial,
      },
    ],
  };

  console.log(item);

  return (
    <>
      <Header title="상세보기" />
      <Box flex={1}>
        <ScrollBox flex={1} pd="0px 16px">
          <Box style={borderBottomWhiteGray}>
            <RowBox mg="20px 0px 0px" alignItems="center">
              <Badge badgeContent={changeItem.status} />
              <DarkBoldText mg="0px 0px 0px 10px">{changeItem.productName}</DarkBoldText>
            </RowBox>
            <RowBox mg="20px 0px 10px">
              <DarkMediumText width="110px">예약시간</DarkMediumText>
              <RowBox width="270px" alignItems="center">
                <DarkText mg="0px 10px 0px 0px">{changeItem.reservationDate} </DarkText>
              </RowBox>
            </RowBox>
            <RowBox mg="0px 0px 10px">
              <DarkMediumText width="110px">요청사항</DarkMediumText>
              <DarkText width="270px">{changeItem.request}</DarkText>
            </RowBox>
            <RowBox mg="0px 0px 20px">
              <DarkMediumText width="110px">완료시간</DarkMediumText>
              <DarkText width="270px">{'2021-10-14 10:58'}</DarkText>
            </RowBox>
          </Box>
          <Box mg="20px 0px 0px">
            <DarkBoldText>정비 자전거 정보</DarkBoldText>
            <BikeInformationHeader item={changeBikeItem} mg="10px 0px" />
            <BikeInformaitonBody bikeInfoDetail={changeBikeItem.detail} />
          </Box>
          <Box mg="10px 0px 0px" style={borderBottomWhiteGray}>
            <DarkBoldText>결제정보</DarkBoldText>
            <BetweenBox mg="10px 0px 0px" width={size.minusPadding}>
              <DarkMediumText fontSize={Theme.fontSize.fs15}>가격</DarkMediumText>
              <RowBox alignItems="center">
                {true && <MoneyText disabled money={50000} />}
                <MoneyText
                  mg="0px 0px 0px 10px"
                  fontSize={Theme.fontSize.fs15}
                  fontWeight={Theme.fontWeight.bold}
                  color={Theme.color.black}
                  money={changeItem.totalPrice}
                />
              </RowBox>
            </BetweenBox>
            <BetweenBox mg="10px 0px 0px" width={size.minusPadding}>
              <DarkMediumText fontSize={Theme.fontSize.fs15}>결제</DarkMediumText>
              <RowBox alignItems="center">
                <MoneyText
                  mg="0px 0px 0px 10px"
                  fontSize={Theme.fontSize.fs15}
                  color={Theme.color.black}
                  money={changeItem.totalPrice}
                />
              </RowBox>
            </BetweenBox>
            <BetweenBox mg="10px 0px 0px" width={size.minusPadding}>
              <DarkMediumText fontSize={Theme.fontSize.fs15}>할인</DarkMediumText>
              <RowBox alignItems="center">
                <MoneyText
                  mg="0px 0px 0px 10px"
                  fontSize={Theme.fontSize.fs15}
                  color={Theme.color.black}
                  money={12000}
                />
              </RowBox>
            </BetweenBox>
            <RowBox mg="10px 0px" width="380px" justifyContent="flex-end">
              <TouchableOpacity>
                <BorderButton>수정</BorderButton>
              </TouchableOpacity>
            </RowBox>
          </Box>
          <BetweenBox style={borderBottomWhiteGray} width="380px" height="55px" alignItems="center">
            <DarkBoldText fontSize={Theme.fontSize.fs15}>합계</DarkBoldText>
            <MoneyText
              money={changeItem.totalPrice}
              color={Theme.color.black}
              fontSize={Theme.fontSize.fs18}
              fontWeight={Theme.fontWeight.bold}
            />
          </BetweenBox>
          <Box mg="20px 0px 0px">
            <DarkBoldText>고객정보</DarkBoldText>
            <Box width={size.minusPadding}>
              <RowBox mg="10px 0px 0px" alignItems="center">
                <DarkMediumText width="65px">이름</DarkMediumText>

                <DarkText mg="0px 10px 0px 0px">{changeItem.customerName}</DarkText>
                <BorderButton
                  width={changeItem.customerLevel?.length === 4 ? '65px' : '38px'}
                  fontSize="13px"
                  borderColor={Theme.borderColor.whiteGray}
                  color={Theme.color.black}
                  borderRadius="3px">
                  {changeItem.customerLevel}
                </BorderButton>
              </RowBox>
              <RowBox mg="10px 0px 0px">
                <DarkMediumText width="65px">이메일</DarkMediumText>

                <DarkText mg="0px 10px 0px 0px">{changeItem.customerEmail}</DarkText>
              </RowBox>
              <RowBox mg="10px 0px 20px">
                <DarkMediumText width="65px">연락처</DarkMediumText>

                <DarkText mg="0px 10px 0px 0px">{changeItem.customerTel}</DarkText>
              </RowBox>
            </Box>
          </Box>
        </ScrollBox>
      </Box>
    </>
  );
}
