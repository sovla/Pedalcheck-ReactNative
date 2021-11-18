import {createSlice} from '@reduxjs/toolkit';
import {Dimensions} from 'react-native';

const initialState = {
  screenHeight: Dimensions.get('window').height,
  screenWidth: Dimensions.get('window').width, // 디자인 크기
  minusPadding: `${412 - 32}px`,
  designWidth: 412,
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
        designWidth: 412,
      });
    },
  },
});

export const {initSetting} = sizeSlice.actions;

export default sizeSlice.reducer;
