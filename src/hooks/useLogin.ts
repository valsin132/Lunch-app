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
  const { data: userData } = useFetchData<User>('http://localhost:3002/user');
  const [isError, setIsError] = useState<string>('');

  const login = async (email: string, password: string): Promise<void> => {
    setIsError('');

    if (userData?.email === email && userData?.password === password) {
      window.localStorage.setItem('userData', JSON.stringify(userData));
      window.dispatchEvent(new Event('storage'));
    } else {
      setIsError('Incorrect email or password. Please try again.');
    }
  };

  return { login, isError };
};
