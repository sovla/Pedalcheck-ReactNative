import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  code: '',
  name: '',
};

export const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    AddLocation: (state, action) => {
      if (state.name) {
        state.name += ' ' + action.payload.name;
        state.code = action.payload.code;
      } else {
        state.name = action.payload.name;
        state.code = action.payload.code;
      }
    },
    DeleteLocation: state => {
      return initialState;
    },
  },
});

export const {AddLocation, DeleteLocation} = locationSlice.actions;

export default locationSlice.reducer;
