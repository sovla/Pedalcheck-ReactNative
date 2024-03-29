import {Box, Container} from '@/assets/global/Container';
import {DefaultText} from '@/assets/global/Text';
import React from 'react';
import {Dimensions, Image, StatusBar} from 'react-native';
import Logo from '@assets/image/logo.png';
import Theme from '@/assets/global/Theme';
import DefaultImage from '@/assets/global/Image';

export default function LogoBox() {
  return (
    <Box pd="0px 10px">
      <DefaultImage source={Logo} width="61px" height="51px" resizeMode="stretch"></DefaultImage>
      <Box pd="10px 0px 0px">
        <DefaultText color={Theme.color.black} fontSize={Theme.fontSize.fs28}>
          <DefaultText
            color={Theme.color.black}
            fontSize={Theme.fontSize.fs28}
            fontWeight={Theme.fontWeight.bold}>
            스마트한{'\n'}자전거 생활
          </DefaultText>
          의 시작{'\n'}
          페달체크
        </DefaultText>
      </Box>
    </Box>
  );
}
