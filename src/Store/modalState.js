import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isOpenModal: false,
  modalComponent: '',
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    modalOpen: (state, action) => {
      return (state = {
        isOpenModal: true,
        modalComponent: action.payload,
      });
    },
    modalClose: state => {
      return (state = {
        ...state,
        isOpenModal: false,
      });
    },
  },
});

export const {modalOpen, modalClose} = modalSlice.actions;

export default modalSlice.reducer;
