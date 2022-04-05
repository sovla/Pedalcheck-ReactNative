import {AppleLogin, GoogleLogin, KakaoLogin, MemberJoin, NaverLogin} from '@/API/User/Login';
import {setUserInfo} from '@/Store/loginState';
import {setSnsInfo} from '@/Store/snsLoginState';
import {AlertButton} from '@/Util/Alert';
import {isEmail} from '@/Util/EmailCheck';
import {Alert} from 'react-native';

export const SnsLogin = async (id, name, email, type, dispatch, navigation, token) => {
  // 2:카카오/3:네이버/4:구글/5:애플

  let LoginApi = async () => {};
  if (type === 2) {
    LoginApi = KakaoLogin;
  } else if (type === 3) {
    LoginApi = NaverLogin;
  } else if (type === 4) {
    LoginApi = GoogleLogin;
  } else if (type === 5) {
    LoginApi = AppleLogin;
  }
  const result = await LoginApi({
    sns_id: id,
    sns_name: name,
    sns_email: email,
    mt_login_type: type,
    mt_app_token: token,
  });
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
    if (type === 5) {
      // ios
      dispatch(setUserInfo(result?.data?.data?.data));
      if (result?.data?.data?.data?.mt_di?.length > 0 && !result?.data?.data?.data.mt_wdate?.length) {
        const data = result?.data?.data?.data;
        if (data.mt_nickname?.length > 0 && data.mt_hp?.length > 0 && data.mt_addr?.length > 0) {
          MemberJoin({
            mt_name: data.mt_name,
            mt_nickname: data.mt_nickname,
            mt_id: email,
            mt_hp: data.mt_hp,
            mt_addr: data.mt_addr,
            mt_idx: data.idx,
            mt_app_token: token,
          }).then(res => {
            if (res?.data?.result === 'true') {
              dispatch(setUserInfo(res?.data?.data?.data));
              navigation.reset({routes: [{name: 'RepairHome'}]});
            }
          });
        }
      }
      return navigation.reset({routes: [{name: 'RepairHome'}]});
    }

    if (
      result?.data?.data?.data?.mt_status === 'Y' &&
      result?.data?.data?.data?.mt_wdate?.length > 0 &&
      isEmail(result?.data?.data?.data?.mt_id)
    ) {
      // 회원가입 완료
      dispatch(setUserInfo(result?.data?.data?.data));
      return navigation.reset({routes: [{name: 'RepairHome'}]});
    } else {
      // 처음 SNS 로그인
      if (result?.data?.data?.data?.mt_di?.length > 0) {
        const data = result?.data?.data?.data;
        if (
          data.mt_nickname?.length > 0 &&
          data.mt_hp?.length > 0 &&
          data.mt_email?.length > 0 &&
          data.mt_addr?.length > 0
        ) {
          await MemberJoin({
            mt_name: data.mt_name,
            mt_nickname: data.mt_nickname,
            mt_id: email,
            mt_hp: data.mt_hp,
            mt_addr: data.mt_addr,
            mt_idx: data.idx,
            mt_app_token: token,
          }).then(res => {
            if (res?.data?.result === 'true') {
              dispatch(setUserInfo(res?.data?.data?.data));
              navigation.reset({routes: [{name: 'RepairHome'}]});
            }
          });
        } else {
          AlertButton('필수 정보가 입력되지 않은 아이디입니다.\n필수 계정정보를 입력해주세요.', '확인', () => {
            navigation.navigate('RegisterInformation', {
              idx: result?.data?.data?.data?.idx,
            });
          });
        }

        return;
      } else {
        return navigation.navigate('Register');
      }
    }
  } else {
    if (result?.data?.msg === '탈퇴처리된 회원입니다.') {
      Alert.alert('탈퇴처리된 회원입니다.');
      return;
    }
    dispatch(
      setSnsInfo({
        id,
        email,
        name,
        mt_idx: result?.data?.data, // false 인 경우엔 data에 이것만 들어옴. idx만
      }),
    );

    // 회원가입 X

    return navigation.navigate('Register');
  }
};

export default SnsLogin;
