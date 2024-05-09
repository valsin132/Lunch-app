import { useState } from 'react';
import { useFetchData } from './useFetchData';

interface User {
  email: string;
  password: string;
  name: string;
  surname: string;
  balance: number;
  img: string;
  orders: {
    weekDay: string;
    mealIds: number[];
  }[];
}

export const useLogin = () => {
  const { data: userData, isError: isFetchError } = useFetchData<User>(
    'http://localhost:3002/user'
  );
  const [isError, setIsError] = useState<string>('');

  const login = (email: string, password: string, setShowToast: (value: boolean) => void): void => {
    setIsError('');

    if (isFetchError) {
      setIsError('Login failed. Please try again later.');
      setShowToast(true);
    } else if (userData?.email === email && userData?.password === password) {
      window.localStorage.setItem('userData', JSON.stringify(userData));
      window.dispatchEvent(new Event('storage'));
    } else {
      setIsError('Incorrect email or password. Please try again.');
      setShowToast(true);
    }
  };

  return { login, isError, isFetchError };
};
