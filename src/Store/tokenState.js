import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  token: '',
};

export const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    setToken: (state, action) => {
      const {payload} = action;
      return (state = {
        token: payload,
      });
    },
  },
});

export const {setToken} = tokenSlice.actions;

export default tokenSlice.reducer;
