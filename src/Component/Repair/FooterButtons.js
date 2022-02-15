import {Box, PositionBox, RowBox} from '@/assets/global/Container';
import DefaultImage from '@/assets/global/Image';
import {DarkText, DefaultText} from '@/assets/global/Text';
import Theme from '@/assets/global/Theme';
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {useSelector} from 'react-redux';
import RepairReservationIcon from '@assets/image/ic_reservation.png';
import LikeIcon from '@assets/image/good.png';
import UnLikeIcon from '@assets/image/good_b.png';
import {useNavigation} from '@react-navigation/core';
import {AlertButton, AlertButtons, RequireLoginAlert} from '@/Util/Alert';

export default function FooterButtons({isRepair = false, isLike = false, onPressLike = () => {}, my_bike}) {
  const {login, shopInfo} = useSelector(state => state);
  const navigation = useNavigation();
  const onPressRepair = () => {
    if (shopInfo?.store_info?.mt_idx === login.idx) {
      AlertButton('본인 매장에는 예약할 수 없습니다.');
      return;
    }
    if (RequireLoginAlert(login, navigation, '정비 예약을')) {
      //  로그인확인
      if (!my_bike) {
        //  api에서 받아온 내 자전거가 없는경우
        AlertButtons('등록된 자전거가 없습니다. 정비할 자전거를 등록해주세요.', '확인', '취소', () =>
          navigation.navigate('BikeManagement'),
        );
        return;
      } else {
        if (shopInfo.pt_list) {
          // 상품이 없는 경우
          navigation.navigate('ReservationProduct');
        } else {
          AlertButton('예약 가능한 상품이 없습니다.');
        }
      }
    }
  };
  return (
    <PositionBox bottom="0px">
      <RowBox width="412px" height="50px" style={[styles.borderRight, styles.borderLeft]}>
        <TouchableOpacity disabled={isRepair ? false : true} style={styles.touchBox} onPress={onPressRepair}>
          {isRepair ? ( // 정비예약 가능
            <RowBox
              width="100%"
              height="100%"
              justifyContent="center"
              alignItems="center"
              style={styles.borderLeft}
              backgroundColor={Theme.color.skyBlue}>
              <DefaultImage source={RepairReservationIcon} width="20px" height="20px" />
              <DefaultText pd="0px 0px 0px 7px">정비예약</DefaultText>
            </RowBox>
          ) : (
            // 정비예약 불가능
            <RowBox
              width="100%"
              height="100%"
              justifyContent="center"
              alignItems="center"
              style={styles.borderLeft}
              backgroundColor={Theme.color.gray}>
              <DefaultImage source={RepairReservationIcon} width="20px" height="20px" />
              <DefaultText pd="0px 0px 0px 7px">정비예약</DefaultText>
            </RowBox>
          )}
        </TouchableOpacity>
        <TouchableOpacity style={styles.touchBox} onPress={onPressLike}>
          {isLike ? (
            // 좋아요 누른 후
            <RowBox
              width="100%"
              height="100%"
              justifyContent="center"
              alignItems="center"
              style={styles.borderRight}
              backgroundColor={Theme.color.white}>
              <DefaultImage source={LikeIcon} width="20px" height="20px" />
              <DarkText pd="0px 0px 0px 7px">좋아요 취소</DarkText>
            </RowBox>
          ) : (
            // 좋아요 누르기 전
            <RowBox
              width="100%"
              height="100%"
              justifyContent="center"
              alignItems="center"
              style={styles.borderRight}
              backgroundColor={Theme.color.white}>
              <DefaultImage source={UnLikeIcon} width="20px" height="20px" />
              <DarkText pd="0px 0px 0px 7px">좋아요</DarkText>
            </RowBox>
          )}
        </TouchableOpacity>
      </RowBox>
    </PositionBox>
  );
}

const styles = StyleSheet.create({
  borderLeft: {
    borderTopLeftRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.46,
    shadowRadius: 11.14,

    elevation: 17,
  },
  borderRight: {
    borderTopRightRadius: 15,
  },
  touchBox: {
    flex: 1,
  },
});
