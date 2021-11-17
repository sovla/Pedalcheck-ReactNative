import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  location: '',
};

export const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    AddLocation: (state, action) => {
      if (state.location) {
        state.location += ' ' + action.payload;
      } else {
        state.location = action.payload;
      }
    },
    DeleteLocation: state => {
      return (state.location = '');
    },
  },
});

export const {AddLocation, DeleteLocation} = locationSlice.actions;

export default locationSlice.reducer;
