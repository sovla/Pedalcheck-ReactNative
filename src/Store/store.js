import {configureStore} from '@reduxjs/toolkit';
import modalReducer from './modalState';
import sizeReducer from './sizeState';
import locationReducer from './locationState';
import birthDateReducer from './birthDateState';

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    size: sizeReducer,
    location: locationReducer,
    birthDate: birthDateReducer,
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
