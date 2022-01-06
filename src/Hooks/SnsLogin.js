import {GoogleLogin, KakaoLogin, NaverLogin} from '@/API/User/Login';
import {setUserInfo} from '@/Store/loginState';
import {setSnsInfo} from '@/Store/snsLoginState';

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
  console.log(result);
  if (result?.data?.result === 'true') {
    // 한번이라도 SNS 로그인 한상태
    dispatch(
      setSnsInfo({
        id,
        email,
        name,
        mt_idx: result?.data?.data?.data?.idx,
      }),
    );
    if (result?.data?.data?.data?.mt_status === 'Y') {
      // 회원가입 완료
      dispatch(setUserInfo(result?.data?.data?.data));
      return navigation.reset('RepairHome');
    } else {
      // 처음 SNS 로그인
      return navigation.navigate('Register');
    }
  } else {
    // 회원가입 X
    dispatch(
      setSnsInfo({
        id,
        email,
        name,
        mt_idx: result?.data?.data,
      }),
    );
    return navigation.navigate('Register');
  }
};

export default SnsLogin;
