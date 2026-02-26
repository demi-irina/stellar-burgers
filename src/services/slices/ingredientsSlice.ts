import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getIngredientsApi } from '@api';
import { TIngredient } from '@utils-types';

type TIngredientsState = {
  items: TIngredient[];
  isLoading: boolean;
  error: string | null;
};

const initialState: TIngredientsState = {
  items: [],
  isLoading: false,
  error: null
};

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchAll',
  async () => await getIngredientsApi()
);

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  selectors: {
    selectIngredients: (state) => state.items,
    selectIngredientsLoading: (state) => state.isLoading,
    selectIngredientsError: (state) => state.error,
    selectBuns: (state) => state.items.filter((item) => item.type === 'bun'),
    selectMains: (state) => state.items.filter((item) => item.type === 'main'),
    selectSauces: (state) => state.items.filter((item) => item.type === 'sauce')
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Ошибка загрузки ингредиентов';
      });
  }
});

export const {
  selectIngredients,
  selectIngredientsLoading,
  selectIngredientsError,
  selectBuns,
  selectMains,
  selectSauces
} = ingredientsSlice.selectors;

export default ingredientsSlice.reducer;
