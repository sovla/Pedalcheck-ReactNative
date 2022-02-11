import {getBannerList} from '@/API/Repair/Repair';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

export const fetchBannerList = createAsyncThunk('banner/fetchBannerList', async () => {
  const response = await getBannerList();
  if (response.data?.result === 'true') {
    return response.data.data.data;
  }
});

export const bannerSlice = createSlice({
  name: 'banner',
  initialState: {
    bannerList: [],
    loading: 'idle',
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchBannerList.fulfilled, (state, action) => {
      // Add user to the state array
      state.bannerList = action.payload;
      state.loading = 'success';
    });
  },
});

export const {} = bannerSlice.actions;

export default bannerSlice.reducer;
