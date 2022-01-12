import Toast from 'react-native-toast-message';

export const showToastMessage = text => {
  Toast.show({
    type: 'customToast',
    position: 'bottom',
    text1: text,
    visibilityTime: 3000,
    onPress: async () => {
      Toast.hide();
    },
  });
};
