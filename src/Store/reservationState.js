import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  selectProduct: undefined,
  selectBike: undefined,
  selectDate: undefined,
  selectPayment: undefined,
};

export const ReservationSlice = createSlice({
  name: 'reservation',
  initialState,
  reducers: {
    setReservationProduct: (state, action) => {
      return (state = {
        ...state,
        selectProduct: action.payload,
      });
    },
    setReservationBike: (state, action) => {
      return (state = {
        ...state,
        selectBike: action.payload,
      });
    },
    setReservationDate: (state, action) => {
      return (state = {
        ...state,
        selectDate: action.payload,
      });
    },
    setReservationPayment: (state, action) => {
      return (state = {
        ...state,
        selectPayment: action.payload,
      });
    },

    clearReservation: state => {
      return (state = initialState);
    },
  },
});

export const {
  setReservationProduct,
  setReservationBike,
  setReservationPayment,
  setReservationDate,
  clearReservation,
} = ReservationSlice.actions;

export default ReservationSlice.reducer;
