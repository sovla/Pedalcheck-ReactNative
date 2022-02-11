import {getAd} from '@/API/Repair/Repair';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

export const fetchAd = createAsyncThunk('ad/fetchAd', async () => {
  const response = await getAd();
  if (response.data?.result === 'true') {
    return response.data.data.data;
  }
});

export const adSlice = createSlice({
  name: 'ad',
  initialState: {
    ad: {},
    loading: 'idle',
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchAd.fulfilled, (state, action) => {
      // Add user to the state array
      state.ad = action.payload;
      state.loading = 'success';
    });
  },
});

export const {} = adSlice.actions;

export default adSlice.reducer;
