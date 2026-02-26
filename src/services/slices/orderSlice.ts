import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getOrderByNumberApi } from '@api';
import { TOrder } from '@utils-types';

type TOrderState = {
  orderData: TOrder | null;
  isLoading: boolean;
  error: string | null;
};

const initialState: TOrderState = {
  orderData: null,
  isLoading: false,
  error: null
};

export const fetchOrderByNumber = createAsyncThunk<TOrder, number>(
  'order/fetchByNumber',
  async (number) => {
    const data = await getOrderByNumberApi(number);
    if (data?.success) return data.orders[0];
    return Promise.reject(data);
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  selectors: {
    selectOrderData: (state) => state.orderData,
    selectOrderLoading: (state) => state.isLoading
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderByNumber.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOrderByNumber.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderData = action.payload;
      })
      .addCase(fetchOrderByNumber.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Ошибка загрузки заказа';
      });
  }
});

export const { selectOrderData, selectOrderLoading } = orderSlice.selectors;

export default orderSlice.reducer;
