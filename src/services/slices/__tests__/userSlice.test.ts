import reducer, {
  authChecked,
  getUser,
  loginUser,
  logoutUser
} from '../userSlice';
import { TUser } from '@utils-types';

const user: TUser = {
  email: 'test@example.com',
  name: 'Тестовый пользователь'
};

const loginPayload = {
  email: 'test@example.com',
  password: 'password'
};

const initialUserState = {
  user: null,
  isAuthChecked: false,
  authLoading: false,
  authError: null,
  profileLoading: false,
  profileError: null,
  logoutLoading: false,
  logoutError: null
};

const authLoadingState = {
  ...initialUserState,
  authLoading: true
};

const profileLoadingState = {
  ...initialUserState,
  profileLoading: true
};

const logoutLoadingState = {
  ...initialUserState,
  user,
  isAuthChecked: true,
  logoutLoading: true
};

describe('userSlice reducer', () => {
  describe('Проверка авторизации', () => {
    it('Отмечается пройденная авторизация', () => {
      expect(reducer(undefined, authChecked())).toEqual({
        ...initialUserState,
        isAuthChecked: true
      });
    });

    it('Обрабатывается экшен начала запроса авторизации', () => {
      expect(
        reducer(undefined, loginUser.pending('requestId', loginPayload))
      ).toEqual({
        ...initialUserState,
        authLoading: true
      });
    });

    it('Обрабатывается успешное выполнение авторизации', () => {
      const state = authLoadingState;

      expect(
        reducer(state, loginUser.fulfilled(user, 'requestId', loginPayload))
      ).toEqual({
        ...state,
        user,
        authLoading: false
      });
    });

    it('Обрабатывается ошибка авторизации', () => {
      const state = authLoadingState;

      expect(
        reducer(
          state,
          loginUser.rejected(
            new Error('Ошибка авторизации'),
            'requestId',
            loginPayload
          )
        )
      ).toEqual({
        ...state,
        authLoading: false,
        authError: 'Ошибка авторизации'
      });
    });
  });

  describe('Получение профиля пользователя', () => {
    it('Обрабатывается экшен начала запроса получения профиля', () => {
      expect(reducer(undefined, getUser.pending('requestId'))).toEqual({
        ...initialUserState,
        profileLoading: true
      });
    });

    it('Обрабатывается успешное получение профиля', () => {
      const state = {
        ...profileLoadingState
      };

      expect(
        reducer(state, getUser.fulfilled(user, 'requestId', undefined))
      ).toEqual({
        ...state,
        user,
        profileLoading: false
      });
    });

    it('Обрабатывается ошибка получения профиля', () => {
      const state = profileLoadingState;

      expect(
        reducer(
          state,
          getUser.rejected(
            new Error('Ошибка получения профиля'),
            'requestId',
            undefined
          )
        )
      ).toEqual({
        ...state,
        profileLoading: false,
        profileError: 'Ошибка получения профиля'
      });
    });
  });

  describe('Выход из аккаунта', () => {
    it('Обрабатывается экшен начала запроса выхода из аккаунта', () => {
      expect(reducer(undefined, logoutUser.pending('requestId'))).toEqual({
        ...initialUserState,
        logoutLoading: true
      });
    });

    it('Обрабатывается успешный выход из аккаунта', () => {
      const state = logoutLoadingState;

      expect(
        reducer(state, logoutUser.fulfilled(undefined, 'requestId', undefined))
      ).toEqual({
        ...state,
        user: null,
        logoutLoading: false
      });
    });

    it('Обрабатывается ошибка выхода из аккаунта', () => {
      const state = logoutLoadingState;

      expect(
        reducer(
          state,
          logoutUser.rejected(
            new Error('Ошибка выхода'),
            'requestId',
            undefined
          )
        )
      ).toEqual({
        ...state,
        logoutLoading: false,
        logoutError: 'Ошибка выхода'
      });
    });
  });
});
