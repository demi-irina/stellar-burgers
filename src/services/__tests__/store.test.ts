import { rootReducer } from '@store';

describe('rootReducer', () => {
  it('Возвращается корректное начальное состояние при неизвестном экшене', () => {
    expect(rootReducer(undefined, { type: 'UNKNOWN_ACTION' })).toEqual({
      ingredients: {
        items: [],
        isLoading: false,
        error: null
      },
      burgerConstructor: {
        bun: null,
        ingredients: [],
        orderRequest: false,
        orderModalData: null,
        error: null
      },
      feed: {
        orders: [],
        total: 0,
        totalToday: 0,
        isLoading: false,
        error: null
      },
      order: {
        orderData: null,
        isLoading: false,
        error: null
      },
      user: {
        user: null,
        isAuthChecked: false,
        authLoading: false,
        authError: null,
        profileLoading: false,
        profileError: null,
        logoutLoading: false,
        logoutError: null
      },
      profileOrders: {
        orders: [],
        isLoading: false,
        error: null
      }
    });
  });
});
