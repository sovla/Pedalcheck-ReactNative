import React from 'react';
import {TouchableOpacity} from 'react-native';
import Kakao from '@assets/image/ic_kakao.png';
import DefaultImage from '@/assets/global/Image';

import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {setSnsInfo} from '@/Store/snsLoginState';
import {useState} from 'react';

import {getProfile as getKakaoProfile, login} from '@react-native-seoul/kakao-login';

import {SnsLogin} from '../../../Hooks/SnsLogin';

export default function KakaoImage({onPress}) {
  const [result, setResult] = useState();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {token} = useSelector(state => state);

  const signInWithKakao = async () => {
    try {
      const token = await login();
      getProfile();
    } catch (error) {}
  };

  const getProfile = async () => {
    try {
      const profile = await getKakaoProfile();
      console.log(profile, '카카오로그인정보');

      const {id, email, nickname} = profile;

      await SnsLogin(id, nickname, email, 2, dispatch, navigation, token.token);
    } catch (error) {}
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
