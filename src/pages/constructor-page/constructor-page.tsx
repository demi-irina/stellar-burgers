import styles from './constructor-page.module.css';

import { BurgerConstructor, BurgerIngredients } from '@components';
import { Preloader } from '@ui';
import { FC } from 'react';
import { useSelector } from '@store';
import {
  selectIngredients,
  selectIngredientsLoading,
  selectIngredientsError
} from '@slices/ingredientsSlice';

export const ConstructorPage: FC = () => {
  const isLoading = useSelector(selectIngredientsLoading);
  const ingredients = useSelector(selectIngredients);
  const error = useSelector(selectIngredientsError);

  return (
    <main className={styles.containerMain}>
      {isLoading ? (
        <Preloader />
      ) : error ? (
        <div
          className={`${styles.errorMessage} text text_type_main-medium pt-4`}
        >
          {error}
        </div>
      ) : !ingredients.length ? (
        <div
          className={`${styles.emptyMessage} text text_type_main-medium pt-4`}
        >
          Нет ингредиентов
        </div>
      ) : (
        <>
          <h1
            className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}
          >
            Соберите бургер
          </h1>
          <div className={`${styles.main} pl-5 pr-5`}>
            <BurgerIngredients />
            <BurgerConstructor />
          </div>
        </>
      )}
    </main>
  );
};
