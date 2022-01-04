import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  email: '',
  id: '',
  name: '',
  mt_idx: '',
};

export const snsLoginSlice = createSlice({
  name: 'snsLogin',
  initialState,
  reducers: {
    setSnsInfo: (state, action) => {
      const {email, id, name, mt_idx} = action.payload;
      return (state = {
        email,
        id,
        name,
        mt_idx,
      });
    },
  },
});

export const {setSnsInfo} = snsLoginSlice.actions;

export default snsLoginSlice.reducer;
