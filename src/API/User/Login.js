const {API} = require('../Api');

export const LoginApi = async args => {
  try {
    const response = await API.post('member_login.php', args);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const MemberJoin = async args => {
  try {
    const response = await API.post('member_join.php', args);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const KakaoLogin = async args => {
  try {
    const response = await API.post('member_login_kakao.php', args);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const NaverLogin = async args => {
  try {
    const response = await API.post('member_login_naver.php', args);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const GoogleLogin = async args => {
  try {
    const response = await API.post('member_login_google.php', args);
    return response;
  } catch (error) {
    console.log(error);
  }
};
