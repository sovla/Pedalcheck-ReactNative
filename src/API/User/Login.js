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
