import reducer, {
  addIngredient,
  moveIngredientDown,
  moveIngredientUp,
  removeIngredient
} from '../constructorSlice';
import { TConstructorIngredient, TIngredient } from '@utils-types';

jest.mock('uuid', () => ({
  v4: () => 'mocked-uuid'
}));

const bun: TIngredient = {
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
};

const main: TIngredient = {
  _id: 'main1',
  name: 'Биокотлета из марсианской Магнолии',
  type: 'main',
  proteins: 420,
  fat: 142,
  carbohydrates: 242,
  calories: 4242,
  price: 424,
  image: 'https://code.s3.yandex.net/react/code/meat-01.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png'
};

const sauce: TIngredient = {
  _id: 'sauce1',
  name: 'Соус фирменный Space Sauce',
  type: 'sauce',
  proteins: 50,
  fat: 22,
  carbohydrates: 11,
  calories: 14,
  price: 80,
  image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
  image_large: 'https://code.s3.yandex.net/react/code/sauce-04-large.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/sauce-04-mobile.png'
};

const secondMain: TIngredient = {
  ...main,
  _id: 'main2',
  name: 'Биокотлета из марсианской Магнолии 2'
};

const createConstructorIngredient = (
  ingredient: TIngredient,
  id: string
): TConstructorIngredient => ({
  ...ingredient,
  id
});

const initialConstructorState = {
  bun: null,
  ingredients: [],
  orderRequest: false,
  orderModalData: null,
  error: null
};

const stateWithTwoIngredients = {
  ...initialConstructorState,
  ingredients: [
    createConstructorIngredient(main, 'first-id'),
    createConstructorIngredient(sauce, 'second-id')
  ]
};

const stateWithThreeIngredients = {
  ...initialConstructorState,
  ingredients: [
    createConstructorIngredient(main, 'first-id'),
    createConstructorIngredient(sauce, 'second-id'),
    createConstructorIngredient(secondMain, 'third-id')
  ]
};

describe('constructorSlice reducer', () => {
  it('Добавляется булка в конструктор', () => {
    expect(reducer(undefined, addIngredient(bun))).toEqual({
      bun: {
        ...bun,
        id: 'mocked-uuid'
      },
      ingredients: [],
      orderRequest: false,
      orderModalData: null,
      error: null
    });
  });

  it('Добавляется начинка в конструктор', () => {
    expect(reducer(undefined, addIngredient(main))).toEqual({
      bun: null,
      ingredients: [
        {
          ...main,
          id: 'mocked-uuid'
        }
      ],
      orderRequest: false,
      orderModalData: null,
      error: null
    });
  });

  it('Удаляется ингредиент по идентификатору', () => {
    expect(
      reducer(stateWithTwoIngredients, removeIngredient('first-id'))
    ).toEqual({
      ...stateWithTwoIngredients,
      ingredients: [stateWithTwoIngredients.ingredients[1]]
    });
  });

  it('Перемещается ингредиент вверх', () => {
    const nextState = reducer(stateWithThreeIngredients, moveIngredientUp(2));

    expect(nextState.ingredients.map((item) => item.id)).toEqual([
      'first-id',
      'third-id',
      'second-id'
    ]);
  });

  it('Перемещается ингредиент вниз', () => {
    const nextState = reducer(stateWithThreeIngredients, moveIngredientDown(0));

    expect(nextState.ingredients.map((item) => item.id)).toEqual([
      'second-id',
      'first-id',
      'third-id'
    ]);
  });
});
