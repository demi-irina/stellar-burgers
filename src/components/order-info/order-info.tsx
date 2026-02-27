import { FC, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { OrderInfoUI, Preloader } from '@ui';
import { TIngredient } from '@utils-types';
import { useDispatch, useSelector } from '@store';
import {
  selectIngredients,
  selectIngredientsError,
  selectIngredientsLoading
} from '@slices/ingredientsSlice';
import {
  fetchOrderByNumber,
  selectOrderData,
  selectOrderError,
  selectOrderLoading
} from '@slices/orderSlice';

export const OrderInfo: FC = () => {
  const { number } = useParams<{ number: string }>();

  const dispatch = useDispatch();
  const orderData = useSelector(selectOrderData);
  const ingredients = useSelector(selectIngredients);
  const isIngredientsLoading = useSelector(selectIngredientsLoading);
  const ingredientsError = useSelector(selectIngredientsError);
  const isOrderLoading = useSelector(selectOrderLoading);
  const orderError = useSelector(selectOrderError);

  useEffect(() => {
    if (number) {
      dispatch(fetchOrderByNumber(Number(number)));
    }
  }, [dispatch, number]);

  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (isOrderLoading || isIngredientsLoading) {
    return <Preloader />;
  }

  if (orderError || ingredientsError) {
    return (
      <p className={`text text_type_main-medium text_color_error`}>
        {orderError || ingredientsError}
      </p>
    );
  }

  if (!orderInfo) {
    return <p className='text text_type_main-medium'>Заказ не найден</p>;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
