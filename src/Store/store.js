import {configureStore} from '@reduxjs/toolkit';
import modalReducer from './modalState';
import locationReducer from './locationState';
import birthDateReducer from './birthDateState';
import tokenReducer from './tokenState';
import snsLoginReducer from './snsLoginState';
import loginReducer from './loginState';
import shopInfoReducer from './shopInfoState';
import reservationReducer from './reservationState';
import storeInfoReducer from './storeInfoState';
import bannerReducer from './BannerState';
import adReducer from './AdState';
import companyInfoReducer from './companyInfoState';
import adminReducer from './adminState';
import {composeWithDevTools} from 'redux-devtools-extension';

export const store = configureStore({
  reducer: {
    //  리듀서 추가 부분
    modal: modalReducer,
    location: locationReducer,
    birthDate: birthDateReducer,
    token: tokenReducer,
    snsLogin: snsLoginReducer,
    login: loginReducer,
    shopInfo: shopInfoReducer,
    reservationInfo: reservationReducer,
    storeInfo: storeInfoReducer,
    banner: bannerReducer,
    ad: adReducer,
    companyInfo: companyInfoReducer,
    admin: adminReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: [
          'modal/setNavigator',
          'modal/modalClose',
          'modal/modalOpen',
          'modal/setModalProp',
          'modal/setModalSetState',
          'modal/setState',
          'modal/modalOpenAndProp',
        ],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['meta.arg', 'payload.timestamp', 'modal'],
        // Ignore these paths in the state
        ignoredPaths: ['modal.navigation', 'modal.modalProp'],
      },
    }),
});
