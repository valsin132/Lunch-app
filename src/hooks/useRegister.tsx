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
  const { data: userData, isError } = useFetchData<User>('http://localhost:3002/user');

  const updateUser = async (email: string, password: string): Promise<void> => {
    if (isError) {
      throw new Error('Registration failed');
    }
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
    } catch (error) {
      throw new Error('Registration failed. Please try again later.');
    }
  };
  return { updateUser };
};
