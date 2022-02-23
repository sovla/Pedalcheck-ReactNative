import {Box, RowBox} from '@/assets/global/Container';
import React from 'react';
import {useSelector} from 'react-redux';
import SpannerOnIcon from '@assets/image/menu01_on.png';
import BikeOnIcon from '@assets/image/menu02_on.png';
import FeedOnIcon from '@assets/image/menu03_on.png';
import MoreOnIcon from '@assets/image/menu04_on.png';
import SpannerOffIcon from '@assets/image/menu01.png';
import BikeOffIcon from '@assets/image/menu02.png';
import FeedOffIcon from '@assets/image/menu03.png';
import MoreOffIcon from '@assets/image/menu04.png';

import ReservationOnIcon from '@assets/image/menu06_on.png';
import CustomerOnIcon from '@assets/image/menu07_on.png';

import ReservationOffIcon from '@assets/image/menu06.png';
import CustomerOffIcon from '@assets/image/menu07.png';

import DefaultImage from '@/assets/global/Image';
import {DefaultText} from '@/assets/global/Text';
import Theme from '@/assets/global/Theme';
import {Alert, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {AlertButton, AlertButtons, RequireApple, RequireLogin, RequireLoginAlert} from '@/Util/Alert';

export default function FooterButtons({selectMenu, isAdmin}) {
  const navigation = useNavigation();
  const {size, login} = useSelector(state => state);
  const boxWidth = `${(size.designWidth - 32) / 4}px`;
  const menuArray = isAdmin
    ? [
        {
          content: '정비내역',
          imageOn: SpannerOnIcon,
          imageOff: SpannerOffIcon,
          navigate: 'RepairHistoryHome',
        },
        {
          content: '예약관리',
          imageOn: ReservationOnIcon,
          imageOff: ReservationOffIcon,
          navigate: 'ReservationManagement',
        },
        {
          content: '고객',
          imageOn: CustomerOnIcon,
          imageOff: CustomerOffIcon,
          navigate: 'Customer',
        },
        {
          content: '더보기',
          imageOn: MoreOnIcon,
          imageOff: MoreOffIcon,
          navigate: 'More',
        },
      ]
    : [
        {
          content: '정비소',
          imageOn: SpannerOnIcon,
          imageOff: SpannerOffIcon,
          navigate: 'RepairHome',
        },
        {
          content: '내 자전거',
          imageOn: BikeOnIcon,
          imageOff: BikeOffIcon,
          navigate: 'BikeManagement',
        },
        {
          content: '피드',
          imageOn: FeedOnIcon,
          imageOff: FeedOffIcon,
          navigate: 'Feed',
        },
        {
          content: '더보기',
          imageOn: MoreOnIcon,
          imageOff: MoreOffIcon,
          navigate: 'More',
        },
      ];
  const onPressMenu = item => {
    let result = true;
    if (item.content === '내 자전거' || item.content === '더보기') {
      if (login.idx === '') {
        AlertButtons('로그인이 필요한 기능입니다.', '확인', '취소', () => navigation.navigate('Home'));
        return;
      }
    }
    if (item.content === '내 자전거') {
      if (login.apple_id && login?.mt_status === 'N') {
        AlertButtons(
          `내 자전거 등록을 계속하려면 추가정보\n입력이 필요합니다.\n추가정보 입력 하시겠습니까?`,
          '확인',
          '취소',
          () => {
            navigation.navigate('Register');
          },
        );
      }
    }

    navigation.navigate(item?.navigate);
  };
  return (
    <RowBox
      height="64px"
      style={{
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 5,
        },
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 8,
      }}
      pd="0px 16px">
      {menuArray.map((item, index) => {
        const isOn = selectMenu === index + 1;
        return (
          <TouchableOpacity
            key={item.content}
            onPress={() => {
              onPressMenu(item);
            }}>
            <Box
              width={boxWidth}
              backgroundColor="rgba(0,0,0,0)"
              height="100%"
              justifyContent="flex-end"
              alignItems="center"
              pd="0px 0px 10px">
              <DefaultImage
                source={isOn ? item.imageOn : item.imageOff}
                width={index !== 1 ? '22px' : '32px'}
                height="22px"
                resizeMode="contain"
              />
              <DefaultText color={isOn ? Theme.color.skyBlue : Theme.color.gray}>{item.content}</DefaultText>
            </Box>
          </TouchableOpacity>
        );
      })}
    </RowBox>
  );
}
