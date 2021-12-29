import {configureStore} from '@reduxjs/toolkit';
import modalReducer from './modalState';
import sizeReducer from './sizeState';
import locationReducer from './locationState';
import birthDateReducer from './birthDateState';
import tokenReducer from './tokenState';
import snsLoginReducer from './snsLoginState';
import loginReducer from './loginState';
import shopInfoReducer from './shopInfoState';
export const store = configureStore({
  reducer: {
    //  리듀서 추가 부분
    modal: modalReducer,
    size: sizeReducer,
    location: locationReducer,
    birthDate: birthDateReducer,
    token: tokenReducer,
    snsLogin: snsLoginReducer,
    login: loginReducer,
    shopInfo: shopInfoReducer,
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
        ],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['meta.arg', 'payload.timestamp', 'modal'],
        // Ignore these paths in the state
        ignoredPaths: ['modal.navigation'],
      },
    }),
});
