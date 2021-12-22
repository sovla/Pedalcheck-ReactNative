import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  email: '',
  id: '',
  name: '',
};

export const snsLoginSlice = createSlice({
  name: 'snsLogin',
  initialState,
  reducers: {
    setSnsInfo: (state, action) => {
      const {email, id, name} = action.payload;
      return (state = {
        email,
        id,
        name,
      });
    },
  },
});

export const {setSnsInfo} = snsLoginSlice.actions;

export default snsLoginSlice.reducer;
