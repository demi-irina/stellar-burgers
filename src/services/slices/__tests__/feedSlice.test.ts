import reducer, { fetchFeeds } from '../feedSlice';
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

describe('feedSlice reducer', () => {
  it('Обрабатывается экшен начала запроса', () => {
    expect(reducer(undefined, fetchFeeds.pending('requestId'))).toEqual({
      orders: [],
      total: 0,
      totalToday: 0,
      isLoading: true,
      error: null
    });
  });

  it('Обрабатывается успешное получение списка заказов', () => {
    const state = {
      orders: [],
      total: 0,
      totalToday: 0,
      isLoading: true,
      error: null
    };

    expect(
      reducer(
        state,
        fetchFeeds.fulfilled(
          {
            success: true,
            orders,
            total: 120,
            totalToday: 12
          },
          'requestId',
          undefined
        )
      )
    ).toEqual({
      orders,
      total: 120,
      totalToday: 12,
      isLoading: false,
      error: null
    });
  });

  it('Обрабатывается ошибка запроса', () => {
    const state = {
      orders: [],
      total: 0,
      totalToday: 0,
      isLoading: true,
      error: null
    };

    expect(
      reducer(
        state,
        fetchFeeds.rejected(
          new Error('Ошибка получения списка заказов'),
          'requestId'
        )
      )
    ).toEqual({
      orders: [],
      total: 0,
      totalToday: 0,
      isLoading: false,
      error: 'Ошибка получения списка заказов'
    });
  });
});
