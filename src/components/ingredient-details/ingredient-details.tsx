import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { IngredientDetailsUI, Preloader } from '@ui';
import { useSelector } from '@store';
import {
  selectIngredients,
  selectIngredientsError,
  selectIngredientsLoading
} from '@slices/ingredientsSlice';

export const IngredientDetails: FC = () => {
  const { id } = useParams<{ id: string }>();

  const ingredients = useSelector(selectIngredients);
  const isIngredientsLoading = useSelector(selectIngredientsLoading);
  const ingredientsError = useSelector(selectIngredientsError);

  const ingredientData = ingredients.find((item) => item._id === id) || null;

  if (isIngredientsLoading) {
    return <Preloader />;
  }

  if (ingredientsError) {
    return (
      <p className={`text text_type_main-medium text_color_error`}>
        {ingredientsError}
      </p>
    );
  }

  if (!ingredientData) {
    return <p className='text text_type_main-medium'>Ингредиент не найден</p>;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
