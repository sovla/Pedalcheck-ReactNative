import {store} from '@/Store/store';
import React, {useEffect, useState} from 'react';
import {Provider} from 'react-redux';
import Router from './src/Page/Router';
import SplashScreen from 'react-native-splash-screen';
import {BackHandler, PermissionsAndroid, Text, ToastAndroid, View} from 'react-native';
import Toast from 'react-native-toast-message';
import {DefaultText} from './src/assets/global/Text';
import {useFocusEffect} from '@react-navigation/native';
import {check, requestMultiple, PERMISSIONS} from 'react-native-permissions';

const STORYBOOK_START = false;

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

function App() {
  async function requestPermissions() {
    if (Platform.OS === 'ios') {
      Geolocation.requestAuthorization();
      Geolocation.setRNConfiguration({
        skipPermissionRequests: false,
        authorizationLevel: 'whenInUse',
      });
    }

    if (Platform.OS === 'android') {
      requestMultiple(AndroidPermission);
    } else {
      requestMultiple(IosPermission);
    }
  }

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 300);
    requestPermissions();
  }, []);

  const toastConfig = {
    customToast: ({text1, props}) => (
      <View
        style={{
          width: '92%',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: Platform.OS === 'ios' ? 44 : 0,
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
  };

  return (
    <Provider store={store}>
      <Router />
      <Toast config={toastConfig} />
    </Provider>
  );
}

const module = STORYBOOK_START ? require('./storybook').default : App;

export default module;
