import React, {useEffect} from 'react';
import {TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import Kakao from '@assets/image/ic_kakao.png';
import Google from '@assets/image/ic_google.png';
import Naver from '@assets/image/ic_naver.png';
import Apple from '@assets/image/ic_apple.png';
import DefaultImage from '@/assets/global/Image';

import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';

export function KakaoImage({onPress}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <DefaultImage source={Kakao} width="60px" height="60px" resizeMode="contain" />
    </TouchableOpacity>
  );
}
export function GoogleImage({onPress}) {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '574869846797-38s3ud4d6svhar28qtqkjsditppgui87.apps.googleusercontent.com',
      //    google-services.json/client/oauth_client/client_id
    });
    try {
      GoogleSignin.signOut();
    } catch (error) {
      console.error(error);
    }
  }, []);

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const token = await GoogleSignin.getTokens();
      console.log(token);
      console.log(userInfo);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  return (
    <TouchableOpacity onPress={signIn}>
      <DefaultImage source={Google} width="60px" height="60px" resizeMode="contain" />
    </TouchableOpacity>
  );
}
export function NaverImage({onPress}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <DefaultImage source={Naver} width="60px" height="60px" resizeMode="contain" />
    </TouchableOpacity>
  );
}
export function AppleImage({onPress}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <DefaultImage source={Apple} width="60px" height="60px" resizeMode="contain" />
    </TouchableOpacity>
  );
}
