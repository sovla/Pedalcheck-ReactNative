const {API, ImageAPI} = require('../Api');

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
export const AppleLogin = async args => {
  try {
    const response = await API.post('member_login_apple.php', args);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const AddInformation = async args => {
  try {
    const response = await API.post('member_join2.php', args);

    return response;
  } catch (error) {
    console.log(error);
  }
};

export const AddInformationImage = async args => {
  try {
    const data = args;
    const response = await ImageAPI(data, 'mt_image', 'member_join2.php');
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const UpdateMemberImage = async args => {
  try {
    const data = args;
    const response = await ImageAPI(data, 'mt_bank_image', 'member_edit.php');
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const UpdateMember = async args => {
  try {
    const response = await API.post('member_edit.php', args);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getUserInformation = async args => {
  try {
    const response = await API.post('member_info.php', args);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const memberRetire = async args => {
  try {
    const response = await API.post('member_leave.php', args);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const autoLoginApi = async args => {
  try {
    const response = await API.post('autologin.php', args);
    return response;
  } catch (error) {
    console.log(error);
  }
};
