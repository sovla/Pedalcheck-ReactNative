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
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {setSnsInfo} from '@/Store/snsLoginState';
import {Login} from '@/API/User/Login';
import {useState} from 'react';

import {
  KakaoOAuthToken,
  KakaoProfile,
  getProfile as getKakaoProfile,
  login,
  logout,
  unlink,
} from '@react-native-seoul/kakao-login';

import {NaverLogin, getProfile} from '@react-native-seoul/naver-login';

const iosKeys = {
  kConsumerKey: 'kkeU9exIGwNDzPGDBBpr',
  kConsumerSecret: '0mCYc72HgH',
  kServiceAppName: '테스트앱(iOS)',
  kServiceAppUrlScheme: 'testapp', // only for iOS
};

const androidKeys = {
  kConsumerKey: 'kkeU9exIGwNDzPGDBBpr',
  kConsumerSecret: '0mCYc72HgH',
  kServiceAppName: '테스트앱(안드로이드)',
};

const initials = Platform.OS === 'ios' ? iosKeys : androidKeys;
// 테스트 키. git hub 우리거 아님

export function KakaoImage({onPress}) {
  const [result, setResult] = useState();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const signInWithKakao = async () => {
    try {
      const token = await login();
      getProfile();
    } catch (error) {
      console.log(error);
    }
  };

  const getProfile = async () => {
    try {
      const profile = await getKakaoProfile();
      console.log(profile, '카카오로그인정보');

      const {id, email, nickname} = profile;
      dispatch(
        setSnsInfo({
          id,
          email,
          name: nickname,
        }),
      );
      navigation.navigate('Register');
    } catch (error) {
      console.log(error);
    }
  };

  // const unlinkKakao = async () => {
  //   const message = await unlink();

  //   setResult(message);
  // };
  return (
    <TouchableOpacity onPress={() => signInWithKakao()}>
      <DefaultImage source={Kakao} width="60px" height="60px" resizeMode="contain" />
    </TouchableOpacity>
  );
}

export function GoogleImage({onPress}) {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    GoogleSignin.configure({
      //    google-services.json/client/oauth_client/client_id
      webClientId: '574869846797-38s3ud4d6svhar28qtqkjsditppgui87.apps.googleusercontent.com',
      offlineAccess: true,
      hostedDomain: '',
      forceConsentPrompt: true,
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
      const {id, email, name} = userInfo.user;

      dispatch(
        setSnsInfo({
          id,
          email,
          name,
        }),
      );
      navigation.navigate('Register');
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happen-ed
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
  const [naverToken, setNaverToken] = useState();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const naverLogin = props => {
    return new Promise((resolve, reject) => {
      NaverLogin.login(props, (err, token) => {
        console.log(`\n\n  Token is fetched  :: ${token} \n\n`);
        getUserProfile(token);
        if (err) {
          reject(err);
          return;
        }
        resolve(token);
      });
    });
  };

  const getUserProfile = async token => {
    const profileResult = await getProfile(token.accessToken);
    if (profileResult.resultcode === '024') {
      Alert.alert('로그인 실패', profileResult.message);
      return;
    }
    const {id, email, name} = profileResult.response;
    console.log(profileResult, '네이버 로그인 정보');
    dispatch(
      setSnsInfo({
        id,
        email,
        name,
      }),
    );

    navigation.navigate('Register');
  };

  return (
    <TouchableOpacity onPress={() => naverLogin(initials)}>
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
