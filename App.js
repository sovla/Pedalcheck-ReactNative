import {store} from '@/Store/store';
import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import Router from './src/Page/Router';
import SplashScreen from 'react-native-splash-screen';
import {PermissionsAndroid, Text, View} from 'react-native';
import Toast from 'react-native-toast-message';
import {DefaultText} from './src/assets/global/Text';

const STORYBOOK_START = false;

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
      await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
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
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: Platform.OS === 'ios' ? 44 : 0,
        }}>
        <View
          style={{
            width: '100%',
            alignItems: 'center',
            backgroundColor: 'rgba(22,22,22,0.75)',
            height: 60,
            justifyContent: 'center',
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
