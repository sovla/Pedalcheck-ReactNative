import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  year: '',
  month: '',
  day: '',
};

export const birthDateSlice = createSlice({
  name: 'birthDate',
  initialState,
  reducers: {
    SetBirthDate: (state, action) => {
      return (state = action.payload);
    },
    DeletebirthDate: state => {
      return (state = initialState);
    },
  },
});

export const {SetBirthDate, DeletebirthDate} = birthDateSlice.actions;

export default birthDateSlice.reducer;
