import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { Preloader, ProfileMenuUI } from '@ui';
import { useDispatch, useSelector } from '@store';
import {
  logoutUser,
  selectLogoutError,
  selectLogoutLoading
} from '@slices/userSlice';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();

  const dispatch = useDispatch();
  const isLogoutLoading = useSelector(selectLogoutLoading);
  const logoutError = useSelector(selectLogoutError);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  if (isLogoutLoading) {
    return <Preloader />;
  }

  return (
    <>
      <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />
      {logoutError && (
        <p className='text text_type_main-medium text_color_error'>
          {logoutError}
        </p>
      )}
    </>
  );
};
