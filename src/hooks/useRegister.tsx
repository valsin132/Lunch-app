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
  const [isError, setIsError] = useState(false);
  const [updatedData, setUpdatedData] = useState<User | null>(null);

  const updateUser = async (email: string, password: string) => {
    try {
      const response = await fetch('http://localhost:3002/user', {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        method: 'PUT',
        body: JSON.stringify({ ...userData, email, password }),
      });
      const data = await response.json();
      setUpdatedData(data);
    } catch (error) {
      setIsError(true);
    }
  };
  return { updateUser, updatedData, isError };
};
