import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  my_bike: undefined,
  store_info: {},
  review_list: [],
  pt_list: [],
};

export const shopSlice = createSlice({
  name: 'shop',
  initialState,
  reducers: {
    setShopInfo: (state, action) => {
      return action.payload;
    },
    ResetShopInfo: state => {
      return initialState;
    },
    setShopStoreInfo: (state, action) => {
      return {
        ...state,
        store_info: action.payload,
      };
    },
  },
});

export const {setShopInfo, ResetShopInfo, setShopStoreInfo} = shopSlice.actions;

export default shopSlice.reducer;
