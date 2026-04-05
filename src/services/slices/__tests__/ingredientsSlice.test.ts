import reducer, { fetchIngredients } from '../ingredientsSlice';
import { TIngredient } from '@utils-types';

const ingredients: TIngredient[] = [
  {
    _id: 'bun1',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png'
  }
];

describe('ingredientsSlice reducer', () => {
  it('Обрабатывается экшен начала запроса', () => {
    expect(reducer(undefined, fetchIngredients.pending('requestId'))).toEqual({
      items: [],
      isLoading: true,
      error: null
    });
  });

  it('Обрабатывается успешное получение ингредиентов', () => {
    const state = {
      items: [],
      isLoading: true,
      error: null
    };

    expect(
      reducer(
        state,
        fetchIngredients.fulfilled(ingredients, 'requestId', undefined)
      )
    ).toEqual({
      items: ingredients,
      isLoading: false,
      error: null
    });
  });

  it('Обрабатывается ошибка запроса', () => {
    const state = {
      items: [],
      isLoading: true,
      error: null
    };

    expect(
      reducer(
        state,
        fetchIngredients.rejected(
          new Error('Ошибка получения ингредиентов'),
          'requestId'
        )
      )
    ).toEqual({
      items: [],
      isLoading: false,
      error: 'Ошибка получения ингредиентов'
    });
  });
});
