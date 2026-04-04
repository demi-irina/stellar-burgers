import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { Preloader } from '@ui';
import { useDispatch, useSelector } from '@store';
import {
  loginUser,
  selectAuthError,
  selectAuthLoading
} from '@slices/userSlice';

export const Login: FC = () => {
  const dispatch = useDispatch();
  const authError = useSelector(selectAuthError);
  const isAuthLoading = useSelector(selectAuthLoading);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  if (isAuthLoading) {
    return <Preloader />;
  }

  return (
    <LoginUI
      errorText={authError || ''}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
