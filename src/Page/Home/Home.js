import {BetweenBox, Box, Container, PositionBox} from '@/assets/global/Container';
import React from 'react';

import LogoBox from '@/Component/Home/LogoBox';
import HomeFooter from '@/Component/Home/HomeFooter';
import pixelChange from '@/Util/pixelChange';
import {useSelector} from 'react-redux';
import {TextLinkButton} from '@/assets/global/Button';
import KakaoImage from '@/Component/Home/Icon/KakaoImage';
import GoogleImage from '@/Component/Home/Icon/GoogleImage';
import NaverImage from '@/Component/Home/Icon/NaverImage';
import AppleImage from '@/Component/Home/Icon/AppleImage';
import {useEffect} from 'react';
import {Platform, ToastAndroid} from 'react-native';
import {GrayText} from '@/assets/global/Text';
import Theme from '@/assets/global/Theme';

export default function Home({navigation}) {
  const betweenBoxWidth = Platform.OS === 'android' ? '262px' : '312px';

  return (
    <>
      <Container mg="70px 16px 30px">
        <LogoBox />
      </Container>
      <Box alignItems="center">
        <Box pd="16px">
          <GrayText fontSize={Theme.fontSize.fs15}>SNS 계정으로 회원가입/로그인</GrayText>
        </Box>
        <BetweenBox width={betweenBoxWidth} pd="0px 0px 10px" mg="0px 0px 40px">
          <KakaoImage />
          <GoogleImage />
          <NaverImage />

          <AppleImage />
        </BetweenBox>
      </Box>
      <HomeFooter navigation={navigation} isShowLogin={false} />
    </>
  );
}
