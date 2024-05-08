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
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState<string>('');

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setIsError('');

    try {
      if (userData?.email === email && userData?.password === password) {
        localStorage.setItem('userData', JSON.stringify(userData));
        window.dispatchEvent(new Event('storage'));
        setIsLoading(false);
        return true;
      }
      setIsError('Incorrect email or password. Please try again.');
      setIsLoading(false);
      return false;
    } catch (_isError) {
      setIsError('Login failed. Please try again later.');
      setIsLoading(false);
      return false;
    }
  };

  return { login, isLoading, isError };
};
