import React from 'react';
import {TouchableOpacity} from 'react-native';
import Naver from '@assets/image/ic_naver.png';
import DefaultImage from '@/assets/global/Image';

import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';

import {NaverLogin, getProfile} from '@react-native-seoul/naver-login';
import {SnsLogin} from '../../../Hooks/SnsLogin';

// const iosKeys = {
//   kConsumerKey: 'ITpjZ2KbbItwBYgm1Kjh',
//   kConsumerSecret: '2Ue9R_kQzN',
//   kServiceAppName: '테스트앱(iOS)',
//   kServiceAppUrlScheme: 'testapp', // only for iOS
// };
// const androidKeys = {
//   kConsumerKey: 'ITpjZ2KbbItwBYgm1Kjh',
//   kConsumerSecret: '2Ue9R_kQzN',
//   kServiceAppName: '테스트앱(안드로이드)',
// };

const iosKeys = {
  kConsumerKey: 'ITpjZ2KbbItwBYgm1Kjh',
  kConsumerSecret: '2Ue9R_kQzN',
  kServiceAppName: 'PedalCheck',
  kServiceAppUrlScheme: 'NaverPedalcheck', // only for iOS
};

const androidKeys = {
  kConsumerKey: 'ITpjZ2KbbItwBYgm1Kjh',
  kConsumerSecret: '2Ue9R_kQzN',
  kServiceAppName: 'PedalCheck',
};

const initials = Platform.OS === 'ios' ? iosKeys : androidKeys;
// 테스트 키. git hub 우리거 아님

export default function NaverImage({onPress}) {
  const dispatch = useDispatch();
  const {token} = useSelector(state => state);
  const navigation = useNavigation();

  const [naverToken, setNaverToken] = useState();

  const naverLogin = props => {
    return new Promise((resolve, reject) => {
      NaverLogin.login(props, (err, snstoken) => {
        getUserProfile(snstoken);
        if (err) {
          reject(err);
          return;
        }
        resolve(snstoken);
      });
    });
  };

  const getUserProfile = async snstoken => {
    const profileResult = await getProfile(snstoken.accessToken);
    if (profileResult.resultcode === '024') {
      Alert.alert('로그인 실패', profileResult.message);
      return;
    }
    const {id, name, email} = await profileResult.response;
    await SnsLogin(id, name, email, 3, dispatch, navigation, token.token);
  };

  return (
    <TouchableOpacity onPress={() => naverLogin(initials)}>
      <DefaultImage source={Naver} width="60px" height="60px" resizeMode="contain" />
    </TouchableOpacity>
  );
}
