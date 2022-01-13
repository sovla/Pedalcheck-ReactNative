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
import {AlertButtons, RequireLoginAlert} from '@/Util/Alert';

export default function FooterButtons({
  isRepair = false,
  isLike = false,
  onPressLike = () => {},
  my_bike,
}) {
  const {login} = useSelector(state => state);
  const navigation = useNavigation();
  const onPressRepair = () => {
    if (RequireLoginAlert(login, navigation)) {
      if (!my_bike) {
        AlertButtons(
          '등록된 자전거가 없습니다. 정비할 자전거를 등록해주세요.',
          '확인',
          '취소',
          () => navigation.navigate('BikeManagement'),
        );
        return;
      } else {
        navigation.navigate('ReservationProduct');
      }
    }
  };
  return (
    <PositionBox bottom="0px">
      <RowBox width="412px" height="50px" style={[styles.borderRight, styles.borderLeft]}>
        <TouchableOpacity
          disabled={isRepair ? false : true}
          style={styles.touchBox}
          onPress={onPressRepair}>
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
