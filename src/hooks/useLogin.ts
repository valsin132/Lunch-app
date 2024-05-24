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

  const login = async (email: string, password: string) => {
    if (userData?.email === email && userData?.password === password) {
      window.localStorage.setItem('userData', JSON.stringify(userData));
      window.dispatchEvent(new Event('storage'));
    } else {
      throw new Error(
        isFetchError
          ? 'Login failed. Please try again later.'
          : 'Incorrect email or password. Please try again.'
      );
    }
  };

  return { login };
};
