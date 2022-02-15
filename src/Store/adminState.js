import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isAdmin: false,
};

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setIsAdmin: (state, action) => {
      return (state = {
        isAdmin: action.payload,
      });
    },
  },
});

export const {setIsAdmin} = adminSlice.actions;

export default adminSlice.reducer;
