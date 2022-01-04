import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isOpenModal: false,
  modalComponent: '',
  navigator: undefined,
  isDone: false,
  modalProp: undefined,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    modalOpen: (state, action) => {
      return (state = {
        ...state,
        isOpenModal: true,
        modalComponent: action.payload,
        navigator: state.navigator,
      });
    },
    modalClose: state => {
      return (state = {
        ...state,
        isOpenModal: false,
        isDone: true,
      });
    },
    modalOpenAndProp: (state, action) => {
      return (state = {
        ...state,
        isOpenModal: true,
        modalComponent: action?.payload?.modalComponent ?? 'alertModal',
        modalProp: action?.payload,
      });
    },
    setNavigator: (state, action) => {
      return {...state, navigator: action.payload};
    },
    setModalProp: (state, action) => {
      const {modalProp, isDone} = action.payload;
      return {...state, modalProp, isDone};
    },
  },
});

export const {modalOpen, modalClose, setNavigator, setModalProp, modalOpenAndProp} =
  modalSlice.actions;

export default modalSlice.reducer;
