import reducer, { fetchOrderByNumber } from '../orderSlice';
import { TOrder } from '@utils-types';

const order: TOrder = {
  _id: 'order1',
  status: 'done',
  name: 'Био-марсианский space краторный бургер',
  createdAt: '2026-04-04T10:00:00.000Z',
  updatedAt: '2026-04-04T10:00:00.000Z',
  number: 42424,
  ingredients: ['bun1', 'main1', 'sauce1', 'bun1']
};

describe('orderSlice reducer', () => {
  it('Обрабатывается экшен начала запроса', () => {
    expect(
      reducer(undefined, fetchOrderByNumber.pending('requestId', 42424))
    ).toEqual({
      orderData: null,
      isLoading: true,
      error: null
    });
  });

  it('Обрабатывается успешное получение заказа', () => {
    const state = {
      orderData: null,
      isLoading: true,
      error: null
    };

    expect(
      reducer(state, fetchOrderByNumber.fulfilled(order, 'requestId', 42424))
    ).toEqual({
      orderData: order,
      isLoading: false,
      error: null
    });
  });

  it('Обрабатывается ошибка запроса', () => {
    const state = {
      orderData: null,
      isLoading: true,
      error: null
    };

    expect(
      reducer(
        state,
        fetchOrderByNumber.rejected(
          new Error('Ошибка получения заказа'),
          'requestId',
          42424
        )
      )
    ).toEqual({
      orderData: null,
      isLoading: false,
      error: 'Ошибка получения заказа'
    });
  });
});
