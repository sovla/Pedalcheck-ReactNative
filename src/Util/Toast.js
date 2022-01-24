import {useNavigation} from '@react-navigation/native';
import Toast from 'react-native-toast-message';

export const showToastMessage = (text, time = 3000) => {
  Toast.show({
    type: 'customToast',
    position: 'bottom',
    text1: text,
    visibilityTime: time,
    onPress: async () => {
      await Toast.hide();
    },
  });
};

export const showPushToastMessage = ({remoteMessage, onPress, props, ...rest}) => {
  Toast.show({
    type: 'pushToast',
    position: 'top',
    text1: remoteMessage.notification.title,
    text2: remoteMessage.notification.body,
    visibilityTime: 3000,
    autoHide: true,
    topOffset: 0,
    onShow: () => {},
    onHide: () => {},
    onPress: async () => {
      await Toast.hide();
      onPress();
    },
  });
};
