import { ProfileOrdersUI } from '@ui-pages';
import { Preloader } from '@ui';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '@store';
import {
  fetchProfileOrders,
  selectProfileOrdersError,
  selectProfileOrders,
  selectProfileOrdersLoading
} from '@slices/profileOrdersSlice';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectProfileOrders);
  const isProfileOrdersLoading = useSelector(selectProfileOrdersLoading);
  const profileOrdersError = useSelector(selectProfileOrdersError);

  useEffect(() => {
    dispatch(fetchProfileOrders());
  }, [dispatch]);

  if (isProfileOrdersLoading) {
    return <Preloader />;
  }

  if (profileOrdersError) {
    return (
      <p className='text text_type_main-medium text_color_error'>
        {profileOrdersError}
      </p>
    );
  }

  return <ProfileOrdersUI orders={orders} />;
};
