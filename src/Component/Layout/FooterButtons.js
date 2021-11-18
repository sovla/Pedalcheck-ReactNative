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
import DefaultImage from '@/assets/global/Image';
import {DefaultText, GrayText} from '@/assets/global/Text';
import Theme from '@/assets/global/Theme';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/core';

export default function FooterButtons({selectMenu}) {
  const navigation = useNavigation();
  const {size} = useSelector(state => state);
  const boxWidth = `${(size.designWidth - 32) / 4}px`;
  const menuArray = [
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
        elevation: 5,
      }}
      pd="0px 16px">
      {menuArray.map((item, index) => {
        const isOn = selectMenu === index + 1;
        return (
          <TouchableOpacity key={item.content} onPress={() => navigation.navigate(item.navigate)}>
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
                resizeMode="stretch"
              />
              <DefaultText color={isOn ? Theme.color.skyBlue : Theme.color.gray}>
                {item.content}
              </DefaultText>
            </Box>
          </TouchableOpacity>
        );
      })}
    </RowBox>
  );
}
