import {createSlice} from '@reduxjs/toolkit';
import {Dimensions} from 'react-native';

const initialState = {
  screenHeight: Dimensions.get('window').height,
  screenWidth: Dimensions.get('window').width,
  minusPadding: `${Dimensions.get('window').width - 32}px`,
};

export const sizeSlice = createSlice({
  name: 'size',
  initialState,
  reducers: {
    initSetting: (state, action) => {
      const {payload} = action;
      return (state = {
        screenHeight: payload.screenHeight,
        screenWidth: payload.screenWidth,
        minusPadding: payload.minusPadding,
      });
    },
  },
});

export const {initSetting} = sizeSlice.actions;

export default sizeSlice.reducer;
