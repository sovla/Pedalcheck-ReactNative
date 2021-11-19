import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isOpenModal: false,
  modalComponent: '',
  navigator: undefined,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    modalOpen: (state, action) => {
      return (state = {
        isOpenModal: true,
        modalComponent: action.payload,
        navigator: state.navigator,
      });
    },
    modalClose: state => {
      return (state = {
        ...state,
        isOpenModal: false,
      });
    },
    setNavigator: (state, action) => {
      return {...state, navigator: action.payload};
    },
  },
});

export const {modalOpen, modalClose, setNavigator} = modalSlice.actions;

export default modalSlice.reducer;
