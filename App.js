import {store} from '@/Store/store';
import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import Router from './src/Page/Router';
import SplashScreen from 'react-native-splash-screen';

const STORYBOOK_START = false;

function App() {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 300);
  }, []);
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
}

const module = STORYBOOK_START ? require('./storybook').default : App;

export default module;
