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
  //   middleware: (getDefaultMiddleware) =>
  //     getDefaultMiddleware({
  //       serializableCheck: false,
  //     }),
});
