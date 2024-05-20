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

export const useRegister = () => {
  const { data: userData } = useFetchData<User>('http://localhost:3002/user');
  const [errMsg, setErrorMsg] = useState('');

  const updateUser = async (
    email: string,
    password: string,
    setShowToast: (value: boolean) => void
  ): Promise<boolean> => {
    try {
      const response = await fetch('http://localhost:3002/user', {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        method: 'PUT',
        body: JSON.stringify({ ...userData, email, password }),
      });
      await response.json();
      return true;
    } catch (error) {
      setErrorMsg('Register failed. Please try again later.');
      setShowToast(true);
      return false;
    }
  };
  return { updateUser, errMsg };
};
