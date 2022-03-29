import {Box, PositionBox, RowBox} from '@/assets/global/Container';
import DefaultImage from '@/assets/global/Image';
import {DarkText, DefaultText} from '@/assets/global/Text';
import Theme from '@/assets/global/Theme';
import React, {useEffect} from 'react';
import {StyleSheet, TouchableOpacity, Modal, TouchableWithoutFeedback} from 'react-native';
import {useSelector} from 'react-redux';
import RepairReservationIcon from '@assets/image/ic_reservation.png';
import LikeIcon from '@assets/image/good.png';
import UnLikeIcon from '@assets/image/good_b.png';
import {useNavigation, useIsFocused} from '@react-navigation/core';
import {AlertButton, AlertButtons, RequireLoginAlert} from '@/Util/Alert';
import useBoolean from '@/Hooks/useBoolean';
import {LinkWhiteButton} from '@/assets/global/Button';

export default function FooterButtons({isRepair = false, isLike = false, onPressLike = () => {}, my_bike, isPartner}) {
  const [isView, setIsView] = useBoolean(false);

  const {login, shopInfo} = useSelector(state => state);
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const onPressRepair = () => {
    if (shopInfo?.store_info?.mt_idx === login.idx) {
      AlertButton('본인 매장에는 예약할 수 없습니다.');
      return;
    }
    //  로그인확인
    if (RequireLoginAlert(login, navigation, '정비 예약을')) {
      setIsView();
    }
  };

  const onPressGeneralRepair = () => {
    if (!my_bike) {
      //  api에서 받아온 내 자전거가 없는경우
      AlertButtons('등록된 자전거가 없습니다. 정비할 자전거를 등록해주세요.', '확인', '취소', () =>
        navigation.navigate('BikeManagement'),
      );
      setIsView();
      return;
    } else {
      if (shopInfo.pt_list) {
        navigation.navigate('ReservationProduct');
      } else {
        // 상품이 없는 경우
        AlertButton('예약 가능한 상품이 없습니다.', '확인', setIsView);
      }
    }
  };

  const onPressCouponRepair = () => {
    navigation.navigate('CouponManagement', {
      isShop: true,
    });
  };

  useEffect(() => {
    if (!isFocused && isView) {
      setIsView();
    }
  }, [isFocused]);
  return (
    <>
      <PositionBox bottom="0px">
        <RowBox width="412px" height="50px" style={[styles.borderRight, styles.borderLeft]}>
          {isPartner && (
            <TouchableOpacity disabled={isRepair ? false : true} style={styles.touchBox} onPress={onPressRepair}>
              <RowBox
                width="100%"
                height="100%"
                justifyContent="center"
                alignItems="center"
                style={styles.borderLeft}
                backgroundColor={isRepair ? Theme.color.skyBlue : Theme.color.gray}>
                <DefaultImage source={RepairReservationIcon} width="20px" height="20px" />
                <DefaultText pd="0px 0px 0px 7px">정비예약</DefaultText>
              </RowBox>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.touchBox} onPress={onPressLike}>
            <RowBox
              width="100%"
              height="100%"
              justifyContent="center"
              alignItems="center"
              style={styles.borderRight}
              backgroundColor={Theme.color.white}>
              <DefaultImage source={isLike ? LikeIcon : UnLikeIcon} width="20px" height="20px" />
              <DarkText pd="0px 0px 0px 7px">{isLike ? '좋아요 취소' : '좋아요'}</DarkText>
            </RowBox>
          </TouchableOpacity>
        </RowBox>
      </PositionBox>
      <Modal transparent visible={isView} onRequestClose={setIsView}>
        <TouchableWithoutFeedback onPress={setIsView}>
          <Box backgroundColor="#0008" flex={1} alignItems="center" justifyContent="center">
            <LinkWhiteButton
              to={onPressGeneralRepair}
              content="일반 정비"
              height="40px"
              width="150px"
              borderRadius="40px"
            />
            <Box width="20px" backgroundColor="#0000" height="20px" />
            <LinkWhiteButton
              to={onPressCouponRepair}
              content="쿠폰 정비"
              height="40px"
              width="150px"
              borderRadius="40px"
            />
          </Box>
        </TouchableWithoutFeedback>
      </Modal>
    </>
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
