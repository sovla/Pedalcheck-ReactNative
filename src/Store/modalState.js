import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isOpenModal: false,
  modalComponent: '',
  navigator: undefined,
  setState: undefined,
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
        modalProp: undefined,
      });
    },
    setNavigator: (state, action) => {
      return {...state, navigator: action.payload};
    },
    setModalProp: (state, action) => {
      return {...state, modalProp: action.payload};
    },
    setModalSetState: (state, action) => {
      return {...state, setState: action.payload};
    },
  },
});

export const {modalOpen, modalClose, setNavigator, setModalProp, setModalSetState} =
  modalSlice.actions;

export default modalSlice.reducer;
