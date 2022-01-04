import {GoogleLogin, KakaoLogin, NaverLogin} from '@/API/User/Login';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';

export const useSnsLogin = async (id, name, email, type) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  // 2:카카오/3:네이버/4:구글/5:애플
  let LoginApi;
  if (type === 2) {
    LoginApi = KakaoLogin;
  } else if (type === 3) {
    LoginApi = NaverLogin;
  } else if (type === 4) {
    LoginApi = GoogleLogin;
  }

  const result = LoginApi({
    sns_id: id,
    sns_name: name,
    sns_email: email,
    mt_login_type: type,
    mt_app_token: 'test', // 수정 필요
  }).then(res => res?.data?.result === 'true');

  dispatch(
    setSnsInfo({
      id,
      email,
      name: nickname,
      mt_idx: SnsLoginResult?.data?.data,
    }),
  );

  if (result?.data?.result === 'true') {
    return navigation.navigate('RepairHome');
  }
  // else if(false) {

  // }
  else {
    return navigation.navigate('Register');
  }
};
