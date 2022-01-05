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

export default function Home({navigation}) {
  const {size} = useSelector(state => state);
  return (
    <>
      <Container mg="70px 16px 30px">
        <LogoBox />
      </Container>
      <Box alignItems="center">
        <Box pd="16px">
          <TextLinkButton
            to={() => navigation.navigate('Register')}
            content="SNS 계정으로 회원가입/로그인"
          />
        </Box>
        <BetweenBox width={`${size.designWidth - 100}px`} pd="0px 0px 10px">
          <KakaoImage />
          <GoogleImage />
          <NaverImage />
          <AppleImage />
        </BetweenBox>
      </Box>
      <HomeFooter navigation={navigation}></HomeFooter>
    </>
  );
}
