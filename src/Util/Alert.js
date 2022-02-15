import {Alert} from 'react-native';

export const AlertButton = (alertContent, leftButtonText = '확인', leftButtonPress = () => {}) => {
  Alert.alert('', alertContent, [
    {
      text: leftButtonText,
      onPress: () => leftButtonPress(),
    },
  ]);
};

export const AlertButtons = (
  alertContent,
  leftButtonText = '확인',
  RightButtonText = '취소',
  leftButtonPress,
  RightButtonPress = () => {},
) => {
  Alert.alert('', alertContent, [
    {
      text: leftButtonText,
      onPress: () => leftButtonPress(),
    },
    RightButtonText && {
      text: RightButtonText,
      onPress: () => RightButtonPress(),
    },
  ]);
};

export const RequireLoginAlert = (login, navigation, type) => {
  //  로그인이 필요한 곳에 씌우면 됩니다.
  //  로그인 성공시 리턴 true
  //  type Alert 창에 띄우기 위한 값
  if (login.apple_id && login?.mt_status === 'N') {
    AlertButtons(`${type} 계속하려면 추가정보\n입력이 필요합니다.\n추가정보 입력 하시겠습니까?`, '확인', '취소', () => {
      navigation.navigate('Register');
    });
    return;
  }

  if (login.idx === '') {
    AlertButtons('로그인이 필요한 기능입니다.', '확인', '취소', () => navigation.navigate('Home'));
    return false;
  } else {
    return true;
  }
};
