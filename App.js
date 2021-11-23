import {store} from '@/Store/store';
import React from 'react';
import {Provider} from 'react-redux';
import Router from './src/Page/Router';

const STORYBOOK_START = false;

function App() {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
}

const module = STORYBOOK_START ? require('./storybook').default : App;

export default module;
