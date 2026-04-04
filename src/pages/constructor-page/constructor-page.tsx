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
  const isIngredientsLoading = useSelector(selectIngredientsLoading);
  const ingredients = useSelector(selectIngredients);
  const ingredientsError = useSelector(selectIngredientsError);

  return (
    <main className={styles.containerMain}>
      {isIngredientsLoading ? (
        <Preloader />
      ) : ingredientsError ? (
        <div
          className={`${styles.errorMessage} text text_type_main-medium pt-4`}
        >
          {ingredientsError}
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
