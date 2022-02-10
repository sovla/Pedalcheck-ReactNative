import {BetweenBox, Box, Container} from '@/assets/global/Container';
import React from 'react';

import LogoBox from '@/Component/Home/LogoBox';
import HomeFooter from '@/Component/Home/HomeFooter';
import KakaoImage from '@/Component/Home/Icon/KakaoImage';
import GoogleImage from '@/Component/Home/Icon/GoogleImage';
import NaverImage from '@/Component/Home/Icon/NaverImage';
import AppleImage from '@/Component/Home/Icon/AppleImage';
import {Platform, TouchableOpacity} from 'react-native';
import {GrayText} from '@/assets/global/Text';
import Theme from '@/assets/global/Theme';
import {getDay} from '@/Util/getDateList';
import messaging from '@react-native-firebase/messaging';
import {useEffect} from 'react';
export default function Home({navigation}) {
  const betweenBoxWidth = Platform.OS === 'android' ? '262px' : '312px';

  useEffect(() => {
    messaging().onNotificationOpenedApp(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
    });
    //포그라운드
    messaging()
      .getInitialNotification()
      .then(async remoteMessage => {
        console.log('getInitialNotification', remoteMessage);
      }, 1000);

    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('setBackgroundMessageHandler', remoteMessage);
      // navigation.navigate(remoteMessage?.data?.intent);
    });
  }, []);

  // 안드로이드 카카오 구글 네이버    3가지
  // IOS 카카오 구글 네이버 애플로그인 4가지 로 크기가 다릅니다.
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
