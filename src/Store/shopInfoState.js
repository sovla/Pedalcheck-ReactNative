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
    setLikeCount: (state, action) => {
      return {
        ...state,
        store_info: {
          ...state.store_info,
          mst_likes: action.payload,
        },
      };
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

export const {setShopInfo, ResetShopInfo, setShopStoreInfo, setLikeCount} = shopSlice.actions;

export default shopSlice.reducer;
