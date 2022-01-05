import {GoogleLogin, KakaoLogin, NaverLogin} from '@/API/User/Login';
import {setUserInfo} from '@/Store/loginState';
import {setSnsInfo} from '@/Store/snsLoginState';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

export const SnsLogin = async (id, name, email, type, dispatch, navigation, token) => {
  // 2:카카오/3:네이버/4:구글/5:애플

  let LoginApi = () => {};
  if (type === 2) {
    LoginApi = KakaoLogin;
  } else if (type === 3) {
    LoginApi = NaverLogin;
  } else if (type === 4) {
    LoginApi = GoogleLogin;
  }
  const result = await LoginApi({
    sns_id: id,
    sns_name: name,
    sns_email: email,
    mt_login_type: type,
    mt_app_token: token,
  });

  dispatch(
    setSnsInfo({
      id,
      email,
      name,
      mt_idx: result?.data?.data,
    }),
  );

  if (result?.data?.result === 'true') {
    if (result?.data?.data?.data?.mt_status === 'Y') {
      dispatch(setUserInfo(result?.data?.data?.data));
      return navigation.navigate('Register');
    } else {
      return navigation.navigate('Register');
    }
  } else {
    return navigation.navigate('Register');
  }
};

export default SnsLogin;
