import reducer, { fetchProfileOrders } from '../profileOrdersSlice';
import { TOrder } from '@utils-types';

const orders: TOrder[] = [
  {
    _id: 'order1',
    status: 'done',
    name: 'Био-марсианский space краторный бургер',
    createdAt: '2026-04-04T10:00:00.000Z',
    updatedAt: '2026-04-04T10:00:00.000Z',
    number: 42424,
    ingredients: ['bun1', 'main1', 'sauce1', 'bun1']
  }
];

describe('profileOrdersSlice reducer', () => {
  it('Обрабатывается экшен начала запроса', () => {
    expect(reducer(undefined, fetchProfileOrders.pending('requestId'))).toEqual(
      {
        orders: [],
        isLoading: true,
        error: null
      }
    );
  });

  it('Обрабатывается успешное получение заказов пользователя', () => {
    const state = {
      orders: [],
      isLoading: true,
      error: null
    };

    expect(
      reducer(
        state,
        fetchProfileOrders.fulfilled(orders, 'requestId', undefined)
      )
    ).toEqual({
      orders,
      isLoading: false,
      error: null
    });
  });

  it('Обрабатывается ошибка запроса', () => {
    const state = {
      orders: [],
      isLoading: true,
      error: null
    };

    expect(
      reducer(
        state,
        fetchProfileOrders.rejected(new Error('Ошибка заказов'), 'requestId')
      )
    ).toEqual({
      orders: [],
      isLoading: false,
      error: 'Ошибка заказов'
    });
  });
});
