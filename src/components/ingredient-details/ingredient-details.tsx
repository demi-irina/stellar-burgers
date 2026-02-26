import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { IngredientDetailsUI, Preloader } from '@ui';
import { useSelector } from '@store';
import {
  selectIngredients,
  selectIngredientsLoading
} from '@slices/ingredientsSlice';

export const IngredientDetails: FC = () => {
  const { id } = useParams<{ id: string }>();

  const ingredients = useSelector(selectIngredients);
  const isLoading = useSelector(selectIngredientsLoading);

  const ingredientData = ingredients.find((item) => item._id === id) || null;

  if (!ingredientData || isLoading) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
