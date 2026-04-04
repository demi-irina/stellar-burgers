import { ProfileUI } from '@ui-pages';
import { Preloader } from '@ui';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from '@store';
import {
  selectProfileError,
  selectProfileLoading,
  selectUser,
  updateUser
} from '@slices/userSlice';
import { TRegisterData } from '@api';

export const Profile: FC = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const isProfileLoading = useSelector(selectProfileLoading);
  const profileError = useSelector(selectProfileError);

  const [formValue, setFormValue] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: ''
  });

  useEffect(() => {
    setFormValue((prevState) => ({
      ...prevState,
      name: user?.name || '',
      email: user?.email || ''
    }));
  }, [user]);

  const isFormChanged =
    formValue.name !== user?.name ||
    formValue.email !== user?.email ||
    !!formValue.password;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    const updatedUserData: Partial<TRegisterData> = {};

    if (formValue.name !== user?.name) {
      updatedUserData.name = formValue.name;
    }

    if (formValue.email !== user?.email) {
      updatedUserData.email = formValue.email;
    }

    if (formValue.password) {
      updatedUserData.password = formValue.password;
    }

    if (Object.keys(updatedUserData).length > 0) {
      dispatch(updateUser(updatedUserData));
    }
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setFormValue({
      name: user?.name || '',
      email: user?.email || '',
      password: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  if (isProfileLoading) {
    return <Preloader />;
  }

  return (
    <>
      <ProfileUI
        formValue={formValue}
        isFormChanged={isFormChanged}
        handleCancel={handleCancel}
        handleSubmit={handleSubmit}
        handleInputChange={handleInputChange}
      />
      {profileError && (
        <p className='text text_type_main-medium text_color_error'>
          {profileError}
        </p>
      )}
    </>
  );
};
