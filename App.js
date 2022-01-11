import {store} from '@/Store/store';
import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import Router from './src/Page/Router';
import SplashScreen from 'react-native-splash-screen';
import {PermissionsAndroid} from 'react-native';

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
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
}

const module = STORYBOOK_START ? require('./storybook').default : App;

export default module;
