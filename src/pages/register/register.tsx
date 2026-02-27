import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { Preloader } from '@ui';
import { useDispatch, useSelector } from '@store';
import {
  registerUser,
  selectAuthError,
  selectAuthLoading
} from '@slices/userSlice';

export const Register: FC = () => {
  const dispatch = useDispatch();
  const authError = useSelector(selectAuthError);
  const isAuthLoading = useSelector(selectAuthLoading);

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(registerUser({ email, name: userName, password }));
  };

  if (isAuthLoading) {
    return <Preloader />;
  }

  return (
    <RegisterUI
      errorText={authError || ''}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
