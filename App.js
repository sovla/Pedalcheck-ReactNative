import {store} from '@/Store/store';
import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import Router from './src/Page/Router';
import {Text, View, TouchableOpacity, Platform} from 'react-native';
import Toast from 'react-native-toast-message';
import {DefaultText} from './src/assets/global/Text';
import {requestMultiple, PERMISSIONS} from 'react-native-permissions';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

import messaging from '@react-native-firebase/messaging';

const IosPermission = [
  // PERMISSIONS.IOS.ACCESS_NOTIFICATION_POLICY,
  // PERMISSIONS.IOS.ACCESS_FINE_LOCATION,
  // PERMISSIONS.IOS.CAMERA,
  // PERMISSIONS.IOS.CALL_PHONE,
  // PERMISSIONS.IOS.PHOTO_LIBRARY,
  // PERMISSIONS.IOS.WRITE_EXTERNAL_STORAGE,
];
const AndroidPermission = [
  PERMISSIONS.ANDROID.ACCESS_NOTIFICATION_POLICY,
  PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
  PERMISSIONS.ANDROID.CAMERA,
  PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
  PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
  PERMISSIONS.ANDROID.CALL_PHONE,
];

globalThis.ANDROID_VERSION = '1.18.6';
globalThis.IOS_VERSION = '1.18.6';

function App() {
  async function requestPermissions() {
    if (Platform.OS === 'android') {
      requestMultiple(AndroidPermission);
    } else {
      requestMultiple(IosPermission);
    }

    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }
  const ios_push_reset = notification => {
    PushNotificationIOS.removeAllPendingNotificationRequests();
    PushNotificationIOS.removeAllDeliveredNotifications();
    PushNotificationIOS.removeDeliveredNotifications();
    PushNotificationIOS.removePendingNotificationRequests();
    PushNotificationIOS.setApplicationIconBadgeNumber(0);
  };

  useEffect(() => {
    requestPermissions();
    if (Platform.OS === 'ios') {
      ios_push_reset();
    }
  }, []);

  const toastConfig = {
    customToast: ({text1, onPress, props}) => (
      <View
        onStartShouldSetResponder={onPress}
        style={{
          width: '92%',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: Platform.OS === 'ios' ? 0 : 0,
        }}>
        <View
          style={{
            width: '100%',
            alignItems: 'center',
            backgroundColor: 'rgba(22,22,22,0.60)',
            height: 60,
            justifyContent: 'center',
            borderRadius: 17,
          }}>
          <DefaultText>{text1}</DefaultText>
        </View>
      </View>
    ),
    pushToast: ({text1, text2, onPress, props, ...rest}) => (
      <TouchableOpacity
        activeOpacity={1}
        onPress={onPress}
        style={{
          width: '100%',
          justifyContent: 'center',
          padding: 16,
          marginTop: Platform.OS === 'ios' ? 0 : 0,
          backgroundColor: '#22222290',
        }}>
        <View
          style={{
            width: '100%',
          }}>
          <Text
            numberOfLines={1}
            style={[
              {
                color: '#fff',
                textAlign: 'center',
              },
            ]}>
            {text1}
          </Text>
          <Text
            numberOfLines={2}
            style={[
              {
                color: '#fff',
                textAlign: 'center',
                marginTop: 10,
              },
            ]}>
            {text2}
          </Text>
        </View>
      </TouchableOpacity>
    ),
  };

  return (
    <Provider store={store}>
      <Router />
      <Toast config={toastConfig} />
    </Provider>
  );
}

const module = App;

export default module;
