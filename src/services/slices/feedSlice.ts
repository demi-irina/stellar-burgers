import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getFeedsApi } from '@api';
import { TOrder } from '@utils-types';

type TFeedState = {
  orders: TOrder[];
  total: number;
  totalToday: number;
  isLoading: boolean;
  error: string | null;
};

const initialState: TFeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  isLoading: false,
  error: null
};

export const fetchFeeds = createAsyncThunk(
  'feed/fetchAll',
  async () => await getFeedsApi()
);

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  selectors: {
    selectFeedTotal: (state) => ({
      total: state.total,
      totalToday: state.totalToday
    }),
    selectFeedOrders: (state) => state.orders,
    selectFeedLoading: (state) => state.isLoading,
    selectFeedError: (state) => state.error
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeeds.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFeeds.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(fetchFeeds.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Ошибка загрузки заказов';
      });
  }
});

export const {
  selectFeedTotal,
  selectFeedOrders,
  selectFeedLoading,
  selectFeedError
} = feedSlice.selectors;

export default feedSlice.reducer;
