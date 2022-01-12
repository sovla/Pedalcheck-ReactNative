import {Alert} from 'react-native';

export const AlertButton = (alertContent, leftButtonText = '확인', leftButtonPress) => {
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
